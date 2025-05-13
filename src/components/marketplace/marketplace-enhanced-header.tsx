
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Search, BadgeCheck } from "lucide-react";
import { HawklyLogo } from "@/components/layout/hawkly-logo";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function MarketplaceEnhancedHeader() {
  return (
    <div className="bg-gradient-to-b from-primary/10 via-background to-secondary/10 py-10 px-4 border-b border-border/30 mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-4">
          <HawklyLogo variant="large" />
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center justify-center bg-primary/10 px-4 py-2 rounded-full text-primary mb-4">
              <Shield className="h-5 w-5 mr-2" />
              <span className="font-medium">Security Service Catalog</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Web3 Security Experts Marketplace
            </h1>
            
            <p className="text-muted-foreground mb-6">
              Connect with vetted security experts to protect your blockchain assets and build with confidence.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center text-sm bg-muted/60 px-3 py-1.5 rounded-full">
                <BadgeCheck className="h-4 w-4 text-primary mr-1.5" />
                <span>500+ Verified Experts</span>
              </div>
              <div className="flex items-center text-sm bg-muted/60 px-3 py-1.5 rounded-full">
                <BadgeCheck className="h-4 w-4 text-secondary mr-1.5" />
                <span>12,800+ Vulnerabilities Found</span>
              </div>
              <div className="flex items-center text-sm bg-muted/60 px-3 py-1.5 rounded-full">
                <BadgeCheck className="h-4 w-4 text-web3-orange mr-1.5" />
                <span>$350M+ Protected</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 md:min-w-[250px]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/request-audit" className="w-full">
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 group"
                    >
                      <FileText className="mr-2 h-5 w-5" />
                      Request a Security Audit
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  Submit your project for a comprehensive security review
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/marketplace" className="w-full">
                    <Button variant="outline" className="w-full">
                      <Search className="mr-2 h-5 w-5" />
                      Browse Services
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  Explore all available security services and providers
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
