
export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
  category?: string;
  metadata?: Record<string, any>;
}

export class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: ((metric: PerformanceMetric) => void)[] = [];

  constructor() {
    this.initializeWebVitals();
  }

  private initializeWebVitals() {
    // Simplified web vitals implementation without external dependency
    this.measurePageLoadTime();
    this.measureFirstContentfulPaint();
  }

  private measurePageLoadTime() {
    window.addEventListener('load', () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        const loadTime = navigationEntry.loadEventEnd - navigationEntry.fetchStart;
        this.handleMetric({
          name: 'page-load-time',
          value: loadTime,
          rating: loadTime < 2000 ? 'good' : loadTime < 4000 ? 'needs-improvement' : 'poor',
          timestamp: Date.now()
        });
      }
    });
  }

  private measureFirstContentfulPaint() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.handleMetric({
            name: 'first-contentful-paint',
            value: entry.startTime,
            rating: entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs-improvement' : 'poor',
            timestamp: Date.now()
          });
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['paint'] });
    } catch (e) {
      // Paint timing might not be supported
    }
  }

  private handleMetric(metric: PerformanceMetric) {
    this.metrics.push(metric);
    this.observers.forEach(observer => observer(metric));

    // Log poor performance
    if (metric.rating === 'poor') {
      console.warn(`Poor ${metric.name}: ${metric.value}`);
    }
  }

  recordPerformanceData(data: {
    name: string;
    value: number;
    category: string;
    metadata?: Record<string, any>;
  }) {
    const metric: PerformanceMetric = {
      name: data.name,
      value: data.value,
      rating: 'good', // Default rating, could be calculated based on thresholds
      timestamp: Date.now(),
      category: data.category,
      metadata: data.metadata
    };
    
    this.handleMetric(metric);
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  subscribe(observer: (metric: PerformanceMetric) => void) {
    this.observers.push(observer);
    return () => {
      const index = this.observers.indexOf(observer);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }

  getPerformanceReport() {
    const report = {
      summary: {
        totalMetrics: this.metrics.length,
        goodMetrics: this.metrics.filter(m => m.rating === 'good').length,
        poorMetrics: this.metrics.filter(m => m.rating === 'poor').length,
      },
      metrics: this.metrics,
      recommendations: this.generateRecommendations(),
    };

    return report;
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    const poorMetrics = this.metrics.filter(m => m.rating === 'poor');

    poorMetrics.forEach(metric => {
      switch (metric.name) {
        case 'page-load-time':
          recommendations.push('Optimize page load time by reducing bundle size and optimizing images');
          break;
        case 'first-contentful-paint':
          recommendations.push('Improve First Contentful Paint by reducing render-blocking resources');
          break;
      }
    });

    return [...new Set(recommendations)];
  }
}

export const performanceMonitor = new PerformanceMonitor();
