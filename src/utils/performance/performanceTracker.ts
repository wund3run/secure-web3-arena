import { bundleAnalyzer } from './bundleAnalyzer';
import { queryOptimizer } from '../database/queryOptimizer';
import { cacheStrategies } from './cacheStrategies';
import { advancedImageOptimizer } from './imageOptimizer';

/**
 * Comprehensive performance tracking and optimization manager
 */
export class PerformanceTracker {
  private static instance: PerformanceTracker;
  private initialized = false;
  
  static getInstance(): PerformanceTracker {
    if (!PerformanceTracker.instance) {
      PerformanceTracker.instance = new PerformanceTracker();
    }
    return PerformanceTracker.instance;
  }

  /**
   * Initialize all performance optimization systems
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    console.log('🚀 Initializing Performance Optimization Systems...');

    try {
      // Initialize all optimization systems
      bundleAnalyzer.trackBundleMetrics();
      advancedImageOptimizer.initialize();
      
      // Warm critical caches
      await cacheStrategies.warmCriticalCaches();

      // Setup performance monitoring
      this.setupPerformanceObserver();
      this.setupWebVitalsTracking();

      this.initialized = true;
      console.log('✅ Performance optimization systems initialized');
    } catch (error) {
      console.error('❌ Failed to initialize performance systems:', error);
    }
  }

  /**
   * Setup performance observer for detailed metrics
   */
  private setupPerformanceObserver(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.processPerformanceEntry(entry);
        }
      });

      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'first-input'] });
    } catch (error) {
      console.warn('Performance observer setup failed:', error);
    }
  }

  /**
   * Setup Web Vitals tracking
   */
  private setupWebVitalsTracking(): void {
    // Core Web Vitals tracking
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS((metric) => this.recordWebVital('CLS', metric.value));
      onINP((metric) => this.recordWebVital('INP', metric.value));
      onFCP((metric) => this.recordWebVital('FCP', metric.value));
      onLCP((metric) => this.recordWebVital('LCP', metric.value));
      onTTFB((metric) => this.recordWebVital('TTFB', metric.value));
    }).catch(() => {
      // Silently handle if web-vitals is not available
    });
  }

  /**
   * Process performance entries
   */
  private processPerformanceEntry(entry: PerformanceEntry): void {
    switch (entry.entryType) {
      case 'navigation':
        this.processNavigationTiming(entry as PerformanceNavigationTiming);
        break;
      case 'paint':
        this.processPaintTiming(entry);
        break;
      case 'largest-contentful-paint':
        this.recordWebVital('LCP', entry.startTime);
        break;
      case 'first-input':
        this.recordWebVital('FID', (entry as any).processingStart - entry.startTime);
        break;
    }
  }

  /**
   * Process navigation timing
   */
  private processNavigationTiming(entry: PerformanceNavigationTiming): void {
    const metrics = {
      dns: entry.domainLookupEnd - entry.domainLookupStart,
      tcp: entry.connectEnd - entry.connectStart,
      ssl: entry.secureConnectionStart > 0 ? entry.connectEnd - entry.secureConnectionStart : 0,
      ttfb: entry.responseStart - entry.fetchStart,
      download: entry.responseEnd - entry.responseStart,
      domParse: entry.domContentLoadedEventStart - entry.responseEnd,
      domReady: entry.domContentLoadedEventEnd - entry.fetchStart,
      load: entry.loadEventEnd - entry.fetchStart
    };

    Object.entries(metrics).forEach(([name, value]) => {
      this.recordMetric(`navigation.${name}`, value);
    });
  }

  /**
   * Process paint timing
   */
  private processPaintTiming(entry: PerformanceEntry): void {
    this.recordMetric(`paint.${entry.name.replace('-', '_')}`, entry.startTime);
  }

  /**
   * Record Web Vital metric
   */
  private recordWebVital(name: string, value: number): void {
    this.recordMetric(`webvital.${name.toLowerCase()}`, value);
    
    // Log significant performance issues
    const thresholds = {
      CLS: 0.1,
      INP: 200,
      FCP: 1800,
      LCP: 2500,
      TTFB: 600
    };

    const threshold = thresholds[name as keyof typeof thresholds];
    if (threshold && value > threshold) {
      console.warn(`⚠️ Poor ${name} performance: ${value.toFixed(2)} (threshold: ${threshold})`);
    }
  }

  /**
   * Record general performance metric
   */
  private recordMetric(name: string, value: number): void {
    // Store in performance registry
    const metrics = this.getStoredMetrics();
    if (!metrics[name]) {
      metrics[name] = [];
    }
    
    metrics[name].push({
      value,
      timestamp: Date.now()
    });

    // Keep only last 100 measurements per metric
    if (metrics[name].length > 100) {
      metrics[name] = metrics[name].slice(-100);
    }

    localStorage.setItem('hawkly_performance_metrics', JSON.stringify(metrics));
  }

  /**
   * Get stored performance metrics
   */
  private getStoredMetrics(): Record<string, Array<{ value: number; timestamp: number }>> {
    try {
      const stored = localStorage.getItem('hawkly_performance_metrics');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  /**
   * Generate comprehensive performance report
   */
  generateReport(): {
    webVitals: Record<string, { current: number; average: number; good: boolean }>;
    bundleAnalysis: any;
    queryOptimization: any;
    imageOptimization: any;
    recommendations: string[];
    score: number;
  } {
    const metrics = this.getStoredMetrics();
    const bundleAnalysis = bundleAnalyzer.generateReport();
    const queryOptimization = queryOptimizer.generateOptimizationReport();
    const imageOptimization = advancedImageOptimizer.generateReport();

    // Process Web Vitals
    const webVitals: Record<string, { current: number; average: number; good: boolean }> = {};
    const vitalThresholds = {
      cls: 0.1,
      inp: 200,
      fcp: 1800,
      lcp: 2500,
      ttfb: 600
    };

    Object.entries(vitalThresholds).forEach(([vital, threshold]) => {
      const metricKey = `webvital.${vital}`;
      const values = metrics[metricKey] || [];
      
      if (values.length > 0) {
        const current = values[values.length - 1].value;
        const average = values.reduce((sum, m) => sum + m.value, 0) / values.length;
        
        webVitals[vital.toUpperCase()] = {
          current,
          average,
          good: current <= threshold
        };
      }
    });

    // Generate recommendations
    const recommendations: string[] = [
      ...bundleAnalysis.recommendations,
      ...queryOptimization.recommendations,
      ...imageOptimization.recommendations
    ];

    // Calculate overall performance score
    const score = this.calculatePerformanceScore(webVitals, bundleAnalysis, queryOptimization, imageOptimization);

    return {
      webVitals,
      bundleAnalysis,
      queryOptimization,
      imageOptimization,
      recommendations,
      score
    };
  }

  /**
   * Calculate overall performance score
   */
  private calculatePerformanceScore(
    webVitals: any,
    bundleAnalysis: any,
    queryOptimization: any,
    imageOptimization: any
  ): number {
    let score = 100;

    // Deduct points for poor Web Vitals
    Object.values(webVitals).forEach((vital: any) => {
      if (!vital.good) score -= 10;
    });

    // Deduct points for slow bundles
    if (bundleAnalysis.averageLoadTime > 1000) score -= 15;

    // Deduct points for poor cache performance
    if (queryOptimization.cacheHitRate < 0.7) score -= 10;

    // Deduct points for image optimization issues
    if (imageOptimization.failureRate > 0.1) score -= 5;

    return Math.max(0, score);
  }

  /**
   * Clear all performance data
   */
  clearMetrics(): void {
    localStorage.removeItem('hawkly_performance_metrics');
  }
}

export const performanceTracker = PerformanceTracker.getInstance();
