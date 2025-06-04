
/**
 * Route preloading and code splitting utilities
 */
export class RoutePreloader {
  private preloadedRoutes = new Set<string>();
  private userBehaviorData = new Map<string, number>();

  /**
   * Intelligent route preloading based on user behavior
   */
  intelligentPreload(currentRoute: string): void {
    const likelyNextRoutes = this.predictNextRoutes(currentRoute);
    
    likelyNextRoutes.forEach(route => {
      if (!this.preloadedRoutes.has(route)) {
        this.preloadRoute(route);
      }
    });
  }

  /**
   * Preload a specific route chunk
   */
  private preloadRoute(route: string): void {
    const routeChunks = this.getRouteChunks(route);
    
    routeChunks.forEach(chunk => {
      const link = document.createElement('link');
      link.rel = 'modulepreload';
      link.href = chunk;
      document.head.appendChild(link);
    });
    
    this.preloadedRoutes.add(route);
    console.log(`Preloaded route: ${route}`);
  }

  /**
   * Get chunks for a specific route
   */
  private getRouteChunks(route: string): string[] {
    const chunkMap: Record<string, string[]> = {
      '/audits': ['/assets/audits-chunk.js'],
      '/marketplace': ['/assets/marketplace-chunk.js'],
      '/dashboard': ['/assets/dashboard-chunk.js'],
      '/admin': ['/assets/admin-chunk.js'],
      '/auth': ['/assets/auth-chunk.js']
    };
    
    return chunkMap[route] || [];
  }

  /**
   * Predict next routes based on current route and user behavior
   */
  private predictNextRoutes(currentRoute: string): string[] {
    const predictions: Record<string, string[]> = {
      '/': ['/marketplace', '/audits', '/auth'],
      '/marketplace': ['/audits', '/dashboard'],
      '/audits': ['/dashboard', '/marketplace'],
      '/dashboard': ['/audits', '/marketplace'],
      '/auth': ['/dashboard', '/marketplace']
    };
    
    return predictions[currentRoute] || [];
  }

  /**
   * Track user navigation patterns
   */
  trackNavigation(from: string, to: string): void {
    const transitionKey = `${from}->${to}`;
    const currentCount = this.userBehaviorData.get(transitionKey) || 0;
    this.userBehaviorData.set(transitionKey, currentCount + 1);
  }

  get preloadedCount(): number {
    return this.preloadedRoutes.size;
  }
}
