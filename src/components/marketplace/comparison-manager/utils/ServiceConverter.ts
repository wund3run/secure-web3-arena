
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
      isVerified: service.provider.isVerified,
      level: service.provider.level || "verified", // Ensure level is provided
      avatarUrl: service.provider.avatarUrl
    },
    pricing: {
      amount: service.pricing.amount,
      currency: service.pricing.currency,
      model: service.pricing.model || "fixed" // Use model from input or default to "fixed"
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

// Add a new function to convert MarketplaceService back to ServiceCardProps
export const convertToServiceCardProps = (service: MarketplaceService): ServiceCardProps => {
  return {
    id: service.id,
    title: service.title,
    description: service.description,
    provider: {
      name: service.provider.name,
      reputation: service.provider.reputation,
      isVerified: service.provider.isVerified,
      level: service.provider.level,
      avatarUrl: service.provider.avatarUrl
    },
    pricing: {
      amount: service.pricing.amount,
      currency: service.pricing.currency,
      model: service.pricing.model
    },
    rating: service.rating,
    completedJobs: service.completedJobs,
    category: service.category,
    tags: service.tags,
    imageUrl: service.imageUrl,
    securityScore: service.securityScore,
    responseTime: service.responseTime
  };
};
