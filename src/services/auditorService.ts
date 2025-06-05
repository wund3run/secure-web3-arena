
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AuditorOpportunity {
  id: string;
  project_name: string;
  client_name: string;
  budget: number;
  deadline: string;
  blockchain: string;
  complexity: 'Low' | 'Medium' | 'High';
  description: string;
  required_skills: string[];
  estimated_duration: number;
}

export interface AuditorPerformanceMetrics {
  totalEarnings: number;
  completedAudits: number;
  averageRating: number;
  responseTime: number;
  successRate: number;
  pendingPayments: number;
}

export interface ActiveAudit {
  id: string;
  project_name: string;
  client_name: string;
  progress: number;
  deadline: string;
  status: string;
  complexity: string;
  current_phase: string;
  payment_amount: number;
}

export class AuditorService {
  // Get auditor's active audits
  static async getActiveAudits(auditorId: string): Promise<ActiveAudit[]> {
    try {
      const { data: audits, error } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('assigned_auditor_id', auditorId)
        .in('status', ['in_progress', 'review'])
        .order('deadline', { ascending: true });

      if (error) throw error;

      if (!audits || audits.length === 0) return [];

      // Get client profiles separately
      const clientIds = audits.map(audit => audit.client_id).filter(Boolean);
      const { data: profiles } = await supabase
        .from('extended_profiles')
        .select('id, full_name')
        .in('id', clientIds);

      return audits.map(audit => {
        const clientProfile = profiles?.find(p => p.id === audit.client_id);
        return {
          id: audit.id,
          project_name: audit.project_name,
          client_name: clientProfile?.full_name || 'Unknown Client',
          progress: audit.completion_percentage || 0,
          deadline: audit.deadline,
          status: audit.status,
          complexity: audit.urgency_level || 'Medium',
          current_phase: audit.current_phase || 'In Progress',
          payment_amount: audit.budget || 0
        };
      });
    } catch (error) {
      console.error('Failed to fetch active audits:', error);
      toast.error('Failed to load active audits');
      return [];
    }
  }

  // Get available opportunities for auditor
  static async getOpportunities(auditorId: string): Promise<AuditorOpportunity[]> {
    try {
      const { data: requests, error } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('status', 'pending')
        .is('assigned_auditor_id', null)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      if (!requests || requests.length === 0) return [];

      // Get client profiles separately
      const clientIds = requests.map(request => request.client_id).filter(Boolean);
      const { data: profiles } = await supabase
        .from('extended_profiles')
        .select('id, full_name')
        .in('id', clientIds);

      return requests.map(request => {
        const clientProfile = profiles?.find(p => p.id === request.client_id);
        
        // Ensure complexity matches the expected type
        const complexityMap: Record<string, 'Low' | 'Medium' | 'High'> = {
          'low': 'Low',
          'normal': 'Medium',
          'medium': 'Medium',
          'high': 'High',
          'urgent': 'High'
        };
        
        const complexity = complexityMap[request.urgency_level?.toLowerCase() || 'medium'] || 'Medium';

        return {
          id: request.id,
          project_name: request.project_name,
          client_name: clientProfile?.full_name || 'Anonymous',
          budget: request.budget || 0,
          deadline: request.deadline,
          blockchain: request.blockchain,
          complexity,
          description: request.project_description || '',
          required_skills: [request.blockchain, 'Smart Contract Audit'],
          estimated_duration: Math.ceil((new Date(request.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        };
      });
    } catch (error) {
      console.error('Failed to fetch opportunities:', error);
      toast.error('Failed to load opportunities');
      return [];
    }
  }

  // Get auditor performance metrics
  static async getPerformanceMetrics(auditorId: string): Promise<AuditorPerformanceMetrics> {
    try {
      const { data: completedAudits, error: auditsError } = await supabase
        .from('audit_requests')
        .select('budget')
        .eq('assigned_auditor_id', auditorId)
        .eq('status', 'completed');

      if (auditsError) throw auditsError;

      const { data: reviews, error: reviewsError } = await supabase
        .from('auditor_reviews')
        .select('rating')
        .eq('auditor_id', auditorId);

      if (reviewsError) throw reviewsError;

      const totalEarnings = completedAudits?.reduce((sum, audit) => sum + (audit.budget || 0), 0) || 0;
      const averageRating = reviews?.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : 0;

      return {
        totalEarnings,
        completedAudits: completedAudits?.length || 0,
        averageRating: Math.round(averageRating * 10) / 10,
        responseTime: 2.4, // Mock data - would come from actual tracking
        successRate: 95.2, // Mock data - would be calculated from completed vs failed audits
        pendingPayments: totalEarnings * 0.2 // Mock - 20% of earnings pending
      };
    } catch (error) {
      console.error('Failed to fetch performance metrics:', error);
      return {
        totalEarnings: 0,
        completedAudits: 0,
        averageRating: 0,
        responseTime: 0,
        successRate: 0,
        pendingPayments: 0
      };
    }
  }

  // Apply for an audit opportunity
  static async applyForOpportunity(auditRequestId: string, auditorId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('audit_proposals')
        .insert({
          audit_request_id: auditRequestId,
          auditor_id: auditorId,
          proposed_cost: 0, // Would be filled by auditor
          estimated_timeline_days: 14,
          proposal_text: 'Application submitted - proposal details to follow.',
          status: 'pending'
        });

      if (error) throw error;
      
      toast.success('Application submitted successfully!');
      return true;
    } catch (error) {
      console.error('Failed to apply for opportunity:', error);
      toast.error('Failed to submit application');
      return false;
    }
  }
}
