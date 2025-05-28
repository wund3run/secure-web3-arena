
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UserProfile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  wallet_address?: string;
  is_arbitrator: boolean;
  user_type?: string;
  bio?: string;
  website?: string;
  github_url?: string;
  linkedin_url?: string;
  verification_status?: string;
  specializations?: string[];
  hourly_rate?: number;
  total_audits_completed?: number;
  reputation_score?: number;
  created_at: string;
  updated_at: string;
}

export const useUserProfile = (userId?: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (targetUserId?: string) => {
    try {
      setLoading(true);
      let profileUserId = targetUserId;
      
      if (!profileUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setProfile(null);
          return;
        }
        profileUserId = user.id;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', profileUserId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setProfile(data);
    } catch (err: any) {
      setError(err.message);
      console.error('Failed to fetch profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setProfile(data);
      toast.success('Profile updated successfully');
      return data;
    } catch (err: any) {
      toast.error('Failed to update profile');
      throw err;
    }
  };

  const createProfile = async (profileData: Partial<UserProfile>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          ...profileData,
        })
        .select()
        .single();

      if (error) throw error;
      
      setProfile(data);
      toast.success('Profile created successfully');
      return data;
    } catch (err: any) {
      toast.error('Failed to create profile');
      throw err;
    }
  };

  useEffect(() => {
    fetchProfile(userId);
  }, [userId]);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    createProfile,
  };
};
