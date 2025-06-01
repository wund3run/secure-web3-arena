
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

export interface AuditMilestone {
  id: string;
  audit_request_id: string;
  title: string;
  description?: string;
  order_index: number;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked' | 'cancelled';
  due_date?: string;
  completed_at?: string;
  completed_by?: string;
  approval_required: boolean;
  approved_by?: string;
  approved_at?: string;
  deliverables: any[];
  time_estimate_hours?: number;
  actual_time_hours?: number;
  created_at: string;
  updated_at: string;
}

export const useAuditMilestones = (auditRequestId: string) => {
  const { user } = useAuth();
  const [milestones, setMilestones] = useState<AuditMilestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMilestones = useCallback(async () => {
    if (!auditRequestId || !user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('audit_milestones')
        .select('*')
        .eq('audit_request_id', auditRequestId)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setMilestones(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Failed to fetch milestones:', err);
    } finally {
      setLoading(false);
    }
  }, [auditRequestId, user]);

  const createMilestone = useCallback(async (milestone: Omit<AuditMilestone, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('audit_milestones')
        .insert({
          ...milestone,
          audit_request_id: auditRequestId,
        })
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Milestone created successfully');
      await fetchMilestones();
      return data;
    } catch (err: any) {
      toast.error('Failed to create milestone');
      throw err;
    }
  }, [user, auditRequestId, fetchMilestones]);

  const updateMilestone = useCallback(async (milestoneId: string, updates: Partial<AuditMilestone>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('audit_milestones')
        .update(updates)
        .eq('id', milestoneId);

      if (error) throw error;
      
      toast.success('Milestone updated successfully');
      await fetchMilestones();
    } catch (err: any) {
      toast.error('Failed to update milestone');
      throw err;
    }
  }, [user, fetchMilestones]);

  const completeMilestone = useCallback(async (milestoneId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('audit_milestones')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          completed_by: user.id,
        })
        .eq('id', milestoneId);

      if (error) throw error;
      
      toast.success('Milestone completed successfully');
      await fetchMilestones();
    } catch (err: any) {
      toast.error('Failed to complete milestone');
      throw err;
    }
  }, [user, fetchMilestones]);

  const approveMilestone = useCallback(async (milestoneId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('audit_milestones')
        .update({
          approved_by: user.id,
          approved_at: new Date().toISOString(),
        })
        .eq('id', milestoneId);

      if (error) throw error;
      
      toast.success('Milestone approved successfully');
      await fetchMilestones();
    } catch (err: any) {
      toast.error('Failed to approve milestone');
      throw err;
    }
  }, [user, fetchMilestones]);

  useEffect(() => {
    fetchMilestones();

    // Set up real-time subscription
    const channel = supabase
      .channel('audit_milestones_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'audit_milestones',
          filter: `audit_request_id=eq.${auditRequestId}`,
        },
        () => {
          fetchMilestones();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchMilestones, auditRequestId]);

  return {
    milestones,
    loading,
    error,
    createMilestone,
    updateMilestone,
    completeMilestone,
    approveMilestone,
    refetch: fetchMilestones,
  };
};
