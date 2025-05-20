
import { Session, User } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  user_id: string;
  user_type: "auditor" | "project_owner";
  display_name: string;
  full_name?: string;
  projects_completed?: number;
  // Add other profile fields as needed
}

export interface AuthContextProps {
  user: User | null;
  userProfile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string, captchaToken?: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: { full_name?: string, user_type?: "auditor" | "project_owner" }, captchaToken?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
  requireMFA: boolean;
}

export type AuthContextType = AuthContextProps;
