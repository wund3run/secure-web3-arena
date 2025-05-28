
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

      // Try to get from extended_profiles first, then fallback to profiles
      const { data: extendedProfile } = await supabase
        .from('extended_profiles')
        .select('*')
        .eq('id', profileUserId)
        .single();

      if (extendedProfile) {
        setProfile(extendedProfile as UserProfile);
      } else {
        // Fallback to basic profiles table
        const { data: basicProfile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', profileUserId)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        setProfile(basicProfile as UserProfile);
      }
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

      // Try to update extended_profiles first
      const { data: extendedData, error: extendedError } = await supabase
        .from('extended_profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (extendedError) {
        // Fallback to basic profiles
        const { data, error } = await supabase
          .from('profiles')
          .update({
            full_name: updates.full_name,
            avatar_url: updates.avatar_url,
            wallet_address: updates.wallet_address,
            is_arbitrator: updates.is_arbitrator
          })
          .eq('id', user.id)
          .select()
          .single();

        if (error) throw error;
        setProfile(data as UserProfile);
      } else {
        setProfile(extendedData as UserProfile);
      }
      
      toast.success('Profile updated successfully');
      return profile;
    } catch (err: any) {
      toast.error('Failed to update profile');
      throw err;
    }
  };

  const createProfile = async (profileData: Partial<UserProfile>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Try to create in extended_profiles first
      const { data: extendedData, error: extendedError } = await supabase
        .from('extended_profiles')
        .insert({
          id: user.id,
          ...profileData,
        })
        .select()
        .single();

      if (extendedError) {
        // Fallback to basic profiles
        const { data, error } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            full_name: profileData.full_name,
            avatar_url: profileData.avatar_url,
            wallet_address: profileData.wallet_address,
            is_arbitrator: profileData.is_arbitrator || false
          })
          .select()
          .single();

        if (error) throw error;
        setProfile(data as UserProfile);
      } else {
        setProfile(extendedData as UserProfile);
      }
      
      toast.success('Profile created successfully');
      return profile;
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
