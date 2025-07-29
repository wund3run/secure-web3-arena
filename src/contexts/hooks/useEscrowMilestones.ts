
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Milestone } from "../types/escrow-types";

export const useEscrowMilestones = () => {
  const [milestones, setMilestones] = useState<Record<string, Milestone[]>>({});

  const fetchMilestones = async (contractId: string) => {
    try {
      const { data, error } = await supabase
        .from('milestones')
        .select('*')
        .eq('escrow_contract_id', contractId)
        .order('created_at', { ascending: true });
        
      if (error) {
        throw error;
      }
      
      const typedMilestones = (data || []) as Milestone[];
      
      setMilestones(prev => ({
        ...prev,
        [contractId]: typedMilestones
      }));
      
      return typedMilestones;
    } catch (error) {
      console.error('Error fetching milestones:', error);
      toast.error('Failed to load milestones');
      return [];
    }
  };

  const updateMilestone = async (milestoneId: string, completed: boolean) => {
    try {
      const updateData: any = {
        is_completed: completed
      };
      
      if (completed) {
        updateData.completed_at = new Date().toISOString();
      } else {
        updateData.completed_at = null;
      }

      const { error } = await supabase
        .from('milestones')
        .update(updateData)
        .eq('id', milestoneId);
        
      if (error) throw error;
      
      // Refresh milestones for the related contract
      const { data } = await supabase
        .from('milestones')
        .select('escrow_contract_id')
        .eq('id', milestoneId)
        .single();
        
      if (data?.escrow_contract_id) {
        await fetchMilestones(data.escrow_contract_id);
      }
      
      toast.success(`Milestone ${completed ? 'completed' : 'reopened'} successfully`);
      return true;
    } catch (error) {
      console.error('Error updating milestone:', error);
      toast.error('Failed to update milestone');
      return false;
    }
  };

  return {
    milestones,
    fetchMilestones,
    updateMilestone
  };
};
