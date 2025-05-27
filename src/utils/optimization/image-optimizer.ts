
/**
 * Image optimization utilities
 */
export class ImageOptimizer {
  /**
   * Optimize images with lazy loading and format selection
   */
  optimizeImages(): void {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            
            if (src) {
              // Use WebP format if supported
              const optimizedSrc = this.getOptimizedImageSrc(src);
              img.src = optimizedSrc;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  /**
   * Get optimized image source based on browser support
   */
  private getOptimizedImageSrc(originalSrc: string): string {
    // Check WebP support
    const supportsWebP = this.supportsWebP();
    
    if (supportsWebP && !originalSrc.endsWith('.svg')) {
      // Convert to WebP if supported and not SVG
      return originalSrc.replace(/\.(jpg|jpeg|png)$/, '.webp');
    }
    
    return originalSrc;
  }

  /**
   * Check WebP support
   */
  private supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
}
