
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrustBadge } from "@/components/trust/trust-badges";
import { Search, Shield, ArrowRight, AlertCircle, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HawklyLogo } from "@/components/layout/hawkly-logo";

export function MarketplaceEnhancedHeader() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full bg-gradient-to-r from-background via-primary/5 to-secondary/5 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <HawklyLogo variant="default" className="mr-8" />
            <div className="hidden lg:flex items-center space-x-2">
              <TrustBadge type="verified" />
              <TrustBadge type="expert" />
              <TrustBadge type="top-rated" />
            </div>
          </div>
          
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full md:w-auto">
            <div className="relative w-full max-w-sm flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search security services..."
                className="pl-10 bg-card"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <Link to="/request-audit" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Request for Audit
                </Button>
              </Link>
              
              <Link to="/join" className="w-full sm:w-auto">
                <Button 
                  className="bg-gradient-to-r from-[#9b87f5] to-[#33C3F0] hover:opacity-90 w-full sm:w-auto flex items-center"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Join the Circle
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center p-2 rounded-lg bg-amber-50 border border-amber-100 text-amber-700 text-xs">
          <AlertCircle className="h-3 w-3 mr-2 flex-shrink-0" />
          <p>
            Please note: Our marketplace is in beta. Some features may be limited while we continue improving. 
            <Link to="/faqs" className="underline ml-1 font-medium">Learn more</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
