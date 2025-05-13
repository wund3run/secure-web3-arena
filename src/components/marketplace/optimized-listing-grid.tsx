
import { useRef, useState, useEffect, useCallback, memo } from "react";
import { MobileFriendlyCard } from "./mobile-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ServiceCardProps } from "@/data/marketplace-data";
import { Shield } from "lucide-react"; 
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface OptimizedListingGridProps {
  services: (ServiceCardProps & { 
    isSelected?: boolean; 
    onToggleCompare?: () => void;
  })[];
  isLoading?: boolean;
  layout?: "grid" | "list";
  onServiceSelect?: (serviceId: string) => void;
}

// Memoize the entire component
export const OptimizedListingGrid = memo(function OptimizedListingGrid({
  services,
  isLoading = false,
  layout = "grid",
  onServiceSelect
}: OptimizedListingGridProps) {
  const navigate = useNavigate();
  const [visibleServices, setVisibleServices] = useState<(ServiceCardProps & { 
    isSelected?: boolean;
    onToggleCompare?: () => void;
  })[]>([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = layout === "grid" ? 12 : 8;

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
  }, [page, services, itemsPerPage]);

  // Memoize service selection handler
  const handleServiceSelect = useCallback((service: ServiceCardProps) => {
    if (onServiceSelect) {
      onServiceSelect(service.id);
    } else {
      // Pass only serializable data to navigate
      navigate(`/service/${service.id}`, { 
        state: { 
          serviceDetail: {
            ...service,
            // Remove any functions or non-serializable data
            onToggleCompare: undefined,
            isSelected: undefined
          }
        }
      });
    }
  }, [onServiceSelect, navigate]);

  // Map the provider level to supported verificationLevel values
  const mapProviderLevel = useCallback((level: "rookie" | "verified" | "expert"): "verified" | "expert" | "elite" => {
    if (level === "rookie") return "verified";
    if (level === "expert") return "expert";
    return "verified"; // Default for "verified" or any other value
  }, []);

  return (
    <div>
      <div className={layout === "grid" 
        ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3" 
        : "space-y-3"}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={`skeleton-${index}`} className={layout === "list" ? "h-24" : "h-[300px]"}>
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
                      className="h-6 text-xs px-2"
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
                        className="h-3.5 w-3.5 mr-1"
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
                    className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-xs px-1.5 py-0.5"
                  >
                    Selected
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
        <div ref={loaderRef} className="py-4 flex justify-center">
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      )}

      {/* No results state */}
      {!isLoading && services.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Shield className="h-12 w-12 text-muted-foreground/30 mb-3" />
          <h3 className="text-lg font-medium mb-1">No services found</h3>
          <p className="text-muted-foreground max-w-md text-sm">
            Try adjusting your filters or search criteria to find more security services
          </p>
        </div>
      )}
    </div>
  );
});
