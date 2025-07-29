import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { withErrorHandling } from "@/utils/apiErrorHandler";

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
    setLoading(true);
    const result = await withErrorHandling(
      async () => {
        const { data, error } = await supabase
          .from('audit_requests')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
      },
      {
        customMessage: 'Failed to fetch audit requests',
        context: 'Audit Requests'
      }
    );
    
    if (result) {
      setAuditRequests(result as AuditRequest[]);
      setError(null);
    }
    setLoading(false);
  };

  const createAuditRequest = async (requestData: Partial<AuditRequest>) => {
    return withErrorHandling(
      async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

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
        await fetchAuditRequests();
        return data;
      },
      {
        customMessage: 'Failed to create audit request',
        context: 'Audit Requests'
      }
    );
  };

  const updateAuditRequest = async (id: string, updates: Partial<AuditRequest>) => {
    return withErrorHandling(
      async () => {
        const { error } = await supabase
          .from('audit_requests')
          .update(updates)
          .eq('id', id);

        if (error) throw error;
        await fetchAuditRequests();
      },
      {
        customMessage: 'Failed to update audit request',
        context: 'Audit Requests'
      }
    );
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
