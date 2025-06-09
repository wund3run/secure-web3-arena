
import React, { Suspense, useEffect, useState } from 'react';
import { EnhancedErrorBoundary } from '@/components/error-handling/EnhancedErrorBoundary';
import { EnhancedSkeleton } from '@/components/ui/enhanced-skeleton';
import { useAnalytics } from '@/hooks/useAnalytics';

interface OptimizedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  preloadRoutes?: string[];
  title?: string;
  description?: string;
}

const RouteLoadingFallback = () => (
  <div className="min-h-screen p-6 space-y-4">
    <EnhancedSkeleton variant="shimmer" className="h-12 w-64" />
    <EnhancedSkeleton variant="shimmer" className="h-4 w-full" />
    <EnhancedSkeleton variant="shimmer" className="h-4 w-3/4" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <EnhancedSkeleton key={i} variant="card" className="h-48" />
      ))}
    </div>
  </div>
);

export function OptimizedRoute({
  children,
  fallback = <RouteLoadingFallback />,
  errorFallback,
  preloadRoutes = [],
  title,
  description
}: OptimizedRouteProps) {
  const { trackInteraction } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);

  // Track route visibility
  useEffect(() => {
    setIsVisible(true);
    trackInteraction('route_loaded', { 
      title, 
      description,
      timestamp: Date.now()
    });

    return () => setIsVisible(false);
  }, [title, description, trackInteraction]);

  // Preload related routes on idle
  useEffect(() => {
    if (preloadRoutes.length === 0) return;

    const preloadOnIdle = () => {
      preloadRoutes.forEach(route => {
        try {
          // This would be used with dynamic imports in a real router setup
          console.log(`Preloading route: ${route}`);
        } catch (error) {
          console.warn(`Failed to preload route ${route}:`, error);
        }
      });
    };

    if ('requestIdleCallback' in window) {
      const idleCallback = (window as any).requestIdleCallback(preloadOnIdle, { timeout: 2000 });
      return () => (window as any).cancelIdleCallback(idleCallback);
    } else {
      const timeout = setTimeout(preloadOnIdle, 1000);
      return () => clearTimeout(timeout);
    }
  }, [preloadRoutes]);

  // Update document title and meta description
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', description);
        document.head.appendChild(metaDescription);
      }
    }
  }, [title, description]);

  return (
    <EnhancedErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback}>
        <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {children}
        </div>
      </Suspense>
    </EnhancedErrorBoundary>
  );
}
