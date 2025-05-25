
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserType, AuthContextProps } from "./types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const useAuthProvider = (): AuthContextProps => {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  // Memoize fetchUserProfile to prevent unnecessary re-renders
  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data: userProfile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
        console.error("Error fetching user profile:", error);
        setError(error.message);
      } else {
        setUserProfile(userProfile);
      }
    } catch (err: any) {
      console.error("Unexpected error fetching user profile:", err);
      setError(err.message);
    }
  }, []);
  
  useEffect(() => {
    let mounted = true;
    
    const getSession = async () => {
      try {
        setLoading(true);
        const {
          data: { session },
        } = await supabase.auth.getSession();
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await fetchUserProfile(session.user.id);
          }
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    
    getSession();
    
    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            // Use setTimeout to prevent auth state callback issues
            setTimeout(() => {
              fetchUserProfile(session.user.id);
            }, 0);
          } else {
            setUserProfile(null);
          }
        }
      }
    );
    
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchUserProfile]);

  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string, captchaToken?: string) => {
    try {
      setLoading(true);
      setError("");
      
      // Skip captcha verification since the API endpoint doesn't exist
      // This would normally verify reCAPTCHA in production
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        setError(error.message);
        toast.error("Sign in failed", { description: error.message });
      } else {
        setUser(data.user);
        setSession(data.session);
        
        // Profile will be fetched by auth state change listener
        toast.success("Successfully signed in");
        navigate("/dashboard");
      }
    } catch (err: any) {
      const errorMessage = err.message || "An unexpected error occurred";
      setError(errorMessage);
      toast.error("Sign in failed", { description: errorMessage });
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
      setError("");
      
      // Skip captcha verification since the API endpoint doesn't exist
      
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
        toast.error("Sign up failed", { description: error.message });
      } else {
        setUser(data.user);
        setSession(data.session);
        
        // Create user profile immediately after sign-up
        if (data.user) {
          await createUserProfile(data.user.id, email, fullName, userType);
        }
        
        toast.success("Account created successfully");
        navigate("/dashboard");
      }
    } catch (err: any) {
      const errorMessage = err.message || "An unexpected error occurred";
      setError(errorMessage);
      toast.error("Sign up failed", { description: errorMessage });
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
      // First, create the main profile record
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: userId, 
          full_name: fullName,
          wallet_address: null,
          avatar_url: null,
          is_arbitrator: false,
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        console.error("Error creating user profile:", error);
        setError(error.message);
      } else {
        // Then create the extended profile with user type
        const { error: extendedError } = await supabase
          .from('extended_profiles')
          .insert({
            id: userId,
            full_name: fullName,
            user_type: userType
          });
        
        if (extendedError) {
          console.error("Error creating extended user profile:", extendedError);
          setError(extendedError.message);
        }
        
        // Fetch the profile after creation
        setTimeout(() => {
          fetchUserProfile(userId);
        }, 0);
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
        toast.error("Sign out failed", { description: error.message });
      } else {
        setUser(null);
        setSession(null);
        setUserProfile(null);
        toast.success("Successfully signed out");
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message);
      toast.error("Sign out failed", { description: err.message });
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
        toast.error("Password reset failed", { description: error.message });
      } else {
        toast.success("Password reset email sent.");
      }
    } catch (err: any) {
      setError(err.message);
      toast.error("Password reset failed", { description: err.message });
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
        toast.error("Password update failed", { description: error.message });
      } else {
        toast.success("Password updated successfully.");
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
      toast.error("Password update failed", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get the user's type from the user object
   */
  const getUserType = (): UserType => {
    if (!user) return "visitor" as UserType;
    
    // First check userProfile if available
    if (userProfile?.user_type) {
      return userProfile.user_type as UserType;
    }
    
    // Fall back to user_metadata
    return (user.user_metadata?.user_type as UserType) || "project_owner";
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
