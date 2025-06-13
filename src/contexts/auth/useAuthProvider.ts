
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { profileService } from './services/profileService';
import { UserProfile } from './types';
import { toast } from 'sonner';

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(async () => {
            const profile = await profileService.fetchProfile(session.user.id);
            setUserProfile(profile);
          }, 0);
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        profileService.fetchProfile(session.user.id).then(setUserProfile);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setError(error);
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => {
    const redirectUrl = `${window.location.origin}/auth/callback`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          user_type: userType,
        }
      }
    });

    if (!error && data.user) {
      await profileService.createProfile(data.user.id, fullName, userType);
    }

    setError(error);
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const forgotPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  };

  const resetPassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) throw error;
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) return null;
    
    try {
      const updatedProfile = await profileService.updateProfile(user.id, data);
      if (updatedProfile) {
        setUserProfile(updatedProfile);
      }
      return updatedProfile;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  const updateProfile = updateUserProfile; // Alias for compatibility

  const getUserType = (): 'auditor' | 'project_owner' | 'admin' | 'general' | 'visitor' | null => {
    // Since we removed user_type from profile, we need to fetch this from user_roles
    // For now, return null and let the calling code handle it appropriately
    return null;
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
    updateUserProfile,
    updateProfile,
    getUserType,
  };
};
