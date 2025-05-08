
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface MarketplaceHeaderProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export function MarketplaceHeader({ showFilters, setShowFilters }: MarketplaceHeaderProps) {
  return (
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
    </div>
  );
}
