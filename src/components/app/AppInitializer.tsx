
import React, { useState, useEffect } from "react";
import AppLoadingState from "@/components/ui/app-loading-state";

interface AppInitializerProps {
  children: React.ReactNode;
}

/**
 * Optimized application initialization that prioritizes rendering speed
 */
export const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    // Track time for performance metrics
    const startTime = performance.now();
    
    // Reduce timeout significantly for faster perceived performance
    const showContent = () => {
      const loadTime = performance.now() - startTime;
      console.debug(`[Perf] App initialization: ${Math.round(loadTime)}ms`);
      setAppLoading(false);
    };
    
    // Show content much faster (100ms is perceived as instant)
    const timer = setTimeout(showContent, 100);
    
    // Use requestIdleCallback for non-critical resource preloading
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
    
    // Preload only the most critical assets without blocking render
    idleCallback(() => {
      // Preconnect to critical domains only
      const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
      ];
      
      preconnectDomains.forEach(domain => {
        if (!document.querySelector(`link[href="${domain}"][rel="preconnect"]`)) {
          const link = document.createElement('link');
          link.rel = 'preconnect';
          link.href = domain;
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        }
      });
    });
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (appLoading) {
    return <AppLoadingState />;
  }

  return <>{children}</>;
};
