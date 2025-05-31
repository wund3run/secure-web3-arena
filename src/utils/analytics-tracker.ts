
interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  user_type?: string;
  page: string;
  timestamp: number;
  session_id: string;
}

class AnalyticsTracker {
  private static instance: AnalyticsTracker;
  private sessionId: string;
  private events: AnalyticsEvent[] = [];
  private userType: string | null = null;
  private isInitialized: boolean = false;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeTracking();
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

  private initializeTracking() {
    if (typeof window === 'undefined' || this.isInitialized) return;

    this.isInitialized = true;
    console.log('📊 Analytics tracker initialized');

    // Track page views
    this.trackPageView();
    
    // Track user interactions
    this.setupInteractionTracking();
    
    // Track performance events
    this.setupPerformanceTracking();

    // Load previous user type from storage
    const savedUserType = localStorage.getItem('hawkly_user_type');
    if (savedUserType) {
      this.userType = savedUserType;
    }
  }

  setUserType(type: string) {
    this.userType = type;
    localStorage.setItem('hawkly_user_type', type);
    this.track('user_type_identified', 'user', 'type_set', type);
    console.log('👤 User type set:', type);
  }

  track(event: string, category: string, action: string, label?: string, value?: number) {
    if (!this.isInitialized) {
      console.warn('Analytics not initialized, queuing event:', event);
      return;
    }

    const analyticsEvent: AnalyticsEvent = {
      event,
      category,
      action,
      label,
      value,
      user_type: this.userType || 'anonymous',
      page: window.location.pathname,
      timestamp: Date.now(),
      session_id: this.sessionId
    };

    this.events.push(analyticsEvent);
    console.log('📊 Analytics Event:', analyticsEvent);

    // Store in localStorage for batch sending
    this.storeEvent(analyticsEvent);
    
    // Send to analytics service (implement your preferred service)
    this.sendToAnalytics(analyticsEvent);
  }

  private trackPageView() {
    const referrer = document.referrer;
    const isFirstVisit = !localStorage.getItem('hawkly_previous_visit');
    
    this.track('page_view', 'navigation', 'page_load', window.location.pathname);
    
    if (referrer) {
      this.track('referrer', 'traffic', 'external_referrer', referrer);
    }
    
    if (isFirstVisit) {
      this.track('first_visit', 'user', 'new_visitor');
      localStorage.setItem('hawkly_previous_visit', 'true');
    }
  }

  private setupInteractionTracking() {
    // Track CTA clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      
      // Track button clicks
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        const button = target.tagName === 'BUTTON' ? target : target.closest('button');
        const buttonText = button?.textContent?.trim() || '';
        this.track('button_click', 'interaction', 'click', buttonText);
      }
      
      // Track link clicks
      if (target.tagName === 'A' || target.closest('a')) {
        const link = target.tagName === 'A' ? target as HTMLAnchorElement : target.closest('a');
        const href = link?.href || '';
        const linkText = link?.textContent?.trim() || '';
        this.track('link_click', 'interaction', 'navigation', `${linkText} -> ${href}`);
      }
    });

    // Track form interactions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      const formId = form.id || form.className || 'unknown_form';
      this.track('form_submit', 'interaction', 'form_submission', formId);
    });

    // Track scroll depth
    this.setupScrollTracking();
  }

  private setupScrollTracking() {
    let maxScroll = 0;
    const trackingPoints = [25, 50, 75, 90, 100];
    const tracked = new Set<number>();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      maxScroll = Math.max(maxScroll, scrollPercent);
      
      trackingPoints.forEach(point => {
        if (scrollPercent >= point && !tracked.has(point)) {
          tracked.add(point);
          this.track('scroll_depth', 'engagement', 'scroll', `${point}%`, point);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  private setupPerformanceTracking() {
    // Track page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.fetchStart;
          this.track('page_performance', 'performance', 'load_time', 'total', Math.round(loadTime));
          
          const interactiveTime = navigation.domInteractive - navigation.fetchStart;
          this.track('page_performance', 'performance', 'interactive_time', 'dom', Math.round(interactiveTime));
        }
      }, 1000);
    });
  }

  private storeEvent(event: AnalyticsEvent) {
    try {
      const stored = JSON.parse(localStorage.getItem('hawkly_analytics_events') || '[]');
      stored.push(event);
      
      // Keep only last 100 events
      if (stored.length > 100) {
        stored.splice(0, stored.length - 100);
      }
      
      localStorage.setItem('hawkly_analytics_events', JSON.stringify(stored));
    } catch (error) {
      console.warn('Failed to store analytics event:', error);
    }
  }

  private sendToAnalytics(event: AnalyticsEvent) {
    // Implement your analytics service integration here
    // Examples: Google Analytics, Mixpanel, Amplitude, etc.
    
    // For now, we'll just log and prepare for future integration
    if (process.env.NODE_ENV === 'development') {
      console.log('Would send to analytics:', event);
    }
  }

  // User journey specific tracking
  trackUserJourney(step: string, userType: string, metadata?: Record<string, any>) {
    this.track('user_journey', 'onboarding', step, userType);
    
    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        this.track('journey_metadata', 'onboarding', key, String(value));
      });
    }
  }

  trackConversion(type: string, value?: number) {
    this.track('conversion', 'business', type, undefined, value);
  }

  // Get analytics summary
  getAnalyticsSummary() {
    const events = this.events;
    const summary = {
      total_events: events.length,
      session_duration: events.length > 0 ? Date.now() - events[0].timestamp : 0,
      pages_visited: new Set(events.map(e => e.page)).size,
      interactions: events.filter(e => e.category === 'interaction').length,
      conversions: events.filter(e => e.category === 'business').length,
      user_type: this.userType || 'anonymous',
      session_id: this.sessionId,
      initialized: this.isInitialized
    };
    
    return summary;
  }

  // Health check method
  isHealthy(): boolean {
    return this.isInitialized && this.events.length >= 0;
  }

  // Reset method for testing
  reset() {
    this.events = [];
    this.userType = null;
    this.sessionId = this.generateSessionId();
    localStorage.removeItem('hawkly_analytics_events');
    localStorage.removeItem('hawkly_user_type');
  }
}

export const analyticsTracker = AnalyticsTracker.getInstance();
