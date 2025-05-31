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

    // Monitor Core Web Vitals with minimal overhead
    this.initWebVitalsMonitoring();
    
    // Monitor navigation timing
    this.initNavigationMonitoring();
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
          this.recordMetric('first-byte', navigation.responseStart - navigation.fetchStart);
          
          // Log performance for debugging
          console.log('Page Load Metrics:', {
            'Total Load Time': Math.round(navigation.loadEventEnd - navigation.fetchStart) + 'ms',
            'DOM Ready': Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart) + 'ms',
            'First Byte': Math.round(navigation.responseStart - navigation.fetchStart) + 'ms'
          });
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
    
    // Keep only last 10 measurements
    if (values.length > 10) {
      values.shift();
    }

    // Check performance thresholds with reasonable limits
    this.checkPerformanceThresholds(name, value);
  }

  private checkPerformanceThresholds(name: string, value: number) {
    // Reasonable thresholds to reduce noise
    const thresholds = {
      'page-load-time': 4000, // 4 seconds
      'first-byte': 800, // 800ms
      'dom-content-loaded': 2000 // 2 seconds
    };

    const threshold = thresholds[name as keyof typeof thresholds];
    if (threshold && value > threshold) {
      // Only show in development and throttle notifications
      if (process.env.NODE_ENV === 'development') {
        const lastWarning = localStorage.getItem(`perf-warning-${name}`);
        const now = Date.now();
        
        if (!lastWarning || now - parseInt(lastWarning) > 60000) {
          localStorage.setItem(`perf-warning-${name}`, now.toString());
          console.warn(`Performance Notice: ${name.replace(/-/g, ' ')} took ${Math.round(value)}ms`);
        }
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

  // Optimize images with lazy loading
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
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
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
