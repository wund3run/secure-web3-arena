
import React, { useState } from "react";
import { MarketplaceService } from "@/types/marketplace-unified";
import { Badge } from "@/components/ui/badge";
import { Info, AlertCircle, ArrowLeft } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ComparisonHeaderProps {
  services: MarketplaceService[];
}

export function ComparisonHeader({ services }: ComparisonHeaderProps) {
  const [viewMode, setViewMode] = useState<"basic" | "technical">("basic");

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link to="/marketplace">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Marketplace</span>
              </Button>
            </Link>
          </div>
          <h2 className="text-2xl font-bold flex items-center">
            Service Comparison
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({services.length} {services.length === 1 ? 'service' : 'services'})
            </span>
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Compare security services side by side to find the perfect match for your needs
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Info className="h-4 w-4 mr-1" />
                  <span>How to compare</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  This comparison shows key differences between services. 
                  Look for price, reputation, and features that best match your project needs.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Technical vs non-technical toggle */}
      <div className="flex items-center justify-center gap-2 bg-muted/30 p-2 rounded-lg">
        <Badge 
          variant={viewMode === "basic" ? "default" : "outline"} 
          className={`px-3 py-1.5 cursor-pointer ${viewMode === "basic" ? "bg-background" : ""}`}
          onClick={() => setViewMode("basic")}
        >
          Basic View
        </Badge>
        <Badge 
          variant={viewMode === "technical" ? "default" : "outline"} 
          className={`px-3 py-1.5 cursor-pointer ${viewMode === "technical" ? "bg-background" : ""}`}
          onClick={() => setViewMode("technical")}
        >
          Technical View
        </Badge>
      </div>

      {/* Guidance for all users */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-start space-x-3 text-sm">
        <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-blue-800 font-medium">Comparison Guide</p>
          <p className="text-blue-700 mt-1">
            {viewMode === "basic" ? (
              <>
                Compare services based on price, reputation, and key features. You can remove services 
                using the X button at the top of each column. Need help choosing? Use our 
                <Link to="/request-audit" className="font-medium"> Audit Advisor</Link> tool.
              </>
            ) : (
              <>
                Technical view shows additional details like supported blockchains, audit methodologies,
                and technical specifications. Switch to Basic View for a simpler comparison.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
