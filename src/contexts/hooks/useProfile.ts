
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Profile } from "../types/escrow-types";
import { useNavigate } from "react-router-dom";

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setError(null);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          setLoading(false);
          return;
        }
        
        // Try extended_profiles first, then fall back to profiles
        const { data: extendedProfile, error: extendedError } = await supabase
          .from('extended_profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();
          
        if (extendedError && extendedError.code !== 'PGRST116') {
          console.error('Error fetching extended profile:', extendedError);
          
          // Fallback to basic profiles table
          const { data: basicProfile, error: basicError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();
            
          if (basicError && basicError.code !== 'PGRST116') {
            console.error('Error fetching basic profile:', basicError);
            setError('Failed to load user profile');
          } else if (basicProfile) {
            setProfile(basicProfile as Profile);
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
    };
    
    fetchProfile();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setProfile(null);
        setError(null);
        navigate('/');
      } else if (session && event === 'SIGNED_IN') {
        fetchProfile();
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return {
    profile,
    loading,
    error
  };
};
