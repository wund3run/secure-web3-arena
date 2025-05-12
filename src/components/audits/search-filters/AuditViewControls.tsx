
import React from "react";
import { Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setShowFilters(!showFilters)}
        className="hover:bg-muted transition-colors relative"
        aria-label={showFilters ? "Hide filters" : "Show filters"}
      >
        <Filter className="h-4 w-4 mr-2" />
        {showFilters ? "Hide Filters" : "Show Filters"}
      </Button>
      <div className="flex border rounded-md">
        <Button
          variant={viewMode === "grid" ? "secondary" : "ghost"}
          size="sm"
          className={`px-3 py-1 ${viewMode === "grid" ? "bg-background shadow-sm" : "hover:bg-muted/60"}`}
          onClick={() => setViewMode("grid")}
          aria-label="Switch to grid view"
          aria-pressed={viewMode === "grid"}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
            <path d="M4 2H2V13H4V2ZM7 2H5V13H7V2ZM8 2H10V13H8V2ZM13 2H11V13H13V2Z" fill="currentColor" />
          </svg>
          <span className="sr-only md:not-sr-only md:ml-1.5">Grid</span>
        </Button>
        <Button
          variant={viewMode === "list" ? "secondary" : "ghost"}
          size="sm"
          className={`px-3 py-1 ${viewMode === "list" ? "bg-background shadow-sm" : "hover:bg-muted/60"}`}
          onClick={() => setViewMode("list")}
          aria-label="Switch to list view"
          aria-pressed={viewMode === "list"}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
            <path d="M2 4H13V5.5H2V4ZM2 6.5H13V8H2V6.5ZM2 9H13V10.5H2V9Z" fill="currentColor" />
          </svg>
          <span className="sr-only md:not-sr-only md:ml-1.5">List</span>
        </Button>
      </div>
      <Button 
        variant="outline" 
        size="sm"
        className="hover:bg-muted transition-colors"
        aria-label="Sort items"
      >
        <ArrowUpDown className="h-4 w-4 mr-2" />
        Sort
      </Button>
    </div>
  );
};
