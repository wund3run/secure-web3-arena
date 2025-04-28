
import { useState } from "react";
import { Search, Filter, GridIcon, LayoutList } from "lucide-react";
import { ServiceCard } from "@/components/marketplace/service-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters";

const CATEGORIES = ["All", "Smart Contracts", "DApps", "Protocols", "NFTs", "DeFi"];

export default function Marketplace() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          {/* Header Section */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-foreground">Security Services Marketplace</h1>
            <p className="text-lg text-muted-foreground">
              Find and connect with top security experts for your Web3 project
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                className="pl-10 w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button
                variant="outline"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              >
                {viewMode === "grid" ? (
                  <LayoutList className="h-4 w-4" />
                ) : (
                  <GridIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-4 py-2"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

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
              {/* Re-use existing service cards */}
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
