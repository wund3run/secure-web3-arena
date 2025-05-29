
import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useAuthState } from './hooks/useAuthState';
import { useAuthActions } from './hooks/useAuthActions';

interface OptimizedAuthContextType {
  // State
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  
  // Actions (memoized)
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => Promise<any>;
  signOut: () => Promise<void>;
  getUserType: () => 'auditor' | 'project_owner' | 'admin' | 'general' | 'visitor';
  updateProfile: (data: any) => Promise<void>;
}

const OptimizedAuthContext = createContext<OptimizedAuthContextType | undefined>(undefined);

export function OptimizedAuthProvider({ children }: { children: React.ReactNode }) {
  const { user, session, loading, error, userProfile } = useAuthState();
  const { signIn, signUp, signOut, updateProfile } = useAuthActions();

  const getUserType = useCallback((): 'auditor' | 'project_owner' | 'admin' | 'general' | 'visitor' => {
    if (!user) return 'visitor';
    if (userProfile?.user_type) return userProfile.user_type;
    return user.user_metadata?.user_type || 'project_owner';
  }, [user, userProfile]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    session,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    getUserType,
    updateProfile
  }), [user, session, loading, error, signIn, signUp, signOut, getUserType, updateProfile]);

  return (
    <OptimizedAuthContext.Provider value={contextValue}>
      {children}
    </OptimizedAuthContext.Provider>
  );
}

export const useOptimizedAuth = () => {
  const context = useContext(OptimizedAuthContext);
  if (context === undefined) {
    throw new Error('useOptimizedAuth must be used within an OptimizedAuthProvider');
  }
  return context;
};
