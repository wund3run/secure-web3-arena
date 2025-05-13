
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useComparison } from "./ComparisonContext";

interface RemoveButtonProps {
  serviceId: string;
}

export function RemoveButton({ serviceId }: RemoveButtonProps) {
  const { toggleServiceSelection } = useComparison();
  
  const handleRemove = () => {
    const service = window.SERVICES?.find(s => s.id === serviceId);
    if (service) toggleServiceSelection(service);
  };
  
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-6 w-6 p-0"
      onClick={handleRemove}
    >
      <X className="h-3 w-3" />
    </Button>
  );
}
