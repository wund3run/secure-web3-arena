
import { MarketplaceLayout } from "@/components/marketplace/layout/MarketplaceLayout";
import { MarketplaceHeader } from "@/components/marketplace/layout/MarketplaceHeader";
import { MarketplaceContent } from "@/components/marketplace/layout/MarketplaceContent";
import { MarketplaceDialogs } from "@/components/marketplace/layout/MarketplaceDialogs";
import { ComparisonFloatingIndicator } from "@/components/marketplace/sections/ComparisonFloatingIndicator";
import { useMarketplaceServices } from "@/components/marketplace/hooks/useMarketplaceServices";
import { useMarketplaceComparison } from "@/components/marketplace/hooks/useMarketplaceComparison";
import { useMarketplaceState } from "@/components/marketplace/hooks/useMarketplaceState";
import { useEffect } from "react";

// Define global interface for window to include SERVICES with correct type
declare global {
  interface Window {
    SERVICES?: any[];
  }
}

export default function Marketplace() {
  // Use custom hooks to organize state and logic
  const {
    viewMode, setViewMode,
    showFilters, setShowFilters,
    activeCategory, setActiveCategory,
    isLoading,
    showEnhancedOnboarding, setShowEnhancedOnboarding,
    selectedService, setSelectedService,
    activeFilters,
    showAIRecommendations,
    handleApplyFilters,
    handleOnboardingComplete
  } = useMarketplaceState();

  const {
    services,
    BLOCKCHAIN_ECOSYSTEMS,
    SAMPLE_REVIEWS,
    filterServices,
    getServiceById
  } = useMarketplaceServices();

  const {
    servicesForComparison,
    showComparison,
    setShowComparison,
    toggleCompareService,
    isServiceInComparison,
    handleOpenComparison
  } = useMarketplaceComparison();

  // Filter services based on active filters and category
  const filteredServices = filterServices(activeCategory, activeFilters);

  // Handle service selection by ID
  const handleServiceSelect = (serviceId: string) => {
    const service = getServiceById(serviceId);
    if (service) {
      setSelectedService(service);
    }
  };

  return (
    <MarketplaceLayout>
      <div className="flex flex-col gap-6">
        <MarketplaceHeader 
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
        
        <MarketplaceContent 
          showFilters={showFilters}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          viewMode={viewMode}
          isLoading={isLoading}
          filteredServices={filteredServices}
          showAIRecommendations={showAIRecommendations}
          activeFilters={activeFilters}
          handleServiceSelect={handleServiceSelect}
          isServiceInComparison={isServiceInComparison}
          toggleCompareService={toggleCompareService}
          handleApplyFilters={handleApplyFilters}
        />
      </div>

      {/* Dialogs */}
      <MarketplaceDialogs 
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        showComparison={showComparison}
        setShowComparison={setShowComparison}
        servicesForComparison={servicesForComparison}
        showEnhancedOnboarding={showEnhancedOnboarding}
        setShowEnhancedOnboarding={setShowEnhancedOnboarding}
        handleOnboardingComplete={handleOnboardingComplete}
        reviews={SAMPLE_REVIEWS}
      />
      
      {/* Floating comparison indicator if items are selected */}
      <ComparisonFloatingIndicator
        servicesForComparison={servicesForComparison}
        toggleCompareService={toggleCompareService}
        handleOpenComparison={handleOpenComparison}
      />
    </MarketplaceLayout>
  );
}
