
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { UserProfile } from '../types';

export const profileService = {
  async fetchProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data: profile, error } = await supabase
        .from('extended_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      if (profile) {
        const typedProfile: UserProfile = {
          id: profile.id,
          user_id: profile.id, // Use id as user_id for extended_profiles
          full_name: profile.full_name,
          display_name: profile.display_name,
          user_type: profile.user_type as UserProfile['user_type'] || 'general',
          avatar_url: profile.avatar_url,
          bio: profile.bio,
          website: profile.website,
          wallet_address: profile.wallet_address,
          verification_status: profile.verification_status,
          specializations: profile.specializations,
          projects_completed: profile.projects_completed,
          years_of_experience: profile.years_of_experience,
          social_links: profile.social_links,
          created_at: profile.created_at,
          updated_at: profile.updated_at,
        };
        console.log('Profile loaded:', typedProfile);
        return typedProfile;
      }
      
      return null;
    } catch (err) {
      console.log('Profile fetch error:', err);
      return null;
    }
  },

  async createProfile(userId: string, fullName: string, userType: 'auditor' | 'project_owner'): Promise<void> {
    try {
      const { error: profileError } = await supabase
        .from('extended_profiles')
        .insert({
          id: userId,
          full_name: fullName,
          display_name: fullName,
          user_type: userType,
          verification_status: 'pending'
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
      } else {
        console.log('Profile created successfully');
      }
    } catch (profileErr) {
      console.error('Profile creation failed:', profileErr);
    }
  },

  async updateProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile | null> {
    const { error } = await supabase
      .from('extended_profiles')
      .upsert({
        id: userId,
        ...data,
        updated_at: new Date().toISOString(),
      });

    if (error) throw error;
    
    // Refresh user profile
    const { data: updatedProfile } = await supabase
      .from('extended_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (updatedProfile) {
      const typedProfile: UserProfile = {
        id: updatedProfile.id,
        user_id: updatedProfile.id,
        full_name: updatedProfile.full_name,
        display_name: updatedProfile.display_name,
        user_type: updatedProfile.user_type as UserProfile['user_type'] || 'general',
        avatar_url: updatedProfile.avatar_url,
        bio: updatedProfile.bio,
        website: updatedProfile.website,
        wallet_address: updatedProfile.wallet_address,
        verification_status: updatedProfile.verification_status,
        specializations: updatedProfile.specializations,
        projects_completed: updatedProfile.projects_completed,
        years_of_experience: updatedProfile.years_of_experience,
        social_links: updatedProfile.social_links,
        created_at: updatedProfile.created_at,
        updated_at: updatedProfile.updated_at,
      };
      toast.success('Profile updated successfully');
      return typedProfile;
    }
    
    return null;
  }
};
