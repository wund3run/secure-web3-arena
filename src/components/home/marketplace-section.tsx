
import { useState } from "react";
import { MarketplaceHeader } from "@/components/home/marketplace/marketplace-header";
import { CategoryTabs } from "@/components/home/marketplace/category-tabs";
import { ServicesGrid } from "@/components/home/marketplace/services-grid";
import { BlockchainEcosystems } from "@/components/home/marketplace/blockchain-ecosystems";
import { ComprehensiveSecurity } from "@/components/home/marketplace/comprehensive-security";
import { MarketplaceFooter } from "@/components/home/marketplace/marketplace-footer";
import { SERVICES } from "@/data/marketplace-data";

export function MarketplaceSection() {
  const [activeTab, setActiveTab] = useState("all");
  
  // Show only 4 services on the homepage, prioritizing verified providers
  const getFilteredServices = () => {
    let filtered = activeTab === "all" 
      ? [...SERVICES] 
      : SERVICES.filter(service => 
          service.category.toLowerCase() === activeTab.toLowerCase() || 
          service.tags.some(tag => tag.toLowerCase() === activeTab.toLowerCase())
        );
    
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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MarketplaceHeader />
        <CategoryTabs activeTab={activeTab} onTabChange={handleTabChange} />
        <ServicesGrid services={filteredServices} />
        <BlockchainEcosystems />
        <ComprehensiveSecurity />
        <MarketplaceFooter />
      </div>
    </section>
  );
}
