
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Shield, BadgeCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";

export function MarketplaceCallToAction() {
  return (
    <Card className="mt-12 overflow-hidden" role="region" aria-labelledby="cta-heading">
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-1"></div>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2" id="cta-heading">Need a Custom Security Solution?</h3>
            <p className="text-muted-foreground">Get matched with the perfect security experts for your project.</p>
            
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <BadgeCheck className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-sm">AI-powered matching with top auditors</span>
              </li>
              <li className="flex items-start">
                <BadgeCheck className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-sm">Comprehensive vulnerability assessments</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/request-audit" className="w-full sm:w-auto">
                    <Button 
                      size="lg" 
                      variant="default" 
                      className="w-full flex items-center whitespace-nowrap group bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover:shadow-md transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none"
                      aria-label="Submit your project for security audit"
                    >
                      <FileText className="mr-2 h-5 w-5" aria-hidden="true" />
                      Submit Project for Audit
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Get a comprehensive security assessment for your project</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/service-provider-onboarding" className="w-full sm:w-auto">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full flex items-center whitespace-nowrap group border-secondary text-secondary hover:bg-secondary/10 hover:shadow-sm transition-all focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                      aria-label="Apply as a security expert on our platform"
                    >
                      <Users className="mr-2 h-5 w-5" aria-hidden="true" />
                      Join as Security Expert
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Apply to offer your security services on our platform</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
