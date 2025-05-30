import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User, Session } from "@supabase/supabase-js";
import { AuthContextProps, UserProfile } from "./types";

export function useAuthProvider(): AuthContextProps {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user profile if user exists
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        }
      } catch (error: any) {
        console.error("Error getting session:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUserProfile(null);
        }
        
        setLoading(false);
        
        if (event === 'SIGNED_IN') {
          toast.success('Successfully signed in');
        } else if (event === 'SIGNED_OUT') {
          toast.success('Successfully signed out');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const profile = await profileService.fetchProfile(userId);
      if (profile) {
        setUserProfile(profile);
      } else {
        // Fallback to basic profiles table
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        
        if (data) {
          const basicProfile: UserProfile = {
            id: data.id,
            user_id: data.id,
            full_name: data.full_name,
            display_name: data.full_name, // Use full_name as display_name fallback
            user_type: 'general',
            avatar_url: data.avatar_url,
            bio: null,
            website: null,
            wallet_address: data.wallet_address,
            verification_status: null,
            specializations: null,
            projects_completed: null,
            years_of_experience: null,
            social_links: null,
            created_at: data.created_at,
            updated_at: data.updated_at,
          };
          setUserProfile(basicProfile);
        }
      }
    } catch (error: any) {
      console.error("Error fetching user profile:", error);
      // Don't set error state for profile fetch failures
    }
  };

  const getUserType = (): 'auditor' | 'project_owner' | 'admin' | 'general' | null => {
    return userProfile?.user_type || 'general';
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      return data;
    } catch (error: any) {
      setError(error.message);
      toast.error('Sign in failed', { description: error.message });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => {
    try {
      setLoading(true);
      setError(null);
      
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

      if (error) throw error;
      
      if (data.user && !data.session) {
        toast.success('Check your email for the confirmation link');
      }
      
      return data;
    } catch (error: any) {
      setError(error.message);
      toast.error('Sign up failed', { description: error.message });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
      toast.error('Sign out failed', { description: error.message });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setError(null);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;
      
      toast.success('Check your email for the password reset link');
    } catch (error: any) {
      setError(error.message);
      toast.error('Password reset failed', { description: error.message });
      throw error;
    }
  };

  const resetPassword = async (newPassword: string) => {
    try {
      setError(null);
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      
      toast.success('Password updated successfully');
    } catch (error: any) {
      setError(error.message);
      toast.error('Password update failed', { description: error.message });
      throw error;
    }
  };

  return {
    user,
    session,
    userProfile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    resetPassword,
    getUserType,
  };
}
