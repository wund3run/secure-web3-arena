import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AuditRequest {
  id: string;
  client_id: string;
  project_name: string;
  project_description?: string;
  blockchain: string;
  repository_url?: string;
  contract_count?: number;
  lines_of_code?: number;
  deadline?: string;
  budget?: number;
  audit_scope?: string;
  previous_audits?: boolean;
  specific_concerns?: string;
  urgency_level?: string;
  status?: string;
  assigned_auditor_id?: string;
  estimated_hours?: number;
  priority_level?: string;
  complexity_score?: number;
  created_at: string;
  updated_at: string;
}

export const useAuditRequests = () => {
  const [auditRequests, setAuditRequests] = useState<AuditRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuditRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('audit_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAuditRequests(data || []);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to fetch audit requests');
    } finally {
      setLoading(false);
    }
  };

  const createAuditRequest = async (requestData: Partial<AuditRequest>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Ensure required fields are present
      const insertData = {
        client_id: user.id,
        project_name: requestData.project_name || '',
        blockchain: requestData.blockchain || '',
        project_description: requestData.project_description,
        repository_url: requestData.repository_url,
        contract_count: requestData.contract_count,
        lines_of_code: requestData.lines_of_code,
        deadline: requestData.deadline,
        budget: requestData.budget,
        audit_scope: requestData.audit_scope,
        previous_audits: requestData.previous_audits,
        specific_concerns: requestData.specific_concerns,
        urgency_level: requestData.urgency_level,
        status: requestData.status || 'pending'
      };

      const { data, error } = await supabase
        .from('audit_requests')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Audit request created successfully');
      await fetchAuditRequests();
      return data;
    } catch (err: any) {
      toast.error('Failed to create audit request');
      throw err;
    }
  };

  const updateAuditRequest = async (id: string, updates: Partial<AuditRequest>) => {
    try {
      const { error } = await supabase
        .from('audit_requests')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Audit request updated successfully');
      await fetchAuditRequests();
    } catch (err: any) {
      toast.error('Failed to update audit request');
      throw err;
    }
  };

  useEffect(() => {
    fetchAuditRequests();
  }, []);

  return {
    auditRequests,
    loading,
    error,
    fetchAuditRequests,
    createAuditRequest,
    updateAuditRequest,
  };
};
