
import { ServiceCard } from "@/components/marketplace/service-card";
import { ServiceCardProps } from "@/data/marketplace-data";

interface ServicesGridProps {
  services: ServiceCardProps[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
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
          className="h-full border border-dashed border-border rounded-lg flex items-center justify-center p-8 bg-muted/30"
        >
          <p className="text-muted-foreground text-center">More services available in the marketplace</p>
        </div>
      ))}
    </div>
  );
}
