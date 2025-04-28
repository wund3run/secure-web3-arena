
import { Search, Filter, GridIcon, LayoutList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CATEGORIES = ["All", "Smart Contracts", "DApps", "Protocols", "NFTs", "DeFi"];

interface MarketplaceHeaderProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export function MarketplaceHeader({
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters,
}: MarketplaceHeaderProps) {
  return (
    <div className="flex flex-col gap-6 mb-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-foreground">Security Services Marketplace</h1>
        <p className="text-lg text-muted-foreground">
          Find and connect with top security experts for your Web3 project
        </p>
      </div>

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
    </div>
  );
}
