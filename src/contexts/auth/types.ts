
export interface UserProfile {
  id: string;
  full_name?: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  wallet_address?: string;
  verification_status: 'unverified' | 'pending' | 'verified' | 'rejected';
  years_of_experience?: number;
  projects_completed?: number;
  skills?: string[];
  specializations?: string[];
  social_links?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'auditor' | 'project_owner' | 'general';
  is_active: boolean;
  assigned_at: string;
  assigned_by?: string;
}
