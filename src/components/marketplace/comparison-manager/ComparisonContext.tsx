import React, { createContext, useState, useContext } from "react";
import { ServiceCardProps } from "@/components/marketplace/card/ServiceCardProps";
import { toast } from "sonner";

interface ComparisonContextType {
  selectedServices: ServiceCardProps[];
  toggleServiceSelection: (service: ServiceCardProps) => void;
  isSelected: (serviceId: string) => boolean;
  clearSelections: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export { ComparisonContext };

export function ComparisonProvider({ 
  children, 
  maxCompare = 3 
}: { 
  children: React.ReactNode;
  maxCompare?: number;
}) {
  const [selectedServices, setSelectedServices] = useState<ServiceCardProps[]>([]);
  
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

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};

