
import { useState } from "react";
import { Search, Filter, GridIcon, LayoutList, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

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
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast.info(`Searching for "${searchTerm}"`, {
        description: "Search functionality would be implemented here",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="flex flex-col gap-6 mb-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-foreground">Security Services</h1>
        <p className="text-lg text-muted-foreground">
          Find and connect with top security experts for your Web3 project
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <form className="relative flex-grow" onSubmit={handleSearch}>
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services, providers, or keywords..."
            className="pl-10 w-full pr-24"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {searchTerm && (
            <button
              type="button"
              className="absolute right-16 top-3 text-muted-foreground hover:text-foreground"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1.5"
          >
            Search
          </Button>
        </form>
        <div className="flex gap-2">
          <Button
            variant={showFilters ? "default" : "outline"}
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            title={viewMode === "grid" ? "Switch to list view" : "Switch to grid view"}
          >
            {viewMode === "grid" ? (
              <>
                <LayoutList className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:inline-block">List View</span>
              </>
            ) : (
              <>
                <GridIcon className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:inline-block">Grid View</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
