
/**
 * Type definitions for marketplace service cards
 * These components are used to display service offerings throughout the platform
 * Re-exports unified types from central type definitions
 */

// Re-export from central type definition to maintain backward compatibility
export { type ServiceCardProps } from "@/types/marketplace-unified";

// Export additional helper types for service cards
export interface ServiceCardDisplayOptions {
  showRating?: boolean;
  showPrice?: boolean;
  showProvider?: boolean;
  showDescription?: boolean;
  compact?: boolean;
}
