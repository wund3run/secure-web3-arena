/**
 * Performance monitoring and testing utilities
 */
export interface PerformanceData {
  name: string;
  value: number;
  category: string;
  metadata?: Record<string, any>;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceData[] = [];

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  recordPerformanceData(data: PerformanceData): void {
    this.metrics.push({
      ...data,
      metadata: {
        ...data.metadata,
        timestamp: Date.now()
      }
    });

    // Keep only recent metrics
    if (this.metrics.length > 1000) {
      this.metrics.shift();
    }

    // Log performance issues
    if (this.isPerformanceIssue(data)) {
      console.warn(`Performance issue detected: ${data.name}`, data);
    }
  }

  private isPerformanceIssue(data: PerformanceData): boolean {
    const thresholds: Record<string, number> = {
      'component_render': 16, // 16ms for 60fps
      'api_request': 1000, // 1 second
      'database_query': 500, // 500ms
      'bundle_load': 2000 // 2 seconds
    };

    const threshold = thresholds[data.category];
    return threshold && data.value > threshold;
  }

  getMetricsByCategory(category: string): PerformanceData[] {
    return this.metrics.filter(metric => metric.category === category);
  }

  getAverageMetric(name: string): number {
    const relevantMetrics = this.metrics.filter(metric => metric.name === name);
    if (relevantMetrics.length === 0) return 0;

    const sum = relevantMetrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / relevantMetrics.length;
  }

  generatePerformanceReport(): Record<string, any> {
    const categories = [...new Set(this.metrics.map(m => m.category))];
    const report: Record<string, any> = {};

    categories.forEach(category => {
      const categoryMetrics = this.getMetricsByCategory(category);
      report[category] = {
        count: categoryMetrics.length,
        averageValue: categoryMetrics.reduce((acc, m) => acc + m.value, 0) / categoryMetrics.length,
        maxValue: Math.max(...categoryMetrics.map(m => m.value)),
        minValue: Math.min(...categoryMetrics.map(m => m.value))
      };
    });

    return report;
  }

  clearMetrics(): void {
    this.metrics = [];
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();
