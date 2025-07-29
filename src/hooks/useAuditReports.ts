import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';

export interface AuditReport {
  id: string;
  audit_request_id: string;
  title: string;
  content?: unknown;
  report_type: 'preliminary' | 'interim' | 'final';
  status: 'draft' | 'review' | 'approved' | 'published';
  file_url?: string;
  created_at: string;
  updated_at: string;
  generated_by: string;
  reviewed_by?: string;
  approved_by?: string;
  published_at?: string;
  template_used?: string;
  version?: string;
}

export const useAuditReports = (auditId: string) => {
  const { user } = useAuth();
  const [reports, setReports] = useState<AuditReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auditId) return;

    const fetchReports = async () => {
      try {
        const { data, error } = await supabase
          .from('audit_reports')
          .select('*')
          .eq('audit_request_id', auditId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Ensure valid report types and status
        const validReports = (data || []).map(report => ({
          ...report,
          report_type: ['preliminary', 'interim', 'final'].includes(report.report_type) 
            ? report.report_type 
            : 'preliminary',
          status: ['draft', 'review', 'approved', 'published'].includes(report.status)
            ? report.status
            : 'draft'
        })) as AuditReport[];
        
        setReports(validReports);
      } catch (error: unknown) {
        console.error('Error fetching reports:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();

    // Set up real-time subscription
    const channel = supabase
      .channel(`reports-${auditId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'audit_reports',
          filter: `audit_request_id=eq.${auditId}`,
        },
        () => {
          fetchReports();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [auditId]);

  const generateReport = async (reportType: 'preliminary' | 'interim' | 'final') => {
    try {
      // This would integrate with a report generation service
      console.log(`Generating ${reportType} report for audit ${auditId}`);
      return true;
    } catch (error: unknown) {
      console.error('Error generating report:', error);
      return false;
    }
  };

  const createReport = async (report: Partial<AuditReport>) => {
    if (!user) return false;
    
    try {
      const { error } = await supabase
        .from('audit_reports')
        .insert({
          audit_request_id: auditId,
          title: report.title || 'Untitled Report',
          content: report.content as any || {},
          report_type: report.report_type || 'preliminary',
          status: report.status || 'draft',
          generated_by: user.id,
          file_url: report.file_url || null,
        });

      if (error) throw error;
      return true;
    } catch (error: unknown) {
      console.error('Error creating report:', error);
      return false;
    }
  };

  const updateReport = async (reportId: string, updates: Partial<AuditReport>) => {
    try {
      // Create a properly typed update object for Supabase
      const updateData: Record<string, any> = {};
      
      // Only include fields that are allowed to be updated
      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.content !== undefined) updateData.content = updates.content;
      if (updates.report_type !== undefined) updateData.report_type = updates.report_type;
      if (updates.status !== undefined) updateData.status = updates.status;
      if (updates.file_url !== undefined) updateData.file_url = updates.file_url;
      if (updates.reviewed_by !== undefined) updateData.reviewed_by = updates.reviewed_by;
      if (updates.approved_by !== undefined) updateData.approved_by = updates.approved_by;
      if (updates.published_at !== undefined) updateData.published_at = updates.published_at;
      if (updates.template_used !== undefined) updateData.template_used = updates.template_used;
      if (updates.version !== undefined) updateData.version = updates.version;
      
      // Always update the updated_at timestamp
      updateData.updated_at = new Date().toISOString();

      const { error } = await supabase
        .from('audit_reports')
        .update(updateData)
        .eq('id', reportId);

      if (error) throw error;
      return true;
    } catch (error: unknown) {
      console.error('Error updating report:', error);
      return false;
    }
  };

  const publishReport = async (reportId: string) => {
    try {
      const { error } = await supabase
        .from('audit_reports')
        .update({ 
          status: 'published',
          published_at: new Date().toISOString()
        })
        .eq('id', reportId);

      if (error) throw error;
      return true;
    } catch (error: unknown) {
      console.error('Error publishing report:', error);
      return false;
    }
  };

  return {
    reports,
    isLoading,
    loading: isLoading, // Alias for backward compatibility
    generateReport,
    createReport,
    updateReport,
    publishReport
  };
};
