
import { useCallback, useEffect } from 'react';
import { performanceMonitor } from '@/utils/testing/performance-monitor';

export function usePerformanceMonitoring() {
  const markPerformance = useCallback((name: string, metadata?: Record<string, unknown>) => {
    const mark = performance.mark(name);
    
    if (metadata) {
      performanceMonitor.recordPerformanceData({
        name,
        value: mark.startTime,
        category: 'user_interaction',
        metadata
      });
    }
  }, []);

  const measurePerformance = useCallback((name: string, startMark: string, endMark?: string) => {
    try {
      const measure = performance.measure(name, startMark, endMark);
      performanceMonitor.recordPerformanceData({
        name,
        value: measure.duration,
        category: 'timing',
        metadata: {
          startTime: measure.startTime,
          duration: measure.duration
        }
      });
      return measure;
    } catch (error: unknown) {
      console.warn('Performance measurement failed:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    // Mark initial page load
    markPerformance('page-load-start');
    
    return () => {
      markPerformance('page-unload');
    };
  }, [markPerformance]);

  return {
    markPerformance,
    measurePerformance
  };
}
