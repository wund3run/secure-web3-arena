
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';

export interface Subscription {
  id: string;
  user_id: string;
  tier: 'basic' | 'professional' | 'enterprise' | 'custom';
  status: 'active' | 'cancelled' | 'suspended' | 'trial';
  started_at: string;
  expires_at?: string;
  monthly_cost?: number;
  features: Json;
  created_at: string;
  updated_at: string;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserSubscription = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setSubscription(data);
    } catch (err: any) {
      setError(err.message);
      console.error('Failed to fetch subscription:', err);
    } finally {
      setLoading(false);
    }
  };

  const upgradeSubscription = async (tier: Subscription['tier'], features: string[]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: user.id,
          tier,
          status: 'active',
          features: features as Json,
          started_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        })
        .select()
        .single();

      if (error) throw error;
      
      setSubscription(data);
      toast.success(`Successfully upgraded to ${tier} plan`);
      return data;
    } catch (err: any) {
      toast.error('Failed to upgrade subscription');
      throw err;
    }
  };

  const hasFeature = (feature: string): boolean => {
    if (!subscription?.features) return false;
    const features = Array.isArray(subscription.features) ? subscription.features : [];
    return features.includes(feature);
  };

  useEffect(() => {
    fetchUserSubscription();
  }, []);

  return {
    subscription,
    loading,
    error,
    upgradeSubscription,
    hasFeature,
    refetch: fetchUserSubscription
  };
};
