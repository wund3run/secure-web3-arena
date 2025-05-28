
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, UserProfile } from './types';
import { analyticsTracker } from '@/utils/analytics-tracker';

export function useAuthProvider() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('extended_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (data) {
        // Ensure user_type is properly typed
        const typedProfile: UserProfile = {
          ...data,
          user_type: data.user_type as 'auditor' | 'project_owner' | 'admin' | undefined,
          social_links: data.social_links as Record<string, string> | undefined
        };
        setUserProfile(typedProfile);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  }, []);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        } else if (session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
          analyticsTracker.setUserId(session.user.id);
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.info('Auth state changed:', event);
        
        if (session?.user) {
          setUser(session.user);
          analyticsTracker.setUserId(session.user.id);
          
          // Defer profile fetching to avoid potential recursion
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUser(null);
          setUserProfile(null);
        }
        
        if (event === 'SIGNED_OUT') {
          analyticsTracker.track('auth', 'user', 'signed_out');
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchUserProfile]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      analyticsTracker.track('auth', 'user', 'signed_in');
      toast.success('Successfully signed in!');
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError(error.message || 'Failed to sign in');
      analyticsTracker.trackError(error, { context: 'sign_in' });
      toast.error(error.message || 'Failed to sign in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) {
        throw error;
      }

      analyticsTracker.track('auth', 'user', 'signed_up');
      toast.success('Account created successfully!');
    } catch (error: any) {
      console.error('Sign up error:', error);
      setError(error.message || 'Failed to create account');
      analyticsTracker.trackError(error, { context: 'sign_up' });
      toast.error(error.message || 'Failed to create account');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }

      setUser(null);
      setUserProfile(null);
      setError(null);
      analyticsTracker.track('auth', 'user', 'signed_out');
      toast.success('Successfully signed out!');
    } catch (error: any) {
      console.error('Sign out error:', error);
      setError(error.message || 'Failed to sign out');
      analyticsTracker.trackError(error, { context: 'sign_out' });
      toast.error(error.message || 'Failed to sign out');
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    try {
      const { error } = await supabase
        .from('extended_profiles')
        .upsert({
          id: user.id,
          ...updates,
          updated_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }

      await fetchUserProfile(user.id);
      analyticsTracker.track('profile', 'user', 'updated');
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Update profile error:', error);
      setError(error.message || 'Failed to update profile');
      analyticsTracker.trackError(error, { context: 'update_profile' });
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) {
        throw error;
      }

      analyticsTracker.track('auth', 'user', 'password_reset_requested');
      toast.success('Password reset email sent!');
    } catch (error: any) {
      console.error('Forgot password error:', error);
      setError(error.message || 'Failed to send reset email');
      analyticsTracker.trackError(error, { context: 'forgot_password' });
      toast.error(error.message || 'Failed to send reset email');
      throw error;
    }
  };

  const resetPassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        throw error;
      }

      analyticsTracker.track('auth', 'user', 'password_reset_completed');
      toast.success('Password reset successfully!');
    } catch (error: any) {
      console.error('Reset password error:', error);
      setError(error.message || 'Failed to reset password');
      analyticsTracker.trackError(error, { context: 'reset_password' });
      toast.error(error.message || 'Failed to reset password');
      throw error;
    }
  };

  const getUserType = (): 'auditor' | 'project_owner' | 'admin' | null => {
    return userProfile?.user_type || null;
  };

  return {
    user,
    userProfile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    updateProfile,
    forgotPassword,
    resetPassword,
    getUserType
  };
}
