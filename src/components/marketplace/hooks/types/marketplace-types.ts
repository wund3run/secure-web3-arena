
export interface BlockchainEcosystem {
  id: string;
  name: string;
  logoUrl: string;
  projectCount: number;
}

export interface ServiceProvider {
  id: string;
  name: string;
  reputation: number;
  isVerified: boolean;
  avatarUrl?: string;
}

export interface ServicePricing {
  amount: number;
  currency: string;
  model: "fixed" | "hourly" | "range";
}

export interface MarketplaceService {
  id: string;
  title: string;
  description: string;
  provider: ServiceProvider;
  pricing: ServicePricing;
  rating: number;
  completedJobs: number;
  category: string;
  tags: string[];
  imageUrl?: string;
  securityScore?: number;
  responseTime?: string;
}

export interface ServiceFilterOptions {
  category?: string;
  priceRange?: [number, number];
  blockchains?: string[];
  auditTypes?: string[];
  minReputation?: number;
  minRating?: number;
  projectSize?: "small" | "medium" | "large";
  aiRecommendations?: boolean;
}

export interface ComparisonService extends MarketplaceService {
  isSelected: boolean;
}
