// Import necessary types
import { ServiceCardProps } from "./marketplace-unified";

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterState {
  price: {
    min: number;
    max: number;
  };
  rating: number;
  blockchains: string[];
  categories: string[];
  deliveryTime?: {
    min: number;
    max: number;
  };
  auditTypes?: string;
  projectSize?: string;
}

export interface EnhancedFiltersProps {
  onFilterChange: (filters: Record<string, any>) => void;
  initialFilters?: Record<string, any>;
}

export interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export interface CollapsedSections {
  [key: string]: boolean;
}

// Comparison related types
export interface ComparisonService extends ServiceCardProps {
  isSelected: boolean;
}
