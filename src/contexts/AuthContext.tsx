
import React, { createContext, useState, useEffect, useContext } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string, captchaToken: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: { full_name?: string }, captchaToken?: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithDiscord: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
  requireMFA: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  // Set this to true to enable MFA/2FA
  const [requireMFA, setRequireMFA] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast.success("Successfully signed in");
        } else if (event === 'SIGNED_OUT') {
          toast.info("Signed out");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string, captchaToken: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ 
        email, 
        password,
        options: {
          captchaToken
        }
      });
      
      if (error) throw error;

      // If MFA is required, redirect to 2FA page
      if (requireMFA) {
        // In a real implementation, you'd check if the user has MFA enabled
        navigate('/two-factor-auth', { state: { email } });
        return;
      }
      
      // If no MFA required, continue as normal
      navigate('/');
    } catch (error: any) {
      toast.error("Error signing in", {
        description: error.message,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: { full_name?: string }, captchaToken?: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: metadata,
          captchaToken
        },
      });
      
      if (error) throw error;
      
      toast.success("Registration successful", {
        description: "Please check your email to confirm your account.",
      });
    } catch (error: any) {
      toast.error("Error signing up", {
        description: error.message,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithDiscord = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: `${window.location.origin}/auth-callback`,
          scopes: 'identify email'
        }
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      toast.error("Error signing in with Discord", {
        description: error.message,
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/auth');
    } catch (error: any) {
      toast.error("Error signing out", {
        description: error.message,
      });
      throw error;
    }
  };

  const updateProfile = async (data: any) => {
    try {
      if (!user) throw new Error("User not authenticated");
      
      const { error } = await supabase
        .from('extended_profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error("Error updating profile", {
        description: error.message,
      });
      throw error;
    }
  };

  // New OTP verification function
  const verifyOTP = async (otp: string) => {
    try {
      // In a real implementation, this would call an API endpoint or Supabase function
      // to verify the OTP. For now, we'll simulate success with a fixed code.
      if (otp === '123456') {
        toast.success("OTP verified successfully");
        navigate('/');
        return;
      }
      
      throw new Error("Invalid verification code");
    } catch (error: any) {
      toast.error("OTP Verification failed", {
        description: error.message,
      });
      throw error;
    }
  };

  // Function to resend OTP
  const resendOTP = async (email: string) => {
    try {
      // In a real implementation, this would call an API endpoint to resend the OTP
      // For now, we'll just simulate success
      toast.success("Verification code sent", {
        description: `A new code has been sent to ${email}`,
      });
    } catch (error: any) {
      toast.error("Failed to send code", {
        description: error.message,
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      signIn, 
      signUp, 
      signOut,
      signInWithDiscord, 
      updateProfile,
      verifyOTP,
      resendOTP,
      requireMFA
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
