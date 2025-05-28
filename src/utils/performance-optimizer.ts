import { toast } from "sonner";

class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private metrics: Map<string, number[]> = new Map();
  private observer: PerformanceObserver | null = null;

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  init() {
    if (typeof window === 'undefined') return;

    // Lightweight monitoring - only in development
    if (process.env.NODE_ENV === 'development') {
      this.initWebVitalsMonitoring();
      this.initNavigationMonitoring();
    }
  }

  private initWebVitalsMonitoring() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        this.observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const metricValue = (entry as any).value || entry.duration || 0;
            this.recordMetric(entry.name, metricValue);
          }
        });
        
        this.observer.observe({ entryTypes: ['navigation', 'paint'] });
      } catch (error) {
        // Silently handle browsers that don't support performance monitoring
      }
    }
  }

  private initNavigationMonitoring() {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          this.recordMetric('page-load-time', navigation.loadEventEnd - navigation.fetchStart);
          this.recordMetric('dom-content-loaded', navigation.domContentLoadedEventEnd - navigation.fetchStart);
        }
      });
    }
  }

  recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const values = this.metrics.get(name)!;
    values.push(value);
    
    // Keep only last 10 measurements for lighter memory usage
    if (values.length > 10) {
      values.shift();
    }

    // Only warn for extremely slow performance
    if (process.env.NODE_ENV === 'development' && name === 'page-load-time' && value > 10000) {
      console.warn(`Slow page load detected: ${Math.round(value)}ms`);
    }
  }

  getMetrics() {
    const result: Record<string, { avg: number; latest: number }> = {};
    
    this.metrics.forEach((values, name) => {
      if (values.length > 0) {
        result[name] = {
          avg: values.reduce((sum, val) => sum + val, 0) / values.length,
          latest: values[values.length - 1]
        };
      }
    });
    
    return result;
  }

  // Lightweight image optimization
  optimizeImages() {
    if (typeof window === 'undefined') return;

    const images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // Minimal critical resource preloading
  preloadCriticalResources(resources: string[]) {
    if (typeof window === 'undefined') return;

    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      
      if (resource.endsWith('.css')) {
        link.as = 'style';
      } else if (resource.endsWith('.js')) {
        link.as = 'script';
      } else if (resource.match(/\.(jpg|jpeg|png|webp|svg)$/)) {
        link.as = 'image';
      }
      
      document.head.appendChild(link);
    });
  }

  cleanup() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

export const performanceOptimizer = PerformanceOptimizer.getInstance();
