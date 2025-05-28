
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
      let query = supabase.from('proposals').select('*');
      
      if (auditRequestId) {
        query = query.eq('audit_request_id', auditRequestId);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setProposals(data || []);
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

      const { data, error } = await supabase
        .from('proposals')
        .insert({
          ...proposalData,
          auditor_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Proposal submitted successfully');
      await fetchProposals();
      return data;
    } catch (err: any) {
      toast.error('Failed to submit proposal');
      throw err;
    }
  };

  const updateProposal = async (id: string, updates: Partial<Proposal>) => {
    try {
      const { error } = await supabase
        .from('proposals')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Proposal updated successfully');
      await fetchProposals();
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
