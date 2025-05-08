
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
  onFilterChange: (filters: any) => void;
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
