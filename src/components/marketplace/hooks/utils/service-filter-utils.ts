import { ServiceCardProps } from "@/data/marketplace-data";

// Define the filter type
interface ServiceFilters {
  priceRange?: [number, number];
  providerLevels?: string[];
  serviceTypes?: string[];
  blockchains?: string[];
  features?: string[];
  minReputation?: number;
  searchTerm?: string;
}

/**
 * Filter services based on category and additional filters
 */
export const filterServices = (services: ServiceCardProps[], category: string, filters?: ServiceFilters | Record<string, any>) => {
  let filtered = [...services];
  
  // Filter by category
  if (category && category !== 'all') {
    filtered = filtered.filter(
      service => service.category.toLowerCase() === category.toLowerCase() || 
                service.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
    );
  }
  
  // Apply additional filters if they exist
  if (filters) {
    const typedFilters = filters as any; // Use any to handle dynamic properties
    
    // Filter by price range
    if (typedFilters.priceRange && (typedFilters.priceRange[0] > 0 || typedFilters.priceRange[1] < 10)) {
      filtered = filtered.filter(
        service => service.pricing.amount >= typedFilters.priceRange[0] && 
                  service.pricing.amount <= typedFilters.priceRange[1]
      );
    }
    
    if (typedFilters.providerLevels && typedFilters.providerLevels.length > 0) {
      filtered = filtered.filter(
        service => typedFilters.providerLevels.includes(service.provider.level)
      );
    }
    
    if (typedFilters.serviceTypes && typedFilters.serviceTypes.length > 0) {
      filtered = filtered.filter(service => 
        service.tags.some(tag => 
          typedFilters.serviceTypes.includes(tag)
        )
      );
    }
    
    if (typedFilters.blockchains && typedFilters.blockchains.length > 0) {
      filtered = filtered.filter(service => 
        service.tags.some(tag => 
          typedFilters.blockchains.some((blockchain: string) => 
            tag.toLowerCase().includes(blockchain.toLowerCase())
          )
        )
      );
    }
    
    if (typedFilters.features && typedFilters.features.length > 0) {
      filtered = filtered.filter(service => 
        typedFilters.features.every((feature: string) => 
          service.tags.some(tag => 
            tag.toLowerCase().includes(feature.toLowerCase())
          )
        )
      );
    }
    
    if (typedFilters.minReputation) {
      filtered = filtered.filter(
        service => service.provider.reputation >= typedFilters.minReputation
      );
    }
    
    if (typedFilters.searchTerm) {
      const searchLower = typedFilters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        service => 
          service.title.toLowerCase().includes(searchLower) || 
          service.description.toLowerCase().includes(searchLower) ||
          service.tags.some((tag: string) => tag.toLowerCase().includes(searchLower)) ||
          service.provider.name.toLowerCase().includes(searchLower)
      );
    }
  }
  
  return filtered;
};

/**
 * Get a service by its ID
 */
export const getServiceById = (services: ServiceCardProps[], serviceId: string) => {
  return services.find(service => service.id === serviceId) || null;
};
