import type { Json } from '../core'

export interface AuditDeliverables {
  Row: {
    audit_request_id: string
    created_at: string
    delivered_at: string | null
    description: string | null
    due_date: string | null
    file_url: string | null
    id: string
    status: string
    title: string
    updated_at: string
  }
  Insert: {
    audit_request_id: string
    created_at?: string
    delivered_at?: string | null
    description?: string | null
    due_date?: string | null
    file_url?: string | null
    id?: string
    status?: string
    title: string
    updated_at?: string
  }
  Update: {
    audit_request_id?: string
    created_at?: string
    delivered_at?: string | null
    description?: string | null
    due_date?: string | null
    file_url?: string | null
    id?: string
    status?: string
    title?: string
    updated_at?: string
  }
  Relationships: [
    {
      foreignKeyName: "audit_deliverables_audit_request_id_fkey"
      columns: ["audit_request_id"]
      isOneToOne: false
      referencedRelation: "audit_requests"
      referencedColumns: ["id"]
    }
  ]
}

export interface AuditFindings {
  Row: {
    audit_request_id: string
    category: string
    code_snippet: string | null
    created_at: string
    description: string
    id: string
    location: string | null
    recommendation: string | null
    severity: string
    status: string
    title: string
    updated_at: string
  }
  Insert: {
    audit_request_id: string
    category: string
    code_snippet?: string | null
    created_at?: string
    description: string
    id?: string
    location?: string | null
    recommendation?: string | null
    severity: string
    status?: string
    title: string
    updated_at?: string
  }
  Update: {
    audit_request_id?: string
    category?: string
    code_snippet?: string | null
    created_at?: string
    description?: string
    id?: string
    location?: string | null
    recommendation?: string | null
    severity?: string
    status?: string
    title?: string
    updated_at?: string
  }
  Relationships: [
    {
      foreignKeyName: "audit_findings_audit_request_id_fkey"
      columns: ["audit_request_id"]
      isOneToOne: false
      referencedRelation: "audit_requests"
      referencedColumns: ["id"]
    }
  ]
}

export interface AuditLog {
  Row: {
    action: string
    audit_request_id: string
    created_at: string
    id: string
    user_id: string
  }
  Insert: {
    action: string
    audit_request_id: string
    created_at?: string
    id?: string
    user_id?: string
  }
  Update: {
    action?: string
    audit_request_id?: string
    created_at?: string
    id?: string
    user_id?: string
  }
  Relationships: [
    {
      foreignKeyName: "audit_log_audit_request_id_fkey"
      columns: ["audit_request_id"]
      isOneToOne: false
      referencedRelation: "audit_requests"
      referencedColumns: ["id"]
    }
  ]
}

export interface AuditMessages {
  Row: {
    audit_request_id: string
    content: string
    created_at: string | null
    file_attachments: Json | null
    id: string
    is_read: boolean | null
    message_type: string | null
    reply_to_id: string | null
    sender_id: string
  }
  Insert: {
    audit_request_id: string
    content: string
    created_at?: string | null
    file_attachments?: Json | null
    id?: string
    is_read?: boolean | null
    message_type?: string | null
    reply_to_id?: string | null
    sender_id: string
  }
  Update: {
    audit_request_id?: string
    content?: string
    created_at?: string | null
    file_attachments?: Json | null
    id?: string
    is_read?: boolean | null
    message_type?: string | null
    reply_to_id?: string | null
    sender_id?: string
  }
  Relationships: [
    {
      foreignKeyName: "audit_messages_audit_request_id_fkey"
      columns: ["audit_request_id"]
      isOneToOne: false
      referencedRelation: "audit_requests"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "audit_messages_reply_to_id_fkey"
      columns: ["reply_to_id"]
      isOneToOne: false
      referencedRelation: "audit_messages"
      referencedColumns: ["id"]
    }
  ]
}

export interface AuditMilestones {
  Row: {
    actual_time_hours: number | null
    approval_required: boolean | null
    approved_at: string | null
    approved_by: string | null
    audit_request_id: string
    completed_at: string | null
    completed_by: string | null
    created_at: string
    deliverables: Json | null
    description: string | null
    due_date: string | null
    id: string
    order_index: number
    status: string
    time_estimate_hours: number | null
    title: string
    updated_at: string
  }
  Insert: {
    actual_time_hours?: number | null
    approval_required?: boolean | null
    approved_at?: string | null
    approved_by?: string | null
    audit_request_id: string
    completed_at?: string | null
    completed_by?: string | null
    created_at?: string
    deliverables?: Json | null
    description?: string | null
    due_date?: string | null
    id?: string
    order_index: number
    status?: string
    time_estimate_hours?: number | null
    title: string
    updated_at?: string
  }
  Update: {
    actual_time_hours?: number | null
    approval_required?: boolean | null
    approved_at?: string | null
    approved_by?: string | null
    audit_request_id?: string
    completed_at?: string | null
    completed_by?: string | null
    created_at?: string
    deliverables?: Json | null
    description?: string | null
    due_date?: string | null
    id?: string
    order_index?: number
    status?: string
    time_estimate_hours?: number | null
    title?: string
    updated_at?: string
  }
  Relationships: [
    {
      foreignKeyName: "audit_milestones_audit_request_id_fkey"
      columns: ["audit_request_id"]
      isOneToOne: false
      referencedRelation: "audit_requests"
      referencedColumns: ["id"]
    }
  ]
}

export interface AuditProgress {
  Row: {
    actual_start_date: string | null
    audit_request_id: string
    auditor_id: string
    created_at: string | null
    current_phase: string
    deliverables: Json | null
    estimated_completion_date: string | null
    id: string
    milestones_completed: number | null
    notes: string | null
    phase_details: Json | null
    progress_percentage: number | null
    quality_metrics: Json | null
    time_tracking: Json | null
    total_milestones: number | null
    updated_at: string | null
  }
  Insert: {
    actual_start_date?: string | null
    audit_request_id: string
    auditor_id: string
    created_at?: string | null
    current_phase?: string
    deliverables?: Json | null
    estimated_completion_date?: string | null
    id?: string
    milestones_completed?: number | null
    notes?: string | null
    phase_details?: Json | null
    progress_percentage?: number | null
    quality_metrics?: Json | null
    time_tracking?: Json | null
    total_milestones?: number | null
    updated_at?: string | null
  }
  Update: {
    actual_start_date?: string | null
    audit_request_id?: string
    auditor_id?: string
    created_at?: string | null
    current_phase?: string
    deliverables?: Json | null
    estimated_completion_date?: string | null
    id?: string
    milestones_completed?: number | null
    notes?: string | null
    phase_details?: Json | null
    progress_percentage?: number | null
    quality_metrics?: Json | null
    time_tracking?: Json | null
    total_milestones?: number | null
    updated_at?: string | null
  }
  Relationships: [
    {
      foreignKeyName: "audit_progress_audit_request_id_fkey"
      columns: ["audit_request_id"]
      isOneToOne: true
      referencedRelation: "audit_requests"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "audit_progress_auditor_id_fkey"
      columns: ["auditor_id"]
      isOneToOne: false
      referencedRelation: "auditor_profiles"
      referencedColumns: ["id"]
    }
  ]
}

export interface AuditProposals {
  Row: {
    audit_request_id: string
    auditor_id: string
    estimated_timeline_days: number
    id: string
    milestones: Json | null
    proposal_text: string
    proposed_cost: number
    responded_at: string | null
    status: string | null
    submitted_at: string | null
  }
  Insert: {
    audit_request_id: string
    auditor_id: string
    estimated_timeline_days: number
    id?: string
    milestones?: Json | null
    proposal_text: string
    proposed_cost: number
    responded_at?: string | null
    status?: string | null
    submitted_at?: string | null
  }
  Update: {
    audit_request_id?: string
    auditor_id?: string
    estimated_timeline_days?: number
    id?: string
    milestones?: Json | null
    proposal_text?: string
    proposed_cost?: number
    responded_at?: string | null
    status?: string | null
    submitted_at?: string | null
  }
  Relationships: [
    {
      foreignKeyName: "audit_proposals_audit_request_id_fkey"
      columns: ["audit_request_id"]
      isOneToOne: false
      referencedRelation: "audit_requests"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "audit_proposals_auditor_id_fkey"
      columns: ["auditor_id"]
      isOneToOne: false
      referencedRelation: "auditor_profiles"
      referencedColumns: ["id"]
    }
  ]
}

export interface AuditReports {
  Row: {
    approved_by: string | null
    audit_request_id: string
    content: Json
    created_at: string
    file_url: string | null
    generated_by: string
    id: string
    published_at: string | null
    report_type: string
    reviewed_by: string | null
    status: string
    template_used: string | null
    title: string
    updated_at: string
    version: string
  }
  Insert: {
    approved_by?: string | null
    audit_request_id: string
    content?: Json
    created_at?: string
    file_url?: string | null
    generated_by: string
    id?: string
    published_at?: string | null
    report_type: string
    reviewed_by?: string | null
    status?: string
    template_used?: string | null
    title: string
    updated_at?: string
    version?: string
  }
  Update: {
    approved_by?: string | null
    audit_request_id?: string
    content?: Json
    created_at?: string
    file_url?: string | null
    generated_by?: string
    id?: string
    published_at?: string | null
    report_type?: string
    reviewed_by?: string | null
    status?: string
    template_used?: string | null
    title?: string
    updated_at?: string
    version?: string
  }
  Relationships: [
    {
      foreignKeyName: "audit_reports_audit_request_id_fkey"
      columns: ["audit_request_id"]
      isOneToOne: false
      referencedRelation: "audit_requests"
      referencedColumns: ["id"]
    }
  ]
}

export interface AuditRequests {
  Row: {
    ai_matching_completed: boolean | null
    assigned_auditor_id: string | null
    audit_scope: string | null
    auto_assign_enabled: boolean | null
    blockchain: string
    budget: number | null
    client_id: string
    communication_preference: string | null
    completion_percentage: number | null
    contract_count: number | null
    created_at: string
    current_phase: string | null
    deadline: string | null
    escrow_contract_id: string | null
    id: string
    lines_of_code: number | null
    matching_score: number | null
    preferred_auditor_location: string | null
    previous_audits: boolean | null
    priority_score: number | null
    project_description: string | null
    project_name: string
    repository_url: string | null
    security_score: number | null
    specific_concerns: string | null
    status: string | null
    updated_at: string
    urgency_level: string | null
  }
  Insert: {
    ai_matching_completed?: boolean | null
    assigned_auditor_id?: string | null
    audit_scope?: string | null
    auto_assign_enabled?: boolean | null
    blockchain: string
    budget?: number | null
    client_id: string
    communication_preference?: string | null
    completion_percentage?: number | null
    contract_count?: number | null
    created_at?: string
    current_phase?: string | null
    deadline?: string | null
    escrow_contract_id?: string | null
    id?: string
    lines_of_code?: number | null
    matching_score?: number | null
    preferred_auditor_location?: string | null
    previous_audits?: boolean | null
    priority_score?: number | null
    project_description?: string | null
    project_name: string
    repository_url?: string | null
    security_score?: number | null
    specific_concerns?: string | null
    status?: string | null
    updated_at?: string
    urgency_level?: string | null
  }
  Update: {
    ai_matching_completed?: boolean | null
    assigned_auditor_id?: string | null
    audit_scope?: string | null
    auto_assign_enabled?: boolean | null
    blockchain?: string
    budget?: number | null
    client_id?: string
    communication_preference?: string | null
    completion_percentage?: number | null
    contract_count?: number | null
    created_at?: string
    current_phase?: string | null
    deadline?: string | null
    escrow_contract_id?: string | null
    id?: string
    lines_of_code?: number | null
    matching_score?: number | null
    preferred_auditor_location?: string | null
    previous_audits?: boolean | null
    priority_score?: number | null
    project_description?: string | null
    project_name?: string
    repository_url?: string | null
    security_score?: number | null
    specific_concerns?: string | null
    status?: string | null
    updated_at?: string
    urgency_level?: string | null
  }
  Relationships: [
    {
      foreignKeyName: "audit_requests_assigned_auditor_id_fkey"
      columns: ["assigned_auditor_id"]
      isOneToOne: false
      referencedRelation: "auditor_profiles"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "audit_requests_escrow_contract_id_fkey"
      columns: ["escrow_contract_id"]
      isOneToOne: false
      referencedRelation: "escrow_contracts"
      referencedColumns: ["id"]
    }
  ]
}

export interface AuditStatusUpdates {
  Row: {
    audit_request_id: string
    created_at: string
    id: string
    message: string | null
    metadata: Json | null
    status_type: string
    title: string
    user_id: string
  }
  Insert: {
    audit_request_id: string
    created_at?: string
    id?: string
    message?: string | null
    metadata?: Json | null
    status_type: string
    title: string
    user_id: string
  }
  Update: {
    audit_request_id?: string
    created_at?: string
    id?: string
    message?: string | null
    metadata?: Json | null
    status_type?: string
    title?: string
    user_id?: string
  }
  Relationships: [
    {
      foreignKeyName: "audit_status_updates_audit_request_id_fkey"
      columns: ["audit_request_id"]
      isOneToOne: false
      referencedRelation: "audit_requests"
      referencedColumns: ["id"]
    }
  ]
}

export interface AuditTimeTracking {
  Row: {
    activity_type: string
    audit_request_id: string
    auditor_id: string
    billable: boolean | null
    created_at: string
    description: string | null
    duration_minutes: number | null
    end_time: string | null
    id: string
    milestone_id: string | null
    start_time: string
  }
  Insert: {
    activity_type: string
    audit_request_id: string
    auditor_id: string
    billable?: boolean | null
    created_at?: string
    description?: string | null
    duration_minutes?: number | null
    end_time?: string | null
    id?: string
    milestone_id?: string | null
    start_time: string
  }
  Update: {
    activity_type?: string
    audit_request_id?: string
    auditor_id?: string
    billable?: boolean | null
    created_at?: string
    description?: string | null
    duration_minutes?: number | null
    end_time?: string | null
    id?: string
    milestone_id?: string | null
    start_time?: string
  }
  Relationships: [
    {
      foreignKeyName: "audit_time_tracking_audit_request_id_fkey"
      columns: ["audit_request_id"]
      isOneToOne: false
      referencedRelation: "audit_requests"
      referencedColumns: ["id"]
    },
    {
      foreignKeyName: "audit_time_tracking_milestone_id_fkey"
      columns: ["milestone_id"]
      isOneToOne: false
      referencedRelation: "audit_milestones"
      referencedColumns: ["id"]
    }
  ]
} 