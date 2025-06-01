
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

    // Route component mapping for preloading - only include existing pages
    const routeMap: Record<string, () => Promise<any>> = {
      '/dashboard': () => import('@/pages/Dashboard'),
      '/audits': () => import('@/pages/Audits'),
      '/marketplace': () => import('@/pages/Marketplace'),
      '/request-audit': () => import('@/pages/RequestAudit'),
      '/auth': () => import('@/pages/Auth'),
    };

    const preloadFunction = routeMap[routePath];
    if (preloadFunction) {
      this.preloadedRoutes.add(routePath);
      return preloadFunction().catch(err => {
        console.warn(`Failed to preload route ${routePath}:`, err);
        this.preloadedRoutes.delete(routePath);
      });
    }

    return Promise.resolve();
  }

  /**
   * Intelligent route preloading based on current page
   */
  intelligentPreload(currentRoute: string): void {
    const preloadStrategies: Record<string, string[]> = {
      '/': ['/marketplace', '/request-audit'],
      '/marketplace': ['/audits', '/dashboard'],
      '/audits': ['/dashboard', '/marketplace'],
      '/dashboard': ['/audits', '/marketplace'],
      '/request-audit': ['/marketplace', '/audits'],
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

  /**
   * Preload routes based on user hover/focus behavior
   */
  setupLinkPreloading(): void {
    document.addEventListener('mouseover', this.handleLinkHover.bind(this));
    document.addEventListener('focusin', this.handleLinkFocus.bind(this));
  }

  private handleLinkHover(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const link = target.closest('a[href]') as HTMLAnchorElement;
    
    if (link && link.href && this.isInternalLink(link.href)) {
      const path = new URL(link.href).pathname;
      this.preloadRoute(path);
    }
  }

  private handleLinkFocus(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    
    if (target.tagName === 'A') {
      const link = target as HTMLAnchorElement;
      if (link.href && this.isInternalLink(link.href)) {
        const path = new URL(link.href).pathname;
        this.preloadRoute(path);
      }
    }
  }

  private isInternalLink(href: string): boolean {
    try {
      const url = new URL(href);
      return url.origin === window.location.origin;
    } catch {
      return false;
    }
  }

  /**
   * Get count of preloaded routes
   */
  get preloadedCount(): number {
    return this.preloadedRoutes.size;
  }

  cleanup(): void {
    document.removeEventListener('mouseover', this.handleLinkHover);
    document.removeEventListener('focusin', this.handleLinkFocus);
  }
}
