
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
  file_url?: string;
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

      // Fetch main audit data
      const { data: audit, error: auditError } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('id', auditId)
        .single();

      if (auditError) throw auditError;

      // Fetch client profile
      const { data: clientProfile } = await supabase
        .from('extended_profiles')
        .select('id, full_name, avatar_url')
        .eq('id', audit.client_id)
        .single();

      // Fetch auditor profile if assigned
      let auditorProfile = null;
      if (audit.assigned_auditor_id) {
        const { data: auditor } = await supabase
          .from('extended_profiles')
          .select('id, full_name, avatar_url')
          .eq('id', audit.assigned_auditor_id)
          .single();
        auditorProfile = auditor;
      }

      // Fetch findings with proper type casting
      const { data: findingsData } = await supabase
        .from('audit_findings')
        .select('*')
        .eq('audit_request_id', auditId)
        .order('created_at', { ascending: false });

      // Fetch deliverables with proper type casting
      const { data: deliverablesData } = await supabase
        .from('audit_deliverables')
        .select('*')
        .eq('audit_request_id', auditId)
        .order('created_at', { ascending: false });

      // Fetch status updates with proper type casting
      const { data: statusUpdatesData } = await supabase
        .from('audit_status_updates')
        .select('*')
        .eq('audit_request_id', auditId)
        .order('created_at', { ascending: false });

      // Cast the data to proper types
      const findings: AuditFinding[] = (findingsData || []).map(finding => ({
        ...finding,
        severity: finding.severity as AuditFinding['severity'],
        status: finding.status as AuditFinding['status']
      }));

      const deliverables: AuditDeliverable[] = (deliverablesData || []).map(deliverable => ({
        ...deliverable,
        status: deliverable.status as AuditDeliverable['status']
      }));

      const statusUpdates: AuditStatusUpdate[] = (statusUpdatesData || []).map(update => ({
        ...update,
        status_type: update.status_type as AuditStatusUpdate['status_type']
      }));

      // Calculate findings count
      const findingsCount = {
        critical: findings.filter(f => f.severity === 'critical').length,
        high: findings.filter(f => f.severity === 'high').length,
        medium: findings.filter(f => f.severity === 'medium').length,
        low: findings.filter(f => f.severity === 'low').length,
        info: findings.filter(f => f.severity === 'info').length,
      };

      // Build enhanced audit data
      const enhancedAuditData: EnhancedAuditData = {
        ...audit,
        current_phase: audit.current_phase || 'initial_review',
        completion_percentage: audit.completion_percentage || 0,
        security_score: audit.security_score || 0,
        findings_count: findingsCount,
        findings,
        deliverables,
        status_updates: statusUpdates,
        client: {
          id: audit.client_id,
          full_name: clientProfile?.full_name || 'Unknown Client',
          avatar_url: clientProfile?.avatar_url
        },
        auditor: auditorProfile ? {
          id: auditorProfile.id,
          full_name: auditorProfile.full_name || 'Unknown Auditor',
          avatar_url: auditorProfile.avatar_url
        } : undefined
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

      // Update local state
      if (auditData) {
        const updatedFindings = auditData.findings.map(finding =>
          finding.id === findingId ? { 
            ...finding, 
            status: status as AuditFinding['status'] 
          } : finding
        );
        setAuditData({
          ...auditData,
          findings: updatedFindings
        });
      }
      
      toast.success('Finding status updated');
    } catch (error: any) {
      console.error('Error updating finding status:', error);
      toast.error('Failed to update finding status');
    }
  };

  const addFinding = async (finding: Omit<AuditFinding, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('audit_findings')
        .insert({
          audit_request_id: auditId,
          ...finding,
          status: 'open'
        })
        .select()
        .single();

      if (error) throw error;

      // Cast the returned data to proper type
      const newFinding: AuditFinding = {
        ...data,
        severity: data.severity as AuditFinding['severity'],
        status: data.status as AuditFinding['status']
      };

      // Update local state
      if (auditData) {
        setAuditData({
          ...auditData,
          findings: [newFinding, ...auditData.findings]
        });
      }

      toast.success('Finding added successfully');
      return newFinding;
    } catch (error: any) {
      console.error('Error adding finding:', error);
      toast.error('Failed to add finding');
      throw error;
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
          table: 'audit_deliverables',
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
    addFinding,
    refetch: fetchAuditDetails
  };
};
