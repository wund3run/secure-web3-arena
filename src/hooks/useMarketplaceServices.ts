import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface MarketplaceService {
  id: string;
  provider_id: string;
  title: string;
  description: string;
  category: string;
  blockchain_ecosystems?: string[];
  tags?: string[];
  price_range?: unknown;
  delivery_time?: number;
  featured?: boolean;
  average_rating?: number;
  review_count?: number;
  service_type?: string;
  min_price?: number;
  max_price?: number;
  estimated_delivery_days?: number;
  requirements_checklist?: unknown;
  sample_reports?: string[];
  verification_status?: string;
  created_at: string;
  updated_at: string;
}

export const useMarketplaceServices = () => {
  const [services, setServices] = useState<MarketplaceService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async (filters?: {
    category?: string;
    blockchain?: string;
    priceRange?: [number, number];
    featured?: boolean;
  }) => {
    try {
      setLoading(true);
      let query = supabase
        .from('services')
        .select('*');

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.blockchain && Array.isArray(filters.blockchain)) {
        query = query.contains('blockchain_ecosystems', [filters.blockchain]);
      }

      if (filters?.featured) {
        query = query.eq('featured', true);
      }

      const { data, error } = await query
        .order('featured', { ascending: false })
        .order('average_rating', { ascending: false });

      if (error) throw error;
      setServices((data as MarketplaceService[]) || []);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch services';
      setError(errorMessage);
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const createService = async (serviceData: Partial<MarketplaceService>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Ensure required fields are present
      const insertData = {
        provider_id: user.id,
        title: serviceData.title || '',
        description: serviceData.description || '',
        category: serviceData.category || '',
        blockchain_ecosystems: serviceData.blockchain_ecosystems,
        tags: serviceData.tags,
        price_range: serviceData.price_range,
        delivery_time: serviceData.delivery_time,
        featured: serviceData.featured || false,
        average_rating: serviceData.average_rating || 0,
        review_count: serviceData.review_count || 0
      };

      const { data, error } = await supabase
        .from('services')
        .insert(insertData as any)
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Service created successfully');
      await fetchServices();
      return data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create service';
      toast.error(errorMessage);
      throw err;
    }
  };

  const updateService = async (id: string, updates: Partial<MarketplaceService>) => {
    try {
      const { error } = await supabase
        .from('services')
        .update(updates as any)
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Service updated successfully');
      await fetchServices();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update service';
      toast.error(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
    fetchServices,
    createService,
    updateService,
  };
};
