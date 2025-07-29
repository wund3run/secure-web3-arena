import { User, Session } from '@supabase/supabase-js';

// Supabase User type
export interface SupabaseUser {
  id: string;
  email?: string;
  phone?: string;
  app_metadata: Record<string, unknown>;
  user_metadata: Record<string, unknown>;
  aud: string;
  created_at: string;
}

export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url?: string | null;
  wallet_address?: string | null;
  user_type: 'auditor' | 'project_owner' | 'admin' | 'general';
  created_at: string;
  updated_at: string;
  is_arbitrator?: boolean;
  
  // Additional optional properties for dashboard features
  display_name?: string | null;
  bio?: string | null;
  skills?: string[] | null;
  verification_status?: VerificationStatus;
  projects_completed?: number | null;
  current_audit_progress?: number | null;
  current_audit_stage?: string | null;
  security_score?: number | null;
  completed_audits?: number | null;
  response_time?: number | null;
  years_of_experience?: number | null;
  social_links?: Record<string, string>;
  specializations?: string[] | null;
  
  // Index signature to allow additional dynamic properties
  [key: string]: any;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'auditor' | 'project_owner' | 'admin' | 'general';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Supabase User type
export interface SupabaseUser {
  id: string;
  email?: string;
  phone?: string;
  app_metadata: Record<string, unknown>;
  user_metadata: Record<string, unknown>;
  aud: string;
  created_at: string;
}

// Supabase Session type
export interface SupabaseSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
  user: SupabaseUser;
}

// Auth operation result types
export interface AuthResult {
  data: { user: SupabaseUser | null; session: SupabaseSession | null } | null;
  error: { message: string; status?: number } | null;
}

export interface ProfileUpdateResult {
  data: UserProfile | null;
  error: { message: string; status?: number } | null;
}

export interface AuthContextProps {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  userRoles: UserRole[];
  signIn: (email: string, password: string) => Promise<{ user: User | null; session: Session | null }>;
  signUp: (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => Promise<{ user: User | null; session: Session | null }>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;
  getUserType: () => 'auditor' | 'project_owner' | 'admin' | 'general';
  hasRole: (role: string) => boolean;
  loading: boolean;
  error: string | null;
  isOffline: boolean;
}
