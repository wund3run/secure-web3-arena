
// Re-export from unified types
export type { 
  BlockchainEcosystem,
  ServiceProvider,
  ServicePricing,
  MarketplaceService,
  Review,
  ServiceFilterOptions,
  ComparisonService,
  ServiceCardProps
} from "@/types/marketplace-unified";

// Additional marketplace specific types
export interface AuditCriteria {
  name: string;
  description: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
}

export interface ServiceComparison {
  id: string;
  services: string[]; // IDs of services being compared
  criteria: AuditCriteria[];
  createdAt: Date;
}
