
/**
 * Route preloading utilities
 */
export class RoutePreloader {
  private preloadedRoutes: Set<string> = new Set();

  /**
   * Preload route components based on user behavior
   */
  preloadRoute(routePath: string): Promise<void> {
    if (this.preloadedRoutes.has(routePath)) {
      return Promise.resolve();
    }

    // Route component mapping for preloading
    const routeMap: Record<string, () => Promise<any>> = {
      '/marketplace': () => import('@/pages/Marketplace'),
      '/audits': () => import('@/pages/Audits'),
      '/dashboard': () => import('@/pages/Dashboard'),
      '/request-audit': () => import('@/pages/RequestAudit'),
      '/service-provider-onboarding': () => import('@/pages/ServiceProviderOnboarding'),
    };

    const loader = routeMap[routePath];
    if (!loader) {
      return Promise.resolve();
    }

    this.preloadedRoutes.add(routePath);
    
    return loader()
      .then(() => {
        console.log(`Preloaded route: ${routePath}`);
      })
      .catch((error) => {
        console.warn(`Failed to preload route ${routePath}:`, error);
        this.preloadedRoutes.delete(routePath);
      });
  }

  /**
   * Intelligent route preloading based on current page
   */
  intelligentPreload(currentRoute: string): void {
    const preloadStrategies: Record<string, string[]> = {
      '/': ['/marketplace', '/request-audit'],
      '/marketplace': ['/audits', '/service-provider-onboarding'],
      '/audits': ['/dashboard', '/marketplace'],
      '/dashboard': ['/audits', '/marketplace'],
      '/request-audit': ['/marketplace', '/audits'],
      '/service-provider-onboarding': ['/dashboard', '/marketplace']
    };

    const routesToPreload = preloadStrategies[currentRoute] || [];
    
    // Use requestIdleCallback for non-blocking preloading
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
    
    routesToPreload.forEach((route, index) => {
      idleCallback(() => {
        setTimeout(() => {
          this.preloadRoute(route);
        }, index * 1000); // Stagger preloads
      });
    });
  }

  get preloadedCount(): number {
    return this.preloadedRoutes.size;
  }
}
