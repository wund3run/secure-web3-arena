
import React from "react";
import { Button } from "@/components/ui/button";
import { useComparison } from "./ComparisonContext";

interface SelectionToggleProps {
  serviceId: string;
}

export function SelectionToggle({ serviceId }: SelectionToggleProps) {
  const { isSelected, toggleServiceSelection } = useComparison();
  const selected = isSelected(serviceId);
  
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const service = window.SERVICES?.find(s => s.id === serviceId);
    if (service) toggleServiceSelection(service);
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
