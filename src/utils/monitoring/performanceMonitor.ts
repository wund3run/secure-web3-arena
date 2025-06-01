import { Logger } from '../logging/logger';

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  category: 'memory' | 'timing' | 'network' | 'user_interaction';
  metadata?: Record<string, any>;
}

export class PerformanceMonitor {
  private static metrics: PerformanceMetric[] = [];
  private static readonly MAX_METRICS = 1000;
  private static observers: PerformanceObserver[] = [];

  static init(): void {
    // Monitor navigation timing
    this.setupNavigationObserver();
    
    // Monitor resource loading
    this.setupResourceObserver();
    
    // Monitor long tasks
    this.setupLongTaskObserver();
    
    // Monitor memory usage
    this.setupMemoryMonitoring();
    
    // Start periodic metric collection
    this.startPeriodicCollection();

    Logger.info('Performance monitoring initialized', {}, 'performance');
  }

  private static setupNavigationObserver(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            
            this.recordMetric({
              name: 'page_load_time',
              value: navEntry.loadEventEnd - navEntry.navigationStart,
              unit: 'ms',
              category: 'timing',
              metadata: {
                domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.navigationStart,
                firstPaint: this.getFirstPaint(),
                firstContentfulPaint: this.getFirstContentfulPaint()
              }
            });
          }
        }
      });

      observer.observe({ entryTypes: ['navigation'] });
      this.observers.push(observer);
    }
  }

  private static setupResourceObserver(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming;
            
            // Only monitor significant resources
            if (resourceEntry.duration > 100 || resourceEntry.transferSize > 50000) {
              this.recordMetric({
                name: 'resource_load_time',
                value: resourceEntry.duration,
                unit: 'ms',
                category: 'network',
                metadata: {
                  name: resourceEntry.name,
                  size: resourceEntry.transferSize,
                  type: this.getResourceType(resourceEntry.name)
                }
              });
            }
          }
        }
      });

      observer.observe({ entryTypes: ['resource'] });
      this.observers.push(observer);
    }
  }

  private static setupLongTaskObserver(): void {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.recordMetric({
              name: 'long_task',
              value: entry.duration,
              unit: 'ms',
              category: 'timing',
              metadata: {
                startTime: entry.startTime,
                name: entry.name
              }
            });
          }
        });

        observer.observe({ entryTypes: ['longtask'] });
        this.observers.push(observer);
      } catch (e) {
        // longtask might not be supported
        Logger.debug('Long task observer not supported', {}, 'performance');
      }
    }
  }

  private static setupMemoryMonitoring(): void {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        
        this.recordMetric({
          name: 'memory_usage',
          value: memory.usedJSHeapSize / 1024 / 1024, // Convert to MB
          unit: 'MB',
          category: 'memory',
          metadata: {
            total: memory.totalJSHeapSize / 1024 / 1024,
            limit: memory.jsHeapSizeLimit / 1024 / 1024
          }
        });
      }, 30000); // Every 30 seconds
    }
  }

  private static startPeriodicCollection(): void {
    setInterval(() => {
      // Collect Core Web Vitals
      this.collectCoreWebVitals();
      
      // Clean old metrics
      this.cleanOldMetrics();
    }, 60000); // Every minute
  }

  private static collectCoreWebVitals(): void {
    // LCP (Largest Contentful Paint)
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint') as PerformancePaintTiming[];
    if (lcpEntries.length > 0) {
      const lcp = lcpEntries[lcpEntries.length - 1];
      this.recordMetric({
        name: 'largest_contentful_paint',
        value: lcp.startTime,
        unit: 'ms',
        category: 'timing'
      });
    }

    // FID would require a separate library or user interaction tracking
    // CLS would require layout shift tracking
  }

  private static getFirstPaint(): number | undefined {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint?.startTime;
  }

  private static getFirstContentfulPaint(): number | undefined {
    const paintEntries = performance.getEntriesByType('paint');
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return fcp?.startTime;
  }

  private static getResourceType(url: string): string {
    if (url.includes('.js')) return 'script';
    if (url.includes('.css')) return 'stylesheet';
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return 'image';
    if (url.includes('/api/')) return 'api';
    return 'other';
  }

  static recordMetric(metric: Omit<PerformanceMetric, 'timestamp'>): void {
    const fullMetric: PerformanceMetric = {
      ...metric,
      timestamp: new Date().toISOString()
    };

    this.metrics.unshift(fullMetric);
    
    // Keep only recent metrics
    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics = this.metrics.slice(0, this.MAX_METRICS);
    }

    // Log significant performance issues
    if (this.isSignificantMetric(fullMetric)) {
      Logger.warn(`Performance issue detected: ${metric.name}`, {
        operation: 'performance_issue',
        metadata: {
          value: metric.value,
          unit: metric.unit,
          category: metric.category,
          ...metric.metadata
        }
      }, 'performance');
    }
  }

  private static isSignificantMetric(metric: PerformanceMetric): boolean {
    switch (metric.name) {
      case 'page_load_time':
        return metric.value > 3000; // > 3 seconds
      case 'resource_load_time':
        return metric.value > 2000; // > 2 seconds
      case 'long_task':
        return metric.value > 50; // > 50ms
      case 'memory_usage':
        return metric.value > 100; // > 100MB
      case 'largest_contentful_paint':
        return metric.value > 2500; // > 2.5 seconds
      default:
        return false;
    }
  }

  static getMetrics(category?: string, since?: Date): PerformanceMetric[] {
    let filteredMetrics = this.metrics;

    if (category) {
      filteredMetrics = filteredMetrics.filter(m => m.category === category);
    }

    if (since) {
      filteredMetrics = filteredMetrics.filter(m => 
        new Date(m.timestamp) >= since
      );
    }

    return filteredMetrics;
  }

  static getAverageMetric(name: string, since?: Date): number | null {
    const metrics = this.getMetrics(undefined, since).filter(m => m.name === name);
    
    if (metrics.length === 0) return null;
    
    const sum = metrics.reduce((acc, m) => acc + m.value, 0);
    return sum / metrics.length;
  }

  static generatePerformanceReport(): {
    summary: Record<string, any>;
    recommendations: string[];
  } {
    const report = {
      summary: {
        totalMetrics: this.metrics.length,
        averagePageLoadTime: this.getAverageMetric('page_load_time'),
        averageMemoryUsage: this.getAverageMetric('memory_usage'),
        longTaskCount: this.getMetrics().filter(m => m.name === 'long_task').length,
        significantIssues: this.metrics.filter(m => this.isSignificantMetric(m)).length
      },
      recommendations: [] as string[]
    };

    // Generate recommendations
    if (report.summary.averagePageLoadTime && report.summary.averagePageLoadTime > 3000) {
      report.recommendations.push('Consider optimizing page load time - current average exceeds 3 seconds');
    }

    if (report.summary.averageMemoryUsage && report.summary.averageMemoryUsage > 50) {
      report.recommendations.push('Monitor memory usage - current average is high');
    }

    if (report.summary.longTaskCount > 10) {
      report.recommendations.push('Multiple long tasks detected - consider code splitting or optimization');
    }

    return report;
  }

  private static cleanOldMetrics(): void {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    this.metrics = this.metrics.filter(m => new Date(m.timestamp) > oneHourAgo);
  }

  static cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics = [];
    Logger.info('Performance monitoring cleaned up', {}, 'performance');
  }
}

// User interaction tracking
export const trackUserInteraction = (action: string, element: string, metadata?: Record<string, any>) => {
  PerformanceMonitor.recordMetric({
    name: 'user_interaction',
    value: performance.now(),
    unit: 'ms',
    category: 'user_interaction',
    metadata: {
      action,
      element,
      ...metadata
    }
  });
};

// API call tracking
export const trackApiCall = (endpoint: string, method: string, duration: number, success: boolean) => {
  PerformanceMonitor.recordMetric({
    name: 'api_call',
    value: duration,
    unit: 'ms',
    category: 'network',
    metadata: {
      endpoint,
      method,
      success
    }
  });
};
