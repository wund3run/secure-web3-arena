
/**
 * Centralized type definitions for marketplace components
 */

// Service provider type
export interface ServiceProvider {
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
  model?: "fixed" | "hourly" | "range";
}

// Main service card props type
export interface ServiceCardProps {
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
  onClick?: () => void;
}

// Filter related types
export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterState {
  priceRange: [number, number];
  selectedAuditTypes: string[];
  selectedBlockchains: string[];
  deliveryTime: string;
  minReputation: number;
  showAIRecommendations: boolean;
  projectSize: string;
}

export interface EnhancedFiltersProps {
  onFilterChange: (filters: Record<string, any>) => void;
}

export interface FilterSectionProps {
  title: string;
  section: string;
  isCollapsed: boolean;
  toggleSection: (section: string) => void;
}

export interface CollapsedSections {
  [key: string]: boolean;
}

// Comparison related types
export interface ComparisonService extends ServiceCardProps {
  isSelected: boolean;
}
