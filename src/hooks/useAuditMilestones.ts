
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AuditMilestone {
  id: string;
  audit_request_id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  due_date?: string;
  completion_date?: string;
  created_at: string;
  updated_at: string;
}

export const useAuditMilestones = (auditId: string) => {
  const [milestones, setMilestones] = useState<AuditMilestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auditId) return;

    const fetchMilestones = async () => {
      try {
        const { data, error } = await supabase
          .from('audit_milestones')
          .select('*')
          .eq('audit_request_id', auditId)
          .order('created_at', { ascending: true });

        if (error) throw error;
        
        // Ensure status values are valid
        const validMilestones = (data || []).map(milestone => ({
          ...milestone,
          status: ['pending', 'in_progress', 'completed'].includes(milestone.status) 
            ? milestone.status 
            : 'pending'
        })) as AuditMilestone[];
        
        setMilestones(validMilestones);
      } catch (error) {
        console.error('Error fetching milestones:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMilestones();

    // Set up real-time subscription
    const channel = supabase
      .channel(`milestones-${auditId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'audit_milestones',
          filter: `audit_request_id=eq.${auditId}`,
        },
        () => {
          fetchMilestones();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [auditId]);

  const updateMilestoneStatus = async (milestoneId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('audit_milestones')
        .update({ 
          status,
          completion_date: status === 'completed' ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        })
        .eq('id', milestoneId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating milestone:', error);
      return false;
    }
  };

  const createMilestone = async (milestone: Partial<AuditMilestone>) => {
    try {
      const { error } = await supabase
        .from('audit_milestones')
        .insert({
          ...milestone,
          audit_request_id: auditId,
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error creating milestone:', error);
      return false;
    }
  };

  const updateMilestone = async (milestoneId: string, updates: Partial<AuditMilestone>) => {
    try {
      const { error } = await supabase
        .from('audit_milestones')
        .update(updates)
        .eq('id', milestoneId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating milestone:', error);
      return false;
    }
  };

  return {
    milestones,
    isLoading,
    loading: isLoading, // Alias for backward compatibility
    updateMilestoneStatus,
    createMilestone,
    updateMilestone,
    completeMilestone: (milestoneId: string) => updateMilestoneStatus(milestoneId, 'completed'),
    approveMilestone: (milestoneId: string) => updateMilestone(milestoneId, { status: 'completed' })
  };
};
