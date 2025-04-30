
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
        .order('created_at');
        
      if (error) {
        throw error;
      }
      
      setMilestones(prev => ({
        ...prev,
        [contractId]: data || []
      }));
      
      return data || [];
    } catch (error) {
      console.error('Error fetching milestones:', error);
      toast.error('Failed to load milestones');
      return [];
    }
  };

  const updateMilestone = async (milestone: Partial<Milestone>) => {
    if (!milestone.id) {
      toast.error('Milestone ID is required');
      return false;
    }
    
    try {
      const { error } = await supabase
        .from('milestones')
        .update(milestone)
        .eq('id', milestone.id);
        
      if (error) throw error;
      
      if (milestone.escrow_contract_id) {
        await fetchMilestones(milestone.escrow_contract_id);
      }
      
      toast.success('Milestone updated successfully');
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
