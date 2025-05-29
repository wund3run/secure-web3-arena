
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface QueryOptions {
  retries?: number;
  timeout?: number;
  cache?: boolean;
}

class DatabaseOptimizer {
  private queryCache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private readonly defaultCacheTTL = 5 * 60 * 1000; // 5 minutes

  async optimizedQuery<T>(
    queryFn: () => Promise<{ data: T | null; error: any }>,
    cacheKey?: string,
    options: QueryOptions = {}
  ): Promise<T | null> {
    const { retries = 2, timeout = 30000, cache = false } = options;

    // Check cache first
    if (cache && cacheKey) {
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return cached as T;
      }
    }

    let lastError: any;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const result = await this.executeWithTimeout(queryFn, timeout);
        
        if (result.error) {
          throw result.error;
        }

        // Cache successful result
        if (cache && cacheKey && result.data) {
          this.setCache(cacheKey, result.data);
        }

        return result.data;
      } catch (error: any) {
        lastError = error;
        
        // Don't retry for certain errors
        if (this.isNonRetryableError(error)) {
          break;
        }

        // Wait before retry
        if (attempt < retries) {
          await this.delay(Math.pow(2, attempt) * 1000); // Exponential backoff
        }
      }
    }

    // Log error for monitoring
    console.error('Database query failed after retries:', {
      error: lastError,
      cacheKey,
      timestamp: new Date().toISOString()
    });

    throw lastError;
  }

  private async executeWithTimeout<T>(
    queryFn: () => Promise<T>,
    timeout: number
  ): Promise<T> {
    return Promise.race([
      queryFn(),
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error('Query timeout')), timeout)
      )
    ]);
  }

  private isNonRetryableError(error: any): boolean {
    const nonRetryableCodes = [
      'PGRST116', // Permission denied
      'PGRST301', // Row not found
      'PGRST204', // Bad request
    ];
    
    return nonRetryableCodes.some(code => 
      error.code === code || error.message?.includes(code)
    );
  }

  private getFromCache(key: string): any | null {
    const cached = this.queryCache.get(key);
    if (!cached) return null;

    if (Date.now() > cached.timestamp + cached.ttl) {
      this.queryCache.delete(key);
      return null;
    }

    return cached.data;
  }

  private setCache(key: string, data: any, ttl: number = this.defaultCacheTTL): void {
    this.queryCache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Clean up expired cache entries
  cleanupCache(): void {
    const now = Date.now();
    for (const [key, value] of this.queryCache.entries()) {
      if (now > value.timestamp + value.ttl) {
        this.queryCache.delete(key);
      }
    }
  }
}

export const dbOptimizer = new DatabaseOptimizer();

// Utility function for common queries
export async function optimizedFetch<T>(
  tableName: string,
  query: any,
  cacheKey?: string
): Promise<T[]> {
  const result = await dbOptimizer.optimizedQuery(
    async () => {
      const { data, error } = await supabase.from(tableName).select(query);
      return { data, error };
    },
    cacheKey,
    { cache: !!cacheKey }
  );
  
  return (result as T[]) || [];
}
