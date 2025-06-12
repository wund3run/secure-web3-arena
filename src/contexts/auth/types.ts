
import { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  full_name?: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  website?: string;
  wallet_address?: string;
  user_type: 'auditor' | 'project_owner' | 'admin' | 'general' | 'visitor';
  verification_status: 'pending' | 'verified' | 'rejected';
  skills?: string[];
  specializations?: string[];
  social_links?: Record<string, string>;
  years_of_experience?: number;
  projects_completed?: number;
  created_at: string;
  updated_at: string;
}

export interface AuthContextProps {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: any;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<UserProfile | null>;
  updateProfile: (data: Partial<UserProfile>) => Promise<UserProfile | null>;
  getUserType: () => 'auditor' | 'project_owner' | 'admin' | 'general' | 'visitor' | null;
}
