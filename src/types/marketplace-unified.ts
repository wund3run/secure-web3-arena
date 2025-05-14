
/**
 * Unified type definitions for marketplace components
 * This consolidates types from multiple sources to ensure consistency
 */

// Service provider type
export interface ServiceProvider {
  id: string;
  name: string;
  reputation: number;
  level: "rookie" | "verified" | "expert";
  isVerified: boolean;
  avatarUrl?: string;
}

// Service pricing type
export interface ServicePricing {
  amount: number;
  currency: string;
  model: "fixed" | "hourly" | "range";
}

// Main service type
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

// Review type
export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  content: string;
  helpful: number;
}

// Service filter options
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

// Fix the dependency between types
export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  provider: Omit<ServiceProvider, "id">;
  pricing: Omit<ServicePricing, "model">;
  rating: number;
  completedJobs: number;
  category: string;
  tags: string[];
  imageUrl?: string;
  securityScore?: number;
  responseTime?: string;
  onClick?: () => void;
}

// Comparison service type
export interface ComparisonService extends MarketplaceService {
  isSelected: boolean;
}

// Blockchain ecosystem type
export interface BlockchainEcosystem {
  id: string;
  name: string;
  logoUrl: string;
  projectCount: number;
  color?: string;
}

