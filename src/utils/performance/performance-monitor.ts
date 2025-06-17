// Performance monitoring and optimization utilities with reduced overhead

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();
  private maxMetrics = 50; // Reduced from 100
  private isEnabled = process.env.NODE_ENV === 'development';

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
    if (!this.isEnabled) return renderFunction;
    
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
    if (!this.isEnabled) return operation;
    
    const startTime = performance.now();
    
    return operation.finally(() => {
      const endTime = performance.now();
      this.recordMetric(`${operationName}-async`, endTime - startTime);
    });
  }

  private recordMetric(name: string, value: number) {
    if (!this.isEnabled) return;
    
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const values = this.metrics.get(name)!;
    values.push(value);
    
    // Keep only recent measurements (reduced limit)
    if (values.length > this.maxMetrics) {
      values.shift();
    }
  }

  getMetrics() {
    if (!this.isEnabled) return {};
    
    const result: Record<string, { avg: number; min: number; max: number; count: number }> = {};
    
    this.metrics.forEach((values, name) => {
      if (values.length > 0) {
        result[name] = {
          avg: values.reduce((sum, val) => sum + val, 0) / values.length,
          min: Math.min(...values),
          max: Math.max(...values),
          count: values.length
        };
      }
    });
    
    return result;
  }

  // Simplified web vitals logging with error handling
  logWebVitals() {
    if (!this.isEnabled || typeof window === 'undefined') return;
    
    try {
      import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        const logMetric = (metric: any) => {
          this.recordMetric(`web-vital-${metric.name}`, metric.value);
        };
        
        onCLS(logMetric);
        onINP(logMetric);
        onFCP(logMetric);
        onLCP(logMetric);
        onTTFB(logMetric);
      }).catch(() => {
        // Silently fail if web-vitals is not available
      });
    } catch (error) {
      // Silently handle import errors
    }
  }

  // Clear metrics to prevent memory buildup
  clear() {
    this.metrics.clear();
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();
