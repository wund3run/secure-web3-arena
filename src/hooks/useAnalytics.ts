
import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsEvent {
  type: 'page_view' | 'click' | 'scroll' | 'time_on_page' | 'user_interaction';
  data: Record<string, any>;
  timestamp: number;
}

interface PerformanceMetrics {
  pageLoadTime: number;
  timeToInteractive: number;
  firstContentfulPaint: number;
}

export function useAnalytics() {
  const location = useLocation();
  const pageStartTime = useRef<number>(Date.now());
  const events = useRef<AnalyticsEvent[]>([]);

  // Track page views
  useEffect(() => {
    const startTime = Date.now();
    pageStartTime.current = startTime;

    trackEvent('page_view', {
      path: location.pathname,
      search: location.search,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: startTime
    });

    // Track time on page when leaving
    return () => {
      const timeOnPage = Date.now() - startTime;
      trackEvent('time_on_page', {
        path: location.pathname,
        duration: timeOnPage
      });
    };
  }, [location]);

  // Track performance metrics
  useEffect(() => {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const measurePerformance = () => {
        try {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          const paint = performance.getEntriesByType('paint');
          
          const metrics: Partial<PerformanceMetrics> = {
            pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
            timeToInteractive: navigation.domInteractive - navigation.navigationStart
          };

          const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
          if (fcp) {
            metrics.firstContentfulPaint = fcp.startTime;
          }

          trackEvent('page_view', {
            path: location.pathname,
            performance: metrics
          });
        } catch (error) {
          console.warn('Performance tracking failed:', error);
        }
      };

      // Wait for page to load completely
      if (document.readyState === 'complete') {
        measurePerformance();
      } else {
        window.addEventListener('load', measurePerformance);
        return () => window.removeEventListener('load', measurePerformance);
      }
    }
  }, [location]);

  const trackEvent = useCallback((type: AnalyticsEvent['type'], data: Record<string, any>) => {
    const event: AnalyticsEvent = {
      type,
      data,
      timestamp: Date.now()
    };

    events.current.push(event);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event);
    }

    // In production, you would send to your analytics service
    // Example: sendToAnalyticsService(event);
  }, []);

  const trackClick = useCallback((element: string, data?: Record<string, any>) => {
    trackEvent('click', {
      element,
      path: location.pathname,
      ...data
    });
  }, [location.pathname, trackEvent]);

  const trackInteraction = useCallback((interaction: string, data?: Record<string, any>) => {
    trackEvent('user_interaction', {
      interaction,
      path: location.pathname,
      ...data
    });
  }, [location.pathname, trackEvent]);

  const getSessionData = useCallback(() => {
    return {
      events: events.current,
      sessionDuration: Date.now() - pageStartTime.current,
      pageCount: new Set(events.current.filter(e => e.type === 'page_view').map(e => e.data.path)).size
    };
  }, []);

  return {
    trackEvent,
    trackClick,
    trackInteraction,
    getSessionData
  };
}
