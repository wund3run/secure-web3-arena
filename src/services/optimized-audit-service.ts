
import { supabase } from '@/integrations/supabase/client';
import { dbOptimizer } from '@/utils/database-optimizer';
import { toast } from 'sonner';
import type { AuditRequest } from '@/types/audit-request.types';

export class OptimizedAuditService {
  private static readonly CACHE_KEYS = {
    USER_AUDITS: (userId: string) => `user_audits_${userId}`,
    PENDING_AUDITS: 'pending_audits',
    AUDIT_DETAILS: (id: string) => `audit_${id}`,
  };

  static async getUserAuditRequests(userId: string): Promise<AuditRequest[]> {
    try {
      return await dbOptimizer.optimizedQuery(
        () => supabase
          .from('audit_requests')
          .select('*')
          .eq('client_id', userId)
          .order('created_at', { ascending: false }),
        this.CACHE_KEYS.USER_AUDITS(userId),
        { cache: true, retries: 2 }
      ) || [];
    } catch (error) {
      console.error('Failed to fetch audit requests:', error);
      toast.error('Failed to load audit requests');
      return [];
    }
  }

  static async getAuditRequest(id: string): Promise<AuditRequest | null> {
    try {
      const { data, error } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to fetch audit request:', error);
      return null;
    }
  }

  static async getPendingAuditRequests(): Promise<AuditRequest[]> {
    try {
      return await dbOptimizer.optimizedQuery(
        () => supabase
          .from('audit_requests')
          .select(`
            *,
            profiles:client_id (
              full_name,
              avatar_url
            )
          `)
          .eq('status', 'pending')
          .order('created_at', { ascending: false }),
        this.CACHE_KEYS.PENDING_AUDITS,
        { cache: true, retries: 2 }
      ) || [];
    } catch (error) {
      console.error('Failed to fetch pending audit requests:', error);
      return [];
    }
  }

  static async updateAuditStatus(id: string, status: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('audit_requests')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      // Invalidate relevant caches
      this.invalidateCache(id);
      
      toast.success('Audit status updated successfully');
      return true;
    } catch (error) {
      console.error('Failed to update audit status:', error);
      toast.error('Failed to update audit status');
      return false;
    }
  }

  static async assignAuditor(auditId: string, auditorId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('audit_requests')
        .update({ 
          assigned_auditor_id: auditorId,
          status: 'in_progress',
          updated_at: new Date().toISOString()
        })
        .eq('id', auditId);

      if (error) throw error;

      // Invalidate relevant caches
      this.invalidateCache(auditId);
      
      toast.success('Auditor assigned successfully');
      return true;
    } catch (error) {
      console.error('Failed to assign auditor:', error);
      toast.error('Failed to assign auditor');
      return false;
    }
  }

  private static invalidateCache(auditId: string): void {
    // In a real implementation, you'd have a more sophisticated cache invalidation
    dbOptimizer.cleanupCache();
  }

  static async batchUpdateAudits(updates: Array<{ id: string; updates: Partial<AuditRequest> }>): Promise<boolean> {
    try {
      const promises = updates.map(({ id, updates: updateData }) =>
        supabase
          .from('audit_requests')
          .update(updateData)
          .eq('id', id)
      );

      const results = await Promise.allSettled(promises);
      const failed = results.filter(result => result.status === 'rejected');

      if (failed.length > 0) {
        console.error('Some batch updates failed:', failed);
        toast.error(`${failed.length} updates failed`);
        return false;
      }

      toast.success(`${updates.length} audits updated successfully`);
      return true;
    } catch (error) {
      console.error('Batch update failed:', error);
      toast.error('Batch update failed');
      return false;
    }
  }
}
