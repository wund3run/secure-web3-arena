
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EnhancedTooltip } from "@/components/ui/enhanced-tooltip";
import { Shield, User, ChevronRight, ArrowRight, Sparkles, Globe } from "lucide-react";

export function EnhancedHeroHeader() {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden py-16 md:py-24 lg:py-28">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30 z-0"></div>
      
      {/* Blue blur effect */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/30 rounded-full blur-3xl opacity-20"></div>
      
      {/* Purple blur effect */}
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-secondary/30 rounded-full blur-3xl opacity-20"></div>
      
      <div className="relative z-10 container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none border-primary/10 bg-primary/10 text-primary mb-2">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            Web3 Security Made Simple
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl">
            Connect With Expert{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Security Auditors
            </span>
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            The intelligent marketplace matching blockchain projects with verified security experts.
            Secure your Web3 project with confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
            <Link to="/marketplace">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-11 px-8">
                <Shield className="mr-2 h-4 w-4" />
                Find Security Services
              </Button>
            </Link>
            <EnhancedTooltip content="Try our user-friendly experience" side="bottom">
              <Link to="/enhanced-dashboard">
                <Button variant="outline" className="h-11 px-8 border-primary/20 text-primary">
                  <Globe className="mr-2 h-4 w-4" />
                  Try Enhanced Experience
                  <ArrowRight className="ml-1 h-4 w-4"/>
                </Button>
              </Link>
            </EnhancedTooltip>
          </div>
          <div className="flex items-center justify-center mt-4">
            <Link 
              to="/request-audit" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
            >
              <User className="mr-1 h-4 w-4" />
              Are you an auditor?
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
