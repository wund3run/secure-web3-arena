
import { User, Session } from '@supabase/supabase-js';

export interface AuthContextProps {
  user: User | null;
  session: Session | null;
  userProfile: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;
  getUserType: () => 'auditor' | 'project_owner' | 'admin' | 'general' | 'visitor';
  updateProfile: (data: any) => Promise<void>;
  error: string | null;
}

export interface UserProfile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  wallet_address?: string;
  user_type?: 'auditor' | 'project_owner' | 'admin' | 'general' | 'visitor';
  verification_status?: string;
  bio?: string;
  website?: string;
  skills?: string[];
  specializations?: string[];
}
