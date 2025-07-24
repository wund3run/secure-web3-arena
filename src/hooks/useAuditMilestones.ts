import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';

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
  order_index: number;
  completed_at?: string;
  completed_by?: string;
  approval_required?: boolean;
  approved_by?: string;
  approved_at?: string;
  deliverables?: unknown;
  time_estimate_hours?: number;
  actual_time_hours?: number;
}

export const useAuditMilestones = (auditId: string) => {
  const { user } = useAuth();
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
          .order('order_index', { ascending: true });

        if (error) throw error;
        
        // Ensure status values are valid
        const validMilestones = (data || []).map(milestone => ({
          ...milestone,
          status: ['pending', 'in_progress', 'completed'].includes(milestone.status) 
            ? milestone.status 
            : 'pending'
        })) as AuditMilestone[];
        
        setMilestones(validMilestones);
      } catch (error: unknown) {
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
          completed_at: status === 'completed' ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        })
        .eq('id', milestoneId);

      if (error) throw error;
      return true;
    } catch (error: unknown) {
      console.error('Error updating milestone:', error);
      return false;
    }
  };

  const createMilestone = async (milestone: Partial<AuditMilestone>) => {
    if (!user) return false;
    
    try {
      // Get the next order index
      const { data: existingMilestones } = await supabase
        .from('audit_milestones')
        .select('order_index')
        .eq('audit_request_id', auditId)
        .order('order_index', { ascending: false })
        .limit(1);

      const nextOrderIndex = existingMilestones && existingMilestones.length > 0 
        ? existingMilestones[0].order_index + 1 
        : 1;

      const { error } = await supabase
        .from('audit_milestones')
        .insert({
          audit_request_id: auditId,
          title: milestone.title || '',
          description: milestone.description,
          status: milestone.status || 'pending',
          due_date: milestone.due_date,
          order_index: nextOrderIndex,
        });

      if (error) throw error;
      return true;
    } catch (error: unknown) {
      console.error('Error creating milestone:', error);
      return false;
    }
  };

  const updateMilestone = async (milestoneId: string, updates: Partial<AuditMilestone>) => {
    try {
      // Create a properly typed update object for Supabase
      const updateData: Record<string, any> = {};
      
      // Only include fields that are allowed to be updated
      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.status !== undefined) updateData.status = updates.status;
      if (updates.due_date !== undefined) updateData.due_date = updates.due_date;
      if (updates.completion_date !== undefined) updateData.completion_date = updates.completion_date;
      if (updates.completed_at !== undefined) updateData.completed_at = updates.completed_at;
      if (updates.completed_by !== undefined) updateData.completed_by = updates.completed_by;
      if (updates.approval_required !== undefined) updateData.approval_required = updates.approval_required;
      if (updates.approved_by !== undefined) updateData.approved_by = updates.approved_by;
      if (updates.approved_at !== undefined) updateData.approved_at = updates.approved_at;
      if (updates.deliverables !== undefined) updateData.deliverables = updates.deliverables;
      if (updates.time_estimate_hours !== undefined) updateData.time_estimate_hours = updates.time_estimate_hours;
      if (updates.actual_time_hours !== undefined) updateData.actual_time_hours = updates.actual_time_hours;
      if (updates.order_index !== undefined) updateData.order_index = updates.order_index;
      
      // Always update the updated_at timestamp
      updateData.updated_at = new Date().toISOString();

      const { error } = await supabase
        .from('audit_milestones')
        .update(updateData)
        .eq('id', milestoneId);

      if (error) throw error;
      return true;
    } catch (error: unknown) {
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
