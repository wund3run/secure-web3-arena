import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteCacheProps {
  children: React.ReactNode;
}

// Simple route caching for better performance
const routeCache = new Map<string, {
  timestamp: number;
  data: Record<string, unknown>;
}>();

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const RouteCache: React.FC<RouteCacheProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Cache current route
    const currentPath = location.pathname;
    routeCache.set(currentPath, {
      timestamp: Date.now(),
      data: { pathname: currentPath, search: location.search }
    });

    // Clean up old cache entries
    const now = Date.now();
    for (const [path, entry] of routeCache.entries()) {
      if (now - entry.timestamp > CACHE_DURATION) {
        routeCache.delete(path);
      }
    }
  }, [location]);

  return <>{children}</>;
};

export const getCachedRoute = (path: string) => {
  const cached = routeCache.get(path);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};
