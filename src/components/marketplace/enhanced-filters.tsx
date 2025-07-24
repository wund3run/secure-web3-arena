import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { AuditTypesFilter } from "./filters/audit-types-filter";
import { BlockchainsFilter } from "./filters/blockchains-filter";
import { PriceRangeFilter } from "./filters/price-range-filter";
import { DeliveryTimeFilter } from "./filters/delivery-time-filter";
import { ReputationFilter } from "./filters/reputation-filter";
import { AIRecommendationsFilter } from "./filters/ai-recommendations-filter";
import { ActiveFiltersSummary } from "./filters/active-filters-summary";
import { CollapsedSections, EnhancedFiltersProps } from "./filters/filter-types";

export function EnhancedFilters({ onFilterChange }: EnhancedFiltersProps) {
  // Filter state
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10]);
  const [selectedAuditTypes, setSelectedAuditTypes] = useState<string[]>([]);
  const [selectedBlockchains, setSelectedBlockchains] = useState<string[]>([]);
  const [deliveryTime, setDeliveryTime] = useState<string>("any");
  const [minReputation, setMinReputation] = useState<number>(0);
  const [showAIRecommendations, setShowAIRecommendations] = useState<boolean>(false);
  const [projectSize, setProjectSize] = useState<string>("medium");
  
  // Collapsed states for filter sections
  const [collapsedSections, setCollapsedSections] = useState<CollapsedSections>({
    auditTypes: false,
    blockchains: false,
    price: false,
    delivery: false,
    reputation: false,
    aiRecommendations: false,
  });

  // Toggle section collapse
  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections({
      ...collapsedSections,
      [section]: !collapsedSections[section],
    });
  };

  // Apply all filters - memoized to prevent unnecessary re-renders
  const handleApplyFilters = useCallback(() => {
    const filters = {
      priceRange,
      auditTypes: selectedAuditTypes,
      blockchains: selectedBlockchains,
      deliveryTime,
      minReputation,
      aiRecommendations: showAIRecommendations,
      projectSize: showAIRecommendations ? projectSize : null,
    };
    
    onFilterChange(filters);
  }, [priceRange, selectedAuditTypes, selectedBlockchains, deliveryTime, minReputation, showAIRecommendations, projectSize, onFilterChange]);

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 10]);
    setSelectedAuditTypes([]);
    setSelectedBlockchains([]);
    setDeliveryTime("any");
    setMinReputation(0);
    setShowAIRecommendations(false);
    setProjectSize("medium");
    
    // Also update parent component
    onFilterChange({});
  };

  // Effect to apply filters when certain values change
  useEffect(() => {
    if (showAIRecommendations) {
      handleApplyFilters();
    }
  }, [showAIRecommendations, projectSize, handleApplyFilters]);

  return (
    <div className="bg-card p-6 rounded-xl space-y-5 border border-border/50 sticky top-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </h2>
        <Button variant="ghost" size="sm" onClick={resetFilters}>Reset All</Button>
      </div>
      
      <AuditTypesFilter 
        selectedAuditTypes={selectedAuditTypes}
        setSelectedAuditTypes={setSelectedAuditTypes}
        isCollapsed={collapsedSections.auditTypes}
        toggleSection={() => toggleSection("auditTypes")}
      />
      
      <BlockchainsFilter 
        selectedBlockchains={selectedBlockchains}
        setSelectedBlockchains={setSelectedBlockchains}
        isCollapsed={collapsedSections.blockchains}
        toggleSection={() => toggleSection("blockchains")}
      />
      
      <PriceRangeFilter 
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        isCollapsed={collapsedSections.price}
        toggleSection={() => toggleSection("price")}
      />
      
      <DeliveryTimeFilter 
        deliveryTime={deliveryTime}
        setDeliveryTime={setDeliveryTime}
        isCollapsed={collapsedSections.delivery}
        toggleSection={() => toggleSection("delivery")}
      />
      
      <ReputationFilter 
        minReputation={minReputation}
        setMinReputation={setMinReputation}
        isCollapsed={collapsedSections.reputation}
        toggleSection={() => toggleSection("reputation")}
      />
      
      <AIRecommendationsFilter 
        showAIRecommendations={showAIRecommendations}
        setShowAIRecommendations={setShowAIRecommendations}
        projectSize={projectSize}
        setProjectSize={setProjectSize}
        isCollapsed={collapsedSections.aiRecommendations}
        toggleSection={() => toggleSection("aiRecommendations")}
      />
      
      <div className="pt-4 border-t border-border/50">
        <ActiveFiltersSummary 
          selectedAuditTypes={selectedAuditTypes}
          selectedBlockchains={selectedBlockchains}
          priceRange={priceRange}
          deliveryTime={deliveryTime}
          minReputation={minReputation}
          showAIRecommendations={showAIRecommendations}
        />
        
        <Button 
          onClick={handleApplyFilters} 
          className="w-full"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
