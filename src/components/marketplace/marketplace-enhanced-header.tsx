
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, ArrowRight, FileText } from "lucide-react";
import { HawklyLogo } from "@/components/layout/hawkly-logo";

export function MarketplaceEnhancedHeader() {
  return (
    <div className="w-full bg-white z-10 shadow-sm border-b border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center">
            <HawklyLogo variant="default" className="mr-6" />
          </div>
          
          <div className="flex-1 max-w-xl mx-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search security services..."
                className="pl-10 bg-white border-input rounded-full"
              />
            </div>
          </div>
            
          <div className="flex items-center space-x-3">
            <Link to="/request-audit">
              <Button 
                variant="outline" 
                className="border-primary/80 text-primary hover:bg-primary/10"
              >
                <FileText className="mr-2 h-4 w-4" />
                Request for Audit
              </Button>
            </Link>
            
            <Link to="/join">
              <Button 
                className="bg-gradient-to-r from-[#9b87f5] to-[#33C3F0] hover:opacity-90 flex items-center shadow-md"
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
  );
}
