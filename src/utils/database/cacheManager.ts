
import { Logger } from '../logging/logger';

interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number;
  tags: string[];
}

interface CacheOptions {
  ttl?: number; // Time to live in seconds
  tags?: string[];
}

export class CacheManager {
  private static cache = new Map<string, CacheEntry>();
  private static readonly DEFAULT_TTL = 300; // 5 minutes

  static set<T>(key: string, data: T, options: CacheOptions = {}): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: (options.ttl || this.DEFAULT_TTL) * 1000, // Convert to milliseconds
      tags: options.tags || []
    };

    this.cache.set(key, entry);
    Logger.debug('Cache entry set', { key, ttl: entry.ttl }, 'cache');
  }

  static get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      Logger.debug('Cache entry expired', { key }, 'cache');
      return null;
    }

    Logger.debug('Cache hit', { key }, 'cache');
    return entry.data as T;
  }

  static has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  static delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      Logger.debug('Cache entry deleted', { key }, 'cache');
    }
    return deleted;
  }

  static clear(): void {
    const size = this.cache.size;
    this.cache.clear();
    Logger.info('Cache cleared', { entriesCleared: size }, 'cache');
  }

  static invalidateByTag(tag: string): void {
    let invalidatedCount = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      if (entry.tags.includes(tag)) {
        this.cache.delete(key);
        invalidatedCount++;
      }
    }

    Logger.info('Cache invalidated by tag', { tag, invalidatedCount }, 'cache');
  }

  static getStats(): {
    totalEntries: number;
    activeEntries: number;
    memoryUsage: string;
  } {
    const totalEntries = this.cache.size;
    let activeEntries = 0;
    let memoryEstimate = 0;

    for (const [key, entry] of this.cache.entries()) {
      const isExpired = Date.now() - entry.timestamp > entry.ttl;
      if (!isExpired) {
        activeEntries++;
      }
      
      // Rough memory estimate
      memoryEstimate += key.length + JSON.stringify(entry.data).length;
    }

    return {
      totalEntries,
      activeEntries,
      memoryUsage: `${Math.round(memoryEstimate / 1024)} KB`
    };
  }

  static cleanup(): void {
    let cleanedCount = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      const isExpired = Date.now() - entry.timestamp > entry.ttl;
      if (isExpired) {
        this.cache.delete(key);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      Logger.debug('Cache cleanup completed', { cleanedCount }, 'cache');
    }
  }
}

// Helper function for cached queries
export async function cachedQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T> {
  // Check cache first
  const cached = CacheManager.get<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Execute query and cache result
  const result = await queryFn();
  CacheManager.set(key, result, options);
  
  return result;
}
