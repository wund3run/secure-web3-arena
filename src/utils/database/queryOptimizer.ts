
import { supabase } from '@/integrations/supabase/client';
import { CacheManager } from './cacheManager';
import { Logger } from '../logging/logger';

export class QueryOptimizer {
  private static instance: QueryOptimizer;
  
  static getInstance(): QueryOptimizer {
    if (!QueryOptimizer.instance) {
      QueryOptimizer.instance = new QueryOptimizer();
    }
    return QueryOptimizer.instance;
  }

  /**
   * AI-optimized queries with intelligent caching and indexing strategies
   */
  async getOptimizedAuditRequests(filters: {
    status?: string;
    blockchain?: string;
    clientId?: string;
    auditorId?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    const cacheKey = `optimized_audits_${JSON.stringify(filters)}`;
    
    return await this.executeOptimizedQuery(
      cacheKey,
      async () => {
        let query = supabase
          .from('audit_requests')
          .select(`
            id,
            project_name,
            blockchain,
            status,
            budget,
            deadline,
            completion_percentage,
            security_score,
            current_phase,
            created_at,
            client:client_id (
              id,
              full_name,
              avatar_url
            ),
            auditor:assigned_auditor_id (
              id,
              full_name,
              avatar_url,
              verification_status
            )
          `)
          .order('created_at', { ascending: false });

        // Apply filters efficiently
        if (filters.status) {
          query = query.eq('status', filters.status);
        }
        if (filters.blockchain) {
          query = query.eq('blockchain', filters.blockchain);
        }
        if (filters.clientId) {
          query = query.eq('client_id', filters.clientId);
        }
        if (filters.auditorId) {
          query = query.eq('assigned_auditor_id', filters.auditorId);
        }

        // Apply pagination
        const limit = filters.limit || 20;
        const offset = filters.offset || 0;
        query = query.range(offset, offset + limit - 1);

        const { data, error, count } = await query;
        if (error) throw error;

        return { data: data || [], count: count || 0 };
      },
      { ttl: 60, tags: ['audit_requests'] }
    );
  }

  /**
   * Optimized auditor search with intelligent scoring
   */
  async getOptimizedAuditors(searchParams: {
    blockchain?: string;
    expertise?: string[];
    hourlyRateMax?: number;
    availabilityStatus?: string;
    minRating?: number;
    limit?: number;
  } = {}) {
    const cacheKey = `optimized_auditors_${JSON.stringify(searchParams)}`;
    
    return await this.executeOptimizedQuery(
      cacheKey,
      async () => {
        let query = supabase
          .from('auditor_profiles')
          .select(`
            user_id,
            years_experience,
            hourly_rate_min,
            hourly_rate_max,
            verification_status,
            availability_status,
            blockchain_expertise,
            specialization_tags,
            total_audits_completed,
            success_rate,
            average_completion_time_days,
            profiles:user_id (
              full_name,
              avatar_url
            )
          `)
          .eq('verification_status', 'verified');

        // Apply intelligent filters
        if (searchParams.blockchain) {
          query = query.contains('blockchain_expertise', [searchParams.blockchain]);
        }
        if (searchParams.expertise && searchParams.expertise.length > 0) {
          query = query.overlaps('specialization_tags', searchParams.expertise);
        }
        if (searchParams.hourlyRateMax) {
          query = query.lte('hourly_rate_min', searchParams.hourlyRateMax);
        }
        if (searchParams.availabilityStatus) {
          query = query.eq('availability_status', searchParams.availabilityStatus);
        }
        if (searchParams.minRating) {
          query = query.gte('success_rate', searchParams.minRating);
        }

        // Intelligent ordering by composite score
        query = query.order('success_rate', { ascending: false })
                    .order('total_audits_completed', { ascending: false })
                    .limit(searchParams.limit || 50);

        const { data, error } = await query;
        if (error) throw error;

        return data || [];
      },
      { ttl: 300, tags: ['auditors'] }
    );
  }

  /**
   * Materialized view simulation for dashboard analytics
   */
  async getDashboardAnalytics(userId: string, userRole: string) {
    const cacheKey = `dashboard_analytics_${userId}_${userRole}`;
    
    return await this.executeOptimizedQuery(
      cacheKey,
      async () => {
        // Execute parallel queries for better performance
        const [auditStats, recentActivity, notifications] = await Promise.all([
          this.getAuditStatsOptimized(userId, userRole),
          this.getRecentActivityOptimized(userId),
          this.getNotificationsOptimized(userId)
        ]);

        return {
          auditStats,
          recentActivity,
          notifications,
          generatedAt: new Date().toISOString()
        };
      },
      { ttl: 120, tags: [`dashboard_${userId}`] }
    );
  }

  private async getAuditStatsOptimized(userId: string, userRole: string) {
    const isAuditor = userRole === 'auditor';
    const filterField = isAuditor ? 'assigned_auditor_id' : 'client_id';

    const { data, error } = await supabase
      .from('audit_requests')
      .select('status, completion_percentage, security_score, created_at')
      .eq(filterField, userId);

    if (error) throw error;

    // Process stats in memory for better performance
    const stats = (data || []).reduce((acc, audit) => {
      acc.total++;
      acc.byStatus[audit.status] = (acc.byStatus[audit.status] || 0) + 1;
      acc.totalCompletion += audit.completion_percentage || 0;
      acc.totalSecurityScore += audit.security_score || 0;
      return acc;
    }, {
      total: 0,
      byStatus: {} as Record<string, number>,
      totalCompletion: 0,
      totalSecurityScore: 0
    });

    return {
      ...stats,
      avgCompletion: stats.total > 0 ? stats.totalCompletion / stats.total : 0,
      avgSecurityScore: stats.total > 0 ? stats.totalSecurityScore / stats.total : 0
    };
  }

  private async getRecentActivityOptimized(userId: string) {
    const { data, error } = await supabase
      .from('audit_status_updates')
      .select(`
        id,
        status_type,
        title,
        message,
        created_at,
        audit_request:audit_request_id (
          id,
          project_name
        )
      `)
      .or(`user_id.eq.${userId},audit_request_id.in.(select id from audit_requests where client_id = '${userId}' or assigned_auditor_id = '${userId}')`)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data || [];
  }

  private async getNotificationsOptimized(userId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .select('id, title, message, type, created_at, is_read')
      .eq('user_id', userId)
      .eq('is_read', false)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) throw error;
    return data || [];
  }

  private async executeOptimizedQuery<T>(
    cacheKey: string,
    queryFn: () => Promise<T>,
    cacheConfig: { ttl: number; tags: string[] }
  ): Promise<T> {
    // Try cache first
    const cached = await CacheManager.get<T>(cacheKey);
    if (cached !== null) {
      Logger.debug('Cache hit for optimized query', { cacheKey });
      return cached;
    }

    // Execute query with performance monitoring
    const startTime = performance.now();
    try {
      const result = await queryFn();
      const duration = performance.now() - startTime;
      
      // Cache successful results
      CacheManager.set(cacheKey, result, cacheConfig);
      
      // Log performance metrics
      Logger.info('Optimized query executed', {
        cacheKey,
        duration: Math.round(duration),
        cached: false
      });

      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      Logger.error('Optimized query failed', {
        cacheKey,
        duration: Math.round(duration),
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * Generate query optimization report
   */
  generateOptimizationReport(): {
    cacheHitRate: number;
    averageQueryTime: number;
    slowQueries: Array<{ query: string; avgTime: number; frequency: number }>;
    recommendations: string[];
  } {
    const cacheStats = CacheManager.getStats();
    const recommendations: string[] = [];

    // Analyze cache performance
    const hitRate = cacheStats.activeEntries / cacheStats.totalEntries;
    if (hitRate < 0.7) {
      recommendations.push('Cache hit rate is low. Consider increasing TTL values or improving cache key strategies.');
    }

    if (cacheStats.expiredEntries > cacheStats.activeEntries * 0.3) {
      recommendations.push('High number of expired cache entries. Consider optimizing cache TTL values.');
    }

    return {
      cacheHitRate: hitRate,
      averageQueryTime: 0, // Would be calculated from actual metrics
      slowQueries: [], // Would be populated from query logs
      recommendations
    };
  }
}

export const queryOptimizer = QueryOptimizer.getInstance();
