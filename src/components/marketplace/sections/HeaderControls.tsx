
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, Filter } from "lucide-react";
import { Compare } from "../icons/Compare";

interface HeaderControlsProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  servicesCount: number;
  servicesForComparison: any[];
  handleOpenComparison: () => void;
}

export function HeaderControls({
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters,
  servicesCount,
  servicesForComparison,
  handleOpenComparison
}: HeaderControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold flex items-center">
          Security Services
          <span className="ml-2 text-sm font-normal text-muted-foreground">({servicesCount} available)</span>
        </h2>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="bg-muted p-1 rounded-md flex">
          <Button
            variant="ghost"
            size="sm"
            className={`px-3 py-1 ${viewMode === "grid" ? "bg-background shadow-sm" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4 mr-1" />
            Grid
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`px-3 py-1 ${viewMode === "list" ? "bg-background shadow-sm" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4 mr-1" />
            List
          </Button>
        </div>
        
        {/* Compare Button */}
        {servicesForComparison.length > 0 && (
          <Button 
            variant={servicesForComparison.length >= 2 ? "default" : "outline"} 
            size="sm"
            onClick={handleOpenComparison}
            disabled={servicesForComparison.length < 2}
          >
            <Compare className="h-4 w-4 mr-1" />
            Compare ({servicesForComparison.length})
          </Button>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          className="lg:hidden"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-1" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
    </div>
  );
}
