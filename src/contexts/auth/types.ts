
import { User as SupabaseUser } from '@supabase/supabase-js';

export interface User extends SupabaseUser {}

export interface UserProfile {
  id: string;
  full_name?: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  website?: string;
  wallet_address?: string;
  user_type?: 'auditor' | 'project_owner';
  verification_status?: string;
  skills?: string[];
  specializations?: string[];
  years_of_experience?: number;
  projects_completed?: number;
  social_links?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface AuthContextProps {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;
  getUserType: () => 'auditor' | 'project_owner' | null;
}
