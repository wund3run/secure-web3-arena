
import { supabase } from '@/integrations/supabase/client';

export interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  userId?: string;
  timestamp?: string;
}

export interface UserJourney {
  userId: string;
  events: AnalyticsEvent[];
  sessionId: string;
  startTime: string;
  endTime?: string;
  conversionGoals: string[];
}

export interface ConversionFunnel {
  step: string;
  users: number;
  conversions: number;
  conversionRate: number;
  dropOff: number;
}

export class AdvancedAnalyticsService {
  private static mixpanelToken: string;
  private static initialized = false;

  static init(mixpanelToken?: string): void {
    if (mixpanelToken) {
      this.mixpanelToken = mixpanelToken;
    }
    this.initialized = true;
    console.log('Advanced Analytics Service initialized');
  }

  static track(event: string, properties: Record<string, any> = {}): void {
    if (!this.initialized) return;

    const eventData: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        platform: 'web'
      }
    };

    console.log('Analytics Event:', eventData);

    // Store in Supabase for internal analytics
    this.storeInternalEvent(eventData);

    // Send to Mixpanel (mock implementation)
    this.sendToMixpanel(eventData);
  }

  private static async storeInternalEvent(event: AnalyticsEvent): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from('analytics_events').insert({
        event_name: event.event,
        properties: event.properties,
        user_id: user?.id || null,
        timestamp: event.timestamp || new Date().toISOString()
      });

      if (error) {
        console.error('Error storing analytics event:', error);
      }
    } catch (error) {
      console.error('Error storing analytics event:', error);
    }
  }

  private static sendToMixpanel(event: AnalyticsEvent): void {
    // Mock Mixpanel integration
    if (typeof window !== 'undefined' && (window as any).mixpanel) {
      (window as any).mixpanel.track(event.event, event.properties);
    }
  }

  static trackAuditRequest(auditData: any): void {
    this.track('audit_request_created', {
      blockchain: auditData.blockchain,
      budget_range: auditData.budget,
      urgency: auditData.urgency_level,
      contract_count: auditData.contract_count,
      lines_of_code: auditData.lines_of_code
    });
  }

  static trackAuditorMatch(matchData: any): void {
    this.track('auditor_matched', {
      match_score: matchData.compatibility_score,
      auditor_experience: matchData.auditor_profile?.years_experience,
      match_method: 'ai_powered'
    });
  }

  static trackPayment(paymentData: any): void {
    this.track('payment_processed', {
      amount: paymentData.amount,
      currency: paymentData.currency,
      payment_method: paymentData.payment_method,
      audit_id: paymentData.audit_id
    });
  }

  static async getConversionFunnel(funnelSteps: string[]): Promise<ConversionFunnel[]> {
    try {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('event_name, user_id, timestamp')
        .in('event_name', funnelSteps)
        .order('timestamp', { ascending: true });

      if (error) throw error;

      // Process funnel data
      const funnelData = this.processFunnelData(data || [], funnelSteps);
      return funnelData;
    } catch (error) {
      console.error('Error getting conversion funnel:', error);
      return [];
    }
  }

  private static processFunnelData(events: any[], steps: string[]): ConversionFunnel[] {
    const userSessions = new Map();
    
    // Group events by user
    events.forEach(event => {
      if (!userSessions.has(event.user_id)) {
        userSessions.set(event.user_id, []);
      }
      userSessions.get(event.user_id).push(event);
    });

    // Calculate funnel metrics
    return steps.map((step, index) => {
      const usersAtStep = Array.from(userSessions.values())
        .filter(userEvents => userEvents.some((e: any) => e.event_name === step)).length;
      
      const previousStepUsers = index > 0 
        ? Array.from(userSessions.values())
            .filter(userEvents => userEvents.some((e: any) => e.event_name === steps[index - 1])).length
        : usersAtStep;
      
      const conversionRate = previousStepUsers > 0 ? (usersAtStep / previousStepUsers) * 100 : 0;
      const dropOff = previousStepUsers - usersAtStep;

      return {
        step,
        users: usersAtStep,
        conversions: usersAtStep,
        conversionRate,
        dropOff
      };
    });
  }
}
