
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';

export interface Certification {
  id: string;
  user_id: string;
  certification_type: 'basic_auditor' | 'advanced_auditor' | 'security_specialist' | 'compliance_expert';
  issued_at: string;
  expires_at?: string;
  certificate_url?: string;
  verification_code?: string;
  is_active: boolean;
  metadata: Json;
}

export const useCertifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('No authenticated user found');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .eq('user_id', user.id)
        .order('issued_at', { ascending: false });

      if (error) {
        console.error('Certifications fetch error:', error);
        setError('Failed to fetch certifications');
      } else {
        setCertifications(data || []);
      }
    } catch (err: any) {
      console.error('Certifications error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const verifyCertification = async (verificationCode: string) => {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .eq('verification_code', verificationCode)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return data;
    } catch (err: any) {
      toast.error('Invalid or expired certification code');
      throw err;
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  return {
    certifications,
    loading,
    error,
    verifyCertification,
    refetch: fetchCertifications
  };
};
