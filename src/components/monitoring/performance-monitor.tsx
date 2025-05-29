
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PerformanceMetrics {
  page_load_time: number;
  first_contentful_paint: number;
  largest_contentful_paint: number;
  cumulative_layout_shift: number;
  first_input_delay: number;
  route: string;
  user_agent: string;
  timestamp: string;
}

export function PerformanceMonitor() {
  useEffect(() => {
    const collectMetrics = () => {
      try {
        // Get Core Web Vitals
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming;
              const metrics: Partial<PerformanceMetrics> = {
                page_load_time: navEntry.loadEventEnd - navEntry.navigationStart,
                route: window.location.pathname,
                user_agent: navigator.userAgent,
                timestamp: new Date().toISOString()
              };

              // Log performance metrics (in production, send to analytics)
              console.log('Performance Metrics:', metrics);
              
              // In production, you would send this to your analytics service
              // logMetricsToAnalytics(metrics);
            }
          }
        });

        observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });

        // Clean up observer after 10 seconds
        setTimeout(() => observer.disconnect(), 10000);
      } catch (error) {
        console.warn('Performance monitoring not available:', error);
      }
    };

    // Collect metrics after page load
    if (document.readyState === 'complete') {
      collectMetrics();
    } else {
      window.addEventListener('load', collectMetrics);
    }

    return () => {
      window.removeEventListener('load', collectMetrics);
    };
  }, []);

  return null; // This is a monitoring component with no UI
}

// Function to log metrics to analytics service (implement based on your needs)
async function logMetricsToAnalytics(metrics: Partial<PerformanceMetrics>) {
  try {
    // Example: Send to Supabase for analytics (optional)
    const { error } = await supabase
      .from('platform_analytics')
      .insert({
        metric_name: 'page_performance',
        metric_value: metrics.page_load_time,
        metadata: metrics
      });

    if (error) {
      console.warn('Failed to log performance metrics:', error);
    }
  } catch (error) {
    console.warn('Analytics logging failed:', error);
  }
}
