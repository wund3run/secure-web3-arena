
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AuditorProfileData {
  business_name?: string;
  years_experience: number;
  hourly_rate_min?: number;
  hourly_rate_max?: number;
  blockchain_expertise: string[];
  audit_types: string[];
  portfolio_url?: string;
  github_username?: string;
  linkedin_url?: string;
  specialization_tags?: string[];
}

export class AuditorProfileService {
  static async createAuditorProfile(profileData: AuditorProfileData): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Create auditor profile
      const { error: profileError } = await supabase
        .from('auditor_profiles')
        .insert({
          user_id: user.id,
          business_name: profileData.business_name,
          years_experience: profileData.years_experience,
          hourly_rate_min: profileData.hourly_rate_min,
          hourly_rate_max: profileData.hourly_rate_max,
          blockchain_expertise: profileData.blockchain_expertise,
          audit_types: profileData.audit_types,
          portfolio_url: profileData.portfolio_url,
          github_username: profileData.github_username,
          linkedin_url: profileData.linkedin_url,
          specialization_tags: profileData.specialization_tags || [],
          verification_status: 'pending',
          availability_status: 'available'
        });

      if (profileError) throw profileError;

      // Update user role to auditor
      const { error: roleError } = await supabase
        .from('user_roles')
        .upsert({
          user_id: user.id,
          role: 'auditor',
          is_active: true
        });

      if (roleError) throw roleError;

      // Update extended profile
      const { error: extendedProfileError } = await supabase
        .from('extended_profiles')
        .upsert({
          id: user.id,
          user_type: 'auditor',
          verification_status: 'pending'
        });

      if (extendedProfileError) throw extendedProfileError;

      return true;
    } catch (error) {
      console.error('Failed to create auditor profile:', error);
      toast.error('Failed to create auditor profile');
      return false;
    }
  }

  static async getAuditorProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('auditor_profiles')
        .select(`
          *,
          extended_profiles!auditor_profiles_user_id_fkey (
            full_name,
            avatar_url,
            bio
          )
        `)
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to get auditor profile:', error);
      return null;
    }
  }

  static async getAllAuditors() {
    try {
      const { data, error } = await supabase
        .from('auditor_profiles')
        .select(`
          *,
          extended_profiles!auditor_profiles_user_id_fkey (
            full_name,
            avatar_url,
            bio
          )
        `)
        .eq('verification_status', 'verified')
        .eq('availability_status', 'available');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to get auditors:', error);
      return [];
    }
  }

  static async updateAvailability(status: 'available' | 'busy' | 'unavailable') {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('auditor_profiles')
        .update({ availability_status: status })
        .eq('user_id', user.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Failed to update availability:', error);
      return false;
    }
  }
}
