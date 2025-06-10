
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MarketplaceService {
  id: string;
  title: string;
  description: string;
  category: string;
  provider_id: string;
  min_price: number;
  average_rating: number;
  review_count: number;
  verification_status: string;
  blockchain_ecosystems: string[];
  tags: string[];
  featured: boolean;
}

export const useMarketplaceServices = () => {
  const [services, setServices] = useState<MarketplaceService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      const startTime = performance.now();
      
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('services')
          .select(`
            id,
            title,
            description,
            category,
            provider_id,
            price_range,
            average_rating,
            review_count,
            verification_status,
            blockchain_ecosystems,
            tags,
            featured
          `)
          .eq('verification_status', 'approved')
          .order('featured', { ascending: false })
          .order('average_rating', { ascending: false });

        if (fetchError) throw fetchError;

        // Transform the data to match our interface
        const transformedServices: MarketplaceService[] = (data || []).map(service => {
          let minPrice = 0;
          
          // Safely handle price_range extraction
          if (service.price_range && typeof service.price_range === 'object' && 'min' in service.price_range) {
            minPrice = service.price_range.min as number;
          }

          return {
            ...service,
            min_price: minPrice,
            blockchain_ecosystems: service.blockchain_ecosystems || [],
            tags: service.tags || []
          };
        });

        setServices(transformedServices);

        // Log performance metrics
        const endTime = performance.now();
        console.log(`Marketplace services fetch took ${endTime - startTime} milliseconds`);

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch services';
        setError(errorMessage);
        console.error('Error fetching marketplace services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};
