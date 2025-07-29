
// Re-export from central type definition to maintain backward compatibility
export { 
  type FilterState,
  type EnhancedFiltersProps,
  type CollapsedSections
} from "@/types/marketplace";

// Extend FilterOption interface to include id
export interface FilterOption {
  id: string;
  label: string;
  value?: string;
  count?: number;
}

// Extend FilterSectionProps interface to include needed props
export interface FilterSectionProps {
  title: string;
  section: string;
  isCollapsed: boolean;
  toggleSection: (section: string) => void;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}
