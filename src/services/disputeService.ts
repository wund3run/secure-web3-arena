import { createClient } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export type DisputeType = 'payment' | 'audit' | 'other';
export type DisputeStatus = 'open' | 'in_review' | 'resolved' | 'rejected';

export interface CreateDisputeInput {
  project_id: string;
  raised_by: string;
  against: string;
  type: DisputeType;
  description: string;
}

export interface UpdateDisputeStatusInput {
  id: string;
  status: DisputeStatus;
  resolution_notes?: string;
}

export const DisputeService = {
  async createDispute(input: CreateDisputeInput) {
    // Map input to Supabase Insert type
    const mappedInput: {
      project_id: string;
      raised_by: string;
      against: string;
      status: 'opened' | 'in_review' | 'resolved' | 'closed';
      resolution_notes?: string;
      created_at: string;
      updated_at: string;
    } = {
      project_id: input.project_id,
      raised_by: input.raised_by,
      against: input.against,
      status: 'opened', // default status for new dispute
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabase
      .from('disputes')
      .insert([mappedInput])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getDispute(id: string) {
    const { data, error } = await supabase
      .from('disputes')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getDisputesByProject(project_id: string) {
    const { data, error } = await supabase
      .from('disputes')
      .select('*')
      .eq('project_id', project_id)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async updateDisputeStatus(input: UpdateDisputeStatusInput) {
    const { id, status, resolution_notes } = input;
    // Map DisputeStatus to Supabase enum
    let mappedStatus: 'opened' | 'in_review' | 'resolved' | 'closed';
    switch (status) {
      case 'open':
        mappedStatus = 'opened';
        break;
      case 'rejected':
        mappedStatus = 'closed';
        break;
      default:
        mappedStatus = status as 'in_review' | 'resolved' | 'opened' | 'closed';
    }
    const { data, error } = await supabase
      .from('disputes')
      .update({ status: mappedStatus, resolution_notes, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

export async function getProjectNameAndUsers(disputeId: string): Promise<{ projectName: string, raised_by: string, against: string }> {
  // Fetch the dispute
  const { data: dispute, error: disputeError } = await supabase
    .from('disputes')
    .select('project_id, raised_by, against')
    .eq('id', disputeId)
    .single();
  if (disputeError || !dispute) throw disputeError || new Error('Dispute not found');

  // Fetch the project (audit_request)
  const { data: project, error: projectError } = await supabase
    .from('audit_requests')
    .select('project_name')
    .eq('id', dispute.project_id)
    .single();
  if (projectError || !project) throw projectError || new Error('Project not found');

  return {
    projectName: project.project_name,
    raised_by: dispute.raised_by,
    against: dispute.against,
  };
} 