
import { bundleOptimizer } from '@/utils/bundle-optimizer';
import { performanceMonitor } from '@/utils/performance/performance-monitor';

export class BundleAnalyzer {
  private static instance: BundleAnalyzer;
  
  static getInstance(): BundleAnalyzer {
    if (!BundleAnalyzer.instance) {
      BundleAnalyzer.instance = new BundleAnalyzer();
    }
    return BundleAnalyzer.instance;
  }

  /**
   * AI-identified split points for code splitting
   */
  getOptimalSplitPoints(): string[] {
    return [
      // Admin routes - heavy components that most users won't access
      '/admin',
      '/admin/dashboard',
      '/admin/users',
      '/admin/settings',
      
      // Marketplace features - can be loaded on demand
      '/marketplace/comparison',
      '/marketplace/advanced-filters',
      
      // Audit management - specialized functionality
      '/audits/create',
      '/audits/progress',
      '/audits/reports',
      
      // Profile and settings - user-specific features
      '/profile/settings',
      '/profile/security',
      
      // Advanced features
      '/escrow',
      '/analytics',
      '/compliance'
    ];
  }

  /**
   * Track bundle sizes and performance metrics
   */
  trackBundleMetrics(): void {
    if (typeof window === 'undefined') return;

    // Track initial bundle load time
    const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navigationEntries.length > 0) {
      const navigation = navigationEntries[0];
      
      performanceMonitor.recordPerformanceData({
        name: 'initial-bundle-load',
        value: navigation.loadEventEnd - navigation.fetchStart,
        category: 'bundle',
        metadata: {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
          firstByte: navigation.responseStart - navigation.fetchStart
        }
      });
    }

    // Monitor chunk loading
    this.monitorChunkLoading();
  }

  private monitorChunkLoading(): void {
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const url = args[0] as string;
      
      try {
        const response = await originalFetch.apply(window, args);
        
        // Track chunk loading times for JS/CSS files
        if (typeof url === 'string' && (url.includes('.js') || url.includes('.css'))) {
          const loadTime = performance.now() - startTime;
          
          performanceMonitor.recordPerformanceData({
            name: 'chunk-load-time',
            value: loadTime,
            category: 'bundle',
            metadata: {
              url,
              size: response.headers.get('content-length'),
              cached: response.headers.get('cf-cache-status') === 'HIT'
            }
          });
        }
        
        return response;
      } catch (error) {
        performanceMonitor.recordPerformanceData({
          name: 'chunk-load-error',
          value: performance.now() - startTime,
          category: 'bundle',
          metadata: { url, error: error instanceof Error ? error.message : 'Unknown error' }
        });
        throw error;
      }
    };
  }

  /**
   * Generate bundle analysis report
   */
  generateReport(): {
    totalBundles: number;
    averageLoadTime: number;
    largestChunks: Array<{ name: string; size: number; loadTime: number }>;
    recommendations: string[];
  } {
    const metrics = performanceMonitor.getMetrics();
    const bundleMetrics = Object.entries(metrics).filter(([key]) => 
      key.includes('bundle') || key.includes('chunk')
    );

    const recommendations: string[] = [];
    
    // Analyze and provide recommendations
    bundleMetrics.forEach(([name, data]) => {
      if (data.avg > 1000) { // Over 1 second
        recommendations.push(`${name} is loading slowly (${Math.round(data.avg)}ms). Consider code splitting or lazy loading.`);
      }
    });

    return {
      totalBundles: bundleMetrics.length,
      averageLoadTime: bundleMetrics.reduce((sum, [, data]) => sum + data.avg, 0) / bundleMetrics.length,
      largestChunks: bundleMetrics
        .map(([name, data]) => ({ name, size: 0, loadTime: data.avg }))
        .sort((a, b) => b.loadTime - a.loadTime)
        .slice(0, 5),
      recommendations
    };
  }
}

export const bundleAnalyzer = BundleAnalyzer.getInstance();
