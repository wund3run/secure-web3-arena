
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Service {
  id: string;
  provider_id: string;
  title: string;
  description: string;
  category: string;
  price_range?: unknown;
  delivery_time?: number;
  blockchain_ecosystems?: string[];
  tags?: string[];
  featured?: boolean;
  average_rating?: number;
  review_count?: number;
  verification_status?: string;
  created_at: string;
  updated_at: string;
}

export class ServicesService {
  // Get all services for marketplace
  static async getAllServices(): Promise<Service[]> {
    try {
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          profiles:provider_id (
            full_name,
            avatar_url
          )
        `)
        .eq('verification_status', 'approved')
        .order('featured', { ascending: false })
        .order('average_rating', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch services:', error);
      return [];
    }
  }

  // Search services
  static async searchServices(query: string, filters?: {
    category?: string;
    blockchain?: string;
    priceRange?: string;
  }): Promise<Service[]> {
    try {
      let queryBuilder = supabase
        .from('services')
        .select(`
          *,
          profiles:provider_id (
            full_name,
            avatar_url
          )
        `)
        .eq('verification_status', 'approved');

      if (query) {
        queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
      }

      if (filters?.category) {
        queryBuilder = queryBuilder.eq('category', filters.category);
      }

      if (filters?.blockchain) {
        queryBuilder = queryBuilder.contains('blockchain_ecosystems', [filters.blockchain]);
      }

      const { data, error } = await queryBuilder
        .order('average_rating', { ascending: false })
        .limit(20);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to search services:', error);
      return [];
    }
  }

  // Get service by ID
  static async getService(id: string): Promise<Service | null> {
    try {
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          profiles:provider_id (
            full_name,
            avatar_url,
            wallet_address
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to fetch service:', error);
      return null;
    }
  }

  // Get featured services
  static async getFeaturedServices(): Promise<Service[]> {
    try {
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          profiles:provider_id (
            full_name,
            avatar_url
          )
        `)
        .eq('featured', true)
        .eq('verification_status', 'approved')
        .order('average_rating', { ascending: false })
        .limit(6);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch featured services:', error);
      return [];
    }
  }
}
