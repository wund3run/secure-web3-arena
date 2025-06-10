
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dispute, Profile, DisputeStatus } from "../types/escrow-types";

export const useEscrowDisputes = (profile: Profile | null) => {
  const [disputes, setDisputes] = useState<Record<string, Dispute[]>>({});
  
  const fetchDisputes = async (contractId: string) => {
    try {
      const { data, error } = await supabase
        .from('disputes')
        .select(`
          *,
          raiser:raised_by(*),
          arbitrator:arbitrator_id(*),
          comments:dispute_comments(*, user:user_id(*))
        `)
        .eq('escrow_contract_id', contractId)
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      // Type assertion and transformation
      const typedDisputes = (data || []).map(dispute => {
        const raiser = typeof dispute.raiser === 'object' && dispute.raiser !== null ? 
          dispute.raiser as Profile : 
          undefined;
        
        const arbitrator = typeof dispute.arbitrator === 'object' && dispute.arbitrator !== null ? 
          dispute.arbitrator as Profile : 
          undefined;
          
        return {
          ...dispute,
          raiser,
          arbitrator,
          status: dispute.status as DisputeStatus,
          comments: dispute.comments || []
        } as Dispute;
      });
      
      setDisputes(prev => ({
        ...prev,
        [contractId]: typedDisputes
      }));
      
      return typedDisputes;
    } catch (error) {
      console.error('Error fetching disputes:', error);
      toast.error('Failed to load disputes');
      return [];
    }
  };

  const createDispute = async (dispute: Partial<Dispute>) => {
    if (!profile) {
      toast.error('You must be logged in to create a dispute');
      return null;
    }
    
    try {
      const disputeData = {
        ...dispute,
        raised_by: dispute.raised_by || profile.id,
        escrow_contract_id: dispute.escrow_contract_id,
        reason: dispute.reason || 'No reason provided'
      };
      
      const { data, error } = await supabase
        .from('disputes')
        .insert(disputeData)
        .select()
        .single();
        
      if (error) throw error;
      
      if (dispute.escrow_contract_id) {
        await fetchDisputes(dispute.escrow_contract_id);
      }
      
      toast.success('Dispute created successfully');
      return data.id;
    } catch (error) {
      console.error('Error creating dispute:', error);
      toast.error('Failed to create dispute');
      return null;
    }
  };

  const addDisputeComment = async (disputeId: string, comment: string) => {
    if (!profile) {
      toast.error('You must be logged in to add a comment');
      return false;
    }
    
    try {
      const { error } = await supabase
        .from('dispute_comments')
        .insert({
          dispute_id: disputeId,
          user_id: profile.id,
          comment
        });
        
      if (error) throw error;
      
      toast.success('Comment added successfully');
      return true;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
      return false;
    }
  };

  const resolveDispute = async (disputeId: string, resolution: string) => {
    try {
      const { error } = await supabase
        .from('disputes')
        .update({ 
          status: 'resolved',
          resolution,
          updated_at: new Date().toISOString()
        })
        .eq('id', disputeId);
        
      if (error) throw error;
      
      toast.success('Dispute resolved successfully');
      return true;
    } catch (error) {
      console.error('Error resolving dispute:', error);
      toast.error('Failed to resolve dispute');
      return false;
    }
  };

  return {
    disputes,
    fetchDisputes,
    createDispute,
    addDisputeComment,
    resolveDispute
  };
};
