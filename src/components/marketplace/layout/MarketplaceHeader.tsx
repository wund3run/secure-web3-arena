
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileSearch, Shield, Filter, Info, HelpCircle, User, Code } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/auth";
import { Badge } from "@/components/ui/badge";

interface MarketplaceHeaderProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export function MarketplaceHeader({ 
  showFilters, 
  setShowFilters 
}: MarketplaceHeaderProps) {
  const { user } = useAuth();
  const userType = user ? (user.role === 'auditor' ? 'auditor' : 'project') : null;

  return (
    <div className="flex flex-col gap-3 items-center justify-between mb-6">
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-foreground text-center md:text-left">Security Services</h1>
          <div className="flex items-center mt-2 md:mt-0 gap-2">
            {userType && (
              <Badge variant="outline" className="bg-primary/10 border-primary/30 px-3 py-1 flex items-center">
                <User className="h-3 w-3 mr-1" />
                {userType === 'auditor' ? 'Auditor View' : 'Project Owner View'}
              </Badge>
            )}
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
                    <Link to="/docs/marketplace-guide">
                      <Info className="h-4 w-4 mr-1" />
                      Guide
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Learn how to navigate the marketplace</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
                    <Link to="/faq">
                      <HelpCircle className="h-4 w-4 mr-1" />
                      FAQ
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Frequently asked questions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <p className="text-base text-muted-foreground text-center md:text-left">
          Find and connect with top security experts for your Web3 project
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto justify-center">
        <div className="flex gap-2 sm:justify-start order-2 sm:order-1 w-full">
          <Link to="/request-audit" className="w-1/2 sm:w-auto">
            <Button 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary/10 flex items-center justify-center"
            >
              <FileSearch className="mr-2 h-4 w-4" />
              <span className="whitespace-nowrap">Request Audit</span>
            </Button>
          </Link>
          <Link to="/service-provider-onboarding" className="w-1/2 sm:w-auto">
            <Button 
              className="w-full bg-gradient-to-r from-[#9b87f5] to-[#33C3F0] hover:opacity-90 flex items-center justify-center shadow-sm"
            >
              <Shield className="mr-2 h-4 w-4" />
              <span className="whitespace-nowrap">Become an Auditor</span>
            </Button>
          </Link>
        </div>
        
        <div className="flex justify-center sm:justify-end order-1 sm:order-2 w-full sm:w-auto">
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex items-center gap-1.5 h-10 ${!showFilters ? 'bg-secondary/20' : ''}`}
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Code className="h-4 w-4" />
                    <span className="hidden sm:inline">Technical View</span>
                    <span className="sm:hidden">Technical</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Show technical details and advanced filters</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-1.5 h-10"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
