
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '../types';

export const profileService = {
  async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data;
    } catch (error) {
      console.warn('Failed to fetch user profile:', error);
      return null;
    }
  },

  async createProfile(userId: string, fullName: string, userType: 'auditor' | 'project_owner'): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          full_name: fullName,
          user_type: userType,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Failed to create user profile:', error);
      return null;
    }
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Failed to update user profile:', error);
      return null;
    }
  },
};
