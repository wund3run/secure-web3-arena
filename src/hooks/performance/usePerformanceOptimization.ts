
import { useEffect } from 'react';
import { performanceTracker } from '@/utils/performance/performanceTracker';
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';

export function usePerformanceOptimization() {
  const { markPerformance, measurePerformance } = usePerformanceMonitoring();

  useEffect(() => {
    // Initialize performance tracking on app start
    performanceTracker.initialize().catch(console.error);
    
    // Mark app initialization
    markPerformance('app-initialization-start');
    
    return () => {
      markPerformance('app-cleanup');
    };
  }, [markPerformance]);

  const trackRouteChange = (routeName: string) => {
    markPerformance(`route-change-${routeName}`);
  };

  const trackComponentRender = (componentName: string) => {
    markPerformance(`component-render-${componentName}`);
  };

  const trackUserInteraction = (interaction: string) => {
    markPerformance(`user-interaction-${interaction}`);
  };

  const generatePerformanceReport = () => {
    return performanceTracker.generateReport();
  };

  const optimizeCurrentRoute = (routePath: string) => {
    // Trigger route-specific optimizations
    import('@/utils/bundle-optimizer').then(({ bundleOptimizer }) => {
      bundleOptimizer.intelligentPreload(routePath);
    }).catch(console.error);
  };

  return {
    trackRouteChange,
    trackComponentRender,
    trackUserInteraction,
    generatePerformanceReport,
    optimizeCurrentRoute,
    markPerformance,
    measurePerformance
  };
}
