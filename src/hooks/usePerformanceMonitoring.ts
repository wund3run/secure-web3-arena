
import { useEffect } from 'react';

interface PerformanceMetrics {
  navigationTiming: PerformanceTiming;
  resourceTiming: PerformanceResourceTiming[];
  userTiming: PerformanceMeasure[];
}

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Monitor page load performance
    const measurePageLoad = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        
        const metrics = {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
          firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
          ttfb: navigation.responseStart - navigation.requestStart
        };

        console.log('Performance Metrics:', metrics);
        
        // Log slow performance
        if (metrics.loadComplete > 3000) {
          console.warn('Slow page load detected:', metrics.loadComplete + 'ms');
        }
      }
    };

    // Measure performance after page load
    if (document.readyState === 'complete') {
      measurePageLoad();
    } else {
      window.addEventListener('load', measurePageLoad);
    }

    // Monitor memory usage
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const memoryUsage = {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit
        };
        
        console.log('Memory Usage:', memoryUsage);
        
        // Warn about high memory usage
        if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.9) {
          console.warn('High memory usage detected');
        }
      }
    };

    const memoryInterval = setInterval(monitorMemory, 30000); // Check every 30 seconds

    return () => {
      window.removeEventListener('load', measurePageLoad);
      clearInterval(memoryInterval);
    };
  }, []);

  // Function to mark custom performance metrics
  const markPerformance = (name: string) => {
    if ('performance' in window && performance.mark) {
      performance.mark(name);
    }
  };

  const measurePerformance = (name: string, startMark: string, endMark: string) => {
    if ('performance' in window && performance.measure) {
      try {
        performance.measure(name, startMark, endMark);
        const measure = performance.getEntriesByName(name, 'measure')[0];
        console.log(`${name}: ${measure.duration}ms`);
        return measure.duration;
      } catch (error) {
        console.warn('Performance measurement failed:', error);
      }
    }
    return 0;
  };

  return { markPerformance, measurePerformance };
};
