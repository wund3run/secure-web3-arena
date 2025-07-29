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
  message?: string | null;
  metadata?: Record<string, unknown> | null;
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
  findings: Record<string, unknown>[];
  deliverables: Record<string, unknown>[];
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
        const isValidClientObject = (client: unknown): client is { id: string; full_name?: string; avatar_url?: string } => {
          return client !== null && typeof client === 'object' && 'id' in client && typeof (client as any).id === 'string';
        };

        // Type guard for auditor data
        const isValidAuditorObject = (auditor: unknown): auditor is { id: string; full_name?: string; avatar_url?: string } => {
          return auditor !== null && typeof auditor === 'object' && 'id' in auditor && typeof (auditor as any).id === 'string';
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
          status_updates: (statusUpdates || []).map(update => ({
            ...update,
            metadata: update.metadata as Record<string, unknown> | null
          })) as AuditStatusUpdate[],
          findings_count: findingsCount,
        } as EnhancedAuditData);

      } catch (error: unknown) {
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
    } catch (error: unknown) {
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
    } catch (error: unknown) {
      console.error('Error updating finding status:', error);
    }
  };

  const requestClarification = async (message: string) => {
    if (!id || !user) return;
    try {
      await supabase.from('audit_status_updates').insert({
        audit_request_id: id,
        status_type: 'clarification_request',
        title: 'Clarification Requested',
        message,
        user_id: user.id,
      });
      // Notify auditor
      if (auditData?.auditor?.id) {
        await supabase.from('notifications').insert({
          user_id: auditData.auditor.id,
          title: 'Clarification Requested',
          message: `A clarification was requested for audit ${auditData.project_name}.`,
          type: 'info',
          metadata: { audit_request_id: id }
        });
      }
      window.location.reload();
    } catch (error) {
      console.error('Error requesting clarification:', error);
    }
  };

  const markAuditComplete = async () => {
    if (!id || !user) return;
    try {
      await supabase.from('audit_requests').update({ status: 'completed' }).eq('id', id);
      await supabase.from('audit_status_updates').insert({
        audit_request_id: id,
        status_type: 'completion',
        title: 'Audit Marked Complete',
        message: 'The project owner has marked the audit as complete.',
        user_id: user.id,
      });
      // Notify auditor
      if (auditData?.auditor?.id) {
        await supabase.from('notifications').insert({
          user_id: auditData.auditor.id,
          title: 'Audit Marked Complete',
          message: `The audit for ${auditData.project_name} was marked complete by the project owner.`,
          type: 'info',
          metadata: { audit_request_id: id }
        });
      }
      window.location.reload();
    } catch (error) {
      console.error('Error marking audit complete:', error);
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
    requestClarification,
    markAuditComplete,
  };
};
