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
            const entryWithValue = entry as PerformanceEntry & { value?: number };
            const metricValue = typeof entryWithValue.value === 'number' ? entryWithValue.value : entry.duration || 0;
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
      if (import.meta.env.MODE === 'development') {
        const lastWarningKey = `performance-warning-${name}`;
        const lastWarning = localStorage.getItem(lastWarningKey);
        const now = Date.now();
        
        // Throttle warnings to once per minute
        if (!lastWarning || now - parseInt(lastWarning) > 60000) {
          localStorage.setItem(lastWarningKey, now.toString());
          toast.warning('Performance Warning', {
            description: `${name} is ${Math.round(value)}ms (threshold: ${threshold}ms)`,
            duration: 5000
          });
        }
      }
    }
  }

  getMetrics() {
    const result: Record<string, { average: number; latest: number; count: number }> = {};
    
    for (const [name, values] of this.metrics.entries()) {
      if (values.length > 0) {
        const average = values.reduce((sum: number, val: number) => sum + val, 0) / values.length;
        const latest = values[values.length - 1];
        result[name] = {
          average: Math.round(average),
          latest: Math.round(latest),
          count: values.length
        };
      }
    }
    
    return result;
  }

  preloadCriticalResources(resources: string[]) {
    if (typeof window === 'undefined') return;
    
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      
      // Determine the appropriate 'as' attribute based on file extension
      if (resource.endsWith('.svg') || resource.endsWith('.png') || resource.endsWith('.jpg') || resource.endsWith('.webp')) {
        link.as = 'image';
      } else if (resource.endsWith('.css')) {
        link.as = 'style';
      } else if (resource.endsWith('.js')) {
        link.as = 'script';
      }
      
      document.head.appendChild(link);
    });
  }

  optimizeImages() {
    if (typeof window === 'undefined') return;
    
    // Set up intersection observer for lazy loading images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('blur-sm');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      // Observe all images with data-src attribute
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.metrics.clear();
  }
}

export const performanceOptimizer = PerformanceOptimizer.getInstance();