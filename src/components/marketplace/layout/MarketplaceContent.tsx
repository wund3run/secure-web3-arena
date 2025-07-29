
import React from "react";
import { ServiceCategories } from "@/components/marketplace/sections/ServiceCategories";
import { BlockchainEcosystems } from "@/components/marketplace/sections/BlockchainEcosystems";
import { ComprehensiveServices } from "@/components/marketplace/sections/ComprehensiveServices";
import { MarketplaceCallToAction } from "@/components/marketplace/sections/MarketplaceCallToAction";
import { OptimizedListingGrid } from "@/components/marketplace/optimized-listing-grid";
import { AIRecommendations } from "@/components/marketplace/ai-recommendations";
import { EnhancedFilters } from "@/components/marketplace/enhanced-filters";
import { ServiceCardProps } from "@/types/marketplace-unified";

interface MarketplaceContentProps {
  showFilters: boolean;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  viewMode: "grid" | "list";
  isLoading: boolean;
  filteredServices: ServiceCardProps[];
  showAIRecommendations: boolean;
  activeFilters: Record<string, unknown>;
  handleServiceSelect: (id: string) => void;
  isServiceInComparison: (id: string) => boolean;
  toggleCompareService: (service: ServiceCardProps) => void;
  handleApplyFilters: (filters: Record<string, unknown>) => void;
}

export function MarketplaceContent({
  showFilters,
  activeCategory,
  setActiveCategory,
  viewMode,
  isLoading,
  filteredServices,
  showAIRecommendations,
  activeFilters,
  handleServiceSelect,
  isServiceInComparison,
  toggleCompareService,
  handleApplyFilters
}: MarketplaceContentProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Main Content with Improved Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Enhanced Filters Panel */}
        <aside className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <EnhancedFilters onFilterChange={handleApplyFilters} />
        </aside>

        <div className="lg:col-span-3">
          {/* AI Recommendations Section */}
          {showAIRecommendations && (
            <div className="mb-8">
              <AIRecommendations 
                services={filteredServices}
                projectSize={(activeFilters.projectSize as string) || "medium"}
                blockchains={(activeFilters.blockchains as string[]) || []}
                onRecommendationSelect={(serviceId) => handleServiceSelect(serviceId)}
              />
            </div>
          )}
          
          {/* Service Categories Tabs */}
          <ServiceCategories 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* Blockchain Ecosystem Logos */}
          <BlockchainEcosystems />

          {/* Services Grid with Optimized Listing Component */}
          <h3 className="text-xl font-bold mb-4 flex items-center">
            Available Security Services
          </h3>
          
          <OptimizedListingGrid 
            services={filteredServices.map(service => ({
              ...service,
              isSelected: isServiceInComparison(service.id),
              onToggleCompare: () => toggleCompareService(service)
            }))}
            isLoading={isLoading}
            layout={viewMode}
            onServiceSelect={handleServiceSelect}
          />

          {/* Web2 + Web3 Security Services Section */}
          <ComprehensiveServices />

          {/* Call to Action */}
          <MarketplaceCallToAction />
        </div>
      </div>
    </div>
  );
}
