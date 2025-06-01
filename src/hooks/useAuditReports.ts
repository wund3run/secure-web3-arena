
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

export interface AuditReport {
  id: string;
  audit_request_id: string;
  report_type: 'preliminary' | 'interim' | 'final' | 'executive_summary';
  title: string;
  version: string;
  status: 'draft' | 'review' | 'approved' | 'published';
  content: any;
  file_url?: string;
  template_used?: string;
  generated_by: string;
  reviewed_by?: string;
  approved_by?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export const useAuditReports = (auditRequestId: string) => {
  const { user } = useAuth();
  const [reports, setReports] = useState<AuditReport[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = useCallback(async () => {
    if (!auditRequestId || !user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('audit_reports')
        .select('*')
        .eq('audit_request_id', auditRequestId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (err: any) {
      console.error('Failed to fetch reports:', err);
    } finally {
      setLoading(false);
    }
  }, [auditRequestId, user]);

  const createReport = useCallback(async (report: Omit<AuditReport, 'id' | 'created_at' | 'updated_at' | 'generated_by'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('audit_reports')
        .insert({
          ...report,
          audit_request_id: auditRequestId,
          generated_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Report created successfully');
      await fetchReports();
      return data;
    } catch (err: any) {
      toast.error('Failed to create report');
      throw err;
    }
  }, [user, auditRequestId, fetchReports]);

  const updateReport = useCallback(async (reportId: string, updates: Partial<AuditReport>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('audit_reports')
        .update(updates)
        .eq('id', reportId);

      if (error) throw error;
      
      toast.success('Report updated successfully');
      await fetchReports();
    } catch (err: any) {
      toast.error('Failed to update report');
      throw err;
    }
  }, [user, fetchReports]);

  const publishReport = useCallback(async (reportId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('audit_reports')
        .update({
          status: 'published' as const,
          published_at: new Date().toISOString(),
        })
        .eq('id', reportId);

      if (error) throw error;
      
      toast.success('Report published successfully');
      await fetchReports();
    } catch (err: any) {
      toast.error('Failed to publish report');
      throw err;
    }
  }, [user, fetchReports]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    reports,
    loading,
    createReport,
    updateReport,
    publishReport,
    refetch: fetchReports,
  };
};
