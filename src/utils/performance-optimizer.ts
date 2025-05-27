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

    // Monitor Core Web Vitals
    this.initWebVitalsMonitoring();
    
    // Monitor navigation timing
    this.initNavigationMonitoring();
    
    // Monitor resource loading
    this.initResourceMonitoring();
  }

  private initWebVitalsMonitoring() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Monitor CLS, LCP, FID
      try {
        this.observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.recordMetric(entry.name, entry.value || entry.duration);
          }
        });
        
        this.observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
      } catch (error) {
        console.warn('Performance monitoring not supported:', error);
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
          this.recordMetric('first-byte', navigation.responseStart - navigation.fetchStart);
        }
      });
    }
  }

  private initResourceMonitoring() {
    if (typeof window !== 'undefined') {
      // Monitor slow resources
      const checkSlowResources = () => {
        const resources = performance.getEntriesByType('resource');
        const slowResources = resources.filter(resource => resource.duration > 2000);
        
        if (slowResources.length > 0) {
          console.warn('Slow resources detected:', slowResources);
        }
      };
      
      setTimeout(checkSlowResources, 5000);
    }
  }

  recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const values = this.metrics.get(name)!;
    values.push(value);
    
    // Keep only last 50 measurements
    if (values.length > 50) {
      values.shift();
    }

    // Alert for concerning metrics
    this.checkPerformanceThresholds(name, value);
  }

  private checkPerformanceThresholds(name: string, value: number) {
    const thresholds = {
      'page-load-time': 3000,
      'first-byte': 600,
      'dom-content-loaded': 1500
    };

    const threshold = thresholds[name as keyof typeof thresholds];
    if (threshold && value > threshold) {
      console.warn(`Performance issue detected: ${name} took ${value}ms (threshold: ${threshold}ms)`);
      
      if (process.env.NODE_ENV === 'development') {
        toast.warning("Performance Issue", {
          description: `${name} is slower than expected (${Math.round(value)}ms)`
        });
      }
    }
  }

  getMetrics() {
    const result: Record<string, { avg: number; min: number; max: number; latest: number }> = {};
    
    this.metrics.forEach((values, name) => {
      if (values.length > 0) {
        result[name] = {
          avg: values.reduce((sum, val) => sum + val, 0) / values.length,
          min: Math.min(...values),
          max: Math.max(...values),
          latest: values[values.length - 1]
        };
      }
    });
    
    return result;
  }

  // Optimize images with lazy loading and responsive loading
  optimizeImages() {
    if (typeof window === 'undefined') return;

    const images = document.querySelectorAll('img[data-src]');
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

  // Preload critical resources
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
      } else if (resource.match(/\.(jpg|jpeg|png|webp)$/)) {
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
