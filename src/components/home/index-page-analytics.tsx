
import { useEffect } from 'react';
import { analyticsTracker } from "@/utils/analytics-tracker";
import { performanceOptimizer } from "@/utils/performance-optimizer";
import { bundleOptimizer } from "@/utils/bundle-optimizer";

export function useIndexPageAnalytics() {
  useEffect(() => {
    // Track page visit and initialize analytics
    analyticsTracker.track('home_page_visit', 'navigation', 'page_view');
    
    // Preload critical resources
    performanceOptimizer.preloadCriticalResources([
      '/src/assets/hawkly-logo.svg'
    ]);
    
    // Optimize images for lazy loading
    performanceOptimizer.optimizeImages();
    
    // Track user engagement
    const handleUserEngagement = () => {
      analyticsTracker.track('user_engagement', 'interaction', 'page_interaction');
    };
    
    // Track scroll engagement
    const handleScroll = () => {
      if (window.scrollY > 100) {
        analyticsTracker.track('scroll_engagement', 'engagement', 'deep_scroll');
        window.removeEventListener('scroll', handleScroll);
      }
    };
    
    document.addEventListener('click', handleUserEngagement, { once: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize intelligent route preloading based on user behavior
    bundleOptimizer.intelligentPreload('/');
    
    return () => {
      document.removeEventListener('click', handleUserEngagement);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
