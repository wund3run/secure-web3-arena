import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

const useProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      setLoading(false);
      return;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
      
    if (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load user profile');
    } else {
      setProfile(data);
    }
    
    setLoading(false);
  }, [setLoading, setProfile]);

  useEffect(() => {
    fetchProfile();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
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
  }, [navigate, setProfile, fetchProfile]);

  return { loading, profile };
};

export default useProfile; 