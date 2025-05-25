
// Performance monitoring and optimization utilities

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  measureComponentRender<T extends (...args: any[]) => any>(
    componentName: string,
    renderFunction: T
  ): T {
    return ((...args: any[]) => {
      const startTime = performance.now();
      const result = renderFunction(...args);
      const endTime = performance.now();
      
      this.recordMetric(`${componentName}-render`, endTime - startTime);
      return result;
    }) as T;
  }

  measureAsyncOperation<T>(
    operationName: string,
    operation: Promise<T>
  ): Promise<T> {
    const startTime = performance.now();
    
    return operation.finally(() => {
      const endTime = performance.now();
      this.recordMetric(`${operationName}-async`, endTime - startTime);
    });
  }

  private recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const values = this.metrics.get(name)!;
    values.push(value);
    
    // Keep only last 100 measurements
    if (values.length > 100) {
      values.shift();
    }
  }

  getMetrics() {
    const result: Record<string, { avg: number; min: number; max: number; count: number }> = {};
    
    this.metrics.forEach((values, name) => {
      result[name] = {
        avg: values.reduce((sum, val) => sum + val, 0) / values.length,
        min: Math.min(...values),
        max: Math.max(...values),
        count: values.length
      };
    });
    
    return result;
  }

  logWebVitals() {
    // Core Web Vitals monitoring with correct v5 function names
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        onCLS(console.log);
        onINP(console.log);
        onFCP(console.log);
        onLCP(console.log);
        onTTFB(console.log);
      }).catch(() => {
        // Silently fail if web-vitals is not available
      });
    }
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();
