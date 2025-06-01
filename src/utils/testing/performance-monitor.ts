
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

export class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: ((metric: PerformanceMetric) => void)[] = [];

  constructor() {
    this.initializeWebVitals();
  }

  private initializeWebVitals() {
    getCLS(this.handleMetric.bind(this));
    getFID(this.handleMetric.bind(this));
    getFCP(this.handleMetric.bind(this));
    getLCP(this.handleMetric.bind(this));
    getTTFB(this.handleMetric.bind(this));
  }

  private handleMetric(metric: any) {
    const performanceMetric: PerformanceMetric = {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      timestamp: Date.now(),
    };

    this.metrics.push(performanceMetric);
    this.observers.forEach(observer => observer(performanceMetric));

    // Log poor performance
    if (metric.rating === 'poor') {
      console.warn(`Poor ${metric.name}: ${metric.value}`);
    }
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
        case 'LCP':
          recommendations.push('Optimize Largest Contentful Paint by optimizing images and server response times');
          break;
        case 'FID':
          recommendations.push('Improve First Input Delay by reducing JavaScript execution time');
          break;
        case 'CLS':
          recommendations.push('Reduce Cumulative Layout Shift by setting size attributes on media');
          break;
        case 'FCP':
          recommendations.push('Optimize First Contentful Paint by reducing render-blocking resources');
          break;
        case 'TTFB':
          recommendations.push('Improve Time to First Byte by optimizing server response time');
          break;
      }
    });

    return [...new Set(recommendations)];
  }
}

export const performanceMonitor = new PerformanceMonitor();
