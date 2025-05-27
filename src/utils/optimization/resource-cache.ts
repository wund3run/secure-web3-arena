
/**
 * Resource caching utilities
 */
export class ResourceCache {
  private criticalResourcesCache: Map<string, any> = new Map();

  /**
   * Cache critical resources for faster loading
   */
  cacheCriticalResources(): void {
    const criticalResources = [
      '/src/assets/hawkly-logo.svg',
      // Add other critical assets
    ];

    criticalResources.forEach(resource => {
      if (!this.criticalResourcesCache.has(resource)) {
        this.preloadResource(resource)
          .then(() => {
            this.criticalResourcesCache.set(resource, true);
          })
          .catch(error => {
            console.warn(`Failed to cache critical resource ${resource}:`, error);
          });
      }
    });
  }

  /**
   * Preload a resource
   */
  private preloadResource(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      
      if (url.endsWith('.js')) {
        link.as = 'script';
      } else if (url.endsWith('.css')) {
        link.as = 'style';
      } else if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
        link.as = 'image';
      }
      
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to preload ${url}`));
      
      document.head.appendChild(link);
    });
  }

  get cachedCount(): number {
    return this.criticalResourcesCache.size;
  }
}
