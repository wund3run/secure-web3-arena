
import React from 'react';
import { useRoutePreloader } from '@/hooks/useRoutePreloader';
import { RouteCache } from '@/components/performance/RouteCache';

interface NavigationOptimizerProps {
  children: React.ReactNode;
}

export const NavigationOptimizer: React.FC<NavigationOptimizerProps> = ({ children }) => {
  // Initialize route preloading
  useRoutePreloader();

  return (
    <RouteCache>
      {children}
    </RouteCache>
  );
};
