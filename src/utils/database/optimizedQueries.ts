
import { supabase } from '@/integrations/supabase/client';
import { cachedQuery, CacheManager } from './cacheManager';
import { Logger, performanceLogger } from '../logging/logger';

export class OptimizedQueries {
  // Optimized audit requests query with selective field loading
  static async getAuditRequestsWithPagination(
    page: number = 1,
    limit: number = 20,
    filters?: {
      status?: string;
      blockchain?: string;
      userId?: string;
      assignedAuditorId?: string;
    }
  ) {
    const cacheKey = `audit_requests_${page}_${limit}_${JSON.stringify(filters)}`;
    const stopTimer = Logger.startTimer('get_audit_requests_paginated');

    try {
      return await cachedQuery(
        cacheKey,
        async () => {
          const offset = (page - 1) * limit;
          
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
              client:client_id!inner (
                id,
                full_name,
                avatar_url
              ),
              auditor:assigned_auditor_id (
                id,
                full_name,
                avatar_url
              )
            `)
            .range(offset, offset + limit - 1)
            .order('created_at', { ascending: false });

          // Apply filters
          if (filters?.status) {
            query = query.eq('status', filters.status);
          }
          if (filters?.blockchain) {
            query = query.eq('blockchain', filters.blockchain);
          }
          if (filters?.userId) {
            query = query.eq('client_id', filters.userId);
          }
          if (filters?.assignedAuditorId) {
            query = query.eq('assigned_auditor_id', filters.assignedAuditorId);
          }

          const { data, error, count } = await query;
          if (error) throw error;

          return { data: data || [], count: count || 0 };
        },
        { ttl: 120, tags: ['audit_requests'] } // Cache for 2 minutes
      );
    } finally {
      stopTimer();
    }
  }

  // Optimized audit details query with selective loading
  static async getAuditDetailsOptimized(auditId: string) {
    const cacheKey = `audit_details_${auditId}`;
    const stopTimer = Logger.startTimer('get_audit_details');

    try {
      return await cachedQuery(
        cacheKey,
        async () => {
          // Use Promise.all for parallel queries
          const [auditData, findings, deliverables, statusUpdates, milestones, reports, timeEntries] = await Promise.all([
            // Main audit data
            supabase
              .from('audit_requests')
              .select(`
                *,
                client:client_id (id, full_name, avatar_url),
                auditor:assigned_auditor_id (id, full_name, avatar_url)
              `)
              .eq('id', auditId)
              .single(),

            // Findings with counts
            supabase
              .from('audit_findings')
              .select('id, severity, status, title, created_at')
              .eq('audit_request_id', auditId)
              .order('created_at', { ascending: false }),

            // Deliverables
            supabase
              .from('audit_deliverables')
              .select('id, title, status, due_date, delivered_at')
              .eq('audit_request_id', auditId)
              .order('created_at', { ascending: false }),

            // Recent status updates
            supabase
              .from('audit_status_updates')
              .select('*')
              .eq('audit_request_id', auditId)
              .order('created_at', { ascending: false })
              .limit(10),

            // Milestones
            supabase
              .from('audit_milestones')
              .select('*')
              .eq('audit_request_id', auditId)
              .order('order_index', { ascending: true }),

            // Reports
            supabase
              .from('audit_reports')
              .select('id, title, report_type, status, version, created_at')
              .eq('audit_request_id', auditId)
              .order('created_at', { ascending: false }),

            // Time tracking summary
            supabase
              .from('audit_time_tracking')
              .select('id, activity_type, duration_minutes, billable, start_time')
              .eq('audit_request_id', auditId)
              .order('start_time', { ascending: false })
              .limit(5)
          ]);

          // Process findings count
          const findingsCount = {
            critical: findings.data?.filter(f => f.severity === 'critical').length || 0,
            high: findings.data?.filter(f => f.severity === 'high').length || 0,
            medium: findings.data?.filter(f => f.severity === 'medium').length || 0,
            low: findings.data?.filter(f => f.severity === 'low').length || 0,
          };

          return {
            audit: auditData.data,
            findings: findings.data || [],
            deliverables: deliverables.data || [],
            statusUpdates: statusUpdates.data || [],
            milestones: milestones.data || [],
            reports: reports.data || [],
            timeEntries: timeEntries.data || [],
            findingsCount
          };
        },
        { ttl: 60, tags: [`audit_${auditId}`] } // Cache for 1 minute
      );
    } finally {
      stopTimer();
    }
  }

  // Optimized auditor profiles query
  static async getAuditorsOptimized(filters?: {
    blockchain?: string;
    availability?: string;
    hourlyRateMax?: number;
  }) {
    const cacheKey = `auditors_${JSON.stringify(filters)}`;
    
    return await cachedQuery(
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
            profiles:user_id (
              full_name,
              avatar_url
            )
          `)
          .eq('verification_status', 'verified')
          .eq('availability_status', 'available');

        if (filters?.blockchain) {
          query = query.contains('blockchain_expertise', [filters.blockchain]);
        }
        if (filters?.hourlyRateMax) {
          query = query.lte('hourly_rate_min', filters.hourlyRateMax);
        }

        const { data, error } = await query.order('success_rate', { ascending: false });
        if (error) throw error;

        return data || [];
      },
      { ttl: 300, tags: ['auditors'] } // Cache for 5 minutes
    );
  }

  // Invalidation helpers
  static invalidateAuditCache(auditId: string) {
    CacheManager.invalidateByTag(`audit_${auditId}`);
    CacheManager.invalidateByTag('audit_requests');
    Logger.info('Cache invalidated for audit', { auditId }, 'cache');
  }

  static invalidateAuditorCache() {
    CacheManager.invalidateByTag('auditors');
    Logger.info('Auditor cache invalidated', {}, 'cache');
  }

  // Performance monitoring wrapper
  static async monitoredQuery<T>(
    queryName: string,
    queryFn: () => Promise<T>,
    context?: any
  ): Promise<T> {
    const startTime = performance.now();
    const correlationId = Logger.generateCorrelationId();

    try {
      Logger.debug(`Starting query: ${queryName}`, { correlationId, ...context });
      const result = await queryFn();
      
      const duration = performance.now() - startTime;
      performanceLogger.databaseQuery(queryName, duration, { correlationId });
      
      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      Logger.error(`Query failed: ${queryName}`, {
        correlationId,
        duration: Math.round(duration),
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' },
        ...context
      });
      throw error;
    }
  }
}
