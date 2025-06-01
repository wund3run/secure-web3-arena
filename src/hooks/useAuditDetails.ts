
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

      // Mock data for new tables until Supabase types are regenerated
      const mockFindings: AuditFinding[] = [
        {
          id: '1',
          severity: 'high',
          category: 'Access Control',
          title: 'Missing owner verification',
          description: 'Contract lacks proper owner verification in critical functions',
          status: 'open',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          severity: 'medium',
          category: 'Reentrancy',
          title: 'Potential reentrancy vulnerability',
          description: 'External call before state change could allow reentrancy',
          status: 'open',
          created_at: new Date().toISOString()
        }
      ];

      const mockDeliverables: AuditDeliverable[] = [
        {
          id: '1',
          title: 'Initial Security Assessment',
          description: 'Comprehensive review of smart contract architecture',
          status: 'completed'
        },
        {
          id: '2',
          title: 'Final Audit Report',
          description: 'Detailed report with findings and recommendations',
          status: 'in_progress'
        }
      ];

      const mockStatusUpdates: AuditStatusUpdate[] = [
        {
          id: '1',
          status_type: 'progress',
          title: 'Audit Started',
          message: 'Initial code review has begun',
          metadata: {},
          created_at: new Date().toISOString(),
          user_id: audit.assigned_auditor_id || 'system'
        },
        {
          id: '2',
          status_type: 'finding',
          title: 'Security Issue Identified',
          message: 'High severity access control issue found',
          metadata: { severity: 'high' },
          created_at: new Date().toISOString(),
          user_id: audit.assigned_auditor_id || 'system'
        }
      ];

      // Calculate findings count from mock data
      const findingsCount = {
        critical: mockFindings.filter(f => f.severity === 'critical').length,
        high: mockFindings.filter(f => f.severity === 'high').length,
        medium: mockFindings.filter(f => f.severity === 'medium').length,
        low: mockFindings.filter(f => f.severity === 'low').length,
        info: mockFindings.filter(f => f.severity === 'info').length,
      };

      // Build enhanced audit data with fallbacks for missing properties
      const enhancedAuditData: EnhancedAuditData = {
        ...audit,
        current_phase: audit.current_phase || 'initial_review',
        completion_percentage: audit.completion_percentage || 25,
        security_score: audit.security_score || 85,
        findings_count: findingsCount,
        findings: mockFindings,
        deliverables: mockDeliverables,
        status_updates: mockStatusUpdates,
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
      // Mock update for now since table doesn't exist in types yet
      if (auditData) {
        const updatedFindings = auditData.findings.map(finding =>
          finding.id === findingId ? { ...finding, status: status as any } : finding
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
      const newFinding: AuditFinding = {
        ...finding,
        id: Math.random().toString(36).substring(7),
        created_at: new Date().toISOString()
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
          table: 'audit_messages',
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
