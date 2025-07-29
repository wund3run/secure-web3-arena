'use client';

import React, { useState, useEffect, ReactNode, useContext, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { UserProfile, UserRole, AuthContextProps } from './types';
import { AuthContext } from './AuthContext.ts';

const SESSION_STORAGE_KEY = 'auth_session';
const PROFILE_STORAGE_KEY = 'auth_profile';
const ROLES_STORAGE_KEY = 'auth_roles';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load cached data
  const loadCachedData = useCallback(() => {
    try {
      const cachedSession = localStorage.getItem(SESSION_STORAGE_KEY);
      const cachedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
      const cachedRoles = localStorage.getItem(ROLES_STORAGE_KEY);

      if (cachedSession) {
        const parsedSession = JSON.parse(cachedSession);
        setSession(parsedSession);
        setUser(parsedSession?.user ?? null);
      }

      if (cachedProfile) {
        setUserProfile(JSON.parse(cachedProfile));
      }

      if (cachedRoles) {
        setUserRoles(JSON.parse(cachedRoles));
      }
    } catch (err) {
      console.error('Error loading cached auth data:', err);
    }
  }, []);

  // Cache current data
  const cacheCurrentData = useCallback(() => {
    try {
      if (session) {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }

      if (userProfile) {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(userProfile));
      } else {
        localStorage.removeItem(PROFILE_STORAGE_KEY);
      }

      if (userRoles.length) {
        localStorage.setItem(ROLES_STORAGE_KEY, JSON.stringify(userRoles));
      } else {
        localStorage.removeItem(ROLES_STORAGE_KEY);
      }
    } catch (err) {
      console.error('Error caching auth data:', err);
    }
  }, [session, userProfile, userRoles]);

  // Fetch user profile with retry logic
  const fetchUserProfile = useCallback(async (userId: string) => {
    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) throw error;

        if (data) {
          setUserProfile(data as UserProfile);
          return data;
        }
        return null;
      } catch (err) {
        attempt++;
        if (attempt === maxRetries) {
          console.error('Failed to fetch user profile:', err);
          if (!isOffline) {
            toast.error('Failed to load user profile', {
              description: 'Please try refreshing the page'
            });
          }
          return null;
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }, [isOffline]);

  // Fetch user roles with retry logic
  const fetchUserRoles = useCallback(async (userId: string) => {
    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', userId);

        if (error) throw error;

        if (data) {
          setUserRoles(data as unknown as UserRole[]);
          return data;
        }
        return [];
      } catch (err) {
        attempt++;
        if (attempt === maxRetries) {
          console.error('Failed to fetch user roles:', err);
          if (!isOffline) {
            toast.error('Failed to load user roles', {
              description: 'Please try refreshing the page'
            });
          }
          return [];
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }, [isOffline]);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Load cached data first
        loadCachedData();

        // Then fetch fresh data
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);

          if (session?.user) {
            await Promise.all([
              fetchUserProfile(session.user.id),
              fetchUserRoles(session.user.id)
            ]);
          }
        }
      } catch (err) {
        console.error('Auth initialization failed:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await Promise.all([
            fetchUserProfile(session.user.id),
            fetchUserRoles(session.user.id)
          ]);
        } else {
          setUserProfile(null);
          setUserRoles([]);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchUserProfile, fetchUserRoles, loadCachedData]);

  // Cache data when it changes
  useEffect(() => {
    cacheCurrentData();
  }, [session, userProfile, userRoles, cacheCurrentData]);

  const getUserType = useCallback((): 'auditor' | 'project_owner' | 'admin' | 'general' => {
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
  }, [userRoles]);

  const hasRole = useCallback((role: string): boolean => {
    return userRoles.some(userRole => userRole.role === role && userRole.is_active);
  }, [userRoles]);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign in failed';
      setError(errorMessage);
      throw err;
    }
  };

  const signUp = async (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => {
    try {
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

      // Create profile immediately after signup
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            full_name: fullName,
            user_type: userType,
            created_at: new Date().toISOString(),
          });

        if (profileError) throw profileError;

        // Create initial role
        const { error: roleError } = await supabase
          .from('user_roles')
          .upsert({
            user_id: data.user.id,
            role: userType,
            is_active: true,
            created_at: new Date().toISOString(),
          });

        if (roleError) throw roleError;
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign up failed';
      setError(errorMessage);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear cached data
      localStorage.removeItem(SESSION_STORAGE_KEY);
      localStorage.removeItem(PROFILE_STORAGE_KEY);
      localStorage.removeItem(ROLES_STORAGE_KEY);

      // Clear state
      setSession(null);
      setUser(null);
      setUserProfile(null);
      setUserRoles([]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign out failed';
      setError(errorMessage);
      throw err;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setError(null);
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Password reset failed';
      setError(errorMessage);
      throw err;
    }
  };

  const resetPassword = async (newPassword: string) => {
    try {
      setError(null);
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Password update failed';
      setError(errorMessage);
      throw err;
    }
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
    resetPassword,
    getUserType,
    hasRole,
    loading,
    error,
    isOffline,
  };

  if (!window.ethereum) {
    // define or inject window.ethereum
  }

  if (!crypto.randomUUID) {
    (crypto as any).randomUUID = function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
