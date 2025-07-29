
import { supabase } from '@/integrations/supabase/client';

export class QueryOptimizer {
  private static queryCache = new Map<string, { data: unknown; timestamp: number; ttl: number }>();

  // Cache query results with TTL
  static async cachedQuery<T>(
    key: string,
    queryFn: () => Promise<T>,
    ttlMinutes: number = 5
  ): Promise<T> {
    const cached = this.queryCache.get(key);
    const now = Date.now();

    if (cached && (now - cached.timestamp) < (cached.ttl * 60 * 1000)) {
      console.log(`Cache hit for key: ${key}`);
      return cached.data;
    }

    console.log(`Cache miss for key: ${key}, executing query`);
    const data = await queryFn();
    
    this.queryCache.set(key, {
      data,
      timestamp: now,
      ttl: ttlMinutes
    });

    return data;
  }

  // Optimized audit requests query with pagination
  static async getAuditRequestsOptimized(
    page: number = 1,
    limit: number = 20,
    filters?: {
      status?: string;
      blockchain?: string;
      userId?: string;
    }
  ) {
    const offset = (page - 1) * limit;
    const cacheKey = `audit_requests_${page}_${limit}_${JSON.stringify(filters)}`;

    return this.cachedQuery(
      cacheKey,
      async () => {
        let query = supabase
          .from('audit_requests')
          .select(`
            *,
            profiles:client_id (
              full_name,
              avatar_url
            )
          `)
          .range(offset, offset + limit - 1)
          .order('created_at', { ascending: false });

        if (filters?.status) {
          query = query.eq('status', filters.status);
        }
        if (filters?.blockchain) {
          query = query.eq('blockchain', filters.blockchain);
        }
        if (filters?.userId) {
          query = query.eq('client_id', filters.userId);
        }

        const { data, error, count } = await query;
        if (error) throw error;

        return { data, count };
      },
      2 // Cache for 2 minutes
    );
  }

  // Optimized services query
  static async getServicesOptimized(
    category?: string,
    featured?: boolean
  ) {
    const cacheKey = `services_${category}_${featured}`;

    return this.cachedQuery(
      cacheKey,
      async () => {
        let query = supabase
          .from('services')
          .select(`
            *,
            profiles:provider_id (
              full_name,
              avatar_url
            )
          `)
          .eq('verification_status', 'approved');

        if (category) {
          query = query.eq('category', category);
        }
        if (featured !== undefined) {
          query = query.eq('featured', featured);
        }

        query = query.order('average_rating', { ascending: false });

        const { data, error } = await query;
        if (error) throw error;

        return data;
      },
      10 // Cache for 10 minutes
    );
  }

  // Clear cache for specific keys or all
  static clearCache(keyPattern?: string) {
    if (keyPattern) {
      const keysToDelete = Array.from(this.queryCache.keys()).filter(key => 
        key.includes(keyPattern)
      );
      keysToDelete.forEach(key => this.queryCache.delete(key));
      console.log(`Cleared ${keysToDelete.length} cache entries matching: ${keyPattern}`);
    } else {
      this.queryCache.clear();
      console.log('Cleared all cache entries');
    }
  }

  // Get cache statistics
  static getCacheStats() {
    const entries = Array.from(this.queryCache.entries());
    const now = Date.now();
    
    return {
      totalEntries: entries.length,
      activeEntries: entries.filter(([_, value]) => 
        (now - value.timestamp) < (value.ttl * 60 * 1000)
      ).length,
      expiredEntries: entries.filter(([_, value]) => 
        (now - value.timestamp) >= (value.ttl * 60 * 1000)
      ).length
    };
  }
}

// Batch operations for better performance
export class BatchOperations {
  static async batchCreateNotifications(notifications: Array<{
    user_id: string;
    title: string;
    message: string;
    type?: string;
    action_url?: string;
  }>) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert(notifications);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Batch notification creation failed:', error);
      throw error;
    }
  }

  static async batchUpdateAuditProgress(updates: Array<{
    id: string;
    progress_percentage?: number;
    current_phase?: string;
    notes?: string;
  }>) {
    try {
      const results = await Promise.all(
        updates.map(update => 
          supabase
            .from('audit_progress')
            .update({
              ...update,
              updated_at: new Date().toISOString()
            })
            .eq('id', update.id)
        )
      );

      return results;
    } catch (error) {
      console.error('Batch audit progress update failed:', error);
      throw error;
    }
  }
}
