
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { SupabaseClient, User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { UserProfile } from './types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => Promise<any>;
  signOut: () => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<any>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<any>;
  getUserType: () => 'auditor' | 'project_owner' | 'admin' | 'general';
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for an active session when the component mounts
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          setError(error.message);
          return;
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    getSession();

    // Listen for changes in authentication state (login, logout, etc.)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        await fetchUserProfile(currentUser.id);
      } else {
        setUserProfile(null);
      }
      
      // === THIS IS THE ROUTING LOGIC ===
      if (event === 'SIGNED_IN' && currentUser) {
        // Supabase stores custom sign-up data in user_metadata
        const userRole = currentUser.user_metadata.userType || 'project_owner';
        
        if (userRole === 'auditor') {
          navigate('/dashboard/auditor');
        } else {
          navigate('/dashboard/project-owner');
        }
      } else if (event === 'SIGNED_OUT') {
        navigate('/auth');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('extended_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        console.error('Error fetching user profile:', error);
        return;
      }
      
      if (data) {
        const typedProfile: UserProfile = {
          ...data,
          user_type: data.user_type as UserProfile['user_type'] || 'general',
          verification_status: (data.verification_status as UserProfile['verification_status']) || 'pending',
          social_links: (data.social_links as Record<string, string>) || {},
          skills: data.skills || [],
          specializations: data.specializations || []
        };
        setUserProfile(typedProfile);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  const getUserType = (): 'auditor' | 'project_owner' | 'admin' | 'general' => {
    if (userProfile?.user_type) {
      return userProfile.user_type;
    }
    if (user?.user_metadata?.userType) {
      return user.user_metadata.userType;
    }
    return 'general';
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const result = await supabase.auth.signInWithPassword({ email, password });
      if (result.error) {
        setError(result.error.message);
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign in failed';
      setError(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  const signUp = async (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => {
    try {
      setError(null);
      const result = await supabase.auth.signUp({
        email,
        password,
        options: {
          // This is how you pass custom data during sign-up with Supabase
          data: {
            full_name: fullName,
            userType: userType, // 'auditor' or 'project_owner'
          },
        },
      });
      if (result.error) {
        setError(result.error.message);
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign up failed';
      setError(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const result = await supabase.auth.signOut();
      if (result.error) {
        setError(result.error.message);
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign out failed';
      setError(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setError(null);
      const result = await supabase.auth.resetPasswordForEmail(email);
      if (result.error) {
        setError(result.error.message);
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Password reset failed';
      setError(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: { message: 'No user logged in' } };
    
    try {
      setError(null);
      const { data, error } = await supabase
        .from('extended_profiles')
        .upsert({ id: user.id, ...updates })
        .select()
        .single();
      
      if (error) {
        setError(error.message);
        return { error };
      }
      
      if (data) {
        const typedProfile: UserProfile = {
          ...data,
          user_type: data.user_type as UserProfile['user_type'] || 'general',
          verification_status: (data.verification_status as UserProfile['verification_status']) || 'pending',
          social_links: (data.social_links as Record<string, string>) || {},
          skills: data.skills || [],
          specializations: data.specializations || []
        };
        setUserProfile(typedProfile);
      }
      return { data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Profile update failed';
      setError(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    return updateProfile(updates);
  };

  const value = {
    user,
    session,
    userProfile,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    updateProfile,
    updateUserProfile,
    getUserType,
    loading,
    error,
  };

  // Don't render children until we've checked for a session
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// Custom hook to easily access the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
