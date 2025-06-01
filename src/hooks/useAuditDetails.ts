
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { useAuditMilestones } from './useAuditMilestones';
import { useAuditReports } from './useAuditReports';
import { useTimeTracking } from './useTimeTracking';

export interface AuditStatusUpdate {
  id: string;
  audit_request_id: string;
  status_type: string;
  title: string;
  message?: string;
  metadata?: any;
  user_id: string;
  created_at: string;
}

export interface EnhancedAuditData {
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
  completion_percentage: number;
  security_score: number;
  current_phase: string;
  created_at: string;
  updated_at: string;
  client: {
    id: string;
    full_name?: string;
    avatar_url?: string;
  };
  auditor?: {
    id: string;
    full_name?: string;
    avatar_url?: string;
  };
  findings: any[];
  deliverables: any[];
  status_updates: AuditStatusUpdate[];
  findings_count: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export const useAuditDetails = (auditId?: string) => {
  const { user } = useAuth();
  const params = useParams();
  const id = auditId || params.id;
  
  const [auditData, setAuditData] = useState<EnhancedAuditData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Use the new hooks
  const milestones = useAuditMilestones(id || '');
  const reports = useAuditReports(id || '');
  const timeTracking = useTimeTracking(id || '');

  useEffect(() => {
    if (!id || !user) return;

    const fetchAuditData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch main audit data with related information
        const { data: audit, error: auditError } = await supabase
          .from('audit_requests')
          .select(`
            *,
            client:client_id (
              id,
              full_name,
              avatar_url
            ),
            auditor:assigned_auditor_id (
              id,
              full_name,
              avatar_url
            )
          `)
          .eq('id', id)
          .single();

        if (auditError) throw auditError;

        // Fetch findings
        const { data: findings, error: findingsError } = await supabase
          .from('audit_findings')
          .select('*')
          .eq('audit_request_id', id)
          .order('created_at', { ascending: false });

        if (findingsError) throw findingsError;

        // Fetch deliverables
        const { data: deliverables, error: deliverablesError } = await supabase
          .from('audit_deliverables')
          .select('*')
          .eq('audit_request_id', id)
          .order('created_at', { ascending: false });

        if (deliverablesError) throw deliverablesError;

        // Fetch status updates
        const { data: statusUpdates, error: statusError } = await supabase
          .from('audit_status_updates')
          .select('*')
          .eq('audit_request_id', id)
          .order('created_at', { ascending: false });

        if (statusError) throw statusError;

        // Calculate findings count by severity
        const findingsCount = {
          critical: findings?.filter(f => f.severity === 'critical').length || 0,
          high: findings?.filter(f => f.severity === 'high').length || 0,
          medium: findings?.filter(f => f.severity === 'medium').length || 0,
          low: findings?.filter(f => f.severity === 'low').length || 0,
        };

        // Type guard for client data
        const isValidClientObject = (client: any): client is { id: string; full_name?: string; avatar_url?: string } => {
          return client && typeof client === 'object' && typeof client.id === 'string';
        };

        // Type guard for auditor data
        const isValidAuditorObject = (auditor: any): auditor is { id: string; full_name?: string; avatar_url?: string } => {
          return auditor && typeof auditor === 'object' && typeof auditor.id === 'string';
        };

        // Ensure client data has proper structure with type guards
        const clientData = isValidClientObject(audit.client)
          ? audit.client
          : { id: audit.client_id, full_name: undefined, avatar_url: undefined };

        // Ensure auditor data has proper structure with type guards
        const auditorData = isValidAuditorObject(audit.auditor)
          ? audit.auditor
          : audit.assigned_auditor_id ? { id: audit.assigned_auditor_id, full_name: undefined, avatar_url: undefined } : undefined;

        setAuditData({
          ...audit,
          client: clientData,
          auditor: auditorData,
          findings: findings || [],
          deliverables: deliverables || [],
          status_updates: statusUpdates || [],
          findings_count: findingsCount,
        });

      } catch (error) {
        console.error('Error fetching audit details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuditData();
  }, [id, user]);

  const handleSendMessage = async (message: string) => {
    if (!id || !user) return;
    
    try {
      // Add status update
      await supabase.from('audit_status_updates').insert({
        audit_request_id: id,
        status_type: 'communication',
        title: 'Message Sent',
        message: message,
        user_id: user.id,
      });
      
      // Refresh data
      window.location.reload();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const updateFindingStatus = async (findingId: string, status: string) => {
    try {
      await supabase
        .from('audit_findings')
        .update({ status })
        .eq('id', findingId);
      
      // Refresh data
      window.location.reload();
    } catch (error) {
      console.error('Error updating finding status:', error);
    }
  };

  return {
    auditData,
    isLoading,
    activeTab,
    setActiveTab,
    handleSendMessage,
    updateFindingStatus,
    milestones,
    reports,
    timeTracking,
  };
};
