
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private imageCache = new Map<string, string>();
  private lazyImages: IntersectionObserver | null = null;

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  initialize(): void {
    this.setupImageOptimization();
    this.setupResourceHints();
    this.setupMemoryManagement();
  }

  private setupImageOptimization(): void {
    // Lazy loading for images
    this.lazyImages = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            this.lazyImages?.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px'
    });

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      this.lazyImages?.observe(img);
    });
  }

  private setupResourceHints(): void {
    // Preload critical resources
    const criticalResources = [
      '/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png',
      '/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  private setupMemoryManagement(): void {
    // Clean up event listeners and observers on page unload
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });

    // Monitor memory usage
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        const memoryUsage = memory.usedJSHeapSize / memory.totalJSHeapSize;
        
        if (memoryUsage > 0.8) {
          console.warn('High memory usage detected:', memoryUsage);
          this.performGarbageCollection();
        }
      }, 30000); // Check every 30 seconds
    }
  }

  private performGarbageCollection(): void {
    // Clear image cache if it gets too large
    if (this.imageCache.size > 50) {
      this.imageCache.clear();
    }

    // Request garbage collection if available
    if ('gc' in window) {
      (window as any).gc();
    }
  }

  optimizeImage(src: string, options: { width?: number; height?: number; quality?: number } = {}): string {
    const { width, height, quality = 80 } = options;
    
    // Check cache first
    const cacheKey = `${src}_${width}_${height}_${quality}`;
    if (this.imageCache.has(cacheKey)) {
      return this.imageCache.get(cacheKey)!;
    }

    // For production, you would implement actual image optimization
    // For now, return the original src
    this.imageCache.set(cacheKey, src);
    return src;
  }

  preloadRoute(route: string): void {
    // Preload route components
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  }

  cleanup(): void {
    if (this.lazyImages) {
      this.lazyImages.disconnect();
    }
    this.imageCache.clear();
  }
}
