
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

    // Monitor Core Web Vitals with reduced noise
    this.initWebVitalsMonitoring();
    
    // Monitor navigation timing
    this.initNavigationMonitoring();
    
    // Monitor resource loading with less aggressive alerts
    this.initResourceMonitoring();
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
        
        this.observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
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
        }
      });
    }
  }

  private initResourceMonitoring() {
    if (typeof window !== 'undefined') {
      // Monitor slow resources with higher threshold
      const checkSlowResources = () => {
        const resources = performance.getEntriesByType('resource');
        const slowResources = resources.filter(resource => resource.duration > 5000); // Increased threshold
        
        if (slowResources.length > 3) { // Only warn if multiple slow resources
          console.warn('Multiple slow resources detected:', slowResources);
        }
      };
      
      setTimeout(checkSlowResources, 10000); // Check later to avoid initial load noise
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

    // Check performance thresholds with relaxed limits
    this.checkPerformanceThresholds(name, value);
  }

  private checkPerformanceThresholds(name: string, value: number) {
    // More relaxed thresholds to reduce noise
    const thresholds = {
      'page-load-time': 5000, // Increased from 3000ms
      'first-byte': 1000, // Increased from 600ms
      'dom-content-loaded': 3000 // Increased from 1500ms
    };

    const threshold = thresholds[name as keyof typeof thresholds];
    if (threshold && value > threshold) {
      // Only show in development and less frequently
      if (process.env.NODE_ENV === 'development') {
        // Throttle notifications to once every 30 seconds
        const lastWarning = localStorage.getItem(`perf-warning-${name}`);
        const now = Date.now();
        
        if (!lastWarning || now - parseInt(lastWarning) > 30000) {
          localStorage.setItem(`perf-warning-${name}`, now.toString());
          
          toast.warning("Performance Notice", {
            description: `${name.replace(/-/g, ' ')} is slower than optimal (${Math.round(value)}ms)`,
            duration: 3000
          });
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
