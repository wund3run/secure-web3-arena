
import { useState } from "react";
import { ServiceCard } from "@/components/marketplace/service-card";
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";

export default function Marketplace() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          {/* Header Section */}
          <MarketplaceHeader
            viewMode={viewMode}
            setViewMode={setViewMode}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />

          {/* Main Content */}
          <div className="flex gap-6">
            {/* Filters Panel */}
            {showFilters && (
              <aside className="w-64 shrink-0">
                <MarketplaceFilters />
              </aside>
            )}

            {/* Services Grid */}
            <div className={`grid gap-6 flex-grow ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              <ServiceCard
                id="1"
                title="Smart Contract Security Audit"
                description="Comprehensive analysis of your smart contract code to identify vulnerabilities."
                provider={{
                  name: "CryptoShield",
                  reputation: 98,
                  isVerified: true,
                  level: "expert"
                }}
                pricing={{
                  amount: 4.5,
                  currency: "ETH"
                }}
                rating={4.9}
                completedJobs={124}
                category="Smart Contracts"
                tags={["Solidity", "ERC20", "ERC721"]}
              />
              {/* Add more ServiceCard components as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
