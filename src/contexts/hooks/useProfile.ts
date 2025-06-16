
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Profile } from "../types/escrow-types";
import { useNavigate } from "react-router-dom";

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          setLoading(false);
          return;
        }
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle(); // Use maybeSingle instead of single to handle no results gracefully
          
        if (error) {
          console.error('Error fetching profile:', error);
          // Only show toast for actual errors, not missing profiles
          if (error.code !== 'PGRST116') {
            toast.error('Failed to load user profile');
          }
        } else if (data) {
          setProfile(data);
        }
      } catch (error) {
        console.error('Unexpected error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setProfile(null);
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
    loading
  };
};
