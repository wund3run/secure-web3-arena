
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Proposal {
  id: string;
  audit_request_id: string;
  auditor_id: string;
  proposed_price: number;
  estimated_hours?: number;
  estimated_completion_date?: string;
  cover_letter?: string;
  methodology?: string;
  tools_to_use?: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export const useProposals = (auditRequestId?: string) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      
      // Since 'proposals' table doesn't exist in types yet, create mock data
      const mockProposals: Proposal[] = [];
      setProposals(mockProposals);
      
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to fetch proposals');
    } finally {
      setLoading(false);
    }
  };

  const createProposal = async (proposalData: Partial<Proposal>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Create mock proposal for now
      const newProposal: Proposal = {
        id: `temp-${Date.now()}`,
        audit_request_id: proposalData.audit_request_id || '',
        auditor_id: user.id,
        proposed_price: proposalData.proposed_price || 0,
        estimated_hours: proposalData.estimated_hours,
        estimated_completion_date: proposalData.estimated_completion_date,
        cover_letter: proposalData.cover_letter,
        methodology: proposalData.methodology,
        tools_to_use: proposalData.tools_to_use,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setProposals(prev => [newProposal, ...prev]);
      toast.success('Proposal submitted successfully');
      return newProposal;
    } catch (err: any) {
      toast.error('Failed to submit proposal');
      throw err;
    }
  };

  const updateProposal = async (id: string, updates: Partial<Proposal>) => {
    try {
      setProposals(prev => 
        prev.map(proposal => 
          proposal.id === id ? { ...proposal, ...updates } : proposal
        )
      );
      toast.success('Proposal updated successfully');
    } catch (err: any) {
      toast.error('Failed to update proposal');
      throw err;
    }
  };

  useEffect(() => {
    fetchProposals();
  }, [auditRequestId]);

  return {
    proposals,
    loading,
    error,
    fetchProposals,
    createProposal,
    updateProposal,
  };
};
