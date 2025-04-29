
import { ServiceCard } from "@/components/marketplace/service-card";
import { ServiceCardProps } from "@/data/marketplace-data";
import { Skeleton } from "@/components/ui/skeleton";

interface ServicesGridProps {
  services: ServiceCardProps[];
  isLoading?: boolean;
}

export function ServicesGrid({ services, isLoading = false }: ServicesGridProps) {
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
