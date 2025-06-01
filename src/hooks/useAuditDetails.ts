
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AuditFinding {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  category: string;
  title: string;
  description: string;
  location?: string;
  code_snippet?: string;
  recommendation?: string;
  status: 'open' | 'acknowledged' | 'fixed' | 'false_positive';
  created_at: string;
}

export interface AuditDeliverable {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delivered';
  due_date?: string;
  delivered_at?: string;
}

export interface AuditStatusUpdate {
  id: string;
  status_type: 'progress' | 'milestone' | 'finding' | 'communication' | 'deliverable';
  title: string;
  message?: string;
  metadata: any;
  created_at: string;
  user_id: string;
}

export interface EnhancedAuditData {
  id: string;
  project_name: string;
  project_description?: string;
  blockchain: string;
  status: string;
  current_phase: string;
  completion_percentage: number;
  security_score: number;
  findings_count: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  client_id: string;
  assigned_auditor_id?: string;
  created_at: string;
  estimated_completion?: string;
  actual_start_date?: string;
  findings: AuditFinding[];
  deliverables: AuditDeliverable[];
  status_updates: AuditStatusUpdate[];
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
}

export const useAuditDetails = (auditId?: string) => {
  const [auditData, setAuditData] = useState<EnhancedAuditData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchAuditDetails = async () => {
    if (!auditId) return;

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
        .eq('id', auditId)
        .single();

      if (auditError) throw auditError;

      // Fetch findings
      const { data: findings, error: findingsError } = await supabase
        .from('audit_findings')
        .select('*')
        .eq('audit_request_id', auditId)
        .order('created_at', { ascending: false });

      if (findingsError) throw findingsError;

      // Fetch deliverables
      const { data: deliverables, error: deliverablesError } = await supabase
        .from('audit_deliverables')
        .select('*')
        .eq('audit_request_id', auditId)
        .order('due_date', { ascending: true });

      if (deliverablesError) throw deliverablesError;

      // Fetch status updates
      const { data: statusUpdates, error: updatesError } = await supabase
        .from('audit_status_updates')
        .select('*')
        .eq('audit_request_id', auditId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (updatesError) throw updatesError;

      const enhancedAuditData: EnhancedAuditData = {
        ...audit,
        findings: findings || [],
        deliverables: deliverables || [],
        status_updates: statusUpdates || [],
      };

      setAuditData(enhancedAuditData);
    } catch (error: any) {
      console.error('Error fetching audit details:', error);
      toast.error('Failed to load audit details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!auditId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('audit_messages')
        .insert({
          audit_request_id: auditId,
          sender_id: user.id,
          content: message,
          message_type: 'text'
        });

      if (error) throw error;

      toast.success('Message sent successfully');
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const updateFindingStatus = async (findingId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('audit_findings')
        .update({ status })
        .eq('id', findingId);

      if (error) throw error;

      // Refresh audit data
      await fetchAuditDetails();
      toast.success('Finding status updated');
    } catch (error: any) {
      console.error('Error updating finding status:', error);
      toast.error('Failed to update finding status');
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    if (!auditId) return;

    fetchAuditDetails();

    // Subscribe to audit updates
    const auditChannel = supabase
      .channel(`audit_${auditId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'audit_requests',
          filter: `id=eq.${auditId}`,
        },
        () => {
          fetchAuditDetails();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'audit_findings',
          filter: `audit_request_id=eq.${auditId}`,
        },
        () => {
          fetchAuditDetails();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'audit_status_updates',
          filter: `audit_request_id=eq.${auditId}`,
        },
        () => {
          fetchAuditDetails();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(auditChannel);
    };
  }, [auditId]);

  return {
    auditData,
    isLoading,
    activeTab,
    setActiveTab,
    handleSendMessage,
    updateFindingStatus,
    refetch: fetchAuditDetails
  };
};
