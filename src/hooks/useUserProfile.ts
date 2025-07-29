
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

// Helper function to safely extract social links from JSON
// Helper function to convert null to undefined
const nullToUndefined = <T>(value: T | null): T | undefined => value === null ? undefined : value;

const extractSocialLinks = (socialLinks: unknown) => {
  if (!socialLinks || typeof socialLinks !== 'object') {
    return { github: undefined, linkedin: undefined };
  }
  
  const links = socialLinks as Record<string, unknown>;
  return {
    github: (typeof links.github === 'string' ? links.github : undefined),
    linkedin: (typeof links.linkedin === 'string' ? links.linkedin : undefined),
  };
};

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
        // Extract social links safely
        const socialLinks = extractSocialLinks(extendedProfile.social_links);
        
        // Transform extended_profile to UserProfile with proper defaults
        const transformedProfile: UserProfile = {
          id: extendedProfile.id,
          full_name: extendedProfile.full_name,
          avatar_url: extendedProfile.avatar_url,
          wallet_address: extendedProfile.wallet_address,
          is_arbitrator: false, // Default value since extended_profiles doesn't have this field
          user_type: extendedProfile.user_type,
          bio: extendedProfile.bio,
          website: extendedProfile.website,
          github_url: socialLinks.github,
          linkedin_url: socialLinks.linkedin,
          verification_status: extendedProfile.verification_status,
          specializations: extendedProfile.specializations,
          hourly_rate: undefined, // Not available in extended_profiles
          total_audits_completed: extendedProfile.projects_completed,
          reputation_score: undefined, // Not available in extended_profiles
          created_at: extendedProfile.created_at,
          updated_at: extendedProfile.updated_at,
        };
        setProfile(transformedProfile);
      } else {
        // Fallback to basic profiles table
        const { data: basicProfile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', profileUserId)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        
        if (basicProfile) {
          // Transform basic profile to UserProfile
          const transformedProfile: UserProfile = {
            id: basicProfile.id,
            full_name: basicProfile.full_name,
            avatar_url: basicProfile.avatar_url,
            wallet_address: basicProfile.wallet_address,
            is_arbitrator: basicProfile.is_arbitrator,
            user_type: undefined,
            bio: undefined,
            website: undefined,
            github_url: undefined,
            linkedin_url: undefined,
            verification_status: undefined,
            specializations: undefined,
            hourly_rate: undefined,
            total_audits_completed: undefined,
            reputation_score: undefined,
            created_at: basicProfile.created_at,
            updated_at: basicProfile.updated_at,
          };
          setProfile(transformedProfile);
        } else {
          setProfile(null);
        }
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Failed to fetch profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Prepare social links for update
      const socialLinksUpdate = {
        github: updates.github_url,
        linkedin: updates.linkedin_url,
      };

      // Try to update extended_profiles first
      const { data: extendedData, error: extendedError } = await supabase
        .from('extended_profiles')
        .update({
          full_name: updates.full_name,
          avatar_url: updates.avatar_url,
          wallet_address: updates.wallet_address,
          user_type: updates.user_type,
          bio: updates.bio,
          website: updates.website,
          verification_status: updates.verification_status,
          specializations: updates.specializations,
          social_links: socialLinksUpdate,
        })
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
        
        if (data) {
          const transformedProfile: UserProfile = {
            id: data.id,
            full_name: data.full_name,
            avatar_url: data.avatar_url,
            wallet_address: data.wallet_address,
            is_arbitrator: data.is_arbitrator,
            user_type: undefined,
            bio: undefined,
            website: undefined,
            github_url: undefined,
            linkedin_url: undefined,
            verification_status: undefined,
            specializations: undefined,
            hourly_rate: undefined,
            total_audits_completed: undefined,
            reputation_score: undefined,
            created_at: data.created_at,
            updated_at: data.updated_at,
          };
          setProfile(transformedProfile);
        }
      } else {
        const socialLinks = extractSocialLinks(extendedData.social_links);
        
        const transformedProfile: UserProfile = {
          id: extendedData.id,
          full_name: extendedData.full_name,
          avatar_url: extendedData.avatar_url,
          wallet_address: extendedData.wallet_address,
          is_arbitrator: false, // Default value
          user_type: extendedData.user_type,
          bio: extendedData.bio,
          website: extendedData.website,
          github_url: socialLinks.github,
          linkedin_url: socialLinks.linkedin,
          verification_status: extendedData.verification_status,
          specializations: extendedData.specializations,
          hourly_rate: undefined,
          total_audits_completed: extendedData.projects_completed,
          reputation_score: undefined,
          created_at: extendedData.created_at,
          updated_at: extendedData.updated_at,
        };
        setProfile(transformedProfile);
      }
      
      toast.success('Profile updated successfully');
      return profile;
    } catch (err: unknown) {
      toast.error('Failed to update profile');
      throw err;
    }
  };

  const createProfile = async (profileData: Partial<UserProfile>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Prepare social links for creation
      const socialLinksData = {
        github: profileData.github_url,
        linkedin: profileData.linkedin_url,
      };

      // Try to create in extended_profiles first
      const { data: extendedData, error: extendedError } = await supabase
        .from('extended_profiles')
        .insert({
          id: user.id,
          full_name: profileData.full_name,
          avatar_url: profileData.avatar_url,
          wallet_address: profileData.wallet_address,
          user_type: profileData.user_type,
          bio: profileData.bio,
          website: profileData.website,
          verification_status: profileData.verification_status || 'pending',
          specializations: profileData.specializations,
          social_links: socialLinksData,
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
        
        if (data) {
          const transformedProfile: UserProfile = {
            id: data.id,
            full_name: data.full_name,
            avatar_url: data.avatar_url,
            wallet_address: data.wallet_address,
            is_arbitrator: data.is_arbitrator,
            user_type: undefined,
            bio: undefined,
            website: undefined,
            github_url: undefined,
            linkedin_url: undefined,
            verification_status: undefined,
            specializations: undefined,
            hourly_rate: undefined,
            total_audits_completed: undefined,
            reputation_score: undefined,
            created_at: data.created_at,
            updated_at: data.updated_at,
          };
          setProfile(transformedProfile);
        }
      } else {
        const socialLinks = extractSocialLinks(extendedData.social_links);
        
        const transformedProfile: UserProfile = {
          id: extendedData.id,
          full_name: extendedData.full_name,
          avatar_url: extendedData.avatar_url,
          wallet_address: extendedData.wallet_address,
          is_arbitrator: false, // Default value
          user_type: extendedData.user_type,
          bio: extendedData.bio,
          website: extendedData.website,
          github_url: socialLinks.github,
          linkedin_url: socialLinks.linkedin,
          verification_status: extendedData.verification_status,
          specializations: extendedData.specializations,
          hourly_rate: undefined,
          total_audits_completed: extendedData.projects_completed,
          reputation_score: undefined,
          created_at: extendedData.created_at,
          updated_at: extendedData.updated_at,
        };
        setProfile(transformedProfile);
      }
      
      toast.success('Profile created successfully');
      return profile;
    } catch (err: unknown) {
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
