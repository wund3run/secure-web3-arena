
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dispute, Profile, DisputeComment, DisputeStatus } from "../types/escrow-types";

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
        .eq('project_id', contractId)
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      // Type assertion and transformation
      const typedDisputes = (data || []).map(dispute => {
        // Handle raiser
        const raiser = typeof dispute.raiser === 'object' && dispute.raiser !== null ? 
          dispute.raiser as Profile : 
          undefined;
        
        // Handle arbitrator
        const arbitrator = typeof dispute.arbitrator === 'object' && dispute.arbitrator !== null ? 
          dispute.arbitrator as Profile : 
          undefined;
        
        // Handle comments
        const comments = Array.isArray(dispute.comments) ?
          dispute.comments.map(comment => {
            const user = typeof comment.user === 'object' && comment.user !== null ?
              comment.user as Profile :
              undefined;
            
            return {
              ...comment,
              user
            } as DisputeComment;
          }) :
          undefined;

        // Map database status to our DisputeStatus type
        const mappedStatus = mapDatabaseDisputeStatus(dispute.status);
          
        return {
          ...dispute,
          raiser,
          arbitrator,
          comments,
          status: mappedStatus,
          // Map missing fields to undefined for compatibility
          escrow_contract_id: undefined,
          reason: undefined,
          evidence: undefined
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

  const mapDatabaseDisputeStatus = (dbStatus: string): DisputeStatus => {
    // Map database status values to our TypeScript enum
    switch (dbStatus) {
      case 'in_progress':
        return 'in_review';
      case 'escalated':
        return 'in_review';
      default:
        return dbStatus as DisputeStatus;
    }
  };

  const createDispute = async (dispute: Partial<Dispute>) => {
    if (!profile) {
      toast.error('You must be logged in to create a dispute');
      return null;
    }
    if (!dispute.project_id) {
      toast.error('Project ID is required');
      return null;
    }
    try {
      // Prepare data for database insertion, mapping our types to database types
      const disputeData = {
        project_id: dispute.project_id,
        raised_by: dispute.raised_by || profile.id,
        against: dispute.against ?? '',
        status: 'opened' as const,
        resolution_notes: dispute.resolution_notes ?? '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      const { data, error } = await supabase
        .from('disputes')
        .insert(disputeData)
        .select()
        .single();
      if (error) throw error;
      // Update contract status to disputed
      if (dispute.escrow_contract_id) {
        await fetchDisputes(dispute.project_id);
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
      toast.error('You must be logged in to comment on a dispute');
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
      
      // Refresh the disputes for the related project
      const { data } = await supabase
        .from('disputes')
        .select('project_id')
        .eq('id', disputeId)
        .single();
      if (data?.project_id) {
        await fetchDisputes(data.project_id);
      }
      
      toast.success('Comment added successfully');
      return true;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
      return false;
    }
  };

  const resolveDispute = async (disputeId: string, resolution: string) => {
    if (!profile) {
      toast.error('You must be logged in to resolve a dispute');
      return false;
    }
    
    try {
      const { data, error } = await supabase
        .from('disputes')
        .update({
          status: 'resolved' as const,
          resolution_notes: resolution,
          arbitrator_id: profile.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', disputeId)
        .select('project_id')
        .single();
      if (error) throw error;
      if (data?.project_id) {
        await fetchDisputes(data.project_id);
      }
      
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
