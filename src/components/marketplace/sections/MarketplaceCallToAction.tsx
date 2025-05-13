
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Shield, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth";
import { toast } from "sonner";

export function MarketplaceCallToAction() {
  const { user } = useAuth();

  const handleAuditClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      toast.info("Authentication required", {
        description: "Please sign in to request an audit",
        action: {
          label: "Sign In",
          onClick: () => window.location.href = "/auth"
        }
      });
    }
  };

  return (
    <Card className="mt-12 overflow-hidden interactive-card" role="region" aria-labelledby="cta-heading">
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-1 transition-all duration-300"></div>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2" id="cta-heading">Ready for Expert Security Review?</h3>
            <p className="text-muted-foreground">Let us match you with the perfect security experts for your project needs.</p>
            
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <BadgeCheck className="h-5 w-5 text-primary mr-2 mt-0.5 animate-in zoom-in-50 transition-all" />
                <span className="text-sm">AI-powered matching with top auditors</span>
              </li>
              <li className="flex items-start">
                <BadgeCheck className="h-5 w-5 text-primary mr-2 mt-0.5 animate-in zoom-in-75 delay-100 transition-all" />
                <span className="text-sm">Comprehensive vulnerability assessments</span>
              </li>
            </ul>
          </div>
          
          {/* Single, focused CTA */}
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/request-audit" className="w-full sm:w-auto" onClick={handleAuditClick}>
                    <Button 
                      size="lg" 
                      variant="default" 
                      className="w-full flex items-center whitespace-nowrap group bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover:shadow-md transition-all focus:ring-2 focus:ring-primary/50 focus:outline-none btn-pulse"
                      aria-label="Submit your project for security audit"
                    >
                      <Shield className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" aria-hidden="true" />
                      Start Your Security Assessment
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Get a comprehensive security assessment for your project</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
