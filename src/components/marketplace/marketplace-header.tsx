
import { useState } from "react";
import { Search, Filter, GridIcon, LayoutList, X, Shield, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Link } from "react-router-dom";

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
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Security Services</h1>
        <p className="text-base text-muted-foreground">
          Find and connect with top security experts for your Web3 project
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <form className="relative flex-grow" onSubmit={handleSearch}>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services, providers, or keywords..."
            className="pl-9 pr-16 h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {searchTerm && (
            <button
              type="button"
              className="absolute right-14 top-2.5 text-muted-foreground hover:text-foreground"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-0.5 h-8"
          >
            Search
          </Button>
        </form>
        
        <div className="flex gap-2 sm:justify-end">
          <Button
            variant={showFilters ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-1.5 h-9"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide" : "Filters"}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 h-9"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            title={viewMode === "grid" ? "Switch to list view" : "Switch to grid view"}
          >
            {viewMode === "grid" ? (
              <>
                <LayoutList className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:inline-block">List</span>
              </>
            ) : (
              <>
                <GridIcon className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:inline-block">Grid</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Call to Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Link to="/request-audit" className="w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="w-full border-primary text-primary hover:bg-primary/10 flex items-center justify-center"
          >
            <FileText className="mr-2 h-4 w-4" />
            Request for Audit
          </Button>
        </Link>
        <Link to="/join" className="w-full sm:w-auto">
          <Button 
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 flex items-center justify-center"
          >
            <Shield className="mr-2 h-4 w-4" />
            Join the Circle
          </Button>
        </Link>
      </div>
    </div>
  );
}
