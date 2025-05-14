
import React, { useEffect } from "react";
import { MarketplaceLayout } from "@/components/marketplace/layout/MarketplaceLayout";
import { MarketplaceHeader } from "@/components/marketplace/layout/MarketplaceHeader";
import { MarketplaceContent as MarketplaceContentComponent } from "@/components/marketplace/layout/MarketplaceContent";
import { MarketplaceDialogs } from "@/components/marketplace/layout/MarketplaceDialogs";
import { ComparisonFloatingIndicator } from "@/components/marketplace/sections/ComparisonFloatingIndicator";
import { SERVICES } from "@/data/marketplace-data";
import { MarketplaceProvider, useMarketplace } from "@/contexts/marketplace/MarketplaceContext";
import { MarketplaceErrorBoundary } from "@/components/marketplace/error-handling/MarketplaceErrorBoundary";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/apiErrorHandler";
import ErrorBoundary from "@/components/ui/error-boundary";
import { ServiceCardProps } from "@/types/marketplace-unified";

// Define global interface for window to include SERVICES with correct type
declare global {
  interface Window {
    SERVICES?: any[];
  }
}

function MarketplacePageContent() {
  const {
    state,
    setViewMode,
    setShowFilters,
    setActiveCategory,
    setSelectedService,
    handleApplyFilters,
    toggleCompareService,
    isServiceInComparison,
    handleOpenComparison,
    setShowComparison,
    handleOnboardingComplete,
    filterServices,
    servicesQuery
  } = useMarketplace();
  
  // Destructure state for better readability
  const {
    viewMode,
    showFilters,
    activeCategory,
    isLoading,
    showEnhancedOnboarding,
    selectedService,
    activeFilters,
    showAIRecommendations,
    servicesForComparison,
    showComparison
  } = state;

  // Filter services based on active filters and category
  const filteredServices = servicesQuery.data ? filterServices(servicesQuery.data) : [];
  
  // Handle service selection by ID
  const handleServiceSelect = (serviceId: string) => {
    const service = servicesQuery.data?.find(service => service.id === serviceId) || null;
    if (service) {
      setSelectedService(service);
    }
  };

  // Create a wrapper function to handle string serviceId input
  const handleAIRecommendationSelect = (serviceId: string) => {
    console.log("Recommendation selected by ID:", serviceId);
    // Find the service by ID in the filtered services if needed
    const service = filteredServices.find(s => s.id === serviceId);
    if (service) {
      console.log("Found service:", service);
      setSelectedService(service);
    }
  };

  if (servicesQuery.error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-destructive/10 p-4 rounded-lg mb-4">
          <p className="text-destructive font-medium">Failed to load marketplace services</p>
        </div>
        <p className="text-muted-foreground">Please try again later or contact support if the issue persists.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <MarketplaceHeader 
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />
      
      <MarketplaceContentComponent 
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

      {/* Dialogs */}
      <MarketplaceDialogs 
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        showComparison={showComparison}
        setShowComparison={setShowComparison}
        servicesForComparison={servicesForComparison}
        showEnhancedOnboarding={showEnhancedOnboarding}
        setShowEnhancedOnboarding={setShowComparison}
        handleOnboardingComplete={handleOnboardingComplete}
        reviews={[]} // Pass reviews from a context or state in a real implementation
      />
      
      {/* Floating comparison indicator if items are selected */}
      {servicesForComparison.length > 0 && (
        <ComparisonFloatingIndicator
          servicesForComparison={servicesForComparison}
          toggleCompareService={toggleCompareService}
          handleOpenComparison={handleOpenComparison}
        />
      )}
    </div>
  );
}

export default function Marketplace() {
  // Make services available globally for the comparison functionality
  useEffect(() => {
    window.SERVICES = SERVICES;
  }, []);

  return (
    <ErrorBoundary>
      <MarketplaceProvider services={SERVICES}>
        <MarketplaceLayout>
          <MarketplaceErrorBoundary>
            <MarketplacePageContent />
          </MarketplaceErrorBoundary>
        </MarketplaceLayout>
      </MarketplaceProvider>
    </ErrorBoundary>
  );
}
