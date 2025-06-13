
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupabaseClient, User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { UserProfile, UserRole, AuthContextProps } from './types';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
          await fetchUserRoles(session.user.id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        await fetchUserProfile(currentUser.id);
        await fetchUserRoles(currentUser.id);
      } else {
        setUserProfile(null);
        setUserRoles([]);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
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
        // Ensure verification_status matches our type and handle social_links properly
        const profile: UserProfile = {
          ...data,
          verification_status: (data.verification_status as UserProfile['verification_status']) || 'unverified',
          social_links: (typeof data.social_links === 'object' && data.social_links !== null && !Array.isArray(data.social_links)) 
            ? data.social_links as Record<string, string>
            : {},
          skills: data.skills || [],
          specializations: data.specializations || []
        };
        setUserProfile(profile);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  const fetchUserRoles = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true);
      
      if (error) {
        console.error('Error fetching user roles:', error);
        return;
      }
      
      setUserRoles(data || []);
    } catch (err) {
      console.error('Error fetching user roles:', err);
    }
  };

  const getUserType = (): 'auditor' | 'project_owner' | 'admin' | 'general' => {
    // Check for admin role first
    if (userRoles.some(role => role.role === 'admin' && role.is_active)) {
      return 'admin';
    }
    
    // Check for other roles
    const activeRole = userRoles.find(role => role.is_active && role.role !== 'general');
    if (activeRole) {
      return activeRole.role as 'auditor' | 'project_owner' | 'admin' | 'general';
    }
    
    return 'general';
  };

  const hasRole = (role: string): boolean => {
    return userRoles.some(userRole => userRole.role === role && userRole.is_active);
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
          data: {
            full_name: fullName,
            userType: userType,
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
        const profile: UserProfile = {
          ...data,
          verification_status: (data.verification_status as UserProfile['verification_status']) || 'unverified',
          social_links: (typeof data.social_links === 'object' && data.social_links !== null && !Array.isArray(data.social_links)) 
            ? data.social_links as Record<string, string>
            : {},
          skills: data.skills || [],
          specializations: data.specializations || []
        };
        setUserProfile(profile);
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
    userRoles,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    updateProfile,
    updateUserProfile,
    getUserType,
    hasRole,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
