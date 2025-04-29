
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
  
  const filteredServices = activeTab === "all" 
    ? SERVICES.slice(0, 4) // Show only 4 services on the homepage
    : SERVICES.filter(service => 
        service.category.toLowerCase() === activeTab.toLowerCase() || 
        service.tags.some(tag => tag.toLowerCase() === activeTab.toLowerCase())
      ).slice(0, 4);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <section className="py-12 bg-background">
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
