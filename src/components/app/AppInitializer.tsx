
import React, { useState, useEffect } from "react";
import AppLoadingState from "@/components/ui/app-loading-state";

interface AppInitializerProps {
  children: React.ReactNode;
}

/**
 * Handles application initialization and displays loading state
 */
export const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    // Use requestIdleCallback for non-critical operations when browser is idle
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
    
    // Prioritize rendering the main UI faster
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 500); // Reduced from 1000ms to 500ms for faster perceived performance
    
    // Optimize resource loading with preconnect and preload
    idleCallback(() => {
      // Preconnect to origin for performance
      const preconnectLink = document.createElement('link');
      preconnectLink.rel = 'preconnect';
      preconnectLink.href = window.location.origin;
      document.head.appendChild(preconnectLink);
      
      // Preload critical assets
      const criticalAssets = ['main.css', 'vendor.js'];
      criticalAssets.forEach(asset => {
        if (!document.querySelector(`link[href*="${asset}"]`)) {
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.href = `${window.location.origin}/${asset}`;
          preloadLink.as = asset.endsWith('.css') ? 'style' : 'script';
          document.head.appendChild(preloadLink);
        }
      });
    });
    
    return () => {
      clearTimeout(timer);
      // Clean up preconnect links when component unmounts
      document.querySelectorAll('link[rel="preconnect"]').forEach(link => {
        document.head.removeChild(link);
      });
    };
  }, []);

  if (appLoading) {
    return <AppLoadingState />;
  }

  return <>{children}</>;
};
