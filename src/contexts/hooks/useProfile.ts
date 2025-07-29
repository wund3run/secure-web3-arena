import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Profile } from "../types/escrow-types";
import { useNavigate } from "react-router-dom";

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const fetchProfile = useCallback(async (userId: string) => {
    try {
      setError(null);
      setLoading(true);
      
      // Try extended_profiles first with optimized query
      const { data: extendedProfile, error: extendedError } = await supabase
        .from('extended_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
        
      if (extendedError) {
        console.error('Extended profile fetch error:', extendedError);
        
        // Only try basic profiles if extended profiles truly failed (not just no data)
        if (extendedError.code !== 'PGRST116') {
          const { data: basicProfile, error: basicError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();
            
          if (basicError) {
            console.error('Basic profile fetch error:', basicError);
            setError('Failed to load user profile');
          } else if (basicProfile) {
            setProfile(basicProfile as Profile);
          }
        }
      } else if (extendedProfile) {
        setProfile(extendedProfile as Profile);
      }
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
      setError('Authentication system unavailable');
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Fetch user profile
  useEffect(() => {
    let mounted = true;
    
    const initializeProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (!session?.user) {
          setLoading(false);
          return;
        }
        
        await fetchProfile(session.user.id);
      } catch (error) {
        if (mounted) {
          console.error('Session error:', error);
          setError('Failed to initialize user session');
          setLoading(false);
        }
      }
    };
    
    initializeProfile();
    
    // Set up auth state listener with cleanup
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      if (event === 'SIGNED_OUT') {
        setProfile(null);
        setError(null);
        navigate('/');
      } else if (session && event === 'SIGNED_IN') {
        await fetchProfile(session.user.id);
      }
    });
    
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, fetchProfile]);

  return {
    profile,
    loading,
    error,
    refetchProfile: useCallback(() => {
      const session = supabase.auth.getSession();
      session.then(({ data: { session } }) => {
        if (session?.user) {
          fetchProfile(session.user.id);
        }
      });
    }, [fetchProfile])
  };
};
