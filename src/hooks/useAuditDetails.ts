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
  metadata: Record<string, unknown>;
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

interface UseAuditDetailsReturn {
  auditData: EnhancedAuditData | null;
  isLoading: boolean;
  error: Error | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleSendMessage: (message: string) => Promise<void>;
  updateFindingStatus: (findingId: string, status: string) => Promise<void>;
  addFinding: (finding: Omit<AuditFinding, 'id' | 'created_at'>) => Promise<AuditFinding | null>;
  refetch: () => Promise<void>;
}

export const useAuditDetails = (auditId?: string): UseAuditDetailsReturn => {
  const [auditData, setAuditData] = useState<EnhancedAuditData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleError = (error: unknown, context: string) => {
    console.error(`Error in ${context}:`, error);
    const errorInstance = error instanceof Error ? error : new Error('Unknown error occurred');
    setError(errorInstance);
    toast.error('Error', {
      description: errorInstance.message
    });
  };

  const fetchAuditDetails = async (): Promise<void> => {
    if (!auditId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Fetch main audit data
      const { data: audit, error: auditError } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('id', auditId)
        .single();

      if (auditError) throw auditError;
      if (!audit) throw new Error('Audit not found');

      // Fetch related data in parallel
      const [clientResult, auditorResult, findingsResult, deliverablesResult, statusUpdatesResult] = await Promise.all([
        supabase.from('extended_profiles').select('id, full_name, avatar_url').eq('id', audit.client_id).single(),
        audit.assigned_auditor_id ? supabase.from('extended_profiles').select('id, full_name, avatar_url').eq('id', audit.assigned_auditor_id).single() : { data: null, error: null },
        supabase.from('audit_findings').select('*').eq('audit_request_id', auditId).order('created_at', { ascending: false }),
        supabase.from('audit_deliverables').select('*').eq('audit_request_id', auditId).order('created_at', { ascending: false }),
        supabase.from('audit_status_updates').select('*').eq('audit_request_id', auditId).order('created_at', { ascending: false })
      ]);

      const clientProfile = clientResult.data;
      const auditorProfile = auditorResult.data;
      const findingsData = findingsResult.data || [];
      const deliverablesData = deliverablesResult.data || [];
      const statusUpdatesData = statusUpdatesResult.data || [];

      // Cast and validate data
      const findings: AuditFinding[] = findingsData.map(finding => ({
        ...finding,
        severity: finding.severity as AuditFinding['severity'],
        status: finding.status as AuditFinding['status']
      }));

      const deliverables: AuditDeliverable[] = deliverablesData.map(deliverable => ({
        ...deliverable,
        status: deliverable.status as AuditDeliverable['status']
      }));

      const statusUpdates: AuditStatusUpdate[] = statusUpdatesData.map(update => ({
        ...update,
        status_type: update.status_type as AuditStatusUpdate['status_type'],
        metadata: typeof update.metadata === 'object' && update.metadata !== null && !Array.isArray(update.metadata) 
          ? update.metadata as Record<string, unknown>
          : {}
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
    } catch (error) {
      handleError(error, 'fetchAuditDetails');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (message: string): Promise<void> => {
    if (!auditId) throw new Error('No audit ID provided');

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
    } catch (error) {
      handleError(error, 'handleSendMessage');
      throw error;
    }
  };

  const updateFindingStatus = async (findingId: string, status: string): Promise<void> => {
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
    } catch (error) {
      handleError(error, 'updateFindingStatus');
      throw error;
    }
  };

  const addFinding = async (finding: Omit<AuditFinding, 'id' | 'created_at'>): Promise<AuditFinding | null> => {
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
    } catch (error) {
      handleError(error, 'addFinding');
      return null;
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
    error,
    activeTab,
    setActiveTab,
    handleSendMessage,
    updateFindingStatus,
    addFinding,
    refetch: fetchAuditDetails
  };
};
