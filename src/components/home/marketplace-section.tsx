import React from "react";
import { MarketplaceHeader } from "@/components/home/marketplace/marketplace-header";
import { CategoryTabs } from "@/components/home/marketplace/category-tabs";
import { ServicesGrid } from "@/components/home/marketplace/services-grid";
import { ComprehensiveSecurity } from "@/components/home/marketplace/comprehensive-security";
import { MarketplaceFooter } from "@/components/home/marketplace/marketplace-footer";
import { AIRecommendations } from "@/components/marketplace/ai-recommendations";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SERVICES } from "@/data/marketplace-data";
import { MarketplaceProvider, useMarketplace } from "@/contexts/marketplace/MarketplaceContext";
import { MarketplaceErrorBoundary } from "@/components/marketplace/error-handling/MarketplaceErrorBoundary";
import { ComparisonFloatingIndicator } from "@/components/marketplace/sections/ComparisonFloatingIndicator";
import { MarketplaceDialogs } from "@/components/marketplace/layout/MarketplaceDialogs";
import { ServiceCardProps } from "@/types/marketplace-unified";

function MarketplaceContent() {
  const {
    state,
    setActiveCategory,
    handleApplyFilters,
    filterServices,
    servicesQuery,
    toggleCompareService,
    isServiceInComparison,
    handleOpenComparison,
    setShowComparison
  } = useMarketplace();

  const {
    activeCategory,
    activeFilters,
    showAIRecommendations,
    servicesForComparison,
    showComparison
  } = state;

  // Filter and limit services for the home page
  const filteredServices = servicesQuery.data ? filterServices(servicesQuery.data).slice(0, 4) : [];

  const handleTabChange = (tab: string) => {
    setActiveCategory(tab);
  };

  const handleFilterChange = (filters: Record<string, unknown>) => {
    handleApplyFilters(filters);
  };

  // Create a wrapper function to handle AI recommendation selection
  const handleAIRecommendationSelect = (serviceId: string) => {
    console.log("Recommendation selected by ID:", serviceId);
    // Find the service by ID in the filtered services if needed
    const service = filteredServices.find((s: ServiceCardProps) => s.id === serviceId);
    if (service) {
      console.log("Found service:", service);
      // Could navigate to service details or add to comparison
    }
  };

  return (
    <>
      <MarketplaceHeader />
      <CategoryTabs activeTab={activeCategory} onTabChange={handleTabChange} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* AI Recommendations Section (conditional) */}
        {showAIRecommendations && (
          <div className="lg:col-span-3 mb-2">
            <AIRecommendations 
              services={filteredServices.map(service => ({
                id: service.id,
                name: service.title,
                provider: service.provider.name,
                description: service.description,
                price: `${service.pricing.amount} ${service.pricing.currency}`,
                rating: service.rating,
                completionTime: `${service.deliveryTime || 7} days`,
                category: service.category,
                tags: service.tags
              }))}
              projectSize={activeFilters.projectSize || "medium"}
              blockchains={activeFilters.blockchains || []}
              onRecommendationSelect={handleAIRecommendationSelect}
            />
          </div>
        )}
        
        {/* Services Grid - With comparison toggle buttons */}
        <div className="lg:col-span-3">
          <ServicesGrid 
            services={filteredServices} 
            isLoading={servicesQuery.isLoading} 
          />
          
          <div className="flex justify-center mt-4 mb-10">
            <Link to="/marketplace">
              <Button variant="outline" className="group">
                View all security services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <ComprehensiveSecurity />
      <MarketplaceFooter />

      {/* Dialogs for comparison */}
      <MarketplaceDialogs 
        selectedService={null}
        setSelectedService={() => {}}
        showComparison={showComparison}
        setShowComparison={setShowComparison}
        servicesForComparison={servicesForComparison}
        showEnhancedOnboarding={false}
        setShowEnhancedOnboarding={() => {}}
        handleOnboardingComplete={() => {}}
        reviews={[]}
      />
      
      {/* Floating comparison indicator */}
      {servicesForComparison.length > 0 && (
        <ComparisonFloatingIndicator
          servicesForComparison={servicesForComparison}
          toggleCompareService={toggleCompareService}
          handleOpenComparison={handleOpenComparison}
        />
      )}
    </>
  );
}

export function MarketplaceSection() {
  // Expose services globally for the comparison functionality
  React.useEffect(() => {
    window.SERVICES = SERVICES;
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MarketplaceProvider services={SERVICES}>
          <MarketplaceErrorBoundary>
            <MarketplaceContent />
          </MarketplaceErrorBoundary>
        </MarketplaceProvider>
      </div>
    </section>
  );
}

// Update the Window interface declaration to match the one in Marketplace.tsx
declare global {
  interface Window {
    SERVICES?: unknown[];
  }
}
