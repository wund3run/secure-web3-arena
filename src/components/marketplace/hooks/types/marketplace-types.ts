
// Define service-related types used across the marketplace components

// Define BlockchainEcosystem type
export type BlockchainEcosystem = {
  name: string;
  logo?: string;
  logoUrl: string;
  color: string;
};

// Define Review type to match expected structure
export type Review = {
  id: string;
  username: string;
  date: string;
  rating: number;
  text: string;
  author: string;
  content: string;
  helpful: number;
};

// Define MarketplaceService type (needed by useMarketplaceComparison)
export type MarketplaceService = {
  id: string;
  title: string;
  description: string;
  provider: {
    name: string;
    reputation: number;
    isVerified: boolean;
    level: "rookie" | "expert" | "verified";
  };
  pricing: {
    amount: number;
    currency: string;
  };
  rating: number;
  completedJobs: number;
  category: string;
  tags: string[];
  imageUrl?: string;
  securityScore?: number;
  responseTime?: string;
};
