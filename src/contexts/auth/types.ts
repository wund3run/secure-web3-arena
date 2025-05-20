
import { User, Session } from "@supabase/supabase-js";

export type UserType = "auditor" | "project_owner";

export interface AuthContextProps {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userProfile: any;
  error: string;
  signIn: (email: string, password: string, captchaToken?: string) => Promise<void>;
  signUp: (
    email: string, 
    password: string, 
    metadata?: { full_name?: string; user_type?: UserType }, 
    captchaToken?: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;
  getUserType: () => UserType;
}
