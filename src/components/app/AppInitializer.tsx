
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
    // Simulate app initialization
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 1000);

    // Preconnect to origin for performance
    const preconnectLink = document.createElement('link');
    preconnectLink.rel = 'preconnect';
    preconnectLink.href = window.location.origin;
    document.head.appendChild(preconnectLink);
    
    return () => {
      clearTimeout(timer);
      if (document.head.contains(preconnectLink)) {
        document.head.removeChild(preconnectLink);
      }
    };
  }, []);

  if (appLoading) {
    return <AppLoadingState />;
  }

  return <>{children}</>;
};
