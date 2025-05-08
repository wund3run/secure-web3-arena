
import { ServiceCardProps } from "@/data/marketplace-data";

/**
 * Filter services based on category and additional filters
 */
export const filterServices = (services: ServiceCardProps[], category: string, filters: any) => {
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
    // Filter by price range
    if (filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < 10)) {
      filtered = filtered.filter(
        service => service.pricing.amount >= filters.priceRange[0] && 
                  service.pricing.amount <= filters.priceRange[1]
      );
    }
    
    if (filters.providerLevels && filters.providerLevels.length > 0) {
      filtered = filtered.filter(
        service => filters.providerLevels.includes(service.provider.level)
      );
    }
    
    if (filters.serviceTypes && filters.serviceTypes.length > 0) {
      filtered = filtered.filter(service => 
        service.tags.some(tag => 
          filters.serviceTypes.includes(tag)
        )
      );
    }
    
    if (filters.blockchains && filters.blockchains.length > 0) {
      filtered = filtered.filter(service => 
        service.tags.some(tag => 
          filters.blockchains.some((blockchain: string) => 
            tag.toLowerCase().includes(blockchain.toLowerCase())
          )
        )
      );
    }
    
    if (filters.features && filters.features.length > 0) {
      filtered = filtered.filter(service => 
        filters.features.every((feature: string) => 
          service.tags.some(tag => 
            tag.toLowerCase().includes(feature.toLowerCase())
          )
        )
      );
    }
    
    if (filters.minReputation) {
      filtered = filtered.filter(
        service => service.provider.reputation >= filters.minReputation
      );
    }
    
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
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
