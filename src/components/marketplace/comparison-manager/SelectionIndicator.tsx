
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useComparison } from "./ComparisonContext";
import { CompareButton } from "../comparison/CompareButton";
import { RemoveButton } from "./RemoveButton";

interface SelectionIndicatorProps {
  onCompare: () => void;
}

export function SelectionIndicator({ onCompare }: SelectionIndicatorProps) {
  const { selectedServices, clearSelections } = useComparison();
  
  if (selectedServices.length === 0) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-card border border-border shadow-lg rounded-lg p-3 w-[280px]">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-sm flex items-center">
            <CompareIcon className="h-4 w-4 mr-2" />
            Selected for comparison
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={clearSelections}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2 max-h-[150px] overflow-y-auto mb-3">
          {selectedServices.map(service => (
            <div 
              key={service.id} 
              className="flex justify-between items-center bg-muted/50 p-2 rounded text-sm"
            >
              <div className="truncate max-w-[180px]">{service.title}</div>
              <RemoveButton serviceId={service.id} />
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            {selectedServices.length} of {3} selected
          </span>
          <CompareButton
            count={selectedServices.length}
            onCompare={onCompare}
          />
        </div>
      </div>
    </div>
  );
}

// Custom Compare icon since it's not available in lucide-react
export const CompareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);
