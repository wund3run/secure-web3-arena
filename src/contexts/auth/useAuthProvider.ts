import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { AuthContextProps, UserProfile } from './types';

export function useAuthProvider(): AuthContextProps {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile when user is authenticated
          setTimeout(async () => {
            try {
              const { data: profile } = await supabase
                .from('extended_profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              if (profile) {
                // Type-safe conversion
                const typedProfile: UserProfile = {
                  ...profile,
                  user_type: profile.user_type as UserProfile['user_type'] || 'project_owner'
                };
                setUserProfile(typedProfile);
              }
            } catch (err) {
              console.log('Profile not found, will be created on first update');
            }
          }, 0);
        } else {
          setUserProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success('Welcome back!');
    } catch (err: any) {
      setError(err.message);
      toast.error('Sign in failed', { description: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => {
    setError(null);
    setLoading(true);
    
    try {
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
      
      toast.success('Account created successfully! Please check your email to verify your account.');
    } catch (err: any) {
      setError(err.message);
      toast.error('Sign up failed', { description: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setError(null);
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      setUserProfile(null);
      toast.success('Signed out successfully');
    } catch (err: any) {
      setError(err.message);
      toast.error('Sign out failed', { description: err.message });
      throw err;
    }
  };

  const forgotPassword = async (email: string) => {
    setError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      
      toast.success('Password reset email sent');
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to send reset email', { description: err.message });
      throw err;
    }
  };

  const resetPassword = async (newPassword: string) => {
    setError(null);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast.success('Password updated successfully');
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to update password', { description: err.message });
      throw err;
    }
  };

  const getUserType = (): 'auditor' | 'project_owner' | 'admin' | 'general' | 'visitor' => {
    if (userProfile?.user_type) {
      return userProfile.user_type as 'auditor' | 'project_owner' | 'admin' | 'general' | 'visitor';
    }
    return user?.user_metadata?.user_type || 'project_owner';
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');
    
    setError(null);
    
    try {
      const { error } = await supabase
        .from('extended_profiles')
        .upsert({
          id: user.id,
          ...data,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      
      // Refresh user profile
      const { data: updatedProfile } = await supabase
        .from('extended_profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (updatedProfile) {
        const typedProfile: UserProfile = {
          ...updatedProfile,
          user_type: updatedProfile.user_type as UserProfile['user_type'] || 'project_owner'
        };
        setUserProfile(typedProfile);
      }
      toast.success('Profile updated successfully');
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to update profile', { description: err.message });
      throw err;
    }
  };

  return {
    user,
    session,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    resetPassword,
    getUserType,
    updateProfile,
    error,
  };
}
