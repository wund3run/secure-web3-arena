
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileSearch, Shield } from "lucide-react";

interface MarketplaceHeaderProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export function MarketplaceHeader({ 
  showFilters, 
  setShowFilters 
}: MarketplaceHeaderProps) {
  return (
    <div className="flex flex-col gap-3 items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Security Services</h1>
        <p className="text-base text-muted-foreground">
          Find and connect with top security experts for your Web3 project
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="flex gap-2 sm:justify-start order-2 sm:order-1 w-full sm:w-auto">
          <Link to="/request-audit" className="w-full sm:w-auto">
            <Button 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary/10 flex items-center justify-center"
            >
              <FileSearch className="mr-2 h-4 w-4" />
              Security Assessment
            </Button>
          </Link>
          <Link to="/service-provider-onboarding" className="w-full sm:w-auto">
            <Button 
              className="w-full bg-gradient-to-r from-[#9b87f5] to-[#33C3F0] hover:opacity-90 flex items-center justify-center shadow-sm"
            >
              <Shield className="mr-2 h-4 w-4" />
              Apply as Auditor
            </Button>
          </Link>
        </div>
        
        <div className="flex gap-2 sm:justify-end order-1 sm:order-2 w-full sm:w-auto">
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
