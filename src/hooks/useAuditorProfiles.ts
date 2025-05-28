
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { AuditorProfile } from '@/types/auditor';

export const useAuditorProfiles = () => {
  const [auditorProfiles, setAuditorProfiles] = useState<AuditorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuditorProfiles = async (verified = true) => {
    try {
      setLoading(true);
      let query = supabase.from('auditor_profiles').select('*');
      
      if (verified) {
        query = query.eq('verification_status', 'verified');
      }
      
      const { data, error } = await query.order('total_audits_completed', { ascending: false });

      if (error) throw error;
      setAuditorProfiles(data || []);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to fetch auditor profiles');
    } finally {
      setLoading(false);
    }
  };

  const createAuditorProfile = async (profileData: Partial<AuditorProfile>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('auditor_profiles')
        .insert({
          user_id: user.id,
          ...profileData
        })
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Auditor profile created successfully');
      await fetchAuditorProfiles();
      return data;
    } catch (err: any) {
      toast.error('Failed to create auditor profile');
      throw err;
    }
  };

  const updateAuditorProfile = async (id: string, updates: Partial<AuditorProfile>) => {
    try {
      const { error } = await supabase
        .from('auditor_profiles')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Profile updated successfully');
      await fetchAuditorProfiles();
    } catch (err: any) {
      toast.error('Failed to update profile');
      throw err;
    }
  };

  useEffect(() => {
    fetchAuditorProfiles();
  }, []);

  return {
    auditorProfiles,
    loading,
    error,
    fetchAuditorProfiles,
    createAuditorProfile,
    updateAuditorProfile,
  };
};
