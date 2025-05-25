
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
  
  // Enhanced profile fetching with better error handling
  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      console.log("Fetching user profile for:", userId);
      
      // Try to get from profiles table first
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profileError && profileError.code !== 'PGRST116') {
        console.error("Error fetching profile:", profileError);
        throw profileError;
      }
      
      // If no profile exists, try extended_profiles
      if (!profileData) {
        const { data: extendedProfile, error: extendedError } = await supabase
          .from('extended_profiles')
          .select('*')
          .eq('id', userId)
          .single();
          
        if (extendedError && extendedError.code !== 'PGRST116') {
          console.error("Error fetching extended profile:", extendedError);
        }
        
        setUserProfile(extendedProfile);
      } else {
        setUserProfile(profileData);
      }
      
      console.log("Profile fetched successfully");
    } catch (err: any) {
      console.error("Profile fetch error:", err);
      setError("");
      // Don't show error toast for missing profiles - this is expected for new users
      if (err.code !== 'PGRST116') {
        console.warn("Failed to load user profile, but continuing...");
      }
    }
  }, []);
  
  // Enhanced session initialization
  useEffect(() => {
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        console.log("Initializing authentication...");
        
        // Set up auth state listener FIRST
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log("Auth state changed:", event, session?.user?.id);
            
            if (mounted) {
              setSession(session);
              setUser(session?.user ?? null);
              
              if (session?.user && event === 'SIGNED_IN') {
                // Fetch profile with a small delay to ensure database consistency
                setTimeout(() => {
                  if (mounted) {
                    fetchUserProfile(session.user.id);
                  }
                }, 200);
              } else if (event === 'SIGNED_OUT') {
                setUserProfile(null);
                setError("");
              }
            }
          }
        );
        
        // THEN check for existing session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          throw sessionError;
        }
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            console.log("User found, fetching profile...");
            await fetchUserProfile(session.user.id);
          }
        }
        
        console.log("Authentication initialized successfully");
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (err: any) {
        console.error("Auth initialization error:", err);
        if (mounted) {
          setError(err.message);
          toast.error("Authentication initialization failed");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    
    const cleanup = initializeAuth();
    
    return () => {
      mounted = false;
      cleanup.then(cleanupFn => cleanupFn && cleanupFn());
    };
  }, [fetchUserProfile]);

  // Enhanced sign in with better error handling
  const signIn = async (email: string, password: string, captchaToken?: string) => {
    try {
      setLoading(true);
      setError("");
      console.log("Attempting sign in for:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Sign in error:", error);
        setError(error.message);
        toast.error("Sign in failed", { description: error.message });
        return;
      }
      
      if (data.user && data.session) {
        console.log("Sign in successful");
        toast.success("Successfully signed in");
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("Unexpected sign in error:", err);
      const errorMessage = err.message || "An unexpected error occurred";
      setError(errorMessage);
      toast.error("Sign in failed", { description: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  // Enhanced sign up with comprehensive profile creation
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
      console.log("Attempting sign up for:", email);
      
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
        console.error("Sign up error:", error);
        setError(error.message);
        toast.error("Sign up failed", { description: error.message });
        return;
      }
      
      if (data.user) {
        console.log("Sign up successful, creating profiles...");
        
        // Create both profile records
        await createUserProfiles(data.user.id, email, fullName, userType);
        
        toast.success("Account created successfully");
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("Unexpected sign up error:", err);
      const errorMessage = err.message || "An unexpected error occurred";
      setError(errorMessage);
      toast.error("Sign up failed", { description: errorMessage });
    } finally {
      setLoading(false);
    }
  };
  
  // Enhanced profile creation with better error handling
  const createUserProfiles = async (
    userId: string, 
    email: string, 
    fullName?: string,
    userType?: UserType
  ) => {
    try {
      console.log("Creating user profiles for:", userId);
      
      // Create main profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: userId, 
          full_name: fullName || '',
          wallet_address: null,
          avatar_url: null,
          is_arbitrator: false,
          updated_at: new Date().toISOString()
        });
      
      if (profileError) {
        console.error("Profile creation error:", profileError);
        // Don't throw - extended profile might still work
      }
      
      // Create extended profile
      const { error: extendedError } = await supabase
        .from('extended_profiles')
        .insert({
          id: userId,
          full_name: fullName || '',
          user_type: userType || 'project_owner',
          verification_status: 'pending',
          projects_completed: 0
        });
      
      if (extendedError) {
        console.error("Extended profile creation error:", extendedError);
        // Don't throw - user can still use the platform
      }
      
      console.log("User profiles created successfully");
    } catch (err: any) {
      console.error("Profile creation error:", err);
      // Don't prevent sign up for profile creation issues
      console.warn("Profile creation partially failed - user can update it later");
    }
  };

  // Enhanced sign out
  const signOut = async () => {
    try {
      setLoading(true);
      console.log("Signing out...");
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
        setError(error.message);
        toast.error("Sign out failed", { description: error.message });
        return;
      }
      
      setUser(null);
      setSession(null);
      setUserProfile(null);
      setError("");
      toast.success("Successfully signed out");
      navigate("/");
    } catch (err: any) {
      console.error("Unexpected sign out error:", err);
      setError(err.message);
      toast.error("Sign out failed", { description: err.message });
    } finally {
      setLoading(false);
    }
  };
  
  // Enhanced forgot password
  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      console.log("Sending password reset for:", email);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });
      
      if (error) {
        console.error("Password reset error:", error);
        setError(error.message);
        toast.error("Password reset failed", { description: error.message });
        return;
      }
      
      toast.success("Password reset email sent");
    } catch (err: any) {
      console.error("Unexpected password reset error:", err);
      setError(err.message);
      toast.error("Password reset failed", { description: err.message });
    } finally {
      setLoading(false);
    }
  };
  
  // Enhanced reset password
  const resetPassword = async (newPassword: string) => {
    try {
      setLoading(true);
      console.log("Updating password...");
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) {
        console.error("Password update error:", error);
        setError(error.message);
        toast.error("Password update failed", { description: error.message });
        return;
      }
      
      toast.success("Password updated successfully");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Unexpected password update error:", err);
      setError(err.message);
      toast.error("Password update failed", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Enhanced user type detection
  const getUserType = (): UserType => {
    if (!user) return "visitor" as UserType;
    
    // Check userProfile first
    if (userProfile?.user_type) {
      return userProfile.user_type as UserType;
    }
    
    // Fall back to user metadata
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
