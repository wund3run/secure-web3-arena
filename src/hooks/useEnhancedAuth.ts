import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';

export interface EnhancedAuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  requires2FA: boolean;
  verificationPending: boolean;
}

export const useEnhancedAuth = () => {
  const [authState, setAuthState] = useState<EnhancedAuthState>({
    user: null,
    session: null,
    loading: true,
    requires2FA: false,
    verificationPending: false,
  });

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setAuthState(prev => ({
        ...prev,
        user: session?.user ?? null,
        session,
        loading: false,
      }));
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        setAuthState(prev => ({
          ...prev,
          user: session?.user ?? null,
          session,
          loading: false,
          verificationPending: event === 'SIGNED_IN' && !session?.user?.email_confirmed_at,
        }));

        if (event === 'SIGNED_IN') {
          toast.success('Successfully signed in');
        } else if (event === 'SIGNED_OUT') {
          toast.success('Successfully signed out');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { user: data.user, session: data.session };
    } catch (error: any) {
      toast.error('Sign in failed', { description: error.message });
      throw error;
    } finally {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  };

  const signUpWithEmail = async (
    email: string, 
    password: string, 
    options?: { 
      fullName?: string;
      userType?: string;
    }
  ) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: options?.fullName,
            user_type: options?.userType || 'project_owner',
          },
        },
      });

      if (error) throw error;

      if (data.user && !data.session) {
        setAuthState(prev => ({ ...prev, verificationPending: true }));
        toast.success('Check your email for the confirmation link');
      }

      return { user: data.user, session: data.session };
    } catch (error: any) {
      toast.error('Sign up failed', { description: error.message });
      throw error;
    } finally {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  };

  const signInWithProvider = async (provider: 'google' | 'github') => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      return data;
    } catch (error: any) {
      toast.error(`${provider} sign in failed`, { description: error.message });
      throw error;
    } finally {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  };

  const signOut = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setAuthState({
        user: null,
        session: null,
        loading: false,
        requires2FA: false,
        verificationPending: false,
      });
    } catch (error: any) {
      toast.error('Sign out failed', { description: error.message });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;
      
      toast.success('Check your email for the password reset link');
    } catch (error: any) {
      toast.error('Password reset failed', { description: error.message });
      throw error;
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      
      toast.success('Password updated successfully');
    } catch (error: any) {
      toast.error('Password update failed', { description: error.message });
      throw error;
    }
  };

  return {
    ...authState,
    signInWithEmail,
    signUpWithEmail,
    signInWithProvider,
    signOut,
    resetPassword,
    updatePassword,
  };
};
