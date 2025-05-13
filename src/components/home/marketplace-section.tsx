
import { useState, useEffect } from "react";
import { MarketplaceHeader } from "@/components/home/marketplace/marketplace-header";
import { CategoryTabs } from "@/components/home/marketplace/category-tabs";
import { ServicesGrid } from "@/components/home/marketplace/services-grid";
import { ComprehensiveSecurity } from "@/components/home/marketplace/comprehensive-security";
import { MarketplaceFooter } from "@/components/home/marketplace/marketplace-footer";
import { AIRecommendations } from "@/components/marketplace/ai-recommendations";
import { ComparisonManager } from "@/components/marketplace/comparison-manager";
import { SERVICES } from "@/data/marketplace-data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function MarketplaceSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  
  // Expose services globally for the comparison functionality
  useEffect(() => {
    window.SERVICES = SERVICES;
  }, []);
  
  // Get filtered services based on active tab and any other filters
  const getFilteredServices = () => {
    let filtered = activeTab === "all" 
      ? [...SERVICES] 
      : SERVICES.filter(service => 
          service.category.toLowerCase() === activeTab.toLowerCase() || 
          service.tags.some(tag => tag.toLowerCase() === activeTab.toLowerCase())
        );
    
    // Apply additional filters if any
    if (activeFilters.auditTypes && activeFilters.auditTypes.length > 0) {
      filtered = filtered.filter(service => 
        service.tags.some(tag => 
          activeFilters.auditTypes.includes(tag.toLowerCase())
        )
      );
    }
    
    if (activeFilters.priceRange) {
      filtered = filtered.filter(service => 
        service.pricing.amount >= activeFilters.priceRange[0] && 
        service.pricing.amount <= activeFilters.priceRange[1]
      );
    }
    
    if (activeFilters.blockchains && activeFilters.blockchains.length > 0) {
      filtered = filtered.filter(service => 
        service.tags.some(tag => 
          activeFilters.blockchains.includes(tag.toLowerCase())
        )
      );
    }
    
    if (activeFilters.minReputation) {
      filtered = filtered.filter(service => 
        service.provider.reputation >= activeFilters.minReputation
      );
    }
    
    // Sort by verification status and then by rating to show best services first
    filtered = filtered.sort((a, b) => {
      if (a.provider.isVerified !== b.provider.isVerified) {
        return a.provider.isVerified ? -1 : 1;
      }
      return b.rating - a.rating;
    });
    
    return filtered.slice(0, 4);
  };

  const filteredServices = getFilteredServices();
  const { ComparisonProvider, SelectionIndicator, SelectionToggle, ComparisonDialog } = ComparisonManager({ maxCompare: 3 });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
    setShowAIRecommendations(filters.aiRecommendations || false);
  };

  // Add a handler for recommendation selection
  const handleRecommendationSelect = (service: any) => {
    console.log("Recommendation selected:", service);
  };

  return (
    <ComparisonProvider>
      <section className="py-16 bg-gradient-to-b from-background to-muted/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MarketplaceHeader />
          <CategoryTabs activeTab={activeTab} onTabChange={handleTabChange} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* AI Recommendations Section (conditional) */}
            {showAIRecommendations && (
              <div className="lg:col-span-3 mb-2">
                <AIRecommendations 
                  services={SERVICES}
                  projectSize={activeFilters.projectSize || "medium"}
                  blockchains={activeFilters.blockchains || []}
                  onRecommendationSelect={handleRecommendationSelect}
                />
              </div>
            )}
            
            {/* Services Grid - Now with comparison toggle buttons */}
            <div className="lg:col-span-3">
              <ServicesGrid services={filteredServices} isLoading={false} />
              
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
        </div>
        
        {/* Floating comparison selector */}
        <SelectionIndicator />
        <ComparisonDialog services={[]} open={showComparison} onOpenChange={setShowComparison} />
      </section>
    </ComparisonProvider>
  );
}

// Update the Window interface declaration to match the one in Marketplace.tsx
declare global {
  interface Window {
    SERVICES?: any[];
  }
}
