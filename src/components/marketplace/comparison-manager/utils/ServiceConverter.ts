
import { ServiceCardProps } from "@/components/marketplace/card/ServiceCardProps";
import { MarketplaceService } from "@/components/marketplace/hooks/types/marketplace-types";

// Convert ServiceCardProps to MarketplaceService for comparison
export const convertToMarketplaceService = (service: ServiceCardProps): MarketplaceService => {
  return {
    id: service.id,
    title: service.title,
    description: service.description,
    provider: {
      id: service.id + "-provider", // Generate an id for the provider
      name: service.provider.name,
      reputation: service.provider.reputation,
      isVerified: service.provider.isVerified
    },
    pricing: {
      amount: service.pricing.amount,
      currency: service.pricing.currency,
      model: "fixed" // Add the required 'model' property
    },
    rating: service.rating,
    completedJobs: service.completedJobs,
    category: service.category,
    tags: service.tags,
    imageUrl: service.imageUrl,
    securityScore: service.securityScore || 85, // Provide default value if undefined
    responseTime: service.responseTime || "24h" // Provide default value if undefined
  };
};
