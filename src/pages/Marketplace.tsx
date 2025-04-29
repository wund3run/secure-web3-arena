
import { useState } from "react";
import { ServiceCard } from "@/components/marketplace/service-card";
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";

// Import services data from the marketplace section or create a shared data file
import { Shield, FileCode, Database, Lock, Network, Globe, Server } from "lucide-react";

export default function Marketplace() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  
  // Blockchain ecosystems with their logos
  const BLOCKCHAIN_ECOSYSTEMS = [
    {
      name: "Solana",
      logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.png?v=024"
    },
    {
      name: "Ethereum",
      logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=024"
    },
    {
      name: "Polkadot",
      logoUrl: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=024"
    },
    {
      name: "Avalanche",
      logoUrl: "https://cryptologos.cc/logos/avalanche-avax-logo.png?v=024"
    },
    {
      name: "Cosmos",
      logoUrl: "https://cryptologos.cc/logos/cosmos-atom-logo.png?v=024"
    },
    {
      name: "zkSync",
      logoUrl: "https://cryptologos.cc/logos/zksync-logo.png?v=024"
    }
  ];

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

            <div className="flex-grow">
              {/* Blockchain Ecosystem Logos */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4">Blockchain Ecosystems</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                  {BLOCKCHAIN_ECOSYSTEMS.map((ecosystem) => (
                    <div 
                      key={ecosystem.name} 
                      className="bg-card hover:bg-card/90 border border-border/40 rounded-lg p-3 flex flex-col items-center justify-center hover-lift transition-all duration-300 cursor-pointer"
                      title={`${ecosystem.name} Security Audits`}
                    >
                      <div className="h-12 w-12 mb-2 flex items-center justify-center">
                        <img 
                          src={ecosystem.logoUrl} 
                          alt={`${ecosystem.name} logo`}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <h4 className="font-medium text-sm text-center">{ecosystem.name}</h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services Grid */}
              <h3 className="text-xl font-semibold mb-4">Available Services</h3>
              <div className={`grid gap-6 ${
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
    </div>
  );
}
