
import { RoutePreloader } from './optimization/route-preloader';
import { CDNManager } from './optimization/cdn-manager';
import { ResourceCache } from './optimization/resource-cache';
import { ImageOptimizer } from './optimization/image-optimizer';

class BundleOptimizer {
  private static instance: BundleOptimizer;
  private routePreloader: RoutePreloader;
  private cdnManager: CDNManager;
  private resourceCache: ResourceCache;
  private imageOptimizer: ImageOptimizer;

  constructor() {
    this.routePreloader = new RoutePreloader();
    this.cdnManager = new CDNManager();
    this.resourceCache = new ResourceCache();
    this.imageOptimizer = new ImageOptimizer();
  }

  static getInstance(): BundleOptimizer {
    if (!BundleOptimizer.instance) {
      BundleOptimizer.instance = new BundleOptimizer();
    }
    return BundleOptimizer.instance;
  }

  /**
   * Initialize all optimization strategies
   */
  init(): void {
    // Prepare CDN assets
    this.cdnManager.prepareCDNAssets();
    
    // Cache critical resources
    this.resourceCache.cacheCriticalResources();
    
    // Optimize images
    this.imageOptimizer.optimizeImages();
  }

  /**
   * Intelligent route preloading based on user behavior
   */
  intelligentPreload(currentRoute: string): void {
    this.routePreloader.intelligentPreload(currentRoute);
  }

  /**
   * Get optimization status
   */
  getStatus() {
    return {
      routesPreloaded: this.routePreloader.preloadedCount,
      resourcesCached: this.resourceCache.cachedCount,
      optimizationsActive: true
    };
  }
}

export const bundleOptimizer = BundleOptimizer.getInstance();
