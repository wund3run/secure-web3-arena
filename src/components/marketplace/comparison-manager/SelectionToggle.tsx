import React from "react";
import { Button } from "@/components/ui/button";
import { useComparison } from "./ComparisonContext";
import { ServiceCardProps } from "@/components/marketplace/card/ServiceCardProps";

interface SelectionToggleProps {
  serviceId: string;
}

export function SelectionToggle({ serviceId }: SelectionToggleProps) {
  const { isSelected, toggleServiceSelection } = useComparison();
  const selected = isSelected(serviceId);
  
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const services = window.SERVICES as ServiceCardProps[] | undefined;
    const service = services?.find((s: ServiceCardProps) => s.id === serviceId);
    if (service) {
      toggleServiceSelection(service);
    } else {
      // Fallback: create minimal service object for comparison
      const fallbackService: ServiceCardProps = {
        id: serviceId,
        title: "Unknown Service",
        description: "",
        provider: { name: "Unknown", reputation: 0, level: "rookie", isVerified: false },
        pricing: { amount: 0, currency: "USD" },
        rating: 0,
        completedJobs: 0,
        category: "",
        tags: []
      };
      toggleServiceSelection(fallbackService);
    }
  };
  
  return (
    <Button
      variant={selected ? "default" : "outline"}
      size="sm"
      className={`h-7 rounded-md ${selected ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}`}
      onClick={handleToggle}
    >
      {selected ? "Selected" : "Compare"}
    </Button>
  );
}
