
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PreloadRoute {
  path: string;
  component: () => Promise<any>;
}

const routePreloadMap: Record<string, PreloadRoute[]> = {
  '/': [
    { path: '/marketplace', component: () => import('@/pages/Marketplace') },
    { path: '/request-audit', component: () => import('@/pages/RequestAudit') }
  ],
  '/marketplace': [
    { path: '/request-audit', component: () => import('@/pages/RequestAudit') },
    { path: '/security-audits', component: () => import('@/pages/services/SecurityAudits') }
  ],
  '/dashboard': [
    { path: '/audits', component: () => import('@/pages/Audits') },
    { path: '/profile', component: () => import('@/pages/Profile') }
  ]
};

export const useRoutePreloader = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const routesToPreload = routePreloadMap[currentPath];

    if (routesToPreload && routesToPreload.length > 0) {
      // Preload routes after a short delay to not block current page rendering
      const timeoutId = setTimeout(() => {
        routesToPreload.forEach(route => {
          route.component().catch(() => {
            // Silently fail - preloading is not critical
          });
        });
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname]);
};
