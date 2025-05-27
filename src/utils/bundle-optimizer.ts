
import { RoutePreloader } from './optimization/route-preloader';
import { ResourceCache } from './optimization/resource-cache';
import { ImageOptimizer } from './optimization/image-optimizer';
import { UsageAnalyzer } from './optimization/usage-analyzer';
import { CDNManager } from './optimization/cdn-manager';

/**
 * Bundle optimization utilities for Phase 4 performance improvements
 */
class BundleOptimizer {
  private static instance: BundleOptimizer;
  private loadedChunks: Set<string> = new Set();
  
  private routePreloader: RoutePreloader;
  private resourceCache: ResourceCache;
  private imageOptimizer: ImageOptimizer;
  private usageAnalyzer: UsageAnalyzer;
  private cdnManager: CDNManager;

  constructor() {
    this.routePreloader = new RoutePreloader();
    this.resourceCache = new ResourceCache();
    this.imageOptimizer = new ImageOptimizer();
    this.usageAnalyzer = new UsageAnalyzer();
    this.cdnManager = new CDNManager();
  }

  static getInstance(): BundleOptimizer {
    if (!BundleOptimizer.instance) {
      BundleOptimizer.instance = new BundleOptimizer();
    }
    return BundleOptimizer.instance;
  }

  /**
   * Preload route components based on user behavior
   */
  preloadRoute(routePath: string): Promise<void> {
    return this.routePreloader.preloadRoute(routePath);
  }

  /**
   * Intelligent route preloading based on current page
   */
  intelligentPreload(currentRoute: string): void {
    this.routePreloader.intelligentPreload(currentRoute);
  }

  /**
   * Cache critical resources for faster loading
   */
  cacheCriticalResources(): void {
    this.resourceCache.cacheCriticalResources();
  }

  /**
   * Optimize images with lazy loading and format selection
   */
  optimizeImages(): void {
    this.imageOptimizer.optimizeImages();
  }

  /**
   * Implement tree shaking for unused code
   */
  analyzeUsage(): void {
    this.usageAnalyzer.analyzeUsage();
  }

  /**
   * Prepare for CDN integration
   */
  prepareCDNAssets(): void {
    this.cdnManager.prepareCDNAssets();
  }

  /**
   * Initialize all optimization strategies
   */
  init(): void {
    console.log('Initializing Bundle Optimizer...');
    
    // Cache critical resources
    this.cacheCriticalResources();
    
    // Optimize images
    this.optimizeImages();
    
    // Prepare CDN integration
    this.prepareCDNAssets();
    
    // Analyze usage in development
    this.analyzeUsage();
    
    console.log('Bundle Optimizer initialized successfully');
  }

  /**
   * Get optimization statistics
   */
  getStats(): {
    preloadedRoutes: number;
    cachedResources: number;
    loadedChunks: number;
  } {
    return {
      preloadedRoutes: this.routePreloader.preloadedCount,
      cachedResources: this.resourceCache.cachedCount,
      loadedChunks: this.loadedChunks.size
    };
  }
}

export const bundleOptimizer = BundleOptimizer.getInstance();
