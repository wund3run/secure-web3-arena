import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useComparison } from "./ComparisonContext";
import { ServiceCardProps } from "@/components/marketplace/card/ServiceCardProps";

interface RemoveButtonProps {
  serviceId: string;
}

export function RemoveButton({ serviceId }: RemoveButtonProps) {
  const { toggleServiceSelection } = useComparison();
  
  const handleRemove = () => {
    const services = window.SERVICES as ServiceCardProps[] | undefined;
    const service = services?.find((s: ServiceCardProps) => s.id === serviceId);
    if (service) {
      toggleServiceSelection(service);
    } else {
      // Fallback: create minimal service object for removal
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
      variant="ghost"
      size="sm"
      className="h-6 w-6 p-0"
      onClick={handleRemove}
    >
      <X className="h-3 w-3" />
    </Button>
  );
}
