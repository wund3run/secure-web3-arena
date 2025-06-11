
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AuditReport {
  id: string;
  audit_request_id: string;
  title: string;
  content?: string;
  report_type: 'preliminary' | 'interim' | 'final';
  status: 'draft' | 'review' | 'approved' | 'published';
  file_url?: string;
  created_at: string;
  updated_at: string;
}

export const useAuditReports = (auditId: string) => {
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
        setReports(data || []);
      } catch (error) {
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
    } catch (error) {
      console.error('Error generating report:', error);
      return false;
    }
  };

  return {
    reports,
    isLoading,
    generateReport
  };
};
