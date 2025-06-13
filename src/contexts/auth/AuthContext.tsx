
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => Promise<any>;
  signOut: () => Promise<any>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for an active session when the component mounts
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    
    getSession();

    // Listen for changes in authentication state (login, logout, etc.)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
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

  const signIn = async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => {
    return supabase.auth.signUp({
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
  };

  const signOut = async () => {
    return supabase.auth.signOut();
  };

  const value = {
    user,
    signIn,
    signUp,
    signOut,
    loading,
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
