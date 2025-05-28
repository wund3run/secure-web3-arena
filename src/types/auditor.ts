
export interface AuditorProfile {
  id: string;
  user_id: string;
  business_name?: string;
  years_experience: number;
  hourly_rate_min?: number;
  hourly_rate_max?: number;
  availability_status: 'available' | 'busy' | 'unavailable';
  max_concurrent_audits: number;
  current_audit_count: number;
  total_audits_completed: number;
  average_completion_time_days?: number;
  certifications: any[];
  blockchain_expertise: string[];
  audit_types: string[];
  languages_spoken: string[];
  timezone: string;
  portfolio_url?: string;
  github_username?: string;
  linkedin_url?: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  verification_documents: any;
  created_at: string;
  updated_at: string;
}

export interface AuditProposal {
  id: string;
  audit_request_id: string;
  auditor_id: string;
  proposed_cost: number;
  estimated_timeline_days: number;
  proposal_text: string;
  milestones: any[];
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  submitted_at: string;
  responded_at?: string;
}

export interface AIMatchingScore {
  id: string;
  audit_request_id: string;
  auditor_id: string;
  overall_score: number;
  expertise_score: number;
  availability_score: number;
  budget_compatibility_score: number;
  timeline_compatibility_score: number;
  past_performance_score: number;
  calculated_at: string;
}

export interface AuditProgress {
  id: string;
  audit_request_id: string;
  auditor_id: string;
  current_phase: string;
  progress_percentage: number;
  milestones_completed: number;
  total_milestones: number;
  estimated_completion_date?: string;
  actual_start_date?: string;
  notes?: string;
  deliverables: any[];
  created_at: string;
  updated_at: string;
}

export interface AuditMessage {
  id: string;
  audit_request_id: string;
  sender_id: string;
  message_type: 'text' | 'file' | 'milestone_update' | 'system';
  content: string;
  file_attachments: any[];
  is_read: boolean;
  created_at: string;
  reply_to_id?: string;
}
