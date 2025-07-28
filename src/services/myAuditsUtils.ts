// Utility functions for My Audits Dashboard
import { supabase } from '@/integrations/supabase/client';
import type { AuditRequest } from '@/types/audit-request.types';

export async function getMyAudits(): Promise<AuditRequest[]> {
  // Replace with actual user ID fetch logic
  const userId = supabase.auth.user()?.id;
  if (!userId) return [];
  const { data, error } = await supabase
    .from('audit_requests')
    .select('*')
    .eq('client_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

// Approval Center utilities
export async function getApprovalRequests(): Promise<any[]> {
  const { data, error } = await supabase
    .from('approval_requests')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function approveRequest(id: string): Promise<void> {
  await supabase
    .from('approval_requests')
    .update({ status: 'approved' })
    .eq('id', id);
}

export async function rejectRequest(id: string): Promise<void> {
  await supabase
    .from('approval_requests')
    .update({ status: 'rejected' })
    .eq('id', id);
}
