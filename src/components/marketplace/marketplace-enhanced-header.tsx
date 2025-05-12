
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Shield, ArrowRight, Search } from "lucide-react";
import { HawklyLogo } from "@/components/layout/hawkly-logo";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function MarketplaceEnhancedHeader() {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 py-10 px-4 border-b border-border/30 mb-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <HawklyLogo variant="large" />
        </div>
        <div className="inline-flex items-center justify-center bg-primary/10 px-4 py-2 rounded-full text-primary mb-4">
          <Shield className="h-5 w-5 mr-2" />
          <span className="font-medium">Security Service Catalog</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Find Expert Security Services for Your Web3 Project
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Connect with vetted security experts, protect your blockchain assets, and build with confidence in the Web3 ecosystem.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/request-audit">
                  <Button className="w-full md:w-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90 group shadow-md">
                    <FileText className="mr-2 h-5 w-5" />
                    Request a Security Audit
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                <Link to="/marketplace">
                  <Button variant="outline" className="w-full md:w-auto border-secondary text-secondary hover:bg-secondary/10">
                    <Search className="mr-2 h-5 w-5" />
                    Browse Security Services
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
  );
}
