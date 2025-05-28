
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
          ...profile,
          user_type: profile.user_type as UserProfile['user_type'] || 'project_owner'
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
          user_type: userType,
          display_name: fullName,
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
        ...updatedProfile,
        user_type: updatedProfile.user_type as UserProfile['user_type'] || 'project_owner'
      };
      toast.success('Profile updated successfully');
      return typedProfile;
    }
    
    return null;
  }
};
