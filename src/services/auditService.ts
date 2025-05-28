
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { AuditRequest } from '@/types/audit-request.types';

export class AuditService {
  // Get all audit requests for the current user
  static async getUserAuditRequests(userId: string): Promise<AuditRequest[]> {
    try {
      const { data, error } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('client_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch audit requests:', error);
      toast.error('Failed to load audit requests');
      return [];
    }
  }

  // Get a specific audit request by ID
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

  // Get all pending audit requests (for auditors)
  static async getPendingAuditRequests(): Promise<AuditRequest[]> {
    try {
      const { data, error } = await supabase
        .from('audit_requests')
        .select(`
          *,
          profiles:client_id (
            full_name,
            avatar_url
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch pending audit requests:', error);
      return [];
    }
  }

  // Update audit request status
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
      
      toast.success('Audit status updated successfully');
      return true;
    } catch (error) {
      console.error('Failed to update audit status:', error);
      toast.error('Failed to update audit status');
      return false;
    }
  }

  // Assign auditor to audit request
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
      
      toast.success('Auditor assigned successfully');
      return true;
    } catch (error) {
      console.error('Failed to assign auditor:', error);
      toast.error('Failed to assign auditor');
      return false;
    }
  }
}
