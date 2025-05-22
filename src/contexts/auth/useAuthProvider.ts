import { useState, useEffect } from "react";
import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { AuthContextProps, UserType } from "./types";
import { Database } from "@/types/supabase";

export const useAuthProvider = (): AuthContextProps => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [error, setError] = useState("");
  const supabase = useSupabaseClient<Database>();
  const { isLoading, supabaseClient } = useSessionContext();
  const router = useRouter();
  
  useEffect(() => {
    const getSession = async () => {
      try {
        setLoading(true);
        const {
          data: { session },
        } = await supabase.auth.getSession();
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    getSession();
    
    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUserProfile(null);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, supabaseClient]);
  
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: userProfile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error("Error fetching user profile:", error);
        setError(error.message);
      } else {
        setUserProfile(userProfile);
      }
    } catch (err: any) {
      console.error("Unexpected error fetching user profile:", err);
      setError(err.message);
    }
  };

  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string, captchaToken?: string) => {
    try {
      setLoading(true);
      
      // Verify reCAPTCHA if token is provided
      if (captchaToken) {
        const response = await fetch("/api/verify-captcha", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ captchaToken }),
        });
        
        const data = await response.json();
        if (!data.success) {
          setError("reCAPTCHA verification failed. Please try again.");
          return;
        }
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        setUser(data.user);
        setSession(data.session);
        
        // Fetch user profile immediately after sign-in
        if (data.user) {
          await fetchUserProfile(data.user.id);
        }
        
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign up with email and password
   */
  const signUp = async (
    email: string, 
    password: string, 
    fullName?: string,
    userType?: UserType, 
    captchaToken?: string
  ) => {
    try {
      setLoading(true);
      
      // Verify reCAPTCHA if token is provided
      if (captchaToken) {
        const response = await fetch("/api/verify-captcha", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ captchaToken }),
        });
        
        const data = await response.json();
        if (!data.success) {
          setError("reCAPTCHA verification failed. Please try again.");
          return;
        }
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            user_type: userType,
          },
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setUser(data.user);
        setSession(data.session);
        
        // Create user profile immediately after sign-up
        if (data.user) {
          await createUserProfile(data.user.id, email, fullName, userType);
        }
        
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Create user profile in the database
   */
  const createUserProfile = async (
    userId: string, 
    email: string, 
    fullName?: string,
    userType?: UserType
  ) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert([
          { 
            id: userId, 
            email: email, 
            full_name: fullName,
            user_type: userType,
            updated_at: new Date()
          },
        ]);
      
      if (error) {
        console.error("Error creating user profile:", error);
        setError(error.message);
      } else {
        await fetchUserProfile(userId);
      }
    } catch (err: any) {
      console.error("Unexpected error creating user profile:", err);
      setError(err.message);
    }
  };

  /**
   * Sign out
   */
  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      } else {
        setUser(null);
        setSession(null);
        setUserProfile(null);
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Forgot password
   */
  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });
      if (error) {
        setError(error.message);
      } else {
        toast.success("Password reset email sent.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Reset password
   */
  const resetPassword = async (newPassword: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        setError(error.message);
      } else {
        toast.success("Password updated successfully.");
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get the user's type from the user object
   */
  const getUserType = (): "auditor" | "project_owner" | "visitor" => {
    if (!user) return "visitor";
    
    // First check userProfile if available
    if (userProfile?.user_type) {
      return userProfile.user_type as "auditor" | "project_owner";
    }
    
    // Fall back to user_metadata
    return (user.user_metadata?.user_type as "auditor" | "project_owner") || "project_owner";
  };

  return {
    user,
    session,
    loading,
    userProfile,
    error,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    resetPassword,
    getUserType,
  };
};
