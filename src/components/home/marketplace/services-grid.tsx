
import React from "react";
import { ServiceCard } from "@/components/marketplace/card";
import { ServiceCardProps } from "@/types/marketplace-unified";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

interface ServicesGridProps {
  services: ServiceCardProps[];
  isLoading?: boolean;
  enableComparison?: boolean;
}

export function ServicesGrid({ 
  services, 
  isLoading = false, 
  enableComparison = false 
}: ServicesGridProps) {
  const navigate = useNavigate();
  
  const handleServiceClick = (serviceId: string) => {
    // Find the service by id
    const service = services.find(s => s.id === serviceId);
    
    if (service) {
      navigate(`/service/${service.id}`, { 
        state: { 
          serviceDetail: service
        }
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton 
            key={`skeleton-${index}`}
            className="h-[450px] rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5"
          />
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {services.map((service) => (
        <ServiceCard 
          key={service.id} 
          {...service} 
          onClick={() => handleServiceClick(service.id)}
        />
      ))}
      
      {/* Add empty placeholder cards if less than 4 services */}
      {services.length < 4 && Array.from({ length: 4 - services.length }).map((_, index) => (
        <div 
          key={`placeholder-${index}`} 
          className="h-full border border-dashed border-border/50 rounded-lg flex items-center justify-center p-8 bg-gradient-to-br from-muted/30 to-card"
        >
          <p className="text-muted-foreground text-center text-sm">More services available in the marketplace</p>
        </div>
      ))}
    </div>
  );
}
