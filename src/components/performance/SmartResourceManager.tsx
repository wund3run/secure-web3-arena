import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface ResourceConfig {
  priority: 'high' | 'medium' | 'low';
  preload?: boolean;
  lazy?: boolean;
  critical?: boolean;
}

interface SmartResourceManagerProps {
  children: React.ReactNode;
}

export function SmartResourceManager({ children }: SmartResourceManagerProps) {
  const location = useLocation();
  const [loadedResources, setLoadedResources] = useState<Set<string>>(new Set());

  useEffect(() => {
    const optimizeResources = async () => {
      // Critical resources for immediate loading
      const criticalResources = getCriticalResources(location.pathname);
      await preloadCriticalResources(criticalResources);

      // Prefetch resources for likely next routes
      const nextRoutes = predictNextRoutes(location.pathname);
      prefetchRouteResources(nextRoutes);

      // Optimize images with intersection observer
      optimizeImageLoading();
      
      // Cleanup unused resources
      cleanupUnusedResources();
    };

    optimizeResources();
  }, [location.pathname]);

  return <>{children}</>;
}

function getCriticalResources(pathname: string): string[] {
  const resourceMap: Record<string, string[]> = {
    '/': [
      '/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png',
      '/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png'
    ],
    '/marketplace': [
      '/assets/marketplace-icons.svg'
    ],
    '/dashboard': [
      '/assets/dashboard-charts.js'
    ]
  };

  return resourceMap[pathname] || [];
}

async function preloadCriticalResources(resources: string[]) {
  const promises = resources.map(resource => {
    return new Promise((resolve, reject) => {
      if (resource.endsWith('.js')) {
        const link = document.createElement('link');
        link.rel = 'modulepreload';
        link.href = resource;
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
      } else if (resource.match(/\.(png|jpg|jpeg|webp|svg)$/)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = resource;
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
      } else {
        resolve(undefined);
      }
    });
  });

  try {
    await Promise.allSettled(promises);
    console.log('✅ Critical resources preloaded');
  } catch (error) {
    console.warn('⚠️ Some critical resources failed to preload:', error);
  }
}

function predictNextRoutes(currentPath: string): string[] {
  const routePredictions: Record<string, string[]> = {
    '/': ['/marketplace', '/request-audit', '/auth'],
    '/marketplace': ['/request-audit', '/security-audits', '/dashboard'],
    '/auth': ['/dashboard', '/marketplace'],
    '/dashboard': ['/audits', '/profile', '/marketplace']
  };

  return routePredictions[currentPath] || [];
}

function prefetchRouteResources(routes: string[]) {
  if ('requestIdleCallback' in window) {
    ((window as unknown as { requestIdleCallback?: typeof window.requestIdleCallback }).requestIdleCallback)?.(() => {
      routes.forEach(route => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        document.head.appendChild(link);
      });
    });
  }
}

function optimizeImageLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

function cleanupUnusedResources() {
  // Remove unused preload links after 30 seconds
  setTimeout(() => {
    const preloadLinks = document.querySelectorAll('link[rel="preload"], link[rel="prefetch"]');
    preloadLinks.forEach(link => {
      if (!document.body.contains(link)) {
        link.remove();
      }
    });
  }, 30000);
}
