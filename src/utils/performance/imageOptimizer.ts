
/**
 * Advanced image optimization with AVIF/WebP conversion and intelligent loading
 */
export class AdvancedImageOptimizer {
  private static instance: AdvancedImageOptimizer;
  private observerMap = new Map<HTMLImageElement, IntersectionObserver>();
  
  static getInstance(): AdvancedImageOptimizer {
    if (!AdvancedImageOptimizer.instance) {
      AdvancedImageOptimizer.instance = new AdvancedImageOptimizer();
    }
    return AdvancedImageOptimizer.instance;
  }

  /**
   * Initialize image optimization with modern format detection
   */
  initialize(): void {
    this.setupLazyLoading();
    this.setupModernFormatDetection();
    this.preloadCriticalImages();
    this.setupImageErrorHandling();
  }

  /**
   * Advanced lazy loading with intersection observer
   */
  private setupLazyLoading(): void {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          this.loadImageWithOptimization(img);
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    images.forEach(img => {
      imageObserver.observe(img);
      this.observerMap.set(img as HTMLImageElement, imageObserver);
    });
  }

  /**
   * Load image with format optimization and progressive enhancement
   */
  private async loadImageWithOptimization(img: HTMLImageElement): Promise<void> {
    const originalSrc = img.dataset.src;
    if (!originalSrc) return;

    try {
      // Try modern formats first
      const optimizedSrc = await this.getOptimizedImageSrc(originalSrc);
      
      // Create a new image to test loading
      const testImage = new Image();
      
      testImage.onload = () => {
        img.src = optimizedSrc;
        img.classList.add('loaded');
        img.removeAttribute('data-src');
      };
      
      testImage.onerror = () => {
        // Fallback to original format
        img.src = originalSrc;
        img.classList.add('loaded');
        img.removeAttribute('data-src');
      };
      
      testImage.src = optimizedSrc;
      
    } catch (error) {
      console.warn('Image optimization failed, using original:', error);
      img.src = originalSrc;
      img.classList.add('loaded');
      img.removeAttribute('data-src');
    }
  }

  /**
   * Get optimized image source with format conversion
   */
  private async getOptimizedImageSrc(originalSrc: string): Promise<string> {
    // Skip SVG files
    if (originalSrc.endsWith('.svg')) {
      return originalSrc;
    }

    // Check for modern format support
    const supportsAVIF = await this.supportsFormat('AVIF');
    const supportsWebP = await this.supportsFormat('WebP');
    
    // Generate optimized URLs (this would typically be handled by a CDN or image service)
    if (supportsAVIF && !originalSrc.includes('.avif')) {
      const avifSrc = this.convertToFormat(originalSrc, 'avif');
      if (await this.imageExists(avifSrc)) return avifSrc;
    }
    
    if (supportsWebP && !originalSrc.includes('.webp')) {
      const webpSrc = this.convertToFormat(originalSrc, 'webp');
      if (await this.imageExists(webpSrc)) return webpSrc;
    }
    
    return originalSrc;
  }

  /**
   * Check if browser supports modern image formats
   */
  private async supportsFormat(format: 'AVIF' | 'WebP'): Promise<boolean> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      
      const testFormats = {
        AVIF: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=',
        WebP: 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
      };
      
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = testFormats[format];
    });
  }

  /**
   * Convert image URL to different format
   */
  private convertToFormat(originalSrc: string, format: 'avif' | 'webp'): string {
    // This would typically be handled by a CDN or image processing service
    // For now, we'll simulate the URL transformation
    const extension = originalSrc.split('.').pop()?.toLowerCase();
    if (extension && ['jpg', 'jpeg', 'png'].includes(extension)) {
      return originalSrc.replace(new RegExp(`\\.${extension}$`), `.${format}`);
    }
    return originalSrc;
  }

  /**
   * Check if image exists at URL
   */
  private async imageExists(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Preload critical images
   */
  private preloadCriticalImages(): void {
    const criticalImages = [
      '/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png',
      '/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  /**
   * Setup image error handling with fallbacks
   */
  private setupImageErrorHandling(): void {
    document.addEventListener('error', (event) => {
      const target = event.target as HTMLImageElement;
      if (target && target.tagName === 'IMG') {
        this.handleImageError(target);
      }
    }, true);
  }

  /**
   * Handle image loading errors with intelligent fallbacks
   */
  private handleImageError(img: HTMLImageElement): void {
    // Remove any format-specific extensions and try original
    const originalSrc = img.src.replace(/\.(avif|webp)$/, '.jpg');
    
    if (img.src !== originalSrc) {
      img.src = originalSrc;
      return;
    }

    // If still failing, show placeholder
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
    img.alt = 'Image not available';
    img.classList.add('error');
  }

  /**
   * Generate optimization report
   */
  generateReport(): {
    imagesOptimized: number;
    formatSupport: { avif: boolean; webp: boolean };
    averageLoadTime: number;
    failureRate: number;
    recommendations: string[];
  } {
    const recommendations: string[] = [];
    
    // Check format support
    const formatSupport = {
      avif: false,
      webp: false
    };

    // Check for common optimization opportunities
    const allImages = document.querySelectorAll('img');
    const unoptimizedImages = Array.from(allImages).filter(img => 
      !img.loading || img.loading !== 'lazy'
    );

    if (unoptimizedImages.length > 0) {
      recommendations.push(`${unoptimizedImages.length} images could benefit from lazy loading.`);
    }

    const largeImages = Array.from(allImages).filter(img => 
      img.naturalWidth > 1920 || img.naturalHeight > 1080
    );

    if (largeImages.length > 0) {
      recommendations.push(`${largeImages.length} images are larger than needed and should be resized.`);
    }

    return {
      imagesOptimized: this.observerMap.size,
      formatSupport,
      averageLoadTime: 0, // Would be calculated from actual metrics
      failureRate: 0, // Would be calculated from error tracking
      recommendations
    };
  }

  /**
   * Cleanup observers
   */
  cleanup(): void {
    this.observerMap.forEach(observer => observer.disconnect());
    this.observerMap.clear();
  }
}

export const advancedImageOptimizer = AdvancedImageOptimizer.getInstance();
