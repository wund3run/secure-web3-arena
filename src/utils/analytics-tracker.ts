// Advanced analytics tracking system
import { toast } from "sonner";

interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  properties?: Record<string, any>;
  timestamp: number;
  userId?: string;
  sessionId: string;
}

interface UserJourney {
  step: string;
  timestamp: number;
  duration?: number;
  metadata?: Record<string, any>;
}

class AnalyticsTracker {
  private static instance: AnalyticsTracker;
  private events: AnalyticsEvent[] = [];
  private journey: UserJourney[] = [];
  private sessionId: string;
  private userId?: string;
  private isEnabled: boolean = true;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeSession();
  }

  static getInstance(): AnalyticsTracker {
    if (!AnalyticsTracker.instance) {
      AnalyticsTracker.instance = new AnalyticsTracker();
    }
    return AnalyticsTracker.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeSession() {
    // Track session start
    this.track('session', 'lifecycle', 'start');
    
    // Track page visibility changes
    if (typeof window !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.track('session', 'lifecycle', 'hidden');
        } else {
          this.track('session', 'lifecycle', 'visible');
        }
      });

      // Track session end before page unload
      window.addEventListener('beforeunload', () => {
        this.track('session', 'lifecycle', 'end');
        this.flush();
      });
    }
  }

  setUserId(userId: string) {
    this.userId = userId;
    this.track('user', 'identification', 'set_user_id', { userId });
  }

  track(event: string, category: string, action: string, properties?: Record<string, any>) {
    if (!this.isEnabled) return;

    const analyticsEvent: AnalyticsEvent = {
      event,
      category,
      action,
      properties: {
        ...properties,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
        url: typeof window !== 'undefined' ? window.location.href : 'unknown',
        referrer: typeof window !== 'undefined' ? document.referrer : 'unknown'
      },
      timestamp: Date.now(),
      userId: this.userId,
      sessionId: this.sessionId
    };

    this.events.push(analyticsEvent);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', analyticsEvent);
    }

    // Auto-flush events periodically
    if (this.events.length >= 10) {
      this.flush();
    }
  }

  trackUserJourney(step: string, metadata?: Record<string, any>) {
    const now = Date.now();
    const lastStep = this.journey[this.journey.length - 1];
    
    const journeyStep: UserJourney = {
      step,
      timestamp: now,
      duration: lastStep ? now - lastStep.timestamp : undefined,
      metadata
    };

    this.journey.push(journeyStep);
    
    // Track as analytics event too
    this.track('user_journey', 'navigation', step, {
      ...metadata,
      step_duration: journeyStep.duration,
      total_steps: this.journey.length
    });
  }

  trackPerformance(metric: string, value: number, category: string = 'performance') {
    this.track('performance', category, metric, {
      value,
      metric,
      timestamp: Date.now()
    });
  }

  trackError(error: Error, context?: Record<string, any>) {
    this.track('error', 'application', 'error_occurred', {
      error_message: error.message,
      error_stack: error.stack,
      error_name: error.name,
      ...context
    });
  }

  trackConversion(goal: string, value?: number, properties?: Record<string, any>) {
    this.track('conversion', 'goals', goal, {
      goal,
      value,
      conversion_timestamp: Date.now(),
      ...properties
    });
  }

  trackEngagement(action: string, element: string, duration?: number) {
    this.track('engagement', 'interaction', action, {
      element,
      duration,
      interaction_timestamp: Date.now()
    });
  }

  // A/B Testing support
  trackExperiment(experimentId: string, variant: string, action: string) {
    this.track('experiment', 'ab_test', action, {
      experiment_id: experimentId,
      variant,
      experiment_timestamp: Date.now()
    });
  }

  // Feature flag tracking
  trackFeatureFlag(flagName: string, enabled: boolean, context?: Record<string, any>) {
    this.track('feature_flag', 'usage', flagName, {
      flag_name: flagName,
      enabled,
      ...context
    });
  }

  flush() {
    if (this.events.length === 0) return;

    // In a real application, this would send events to your analytics service
    // For now, we'll store them in localStorage for development purposes
    try {
      const existingEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      const allEvents = [...existingEvents, ...this.events];
      
      // Keep only last 1000 events in localStorage
      const recentEvents = allEvents.slice(-1000);
      localStorage.setItem('analytics_events', JSON.stringify(recentEvents));
      
      // Store journey separately
      localStorage.setItem('user_journey', JSON.stringify(this.journey));
      
      console.log(`Flushed ${this.events.length} analytics events`);
      this.events = [];
    } catch (error) {
      console.warn('Failed to flush analytics events:', error);
    }
  }

  getAnalyticsSummary() {
    const storedEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    const storedJourney = JSON.parse(localStorage.getItem('user_journey') || '[]');
    
    return {
      session_id: this.sessionId,
      user_id: this.userId,
      total_events: storedEvents.length + this.events.length,
      journey_steps: storedJourney.length + this.journey.length,
      current_session_events: this.events.length,
      is_enabled: this.isEnabled
    };
  }

  // Privacy controls
  enableTracking() {
    this.isEnabled = true;
    this.track('privacy', 'consent', 'tracking_enabled');
  }

  disableTracking() {
    this.track('privacy', 'consent', 'tracking_disabled');
    this.flush();
    this.isEnabled = false;
  }

  clearData() {
    this.events = [];
    this.journey = [];
    localStorage.removeItem('analytics_events');
    localStorage.removeItem('user_journey');
    toast.success("Analytics data cleared");
  }

  // Export data for GDPR compliance
  exportUserData() {
    const data = {
      session_id: this.sessionId,
      user_id: this.userId,
      events: this.events,
      journey: this.journey,
      stored_events: JSON.parse(localStorage.getItem('analytics_events') || '[]'),
      stored_journey: JSON.parse(localStorage.getItem('user_journey') || '[]')
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-data-${this.sessionId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

export const analyticsTracker = AnalyticsTracker.getInstance();

// Convenience functions
export const trackEvent = (event: string, category: string, action: string, properties?: Record<string, any>) => {
  analyticsTracker.track(event, category, action, properties);
};

export const trackPageView = (page: string, title?: string) => {
  analyticsTracker.track('page_view', 'navigation', 'view', {
    page,
    title: title || document.title,
    timestamp: Date.now()
  });
};

export const trackClick = (element: string, context?: Record<string, any>) => {
  analyticsTracker.trackEngagement('click', element, undefined);
};

export const trackFormSubmission = (formName: string, success: boolean, errors?: string[]) => {
  analyticsTracker.track('form', 'submission', success ? 'success' : 'error', {
    form_name: formName,
    success,
    errors
  });
};

export const trackSearch = (query: string, results?: number, category?: string) => {
  analyticsTracker.track('search', 'query', 'performed', {
    query,
    results_count: results,
    category,
    search_timestamp: Date.now()
  });
};
