import { createClient, User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { createSecureSupabaseClient, SecurityUtils, SECURITY_CONFIG } from './security';

// Create a secure supabase client for the entire app
export const supabase = createSecureSupabaseClient();

// Hook to get the supabase client
export const useSupabaseClient = () => {
  return supabase;
};

// Hook for authentication state
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial auth state
    const getCurrentUser = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Error getting current user:', error);
          setUser(null);
        } else {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Unexpected error during auth check:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return { user, loading };
};

// Helper function to check if user has completed onboarding
export const hasCompletedOnboarding = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('onboarding_completed')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }

  return data?.onboarding_completed || false;
};

// Helper function to check user type
export const getUserType = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('user_type')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error getting user type:', error);
    return null;
  }

  return data?.user_type;
};
