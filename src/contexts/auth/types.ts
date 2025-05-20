
import { Session, User } from "@supabase/supabase-js";

export interface AuthContextProps {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userProfile?: any; // Add userProfile property
  signIn: (email: string, password: string, captchaToken: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: { full_name?: string, user_type?: string }, captchaToken?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
  requireMFA: boolean;
}
