
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrustBadge } from "@/components/trust/trust-badges";
import { Search, Shield, ArrowRight } from "lucide-react";

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
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-secondary">
                Hawkly
              </span>
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
              <Button variant="outline" onClick={() => window.open('/requests', '_self')}>
                Post Request
              </Button>
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
    </div>
  );
}
