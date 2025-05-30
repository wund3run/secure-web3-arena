
import { User, Session } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  display_name: string | null;
  user_type: 'auditor' | 'project_owner' | 'admin' | 'general' | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  wallet_address: string | null;
  verification_status: string | null;
  specializations: string[] | null;
  projects_completed: number | null;
  years_of_experience: number | null;
  social_links: any | null;
  created_at: string;
  updated_at: string;
}

export interface AuthContextProps {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => Promise<any>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;
  getUserType: () => 'auditor' | 'project_owner' | 'admin' | 'general' | null;
}
