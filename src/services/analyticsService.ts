
import { Environment } from '@/utils/environment';

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
}

export class AnalyticsService {
  private static initialized = false;
  
  static init(): void {
    if (!Environment.analyticsEnabled || this.initialized) return;
    
    // Initialize analytics tracking
    this.initialized = true;
    console.log('Analytics service initialized');
  }
  
  static track(event: string, properties?: Record<string, any>): void {
    if (!Environment.analyticsEnabled) return;
    
    const eventData = {
      event,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      }
    };
    
    console.log('Analytics event:', eventData);
    
    // In production, send to your analytics service
    if (Environment.isProduction) {
      // Send to analytics provider (Mixpanel, Amplitude, etc.)
    }
  }
  
  static trackPageView(page: string): void {
    this.track('page_view', { page });
  }
  
  static trackAuditRequest(auditData: any): void {
    this.track('audit_request_created', {
      blockchain: auditData.blockchain,
      budget: auditData.budget,
      urgency: auditData.urgency_level
    });
  }
  
  static trackUserAction(action: string, context?: Record<string, any>): void {
    this.track('user_action', { action, ...context });
  }
}
