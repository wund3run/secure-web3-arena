
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { AuditFormData } from '@/types/audit-request.types';

export interface CreateAuditRequestData {
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
  communication_preference?: string;
}

export class AuditRequestService {
  static async createAuditRequest(formData: AuditFormData): Promise<string | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Map form data to database schema
      const auditData: CreateAuditRequestData = {
        project_name: formData.projectName,
        project_description: formData.projectDescription,
        blockchain: formData.blockchain,
        repository_url: formData.repositoryUrl,
        contract_count: parseInt(formData.contractCount) || undefined,
        lines_of_code: parseInt(formData.linesOfCode) || undefined,
        deadline: formData.deadline,
        budget: parseFloat(formData.budget) || undefined,
        audit_scope: formData.auditScope,
        previous_audits: formData.previousAudits,
        specific_concerns: formData.specificConcerns,
        urgency_level: 'normal',
        communication_preference: formData.preferredCommunication || 'email',
      };

      const { data, error } = await supabase
        .from('audit_requests')
        .insert({
          client_id: user.id,
          ...auditData,
          status: 'pending',
          ai_matching_completed: false,
          priority_score: 0.5,
          matching_score: 0,
          auto_assign_enabled: true,
          current_phase: 'initial_review',
          completion_percentage: 0,
          security_score: 0,
        })
        .select()
        .single();

      if (error) throw error;

      // Create initial notification
      await supabase.from('notifications').insert({
        user_id: user.id,
        title: 'Audit Request Submitted',
        message: 'Your audit request has been successfully submitted and is being processed.',
        type: 'info'
      });

      // Create initial status update
      await supabase.from('audit_status_updates').insert({
        audit_request_id: data.id,
        status_type: 'progress',
        title: 'Audit Request Created',
        message: 'Your audit request has been submitted and is awaiting review.',
        user_id: user.id,
        metadata: { source: 'system' }
      });

      toast.success('Audit request created successfully!');
      return data.id;
    } catch (error: any) {
      console.error('Error creating audit request:', error);
      toast.error('Failed to create audit request');
      return null;
    }
  }

  static async getUserAuditRequests(): Promise<any[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('audit_requests')
        .select(`
          *,
          assigned_auditor:assigned_auditor_id (
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error fetching audit requests:', error);
      toast.error('Failed to load audit requests');
      return [];
    }
  }

  static async updateAuditStatus(auditId: string, status: string, phase?: string): Promise<boolean> {
    try {
      const updateData: any = { status };
      if (phase) updateData.current_phase = phase;

      const { error } = await supabase
        .from('audit_requests')
        .update(updateData)
        .eq('id', auditId);

      if (error) throw error;

      toast.success('Audit status updated successfully');
      return true;
    } catch (error: any) {
      console.error('Error updating audit status:', error);
      toast.error('Failed to update audit status');
      return false;
    }
  }

  static async addFinding(
    auditId: string, 
    finding: {
      severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
      category: string;
      title: string;
      description: string;
      location?: string;
      code_snippet?: string;
      recommendation?: string;
    }
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('audit_findings')
        .insert({
          audit_request_id: auditId,
          ...finding,
          status: 'open'
        });

      if (error) throw error;

      // Create notification for the finding
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('notifications').insert({
          user_id: user.id,
          title: `New ${finding.severity} Finding`,
          message: finding.title,
          type: finding.severity === 'critical' || finding.severity === 'high' ? 'error' : 'warning'
        });

        // Create status update
        await supabase.from('audit_status_updates').insert({
          audit_request_id: auditId,
          status_type: 'finding',
          title: `${finding.severity} Finding Identified`,
          message: finding.title,
          user_id: user.id,
          metadata: { severity: finding.severity, category: finding.category }
        });
      }

      toast.success('Security finding added successfully');
      return true;
    } catch (error: any) {
      console.error('Error adding finding:', error);
      toast.error('Failed to add finding');
      return false;
    }
  }

  static async createDeliverable(
    auditId: string,
    deliverable: {
      title: string;
      description?: string;
      due_date?: string;
    }
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('audit_deliverables')
        .insert({
          audit_request_id: auditId,
          ...deliverable,
          status: 'pending'
        });

      if (error) throw error;

      // Create notification for the deliverable
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('notifications').insert({
          user_id: user.id,
          title: 'New Deliverable Created',
          message: deliverable.title,
          type: 'info'
        });

        // Create status update
        await supabase.from('audit_status_updates').insert({
          audit_request_id: auditId,
          status_type: 'deliverable',
          title: 'New Deliverable Added',
          message: deliverable.title,
          user_id: user.id,
          metadata: { deliverable_type: 'audit_report' }
        });
      }

      toast.success('Deliverable created successfully');
      return true;
    } catch (error: any) {
      console.error('Error creating deliverable:', error);
      toast.error('Failed to create deliverable');
      return false;
    }
  }
}
