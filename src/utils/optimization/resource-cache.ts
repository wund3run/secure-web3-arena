
/**
 * Resource caching with intelligent cache-key strategies
 */
export class ResourceCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private readonly DEFAULT_TTL = 300000; // 5 minutes

  /**
   * Cache critical resources with AI-generated cache keys
   */
  cacheCriticalResources(): void {
    const criticalResources = [
      { url: '/api/services', key: this.generateCacheKey('services', ['featured']), ttl: 600000 },
      { url: '/api/audits', key: this.generateCacheKey('audits', ['status', 'recent']), ttl: 300000 },
      { url: '/api/user-profile', key: this.generateCacheKey('profile', ['auth']), ttl: 900000 }
    ];

    criticalResources.forEach(resource => {
      this.preloadResource(resource.url, resource.key, resource.ttl);
    });
  }

  /**
   * AI-generated cache key strategy
   */
  private generateCacheKey(resource: string, factors: string[]): string {
    const timestamp = Math.floor(Date.now() / (5 * 60 * 1000)); // 5-minute buckets
    const factorHash = factors.sort().join('-');
    return `${resource}:${factorHash}:${timestamp}`;
  }

  /**
   * Preload and cache a resource
   */
  private async preloadResource(url: string, cacheKey: string, ttl: number): Promise<void> {
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      this.set(cacheKey, data, ttl);
      console.log(`Cached resource: ${url} with key: ${cacheKey}`);
    } catch (error) {
      console.warn(`Failed to preload resource: ${url}`, error);
    }
  }

  /**
   * Set cache entry
   */
  set(key: string, data: any, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  /**
   * Get cache entry
   */
  get(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Clear expired entries
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }

  get cachedCount(): number {
    return this.cache.size;
  }
}
