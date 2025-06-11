
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
        setMilestones(data || []);
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

  return {
    milestones,
    isLoading,
    updateMilestoneStatus
  };
};
