
import { useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useAuthActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      toast.error('Sign in failed', { description: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async (
    email: string, 
    password: string, 
    fullName: string, 
    userType: 'auditor' | 'project_owner'
  ) => {
    try {
      setError(null);
      setLoading(true);
      
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
      return data;
    } catch (err: any) {
      setError(err.message);
      toast.error('Sign up failed', { description: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Signed out successfully');
    } catch (err: any) {
      setError(err.message);
      toast.error('Sign out failed', { description: err.message });
      throw err;
    }
  }, []);

  const updateProfile = useCallback(async (data: any) => {
    try {
      setError(null);
      setLoading(true);
      
      const { error } = await supabase.auth.updateUser({ data });
      if (error) throw error;
      
      toast.success('Profile updated successfully');
    } catch (err: any) {
      setError(err.message);
      toast.error('Profile update failed', { description: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    signIn,
    signUp,
    signOut,
    updateProfile,
    loading,
    error
  };
}
