
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MarketplaceEnhancedFooter } from "@/components/marketplace/marketplace-enhanced-footer";
import { EnhancedOnboarding } from "@/components/onboarding/enhanced-onboarding";
import { ComparisonFloatingIndicator } from "@/components/marketplace/sections/ComparisonFloatingIndicator";
import { ServiceComparison } from "@/components/marketplace/service-comparison";
import { useMarketplaceServices } from "@/components/marketplace/hooks/useMarketplaceServices";
import { useMarketplaceComparison } from "@/components/marketplace/hooks/useMarketplaceComparison";
import { useMarketplaceState } from "@/components/marketplace/hooks/useMarketplaceState";
import { MarketplaceHeader } from "@/components/marketplace/sections/MarketplaceHeader";
import { MarketplaceContent } from "@/components/marketplace/sections/MarketplaceContent";
import { ServiceDetailsDialog } from "@/components/marketplace/sections/ServiceDetailsDialog";
import { ServiceCardProps } from "@/data/marketplace-data";

// Define global interface for window to include SERVICES with correct type
declare global {
  interface Window {
    SERVICES?: ServiceCardProps[];
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
    filterServices
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

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Header Component */}
          <MarketplaceHeader 
            showFilters={showFilters} 
            setShowFilters={setShowFilters} 
          />
          
          {/* Main Content Component */}
          <MarketplaceContent 
            showFilters={showFilters}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            showAIRecommendations={showAIRecommendations}
            filteredServices={filteredServices}
            isLoading={isLoading}
            viewMode={viewMode}
            handleApplyFilters={handleApplyFilters}
            setSelectedService={setSelectedService}
            isServiceInComparison={isServiceInComparison}
            toggleCompareService={toggleCompareService}
            ecosystems={BLOCKCHAIN_ECOSYSTEMS}
          />
        </div>
      </div>
      <MarketplaceEnhancedFooter />
      <Footer />

      {/* Service Details Dialog */}
      <ServiceDetailsDialog 
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        reviews={SAMPLE_REVIEWS}
      />
      
      {/* Enhanced onboarding flow */}
      <EnhancedOnboarding 
        open={showEnhancedOnboarding} 
        onOpenChange={(open) => {
          setShowEnhancedOnboarding(open);
          if (!open) {
            handleOnboardingComplete();
          }
        }} 
      />
      
      {/* Comparison Dialog */}
      <ServiceComparison 
        services={servicesForComparison}
        open={showComparison}
        onOpenChange={setShowComparison}
      />
      
      {/* Floating comparison indicator if items are selected */}
      <ComparisonFloatingIndicator
        servicesForComparison={servicesForComparison}
        toggleCompareService={toggleCompareService}
        handleOpenComparison={handleOpenComparison}
      />
    </div>
  );
}
