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

      // Ensure user profile exists in extended_profiles
      const { data: existingProfile } = await supabase
        .from('extended_profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (!existingProfile) {
        // Create profile if it doesn't exist
        const { error: profileError } = await supabase
          .from('extended_profiles')
          .insert({
            id: user.id,
            full_name: user.user_metadata?.full_name || 'Unknown User',
            avatar_url: user.user_metadata?.avatar_url || null
          });

        if (profileError) {
          console.error('Error creating user profile:', profileError);
          throw new Error('Failed to create user profile');
        }
      }

      // Parse and validate form data
      const contractCount = formData.contractCount ? parseInt(formData.contractCount.split('-')[0]) || 1 : 1;
      const linesOfCode = formData.linesOfCode ? parseInt(formData.linesOfCode.replace(/[<>]/g, '').split(' ')[0]) || 1000 : 1000;
      const budget = formData.budget ? this.parseBudgetRange(formData.budget) : null;

      // Map form data to database schema
      const auditData: CreateAuditRequestData = {
        project_name: formData.projectName,
        project_description: formData.projectDescription || null,
        blockchain: formData.blockchain === 'Other' ? formData.customBlockchain || 'Other' : formData.blockchain,
        repository_url: formData.repositoryUrl || null,
        contract_count: contractCount,
        lines_of_code: linesOfCode,
        deadline: formData.deadline || null,
        budget: budget,
        audit_scope: formData.auditScope || null,
        previous_audits: formData.previousAudits || false,
        specific_concerns: formData.specificConcerns || null,
        urgency_level: 'normal',
        communication_preference: formData.preferredCommunication || 'email',
      };

      console.log('Submitting audit request with data:', auditData);

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

      if (error) {
        console.error('Database error creating audit request:', error);
        throw error;
      }

      console.log('Audit request created successfully:', data);

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
      
      // Provide more specific error messages
      let errorMessage = 'Failed to create audit request';
      if (error.message.includes('violates foreign key constraint')) {
        errorMessage = 'User profile validation failed. Please ensure your account is properly set up.';
      } else if (error.message.includes('violates not-null constraint')) {
        errorMessage = 'Missing required information. Please check all required fields.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      return null;
    }
  }

  static parseBudgetRange(budget: string): number {
    // Extract numeric value from budget range strings like "$5,000 - $10,000"
    const match = budget.match(/\$?([0-9,]+)/);
    if (match) {
      return parseInt(match[1].replace(/,/g, ''));
    }
    return 5000; // Default fallback
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
