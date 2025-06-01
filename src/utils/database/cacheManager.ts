
import { supabase } from '@/integrations/supabase/client';

export interface CacheConfig {
  ttl: number; // Time to live in seconds
  key: string;
  tags?: string[]; // For cache invalidation
}

export class CacheManager {
  private static cache = new Map<string, { data: any; timestamp: number; ttl: number; tags: string[] }>();
  private static readonly DEFAULT_TTL = 300; // 5 minutes

  static async get<T>(key: string): Promise<T | null> {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const now = Date.now();
    const isExpired = (now - cached.timestamp) / 1000 > cached.ttl;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    console.log(`Cache hit for key: ${key}`);
    return cached.data as T;
  }

  static set<T>(key: string, data: T, config: Partial<CacheConfig> = {}): void {
    const ttl = config.ttl || this.DEFAULT_TTL;
    const tags = config.tags || [];

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
      tags
    });

    console.log(`Cache set for key: ${key}, TTL: ${ttl}s`);
  }

  static invalidate(key: string): void {
    this.cache.delete(key);
    console.log(`Cache invalidated for key: ${key}`);
  }

  static invalidateByTag(tag: string): void {
    const keysToInvalidate: string[] = [];
    
    for (const [key, value] of this.cache.entries()) {
      if (value.tags.includes(tag)) {
        keysToInvalidate.push(key);
      }
    }

    keysToInvalidate.forEach(key => {
      this.cache.delete(key);
      console.log(`Cache invalidated for key: ${key} (tag: ${tag})`);
    });
  }

  static clear(): void {
    this.cache.clear();
    console.log('Cache cleared');
  }

  static getStats() {
    const entries = Array.from(this.cache.entries());
    const now = Date.now();
    
    return {
      totalEntries: entries.length,
      activeEntries: entries.filter(([_, value]) => 
        (now - value.timestamp) / 1000 <= value.ttl
      ).length,
      expiredEntries: entries.filter(([_, value]) => 
        (now - value.timestamp) / 1000 > value.ttl
      ).length,
      memoryUsage: this.estimateMemoryUsage()
    };
  }

  private static estimateMemoryUsage(): string {
    const size = JSON.stringify(Array.from(this.cache.entries())).length;
    return `${(size / 1024).toFixed(2)} KB`;
  }
}

// Cached query wrapper for Supabase
export async function cachedQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  config: Partial<CacheConfig> = {}
): Promise<T> {
  // Try to get from cache first
  const cached = await CacheManager.get<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Execute query and cache result
  const data = await queryFn();
  CacheManager.set(key, data, config);
  
  return data;
}
