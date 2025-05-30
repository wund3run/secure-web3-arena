
import { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  full_name?: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  website?: string;
  wallet_address?: string;
  user_type?: 'auditor' | 'project_owner' | 'admin' | 'general' | 'visitor';
  verification_status?: string;
  skills?: string[];
  specializations?: string[];
  social_links?: any;
  years_of_experience?: number;
  projects_completed?: number;
  company?: string;
  location?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthContextProps {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => Promise<any>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;
  getUserType: () => 'auditor' | 'project_owner' | 'admin' | 'general' | 'visitor';
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  error: string | null;
}
