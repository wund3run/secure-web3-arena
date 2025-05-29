
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';

export interface MonitoringService {
  id: string;
  subscription_id: string;
  project_id: string;
  monitoring_type: 'continuous' | 'scheduled' | 'on_demand';
  is_active: boolean;
  last_scan_at?: string;
  next_scan_at?: string;
  scan_frequency_hours: number;
  created_at: string;
  updated_at: string;
}

export interface ThreatIntelligence {
  id: string;
  monitoring_service_id: string;
  threat_type: string;
  threat_level: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendation?: string;
  is_resolved: boolean;
  detected_at: string;
  resolved_at?: string;
  metadata: Json;
}

export const useMonitoringServices = () => {
  const [services, setServices] = useState<MonitoringService[]>([]);
  const [threats, setThreats] = useState<ThreatIntelligence[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMonitoringServices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('No authenticated user found');
        setLoading(false);
        return;
      }

      // For now, return empty arrays since user might not have subscriptions yet
      setServices([]);
      setThreats([]);
    } catch (err: any) {
      console.error('Monitoring services error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createMonitoringService = async (projectId: string, subscriptionId: string, type: MonitoringService['monitoring_type'] = 'continuous') => {
    try {
      const { data, error } = await supabase
        .from('monitoring_services')
        .insert({
          subscription_id: subscriptionId,
          project_id: projectId,
          monitoring_type: type,
          is_active: true,
          scan_frequency_hours: type === 'continuous' ? 24 : 168
        })
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Monitoring service created successfully');
      await fetchMonitoringServices();
      return data;
    } catch (err: any) {
      toast.error('Failed to create monitoring service');
      throw err;
    }
  };

  const resolveThreat = async (threatId: string) => {
    try {
      const { error } = await supabase
        .from('threat_intelligence')
        .update({
          is_resolved: true,
          resolved_at: new Date().toISOString()
        })
        .eq('id', threatId);

      if (error) throw error;
      
      toast.success('Threat resolved successfully');
      await fetchMonitoringServices();
    } catch (err: any) {
      toast.error('Failed to resolve threat');
      throw err;
    }
  };

  useEffect(() => {
    fetchMonitoringServices();
  }, []);

  return {
    services,
    threats,
    loading,
    error,
    createMonitoringService,
    resolveThreat,
    refetch: fetchMonitoringServices
  };
};
