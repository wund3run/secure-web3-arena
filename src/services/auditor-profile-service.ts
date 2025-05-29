
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AuditorProfile {
  user_id: string;
  years_experience: number;
  hourly_rate_min?: number;
  hourly_rate_max?: number;
  blockchain_expertise: string[];
  audit_types: string[];
  verification_status: string;
  availability_status: string;
  success_rate: number;
  response_time_hours: number;
  specialization_tags: string[];
  business_name?: string;
  portfolio_url?: string;
  github_username?: string;
  linkedin_url?: string;
}

export interface AuditorSkill {
  skill_name: string;
  proficiency_level: number;
}

export class AuditorProfileService {
  static async createAuditorProfile(profileData: Partial<AuditorProfile>): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Create or update auditor profile
      const { error: profileError } = await supabase
        .from('auditor_profiles')
        .upsert({
          user_id: user.id,
          ...profileData
        });

      if (profileError) throw profileError;

      // Create user role if not exists
      await supabase
        .from('user_roles')
        .upsert({
          user_id: user.id,
          role: 'auditor'
        });

      toast.success('Auditor profile created successfully!');
      return true;
    } catch (error) {
      console.error('Failed to create auditor profile:', error);
      toast.error('Failed to create auditor profile');
      return false;
    }
  }

  static async updateAuditorProfile(profileData: Partial<AuditorProfile>): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('auditor_profiles')
        .update(profileData)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Profile updated successfully!');
      return true;
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
      return false;
    }
  }

  static async addSkills(skills: AuditorSkill[]): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const skillsData = skills.map(skill => ({
        auditor_id: user.id,
        skill_name: skill.skill_name,
        proficiency_level: skill.proficiency_level
      }));

      const { error } = await supabase
        .from('auditor_skills')
        .upsert(skillsData);

      if (error) throw error;

      toast.success('Skills updated successfully!');
      return true;
    } catch (error) {
      console.error('Failed to add skills:', error);
      toast.error('Failed to update skills');
      return false;
    }
  }

  static async getAuditorProfile(userId?: string): Promise<AuditorProfile | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const targetUserId = userId || user?.id;
      
      if (!targetUserId) return null;

      const { data, error } = await supabase
        .from('auditor_profiles')
        .select(`
          *,
          auditor_skills (
            skill_name,
            proficiency_level
          ),
          auditor_reviews (
            rating,
            review_text,
            created_at
          )
        `)
        .eq('user_id', targetUserId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Failed to get auditor profile:', error);
      return null;
    }
  }

  static async searchAuditors(filters: {
    blockchain?: string;
    minExperience?: number;
    maxRate?: number;
    skills?: string[];
    availability?: string;
  }): Promise<AuditorProfile[]> {
    try {
      let query = supabase
        .from('auditor_profiles')
        .select(`
          *,
          extended_profiles:user_id (
            full_name,
            avatar_url
          ),
          auditor_reviews (
            rating
          )
        `)
        .eq('verification_status', 'verified');

      if (filters.blockchain) {
        query = query.contains('blockchain_expertise', [filters.blockchain]);
      }

      if (filters.minExperience) {
        query = query.gte('years_experience', filters.minExperience);
      }

      if (filters.maxRate) {
        query = query.lte('hourly_rate_max', filters.maxRate);
      }

      if (filters.availability) {
        query = query.eq('availability_status', filters.availability);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to search auditors:', error);
      return [];
    }
  }

  static async updateAvailability(status: 'available' | 'limited' | 'unavailable'): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('auditor_profiles')
        .update({ availability_status: status })
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Availability updated!');
      return true;
    } catch (error) {
      console.error('Failed to update availability:', error);
      toast.error('Failed to update availability');
      return false;
    }
  }
}
