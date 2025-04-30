
import React, { useState, useEffect } from "react";
import { ServiceCardProps } from "@/data/marketplace-data";
import { Button } from "@/components/ui/button";
import { X, Compare } from "lucide-react";
import { toast } from "sonner";
import { ServiceComparison, CompareButton } from "./service-comparison";

interface ComparisonManagerProps {
  maxCompare?: number;
}

export function ComparisonManager({ maxCompare = 3 }: ComparisonManagerProps) {
  const [selectedServices, setSelectedServices] = useState<ServiceCardProps[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  
  // Setup a context to share the selection state across components
  const ComparisonContext = React.createContext<{
    selectedServices: ServiceCardProps[];
    toggleServiceSelection: (service: ServiceCardProps) => void;
    isSelected: (serviceId: string) => boolean;
    clearSelections: () => void;
  }>({
    selectedServices: [],
    toggleServiceSelection: () => {},
    isSelected: () => false,
    clearSelections: () => {},
  });

  // Provider component to wrap marketplace content
  function ComparisonProvider({ children }: { children: React.ReactNode }) {
    // Toggle selection of a service
    const toggleServiceSelection = (service: ServiceCardProps) => {
      setSelectedServices(prev => {
        if (prev.some(s => s.id === service.id)) {
          return prev.filter(s => s.id !== service.id);
        } else {
          if (prev.length >= maxCompare) {
            toast.warning(`You can compare up to ${maxCompare} services at a time`, {
              description: "Please remove a service before adding another"
            });
            return prev;
          }
          return [...prev, service];
        }
      });
    };
    
    // Check if a service is selected
    const isSelected = (serviceId: string) => {
      return selectedServices.some(service => service.id === serviceId);
    };
    
    // Clear all selections
    const clearSelections = () => {
      setSelectedServices([]);
    };
    
    return (
      <ComparisonContext.Provider value={{
        selectedServices,
        toggleServiceSelection,
        isSelected,
        clearSelections
      }}>
        {children}
      </ComparisonContext.Provider>
    );
  }

  // Hook to use comparison context
  function useComparison() {
    const context = React.useContext(ComparisonContext);
    if (!context) {
      throw new Error("useComparison must be used within a ComparisonProvider");
    }
    return context;
  }

  // Selection indicator component that shows selected services
  function SelectionIndicator() {
    const { selectedServices, clearSelections } = useComparison();
    
    if (selectedServices.length === 0) return null;
    
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-card border border-border shadow-lg rounded-lg p-3 w-[280px]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-sm flex items-center">
              <Compare className="h-4 w-4 mr-2" />
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
              {selectedServices.length} of {maxCompare} selected
            </span>
            <CompareButton
              onCompare={() => setShowComparison(true)}
              count={selectedServices.length}
            />
          </div>
        </div>
      </div>
    );
  }

  // Toggle selection button for each service card
  function SelectionToggle({ serviceId }: { serviceId: string }) {
    const { isSelected, toggleServiceSelection } = useComparison();
    const selected = isSelected(serviceId);
    
    return (
      <Button
        variant={selected ? "default" : "outline"}
        size="sm"
        className={`h-7 rounded-md ${selected ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // Find the service in the data and toggle it
          const service = window.SERVICES?.find(s => s.id === serviceId);
          if (service) toggleServiceSelection(service);
        }}
      >
        {selected ? "Selected" : "Compare"}
      </Button>
    );
  }

  // Remove button for the selection indicator
  function RemoveButton({ serviceId }: { serviceId: string }) {
    const { toggleServiceSelection } = useComparison();
    
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0"
        onClick={() => {
          const service = window.SERVICES?.find(s => s.id === serviceId);
          if (service) toggleServiceSelection(service);
        }}
      >
        <X className="h-3 w-3" />
      </Button>
    );
  }

  return {
    ComparisonProvider,
    useComparison,
    SelectionIndicator,
    SelectionToggle,
    ComparisonDialog: (
      <ServiceComparison
        services={selectedServices}
        open={showComparison}
        onOpenChange={setShowComparison}
      />
    )
  };
}
