import type { Json } from '../core'

export interface Profiles {
  Row: {
    avatar_url: string | null
    created_at: string
    full_name: string | null
    id: string
    is_arbitrator: boolean
    updated_at: string
    wallet_address: string | null
  }
  Insert: {
    avatar_url?: string | null
    created_at?: string
    full_name?: string | null
    id: string
    is_arbitrator?: boolean
    updated_at?: string
    wallet_address?: string | null
  }
  Update: {
    avatar_url?: string | null
    created_at?: string
    full_name?: string | null
    id?: string
    is_arbitrator?: boolean
    updated_at?: string
    wallet_address?: string | null
  }
  Relationships: []
}

export interface AuditorProfiles {
  Row: {
    audit_types: string[] | null
    availability_status: string | null
    average_completion_time_days: number | null
    blockchain_expertise: string[] | null
    business_name: string | null
    certifications: Json | null
    created_at: string | null
    current_audit_count: number | null
    github_username: string | null
    hourly_rate_max: number | null
    hourly_rate_min: number | null
    id: string
    languages_spoken: string[] | null
    linkedin_url: string | null
    max_concurrent_audits: number | null
    max_project_size: number | null
    min_project_size: number | null
    portfolio_url: string | null
    preferred_project_types: string[] | null
    repeat_client_rate: number | null
    response_time_hours: number | null
    specialization_tags: string[] | null
    success_rate: number | null
    timezone: string | null
    total_audits_completed: number | null
    updated_at: string | null
    user_id: string
    verification_documents: Json | null
    verification_status: string | null
    years_experience: number
  }
  Insert: {
    audit_types?: string[] | null
    availability_status?: string | null
    average_completion_time_days?: number | null
    blockchain_expertise?: string[] | null
    business_name?: string | null
    certifications?: Json | null
    created_at?: string | null
    current_audit_count?: number | null
    github_username?: string | null
    hourly_rate_max?: number | null
    hourly_rate_min?: number | null
    id?: string
    languages_spoken?: string[] | null
    linkedin_url?: string | null
    max_concurrent_audits?: number | null
    max_project_size?: number | null
    min_project_size?: number | null
    portfolio_url?: string | null
    preferred_project_types?: string[] | null
    repeat_client_rate?: number | null
    response_time_hours?: number | null
    specialization_tags?: string[] | null
    success_rate?: number | null
    timezone?: string | null
    total_audits_completed?: number | null
    updated_at?: string | null
    user_id: string
    verification_documents?: Json | null
    verification_status?: string | null
    years_experience: number
  }
  Update: {
    audit_types?: string[] | null
    availability_status?: string | null
    average_completion_time_days?: number | null
    blockchain_expertise?: string[] | null
    business_name?: string | null
    certifications?: Json | null
    created_at?: string | null
    current_audit_count?: number | null
    github_username?: string | null
    hourly_rate_max?: number | null
    hourly_rate_min?: number | null
    id?: string
    languages_spoken?: string[] | null
    linkedin_url?: string | null
    max_concurrent_audits?: number | null
    max_project_size?: number | null
    min_project_size?: number | null
    portfolio_url?: string | null
    preferred_project_types?: string[] | null
    repeat_client_rate?: number | null
    response_time_hours?: number | null
    specialization_tags?: string[] | null
    success_rate?: number | null
    timezone?: string | null
    total_audits_completed?: number | null
    updated_at?: string | null
    user_id?: string
    verification_documents?: Json | null
    verification_status?: string | null
    years_experience?: number
  }
  Relationships: []
}

export interface AuditorAvailability {
  Row: {
    auditor_id: string
    block_reason: string | null
    created_at: string | null
    date_available: string
    hours_available: number | null
    id: string
    is_blocked: boolean | null
  }
  Insert: {
    auditor_id: string
    block_reason?: string | null
    created_at?: string | null
    date_available: string
    hours_available?: number | null
    id?: string
    is_blocked?: boolean | null
  }
  Update: {
    auditor_id?: string
    block_reason?: string | null
    created_at?: string | null
    date_available?: string
    hours_available?: number | null
    id?: string
    is_blocked?: boolean | null
  }
  Relationships: [
    {
      foreignKeyName: "auditor_availability_auditor_id_fkey"
      columns: ["auditor_id"]
      isOneToOne: false
      referencedRelation: "auditor_profiles"
      referencedColumns: ["id"]
    }
  ]
}

export interface AuditorReviews {
  Row: {
    audit_request_id: string | null
    auditor_id: string | null
    client_id: string | null
    communication_rating: number | null
    created_at: string | null
    id: string
    rating: number | null
    review_text: string | null
    technical_quality_rating: number | null
    timeliness_rating: number | null
    would_recommend: boolean | null
  }
  Insert: {
    audit_request_id?: string | null
    auditor_id?: string | null
    client_id?: string | null
    communication_rating?: number | null
    created_at?: string | null
    id?: string
    rating?: number | null
    review_text?: string | null
    technical_quality_rating?: number | null
    timeliness_rating?: number | null
    would_recommend?: boolean | null
  }
  Update: {
    audit_request_id?: string | null
    auditor_id?: string | null
    client_id?: string | null
    communication_rating?: number | null
    created_at?: string | null
    id?: string
    rating?: number | null
    review_text?: string | null
    technical_quality_rating?: number | null
    timeliness_rating?: number | null
    would_recommend?: boolean | null
  }
  Relationships: []
}

export interface UserRoles {
  Row: {
    assigned_at: string | null
    assigned_by: string | null
    id: string
    is_active: boolean | null
    role: string
    user_id: string
  }
  Insert: {
    assigned_at?: string | null
    assigned_by?: string | null
    id?: string
    is_active?: boolean | null
    role?: string
    user_id: string
  }
  Update: {
    assigned_at?: string | null
    assigned_by?: string | null
    id?: string
    is_active?: boolean | null
    role?: string
    user_id?: string
  }
  Relationships: []
}

export interface Notifications {
  Row: {
    action_url: string | null
    created_at: string | null
    id: string
    is_read: boolean | null
    message: string
    title: string
    type: string | null
    user_id: string | null
  }
  Insert: {
    action_url?: string | null
    created_at?: string | null
    id?: string
    is_read?: boolean | null
    message: string
    title: string
    type?: string | null
    user_id?: string | null
  }
  Update: {
    action_url?: string | null
    created_at?: string | null
    id?: string
    is_read?: boolean | null
    message?: string
    title?: string
    type?: string | null
    user_id?: string | null
  }
  Relationships: []
} 