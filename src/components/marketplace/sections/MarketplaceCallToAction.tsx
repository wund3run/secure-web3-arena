
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function MarketplaceCallToAction() {
  return (
    <div className="mt-12 p-6 bg-card border border-border/40 rounded-xl bg-gradient-to-br from-card to-card/80">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">Need a Custom Security Solution?</h3>
          <p className="text-muted-foreground">Get matched with the perfect security experts for your project using our AI-powered system.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/request-audit">
                  <Button 
                    size="lg" 
                    variant="default" 
                    className="flex items-center whitespace-nowrap group bg-gradient-to-r from-[#9b87f5] to-[#33C3F0] hover:opacity-90"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Submit Project for Audit
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Get a comprehensive security assessment for your project
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/service-provider-onboarding">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="flex items-center whitespace-nowrap group border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
                  >
                    <Shield className="mr-2 h-5 w-5" />
                    Join as Security Expert
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Apply to offer your security services on our platform
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
