
import { useRef, useState, useEffect } from "react";
import { MobileFriendlyCard } from "./mobile-friendly-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ServiceCardProps } from "@/data/marketplace-data";
import { toast } from "sonner";
import { Shield } from "lucide-react"; 
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface OptimizedListingGridProps {
  services: (ServiceCardProps & { 
    isSelected?: boolean; 
    onToggleCompare?: () => void;
  })[];
  isLoading?: boolean;
  layout?: "grid" | "list";
  onServiceSelect?: (service: ServiceCardProps) => void;
}

export function OptimizedListingGrid({
  services,
  isLoading = false,
  layout = "grid",
  onServiceSelect
}: OptimizedListingGridProps) {
  const [visibleServices, setVisibleServices] = useState<(ServiceCardProps & { 
    isSelected?: boolean;
    onToggleCompare?: () => void;
  })[]>([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 8;

  // Handle intersection for infinite scrolling
  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleServices.length < services.length) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isLoading, visibleServices.length, services.length]);

  // Update visible services when page or services change
  useEffect(() => {
    const endIndex = page * itemsPerPage;
    setVisibleServices(services.slice(0, endIndex));
  }, [page, services]);

  const handleServiceSelect = (service: ServiceCardProps) => {
    if (onServiceSelect) {
      onServiceSelect(service);
    } else {
      toast.info(`Selected service: ${service.title}`, {
        description: "Service details would open here"
      });
    }
  };

  // Map the provider level to supported verificationLevel values
  const mapProviderLevel = (level: "rookie" | "verified" | "expert"): "verified" | "expert" | "elite" => {
    if (level === "rookie") return "verified";
    if (level === "expert") return "expert";
    return "verified"; // Default for "verified" or any other value
  };

  return (
    <div>
      <div className={layout === "grid" 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
        : "space-y-4"}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={`skeleton-${index}`} className={layout === "list" ? "h-32" : "h-[450px]"}>
                <Skeleton className="w-full h-full rounded-lg" />
              </div>
            ))
          : visibleServices.map((service) => (
              <div key={service.id} className="relative group">
                {/* Comparison toggle button */}
                {service.onToggleCompare && (
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant={service.isSelected ? "default" : "outline"}
                      size="sm"
                      className="h-7"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        service.onToggleCompare?.();
                      }}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="h-4 w-4 mr-1"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18" />
                        <path d="M9 21V9" />
                      </svg>
                      {service.isSelected ? "Selected" : "Compare"}
                    </Button>
                  </div>
                )}
                
                {/* Selected badge */}
                {service.isSelected && (
                  <Badge 
                    className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground"
                  >
                    Selected for comparison
                  </Badge>
                )}
                
                <MobileFriendlyCard
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  provider={{
                    name: service.provider.name,
                    securityScore: service.provider.reputation,
                    verificationLevel: mapProviderLevel(service.provider.level),
                    completedProjects: service.completedJobs
                  }}
                  pricing={service.pricing}
                  category={service.category}
                  tags={service.tags}
                  imageUrl={service.imageUrl}
                  onSelect={() => handleServiceSelect(service)}
                />
              </div>
            ))}
      </div>

      {/* Loader element for infinite scrolling */}
      {!isLoading && visibleServices.length < services.length && (
        <div ref={loaderRef} className="py-8 flex justify-center">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      )}

      {/* No results state */}
      {!isLoading && services.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Shield className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <h3 className="text-xl font-medium mb-2">No services found</h3>
          <p className="text-muted-foreground max-w-md">
            Try adjusting your filters or search criteria to find more security services
          </p>
        </div>
      )}
    </div>
  );
}
