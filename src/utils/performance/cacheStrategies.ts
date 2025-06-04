
/**
 * AI-generated cache-key strategies for optimal performance
 */
export class CacheStrategies {
  private static instance: CacheStrategies;
  
  static getInstance(): CacheStrategies {
    if (!CacheStrategies.instance) {
      CacheStrategies.instance = new CacheStrategies();
    }
    return CacheStrategies.instance;
  }

  /**
   * Generate intelligent cache keys based on content type and user context
   */
  generateCacheKey(
    resource: string,
    params: Record<string, any> = {},
    userContext?: { userId?: string; role?: string }
  ): string {
    const baseKey = resource;
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}:${this.serializeValue(params[key])}`)
      .join('|');
    
    const userContextString = userContext 
      ? `user:${userContext.userId || 'anonymous'}:${userContext.role || 'guest'}`
      : 'public';
    
    return `${baseKey}:${userContextString}:${sortedParams}`;
  }

  /**
   * Get optimal cache TTL based on content type and update frequency
   */
  getCacheTTL(resourceType: string, priority: 'high' | 'medium' | 'low' = 'medium'): number {
    const baseTTLs: Record<string, number> = {
      // Static content - long cache
      'static_content': 86400, // 24 hours
      'user_profiles': 3600, // 1 hour
      'marketplace_services': 1800, // 30 minutes
      
      // Dynamic content - medium cache
      'audit_requests': 300, // 5 minutes
      'notifications': 120, // 2 minutes
      'chat_messages': 60, // 1 minute
      
      // Real-time content - short cache
      'audit_progress': 30, // 30 seconds
      'live_notifications': 15, // 15 seconds
      'system_status': 10, // 10 seconds
    };

    const baseTTL = baseTTLs[resourceType] || 300; // Default 5 minutes
    
    // Adjust based on priority
    const priorityMultipliers = {
      high: 0.5, // Shorter cache for high priority
      medium: 1.0,
      low: 2.0 // Longer cache for low priority
    };

    return Math.round(baseTTL * priorityMultipliers[priority]);
  }

  /**
   * Cache invalidation strategies
   */
  getInvalidationStrategy(resourceType: string): {
    tags: string[];
    cascading: string[];
    conditions: string[];
  } {
    const strategies: Record<string, any> = {
      audit_requests: {
        tags: ['audit_requests', 'user_dashboard'],
        cascading: ['audit_progress', 'audit_notifications'],
        conditions: ['status_change', 'assignment_change']
      },
      user_profiles: {
        tags: ['user_profiles', 'auditor_profiles'],
        cascading: ['marketplace_services', 'audit_assignments'],
        conditions: ['profile_update', 'verification_change']
      },
      marketplace_services: {
        tags: ['marketplace', 'services'],
        cascading: ['search_results', 'recommendations'],
        conditions: ['service_update', 'rating_change']
      }
    };

    return strategies[resourceType] || {
      tags: [resourceType],
      cascading: [],
      conditions: ['update']
    };
  }

  /**
   * Implement stale-while-revalidate pattern
   */
  async staleWhileRevalidate<T>(
    cacheKey: string,
    fetchFn: () => Promise<T>,
    options: {
      maxAge: number;
      staleAge: number;
      revalidateOnFocus?: boolean;
    }
  ): Promise<T> {
    const cached = localStorage.getItem(cacheKey);
    const now = Date.now();

    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        const age = now - timestamp;

        // Return cached data if within max age
        if (age < options.maxAge * 1000) {
          // Trigger background revalidation if stale
          if (age > options.staleAge * 1000) {
            this.backgroundRevalidate(cacheKey, fetchFn);
          }
          return data;
        }
      } catch (error) {
        console.warn('Cache parse error:', error);
      }
    }

    // Fetch fresh data
    const freshData = await fetchFn();
    
    // Cache the result
    localStorage.setItem(cacheKey, JSON.stringify({
      data: freshData,
      timestamp: now
    }));

    return freshData;
  }

  private async backgroundRevalidate<T>(
    cacheKey: string,
    fetchFn: () => Promise<T>
  ): Promise<void> {
    try {
      const freshData = await fetchFn();
      localStorage.setItem(cacheKey, JSON.stringify({
        data: freshData,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Background revalidation failed:', error);
    }
  }

  /**
   * Cache warming strategies
   */
  async warmCriticalCaches(userId?: string): Promise<void> {
    const criticalResources = [
      { key: 'user_dashboard', fetchFn: () => this.fetchUserDashboard(userId) },
      { key: 'marketplace_featured', fetchFn: () => this.fetchFeaturedServices() },
      { key: 'system_notifications', fetchFn: () => this.fetchSystemNotifications() }
    ];

    // Warm caches in parallel
    await Promise.allSettled(
      criticalResources.map(async ({ key, fetchFn }) => {
        try {
          const data = await fetchFn();
          const cacheKey = this.generateCacheKey(key, {}, { userId });
          localStorage.setItem(cacheKey, JSON.stringify({
            data,
            timestamp: Date.now()
          }));
        } catch (error) {
          console.warn(`Failed to warm cache for ${key}:`, error);
        }
      })
    );
  }

  private serializeValue(value: any): string {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return String(value);
  }

  private async fetchUserDashboard(userId?: string): Promise<any> {
    // Mock implementation - would fetch actual dashboard data
    return { userId, dashboardData: 'cached' };
  }

  private async fetchFeaturedServices(): Promise<any> {
    // Mock implementation - would fetch featured services
    return { featuredServices: [] };
  }

  private async fetchSystemNotifications(): Promise<any> {
    // Mock implementation - would fetch system notifications
    return { notifications: [] };
  }
}

export const cacheStrategies = CacheStrategies.getInstance();
