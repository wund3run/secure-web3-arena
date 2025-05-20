
import { User, Session } from "@supabase/supabase-js";

export interface AuthContextProps {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userProfile: any;
  error: string | null;
  signIn: (email: string, password: string, captchaToken?: string) => Promise<void>;
  signUp: (
    email: string, 
    password: string, 
    fullName: string, 
    userType?: "auditor" | "project_owner", 
    captchaToken?: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
  requireMFA: boolean;
  getUserType: () => "auditor" | "project_owner";
}
