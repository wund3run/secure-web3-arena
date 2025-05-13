
import { ServiceCardProps } from "@/types/marketplace";
import { MarketplaceService } from "../hooks/types/marketplace-types";

// Helper function to convert ServiceCardProps to MarketplaceService
export function convertToMarketplaceService(service: ServiceCardProps): MarketplaceService {
  return {
    id: service.id,
    title: service.title,
    description: service.description,
    provider: {
      id: service.id + "-provider", // Generate an id for the provider
      name: service.provider.name,
      reputation: service.provider.reputation,
      isVerified: service.provider.isVerified,
      level: service.provider.level // Add the required level property
    },
    pricing: {
      amount: service.pricing.amount,
      currency: service.pricing.currency,
      model: "fixed" // Default to fixed pricing model
    },
    rating: service.rating,
    completedJobs: service.completedJobs,
    category: service.category,
    tags: service.tags,
    imageUrl: service.imageUrl,
    securityScore: service.securityScore || 85, // Provide default value if undefined
    responseTime: service.responseTime || "24h" // Provide default value if undefined
  };
}

// Helper function to convert MarketplaceService back to ServiceCardProps
export function convertToServiceCardProps(service: MarketplaceService): ServiceCardProps {
  return {
    id: service.id,
    title: service.title,
    description: service.description,
    provider: {
      name: service.provider.name,
      reputation: service.provider.reputation,
      isVerified: service.provider.isVerified,
      level: service.provider.level
    },
    pricing: {
      amount: service.pricing.amount,
      currency: service.pricing.currency
    },
    rating: service.rating,
    completedJobs: service.completedJobs,
    category: service.category,
    tags: service.tags,
    imageUrl: service.imageUrl,
    securityScore: service.securityScore,
    responseTime: service.responseTime
  };
}
