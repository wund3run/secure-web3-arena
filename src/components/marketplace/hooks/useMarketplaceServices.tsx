
import { useState, useEffect } from 'react';
import { ServiceCardProps, SERVICES } from "@/data/marketplace-data";

// Define blockchain ecosystems
const BLOCKCHAIN_ECOSYSTEMS = [
  { name: "Ethereum", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024" },
  { name: "Solana", logo: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=024" },
  { name: "Polkadot", logo: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=024" },
  { name: "Avalanche", logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=024" },
  { name: "Cosmos", logo: "https://cryptologos.cc/logos/cosmos-atom-logo.svg?v=024" },
  { name: "Near", logo: "https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=024" },
  { name: "Binance", logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=024" }
];

// Sample reviews for the marketplace
const SAMPLE_REVIEWS = [
  {
    id: "r1",
    username: "CryptoBuilder",
    date: "2023-12-10",
    rating: 4.5,
    text: "The audit was thorough and helped us identify critical vulnerabilities before launch. Great communication throughout the process."
  },
  {
    id: "r2",
    username: "DeFiDeveloper",
    date: "2023-11-25",
    rating: 5,
    text: "Excellent service! The security recommendations were invaluable and potentially saved us from a major exploit."
  },
  {
    id: "r3",
    username: "BlockchainStartup",
    date: "2023-12-18",
    rating: 4,
    text: "Professional audit with detailed reporting. Would have appreciated more guidance on implementing the fixes."
  }
];

export function useMarketplaceServices() {
  const [services, setServices] = useState<ServiceCardProps[]>(SERVICES);
  const [loading, setLoading] = useState(false);
  
  // Load services from some API or local storage in a real app
  useEffect(() => {
    // Simulating loading services
    setLoading(true);
    // In a real app, fetch from API here
    setTimeout(() => {
      setServices(SERVICES);
      setLoading(false);
    }, 600);
  }, []);

  // Filter services based on category and additional filters
  const filterServices = (category: string, filters: any) => {
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
      
      // Filter by provider level
      if (filters.providerLevels && filters.providerLevels.length > 0) {
        filtered = filtered.filter(
          service => filters.providerLevels.includes(service.provider.level)
        );
      }
      
      // Filter by service type (using tags)
      if (filters.serviceTypes && filters.serviceTypes.length > 0) {
        filtered = filtered.filter(service => 
          service.tags.some(tag => 
            filters.serviceTypes.includes(tag)
          )
        );
      }
      
      // Filter by blockchain compatibility (using tags)
      if (filters.blockchains && filters.blockchains.length > 0) {
        filtered = filtered.filter(service => 
          service.tags.some(tag => 
            filters.blockchains.some((blockchain: string) => 
              tag.toLowerCase().includes(blockchain.toLowerCase())
            )
          )
        );
      }
      
      // Filter by features (using tags)
      if (filters.features && filters.features.length > 0) {
        filtered = filtered.filter(service => 
          filters.features.every((feature: string) => 
            service.tags.some(tag => 
              tag.toLowerCase().includes(feature.toLowerCase())
            )
          )
        );
      }
      
      // Filter by minimum reputation
      if (filters.minReputation) {
        filtered = filtered.filter(
          service => service.provider.reputation >= filters.minReputation
        );
      }
      
      // Filter by search term
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

  // Get a service by its ID
  const getServiceById = (serviceId: string) => {
    return services.find(service => service.id === serviceId) || null;
  };

  return { 
    services, 
    loading, 
    BLOCKCHAIN_ECOSYSTEMS, 
    SAMPLE_REVIEWS, 
    filterServices,
    getServiceById
  };
}
