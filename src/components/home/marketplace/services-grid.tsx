
import { ServiceCard } from "@/components/marketplace/service-card";
import { ServiceCardProps } from "@/data/marketplace-data";

interface ServicesGridProps {
  services: ServiceCardProps[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {services.map((service) => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </div>
  );
}
