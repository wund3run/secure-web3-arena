
import { useState, useEffect } from 'react';
import { ServiceCardProps, SERVICES } from "@/data/marketplace-data";
import { BLOCKCHAIN_ECOSYSTEMS, SAMPLE_REVIEWS } from './constants/marketplace-constants';
import { filterServices as filterServicesByCategory, getServiceById as findServiceById } from './utils/service-filter-utils';
import { BlockchainEcosystem, MarketplaceService, Review } from './types/marketplace-types';

// Export the types for other components to use
export type { BlockchainEcosystem, MarketplaceService, Review };

export function useMarketplaceServices() {
  const [services, setServices] = useState<ServiceCardProps[]>(SERVICES);
  const [loading, setLoading] = useState(false);
  
  // Load services from some API or local storage in a real app
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setServices(SERVICES);
      setLoading(false);
    }, 600);
  }, []);

  return { 
    services, 
    loading, 
    BLOCKCHAIN_ECOSYSTEMS, 
    SAMPLE_REVIEWS, 
    filterServices: (category: string, filters: unknown) => filterServicesByCategory(services, category, filters),
    getServiceById: (serviceId: string) => findServiceById(services, serviceId)
  };
}
