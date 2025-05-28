
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { AuditProposal } from '@/types/auditor';

export const useAuditProposals = () => {
  const [proposals, setProposals] = useState<AuditProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProposals = async (auditRequestId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('audit_proposals')
        .select(`
          *,
          auditor_profiles (
            business_name,
            verification_status,
            total_audits_completed,
            blockchain_expertise
          )
        `);

      if (auditRequestId) {
        query = query.eq('audit_request_id', auditRequestId);
      }

      const { data, error } = await query.order('submitted_at', { ascending: false });

      if (error) throw error;
      setProposals(data || []);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to fetch proposals');
    } finally {
      setLoading(false);
    }
  };

  const submitProposal = async (proposalData: Omit<AuditProposal, 'id' | 'submitted_at' | 'responded_at' | 'status'>) => {
    try {
      const { data, error } = await supabase
        .from('audit_proposals')
        .insert(proposalData)
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Proposal submitted successfully');
      await fetchProposals(proposalData.audit_request_id);
      return data;
    } catch (err: any) {
      toast.error('Failed to submit proposal');
      throw err;
    }
  };

  const updateProposalStatus = async (proposalId: string, status: AuditProposal['status']) => {
    try {
      const { error } = await supabase
        .from('audit_proposals')
        .update({ 
          status,
          responded_at: new Date().toISOString()
        })
        .eq('id', proposalId);

      if (error) throw error;

      // If accepted, update audit request with assigned auditor
      if (status === 'accepted') {
        const proposal = proposals.find(p => p.id === proposalId);
        if (proposal) {
          const { error: updateError } = await supabase
            .from('audit_requests')
            .update({ 
              assigned_auditor_id: proposal.auditor_id,
              status: 'in_progress'
            })
            .eq('id', proposal.audit_request_id);

          if (updateError) throw updateError;

          // Create initial audit progress entry
          const { error: progressError } = await supabase
            .from('audit_progress')
            .insert({
              audit_request_id: proposal.audit_request_id,
              auditor_id: proposal.auditor_id,
              current_phase: 'initial_review',
              progress_percentage: 0,
              total_milestones: proposal.milestones.length || 3,
              actual_start_date: new Date().toISOString()
            });

          if (progressError) throw progressError;
        }
      }
      
      toast.success(`Proposal ${status} successfully`);
      await fetchProposals();
    } catch (err: any) {
      toast.error(`Failed to ${status} proposal`);
      throw err;
    }
  };

  return {
    proposals,
    loading,
    error,
    fetchProposals,
    submitProposal,
    updateProposalStatus,
  };
};
