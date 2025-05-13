
import React from "react";
import { Filter, ArrowUpDown, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface AuditViewControlsProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export const AuditViewControls: React.FC<AuditViewControlsProps> = ({
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters
}) => {
  return (
    <div className="flex flex-wrap gap-2 items-center" role="toolbar" aria-label="View controls">
      <Button 
        variant={showFilters ? "default" : "outline"} 
        size="sm"
        onClick={() => setShowFilters(!showFilters)}
        className="hover:bg-muted transition-colors relative focus:ring-2 focus:ring-primary/50 focus:outline-none group"
        aria-pressed={showFilters}
        aria-label={showFilters ? "Hide filters" : "Show filters"}
      >
        <Filter className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
        <span className="hidden sm:inline">{showFilters ? "Hide Filters" : "Show Filters"}</span>
      </Button>
      
      <div className="flex border rounded-md overflow-hidden" role="group" aria-label="View mode selection">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                className={`px-3 py-1 ${viewMode === "grid" ? "bg-background shadow-sm" : "hover:bg-muted/60"} focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all`}
                onClick={() => setViewMode("grid")}
                aria-label="Switch to grid view"
                aria-pressed={viewMode === "grid"}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:scale-110" aria-hidden="true">
                  <path d="M4 2H2V13H4V2ZM7 2H5V13H7V2ZM8 2H10V13H8V2ZM13 2H11V13H13V2Z" fill="currentColor" />
                </svg>
                <span className="sr-only md:not-sr-only md:ml-1.5">Grid</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Display items in a grid layout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className={`px-3 py-1 ${viewMode === "list" ? "bg-background shadow-sm" : "hover:bg-muted/60"} focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all`}
                onClick={() => setViewMode("list")}
                aria-label="Switch to list view"
                aria-pressed={viewMode === "list"}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:scale-110" aria-hidden="true">
                  <path d="M2 4H13V5.5H2V4ZM2 6.5H13V8H2V6.5ZM2 9H13V10.5H2V9Z" fill="currentColor" />
                </svg>
                <span className="sr-only md:not-sr-only md:ml-1.5">List</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Display items in a list layout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-muted transition-colors focus:ring-2 focus:ring-primary/50 focus:outline-none group"
              aria-label="Sort items"
            >
              <ArrowUpDown className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="hidden sm:inline">Sort</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Sort audits by different criteria</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
