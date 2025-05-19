
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
  const [assetsPreloaded, setAssetsPreloaded] = useState(false);

  useEffect(() => {
    // Track time for performance metrics
    const startTime = performance.now();
    
    // Use shorter timeout for faster perceived performance
    const showContent = () => {
      const loadTime = performance.now() - startTime;
      console.debug(`[Perf] App initialization: ${Math.round(loadTime)}ms`);
      setAppLoading(false);
    };
    
    // Show content quickly (300ms is often perceived as "instant")
    const timer = setTimeout(showContent, 300);
    
    // Use requestIdleCallback for non-critical resource preloading
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
    
    // Preload critical assets without blocking render
    idleCallback(() => {
      // Preconnect to domains that will be used
      const preconnectDomains = [window.location.origin];
      
      preconnectDomains.forEach(domain => {
        if (!document.querySelector(`link[href="${domain}"][rel="preconnect"]`)) {
          const link = document.createElement('link');
          link.rel = 'preconnect';
          link.href = domain;
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        }
      });
      
      // Preload important images and scripts in background
      const criticalPaths = [
        { path: '/src/assets/logo.svg', as: 'image' },
        { path: '/vendor.js', as: 'script' }
      ];
      
      Promise.all(criticalPaths.map(resource => {
        return new Promise<void>((resolve) => {
          try {
            const isImage = resource.as === 'image';
            if (isImage) {
              const img = new Image();
              img.onload = () => resolve();
              img.onerror = () => resolve();
              img.src = `${window.location.origin}${resource.path}`;
            } else {
              const preloadLink = document.createElement('link');
              preloadLink.rel = 'preload';
              preloadLink.href = `${window.location.origin}${resource.path}`;
              preloadLink.as = resource.as;
              preloadLink.onload = () => resolve();
              preloadLink.onerror = () => resolve();
              document.head.appendChild(preloadLink);
            }
          } catch (e) {
            resolve();
          }
        });
      }))
      .then(() => {
        setAssetsPreloaded(true);
      })
      .catch(err => {
        console.warn('Asset preloading failed:', err);
        setAssetsPreloaded(true);
      });
    });
    
    return () => {
      clearTimeout(timer);
      // Clean up only the preconnect links we added
      document.querySelectorAll('link[rel="preconnect"][data-auto-added="true"]').forEach(link => {
        document.head.removeChild(link);
      });
    };
  }, []);

  if (appLoading) {
    return <AppLoadingState />;
  }

  return <>{children}</>;
};
