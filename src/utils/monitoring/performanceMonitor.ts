export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  static init(): void {
    const monitor = PerformanceMonitor.getInstance();
    monitor.startMonitoring();
  }

  startMonitoring(): void {
    this.monitorPageLoad();
    this.monitorResourceLoading();
    this.monitorUserInteractions();
    this.monitorMemoryUsage();
    this.monitorNetworkConditions();
  }

  private monitorPageLoad(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            this.recordMetric('page_load_time', navEntry.loadEventEnd - navEntry.fetchStart, {
              domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.fetchStart,
              firstContentfulPaint: navEntry.loadEventStart - navEntry.fetchStart
            });
          }
        }
      });
      
      observer.observe({ entryTypes: ['navigation'] });
      this.observers.push(observer);
    }
  }

  private monitorResourceLoading(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resourceEntry = entry as PerformanceResourceTiming;
          if (resourceEntry.duration > 1000) { // Only track slow resources
            this.recordMetric('slow_resource_load', resourceEntry.duration, {
              url: resourceEntry.name,
              type: this.getResourceType(resourceEntry.name),
              size: resourceEntry.transferSize
            });
          }
        }
      });
      
      observer.observe({ entryTypes: ['resource'] });
      this.observers.push(observer);
    }
  }

  private monitorUserInteractions(): void {
    let interactionCount = 0;
    const trackInteraction = (eventType: string) => {
      interactionCount++;
      this.recordMetric('user_interaction', interactionCount, { eventType });
    };

    document.addEventListener('click', () => trackInteraction('click'));
    document.addEventListener('scroll', () => trackInteraction('scroll'));
    document.addEventListener('keydown', () => trackInteraction('keydown'));
  }

  private monitorMemoryUsage(): void {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        this.recordMetric('memory_usage', memory.usedJSHeapSize, {
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit
        });
      }, 30000); // Every 30 seconds
    }
  }

  private monitorNetworkConditions(): void {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      this.recordMetric('network_speed', connection.downlink || 0, {
        effectiveType: connection.effectiveType,
        rtt: connection.rtt
      });
    }
  }

  recordMetric(name: string, value: number, metadata?: Record<string, any>): void {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: new Date(),
      metadata
    };

    this.metrics.push(metric);

    // Keep only last 1000 metrics
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }

    // Log performance issues
    if (this.isPerformanceIssue(name, value)) {
      console.warn(`Performance Issue: ${name} = ${value}`, metadata);
    }
  }

  private isPerformanceIssue(name: string, value: number): boolean {
    const thresholds: Record<string, number> = {
      page_load_time: 3000, // 3 seconds
      slow_resource_load: 2000, // 2 seconds
      memory_usage: 50 * 1024 * 1024 // 50MB
    };

    return value > (thresholds[name] || Infinity);
  }

  getMetrics(name?: string, since?: Date): PerformanceMetric[] {
    let filtered = this.metrics;

    if (name) {
      filtered = filtered.filter(m => m.name === name);
    }

    if (since) {
      filtered = filtered.filter(m => m.timestamp >= since);
    }

    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  generatePerformanceReport(): {
    summary: {
      totalMetrics: number;
      averagePageLoad: number;
      memoryUsage: number;
      slowResources: number;
    };
    trends: Record<string, number[]>;
    issues: PerformanceMetric[];
  } {
    const pageLoadMetrics = this.getMetrics('page_load_time');
    const memoryMetrics = this.getMetrics('memory_usage');
    const slowResources = this.getMetrics('slow_resource_load');

    const averagePageLoad = pageLoadMetrics.length > 0 
      ? pageLoadMetrics.reduce((sum, m) => sum + m.value, 0) / pageLoadMetrics.length 
      : 0;

    const currentMemory = memoryMetrics.length > 0 
      ? memoryMetrics[0].value 
      : 0;

    return {
      summary: {
        totalMetrics: this.metrics.length,
        averagePageLoad,
        memoryUsage: currentMemory,
        slowResources: slowResources.length
      },
      trends: this.calculateTrends(),
      issues: this.getPerformanceIssues()
    };
  }

  private calculateTrends(): Record<string, number[]> {
    const trends: Record<string, number[]> = {};
    const metricNames = [...new Set(this.metrics.map(m => m.name))];

    metricNames.forEach(name => {
      const metrics = this.getMetrics(name).slice(0, 10); // Last 10 values
      trends[name] = metrics.map(m => m.value);
    });

    return trends;
  }

  private getPerformanceIssues(): PerformanceMetric[] {
    return this.metrics.filter(metric => 
      this.isPerformanceIssue(metric.name, metric.value)
    );
  }

  private getResourceType(url: string): string {
    if (url.includes('.js')) return 'javascript';
    if (url.includes('.css')) return 'stylesheet';
    if (url.match(/\.(jpg|jpeg|png|gif|webp)$/)) return 'image';
    if (url.includes('.json')) return 'json';
    return 'other';
  }

  static cleanup(): void {
    const monitor = PerformanceMonitor.getInstance();
    monitor.observers.forEach(observer => observer.disconnect());
    monitor.observers = [];
  }
}
