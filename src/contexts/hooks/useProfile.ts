
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { Profile } from "../types/escrow-types";

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          // Create a basic profile if none exists
          setProfile({
            id: user.id,
            full_name: user.email || 'Unknown User',
            avatar_url: null,
            wallet_address: null,
            is_arbitrator: false
          });
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error('Error in profile fetch:', error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return { profile, loading };
};
