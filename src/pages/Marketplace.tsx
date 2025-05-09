
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MarketplaceEnhancedFooter } from "@/components/marketplace/marketplace-enhanced-footer";
import { EnhancedFilters } from "@/components/marketplace/enhanced-filters";
import { OptimizedListingGrid } from "@/components/marketplace/optimized-listing-grid";
import { ServiceReviews } from "@/components/marketplace/service-reviews";
import { ServiceComparison } from "@/components/marketplace/comparison";
import { AIRecommendations } from "@/components/marketplace/ai-recommendations";
import { EnhancedOnboarding } from "@/components/onboarding/enhanced-onboarding";
import { ServiceCategories } from "@/components/marketplace/sections/ServiceCategories";
import { BlockchainEcosystems } from "@/components/marketplace/sections/BlockchainEcosystems";
import { ComprehensiveServices } from "@/components/marketplace/sections/ComprehensiveServices";
import { MarketplaceCallToAction } from "@/components/marketplace/sections/MarketplaceCallToAction";
import { ComparisonFloatingIndicator } from "@/components/marketplace/sections/ComparisonFloatingIndicator";
import { useMarketplaceServices, BlockchainEcosystem } from "@/components/marketplace/hooks/useMarketplaceServices";
import { useMarketplaceComparison } from "@/components/marketplace/hooks/useMarketplaceComparison";
import { useMarketplaceState } from "@/components/marketplace/hooks/useMarketplaceState";
import { ServiceCardProps } from "@/data/marketplace-data";
import { useEffect } from "react";

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
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-grow">
        {/* Enhanced header section removed as requested */}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex flex-col gap-6">
            {/* Header Section with View Toggle and Filter Button */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Security Services</h1>
                <p className="text-base text-muted-foreground">
                  Find and connect with top security experts for your Web3 project
                </p>
              </div>
              
              <div className="flex gap-2 sm:justify-end">
                <Button
                  variant={showFilters ? "default" : "outline"}
                  size="sm"
                  className="flex items-center gap-1.5 h-10"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
              </div>
            </div>

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
                      services={services}
                      projectSize={activeFilters.projectSize || "medium"}
                      blockchains={activeFilters.blockchains || []}
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
                <BlockchainEcosystems ecosystems={BLOCKCHAIN_ECOSYSTEMS as BlockchainEcosystem[]} />

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
        </div>
      </div>
      <MarketplaceEnhancedFooter />
      <Footer />

      {/* Service Details Dialog */}
      {selectedService && (
        <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="space-y-6">
              <div className="relative h-56 rounded-lg overflow-hidden">
                <img 
                  src={selectedService.imageUrl || `https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop`}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-primary/90 text-white mb-2">{selectedService.category}</Badge>
                  <h2 className="text-2xl font-bold text-white">{selectedService.title}</h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold mb-2">Service Description</h3>
                  <p className="text-muted-foreground mb-6">{selectedService.description}</p>
                  
                  <h3 className="text-xl font-bold mb-2">Key Features</h3>
                  <ul className="space-y-2 mb-6">
                    {selectedService.tags.map((tag: string) => (
                      <li key={tag} className="flex items-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                        <span>{tag}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <ServiceReviews 
                    serviceId={selectedService.id}
                    averageRating={selectedService.rating}
                    totalReviews={SAMPLE_REVIEWS.length}
                    reviews={SAMPLE_REVIEWS}
                  />
                </div>
                
                <div>
                  <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
                    <div className="text-2xl font-bold text-center mb-4">
                      {selectedService.pricing.amount} {selectedService.pricing.currency}
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span>Provider</span>
                      <span className="font-medium">{selectedService.provider.name}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span>Reputation</span>
                      <span className="font-medium">{selectedService.provider.reputation}%</span>
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span>Completed Jobs</span>
                      <span className="font-medium">{selectedService.completedJobs}</span>
                    </div>
                    
                    <div className="space-y-3 mt-6">
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                        Request Service
                      </Button>
                      <Button variant="outline" className="w-full">
                        Contact Provider
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
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
