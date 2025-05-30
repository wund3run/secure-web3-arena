
import { useState } from 'react';
import { toast } from 'sonner';
import type { AuthContextProps } from './types';
import { useAuthState } from './hooks/useAuthState';
import { authService } from './services/authService';
import { profileService } from './services/profileService';
import { getUserType } from './utils/userUtils';

export function useAuthProvider(): AuthContextProps {
  const { user, session, userProfile, loading, setUser, setSession, setUserProfile } = useAuthState();
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    setError(null);
    const originalLoading = loading;
    
    try {
      const data = await authService.signIn(email, password);
      return data;
    } catch (err: any) {
      console.error('Sign in error:', err);
      setError(err.message);
      toast.error('Sign in failed', { description: err.message });
      throw err;
    }
  };

  const signUp = async (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => {
    setError(null);
    
    try {
      const data = await authService.signUp(email, password, fullName, userType);
      
      // Create extended profile
      if (data.user) {
        await profileService.createProfile(data.user.id, fullName, userType);
      }
      
      return data;
    } catch (err: any) {
      console.error('Sign up error:', err);
      setError(err.message);
      toast.error('Sign up failed', { description: err.message });
      throw err;
    }
  };

  const signOut = async () => {
    setError(null);
    
    try {
      await authService.signOut();
      setUser(null);
      setSession(null);
      setUserProfile(null);
    } catch (err: any) {
      console.error('Sign out error:', err);
      setError(err.message);
      toast.error('Sign out failed', { description: err.message });
      throw err;
    }
  };

  const forgotPassword = async (email: string) => {
    setError(null);
    
    try {
      await authService.forgotPassword(email);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to send reset email', { description: err.message });
      throw err;
    }
  };

  const resetPassword = async (newPassword: string) => {
    setError(null);
    
    try {
      await authService.resetPassword(newPassword);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to update password', { description: err.message });
      throw err;
    }
  };

  const updateProfile = async (data: Partial<typeof userProfile>) => {
    if (!user) throw new Error('No user logged in');
    
    setError(null);
    
    try {
      const updatedProfile = await profileService.updateProfile(user.id, data);
      if (updatedProfile) {
        setUserProfile(updatedProfile);
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to update profile', { description: err.message });
      throw err;
    }
  };

  const getType = () => getUserType(user, userProfile);

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
    getUserType: getType,
    updateProfile,
    error,
  };
}
