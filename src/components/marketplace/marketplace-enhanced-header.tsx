
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrustBadge } from "@/components/trust/trust-badges";
import { Search, Shield, ArrowRight, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function MarketplaceEnhancedHeader() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center mr-8">
              <div className="p-2 mr-1">
                <div className="h-8 w-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-secondary">
                  Hawkly
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="ml-2 text-xs px-1.5 border-amber-300 text-amber-700 bg-amber-50">
                        BETA
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs max-w-[220px]">
                        Hawkly is currently in beta. We appreciate your feedback as we continue to improve the platform.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </Link>
            <div className="hidden lg:flex items-center space-x-2">
              <TrustBadge type="verified" />
              <TrustBadge type="expert" />
              <TrustBadge type="top-rated" />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search security services..."
                className="pl-10 bg-card"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="hidden sm:block">
              <Link to="/request-audit">
                <Button variant="outline">
                  Post Request
                </Button>
              </Link>
            </div>
            
            <Button 
              className="hidden md:flex items-center bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              onClick={() => window.open('/marketplace?onboarding=true', '_self')}
            >
              Find Security Expert
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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
