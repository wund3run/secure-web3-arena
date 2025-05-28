
import React, { useState, useEffect } from "react";
import AppLoadingState from "@/components/ui/app-loading-state";

interface AppInitializerProps {
  children: React.ReactNode;
}

/**
 * Optimized application initialization with faster loading
 */
export const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    // Much faster initialization - only show loading for critical operations
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 100); // Reduced from 300ms to 100ms
    
    // Preload critical assets in background without blocking
    requestIdleCallback(() => {
      const criticalPaths = ['/src/assets/hawkly-logo.svg'];
      
      criticalPaths.forEach(path => {
        const img = new Image();
        img.src = `${window.location.origin}${path}`;
      });
    });
    
    return () => clearTimeout(timer);
  }, []);

  // Only show loading for the minimal time needed
  if (appLoading) {
    return <AppLoadingState />;
  }

  return <>{children}</>;
};
