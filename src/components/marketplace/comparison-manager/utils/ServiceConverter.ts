
import { ServiceCardProps } from "@/components/marketplace/card/ServiceCardProps";
import { MarketplaceService } from "@/components/marketplace/hooks/types/marketplace-types";

// Convert ServiceCardProps to MarketplaceService for comparison
export const convertToMarketplaceService = (service: ServiceCardProps): MarketplaceService => {
  return {
    id: service.id,
    title: service.title,
    description: service.description,
    provider: {
      name: service.provider.name,
      securityScore: service.provider.reputation,
      verificationLevel: service.provider.level === "rookie" ? "verified" : 
                         service.provider.level === "expert" ? "expert" : "verified",
      completedProjects: service.completedJobs || 0
    },
    pricing: service.pricing,
    category: service.category,
    tags: service.tags,
    imageUrl: service.imageUrl
  };
};
