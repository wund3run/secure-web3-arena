
import { AIRecommendations } from "@/components/marketplace/ai-recommendations";
import { EnhancedFilters } from "@/components/marketplace/enhanced-filters";
import { OptimizedListingGrid } from "@/components/marketplace/optimized-listing-grid";
import { ServiceCategories } from "@/components/marketplace/sections/ServiceCategories";
import { BlockchainEcosystems } from "@/components/marketplace/sections/BlockchainEcosystems";
import { ComprehensiveServices } from "@/components/marketplace/sections/ComprehensiveServices";
import { MarketplaceCallToAction } from "@/components/marketplace/sections/MarketplaceCallToAction";
import { MarketplaceService } from "@/components/marketplace/hooks/useMarketplaceServices";

interface MarketplaceContentProps {
  showFilters: boolean;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  showAIRecommendations: boolean;
  filteredServices: MarketplaceService[];
  isLoading: boolean;
  viewMode: "grid" | "list";
  handleApplyFilters: (filters: any) => void;
  setSelectedService: (service: MarketplaceService | null) => void;
  isServiceInComparison: (id: string) => boolean;
  toggleCompareService: (service: MarketplaceService) => void;
  ecosystems: any[];
}

export function MarketplaceContent({
  showFilters,
  activeCategory,
  setActiveCategory,
  showAIRecommendations,
  filteredServices,
  isLoading,
  viewMode,
  handleApplyFilters,
  setSelectedService,
  isServiceInComparison,
  toggleCompareService,
  ecosystems
}: MarketplaceContentProps) {
  return (
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
              projectSize="medium"
              blockchains={[]}
              onRecommendationSelect={setSelectedService}
            />
          </div>
        )}
        
        {/* Service Categories Tabs */}
        <ServiceCategories 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Blockchain Ecosystem Logos */}
        <BlockchainEcosystems ecosystems={ecosystems} />

        {/* Services Grid with Optimized Listing Component */}
        <h3 className="text-xl font-bold mb-4 flex items-center">
          Available Security Services
        </h3>
        
        <OptimizedListingGrid 
          services={filteredServices.map(service => ({
            ...service,
            onSelect: () => setSelectedService(service),
            isSelected: isServiceInComparison(service.id),
            onToggleCompare: () => toggleCompareService(service)
          }))}
          isLoading={isLoading}
          layout={viewMode}
        />

        {/* Web2 + Web3 Security Services Section */}
        <ComprehensiveServices />

        {/* Call to Action */}
        <MarketplaceCallToAction />
      </div>
    </div>
  );
}
