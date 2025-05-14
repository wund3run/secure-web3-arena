
/**
 * Centralized type definitions for marketplace components
 */

// Re-export types from unified definitions for better compatibility
export { 
  type ServiceProvider,
  type ServicePricing,
  type ServiceCardProps
} from "./marketplace-unified";

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

// Comparison related types - use proper import for ServiceCardProps
export interface ComparisonService {
  isSelected: boolean;
  // Extend from the properly imported ServiceCardProps from marketplace-unified
  id: string;
  title: string;
  description: string;
  provider: {
    name: string;
    reputation: number;
    level: "rookie" | "verified" | "expert";
    isVerified: boolean;
  };
  pricing: {
    amount: number;
    currency: string;
    model?: "fixed" | "hourly" | "range";
  };
  rating: number;
  completedJobs: number;
  category: string;
  tags: string[];
  imageUrl?: string;
}
