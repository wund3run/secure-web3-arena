import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PreloadConfig {
  component: () => Promise<unknown>;
  priority: 'high' | 'medium' | 'low';
  condition?: () => boolean;
}

interface IntelligentPreloaderProps {
  preloadMap: Record<string, PreloadConfig[]>;
  children: React.ReactNode;
}

export function IntelligentPreloader({ preloadMap, children }: IntelligentPreloaderProps) {
  const location = useLocation();
  const [preloadedRoutes, setPreloadedRoutes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const currentPath = location.pathname;
    const preloadConfigs = preloadMap[currentPath] || [];

    // Preload high priority components immediately
    const highPriorityConfigs = preloadConfigs.filter(config => 
      config.priority === 'high' && (!config.condition || config.condition())
    );

    highPriorityConfigs.forEach(config => {
      if (!preloadedRoutes.has(currentPath)) {
        config.component().catch(err => {
          console.warn('Failed to preload high priority component:', err);
        });
      }
    });

    // Preload medium priority components after a short delay
    const mediumTimer = setTimeout(() => {
      const mediumPriorityConfigs = preloadConfigs.filter(config => 
        config.priority === 'medium' && (!config.condition || config.condition())
      );

      mediumPriorityConfigs.forEach(config => {
        config.component().catch(err => {
          console.warn('Failed to preload medium priority component:', err);
        });
      });
    }, 100);

    // Preload low priority components when browser is idle
    const lowTimer = setTimeout(() => {
      const lowPriorityConfigs = preloadConfigs.filter(config => 
        config.priority === 'low' && (!config.condition || config.condition())
      );

      if ('requestIdleCallback' in window) {
        ((window as unknown as { requestIdleCallback?: typeof window.requestIdleCallback }).requestIdleCallback)?.(() => {
          lowPriorityConfigs.forEach(config => {
            config.component().catch(err => {
              console.warn('Failed to preload low priority component:', err);
            });
          });
        });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
          lowPriorityConfigs.forEach(config => {
            config.component().catch(err => {
              console.warn('Failed to preload low priority component:', err);
            });
          });
        }, 2000);
      }
    }, 500);

    setPreloadedRoutes(prev => new Set([...prev, currentPath]));

    return () => {
      clearTimeout(mediumTimer);
      clearTimeout(lowTimer);
    };
  }, [location.pathname, preloadMap, preloadedRoutes]);

  return <>{children}</>;
}
