
import React, { useRef } from "react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { ServiceCardProps } from "@/types/marketplace-unified";
import { ComparisonTable } from "./ComparisonTable";
import { MobileComparisonTable } from "./MobileComparisonTable";
import { convertToMarketplaceService } from "../comparison-manager/utils/ServiceConverter";
import { MarketplaceErrorBoundary } from "@/utils/error-handling";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/contexts/AccessibilityContext";

interface ComparisonResponsiveProps {
  services: ServiceCardProps[];
  onRemoveService: (serviceId: string) => void;
}

export function ComparisonResponsive({ services, onRemoveService }: ComparisonResponsiveProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { screenReaderFriendly } = useAccessibility();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Convert ServiceCardProps to MarketplaceService for the internal components
  const marketplaceServices = services.map(convertToMarketplaceService);
  
  // Function to focus the comparison heading for better accessibility
  const focusComparison = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
      const heading = containerRef.current.querySelector('h2');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus();
      }
    }
  };
  
  // When services change, announce to screen readers
  React.useEffect(() => {
    // Only announce if there are services to compare
    if (services.length > 0 && screenReaderFriendly) {
      const announcement = `Comparing ${services.length} services: ${services.map(s => s.title).join(', ')}`;
      const ariaLive = document.getElementById('comparison-announcement');
      if (ariaLive) {
        ariaLive.textContent = announcement;
      }
    }
  }, [services, screenReaderFriendly]);
  
  return (
    <div className="space-y-6 mt-4" ref={containerRef}>
      {/* Hidden announcement for screen readers */}
      <div 
        id="comparison-announcement" 
        className="sr-only" 
        aria-live="polite"
        role="status"
      ></div>
      
      {/* For screen readers, provide additional context */}
      {screenReaderFriendly && (
        <div className="sr-only" aria-live="polite">
          {services.length > 0 ? (
            <p>Comparing {services.length} services: {services.map(s => s.title).join(', ')}</p>
          ) : (
            <p>No services selected for comparison</p>
          )}
        </div>
      )}
      
      <h2 
        tabIndex={-1} 
        className="text-2xl font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
      >
        Service Comparison
        <span className="text-sm font-normal ml-2 text-muted-foreground">
          ({services.length} {services.length === 1 ? 'service' : 'services'})
        </span>
      </h2>
      
      <MarketplaceErrorBoundary>
        {services.length > 0 ? (
          isMobile ? (
            <MobileComparisonTable services={marketplaceServices} onRemoveService={onRemoveService} />
          ) : (
            <ComparisonTable services={marketplaceServices} onRemoveService={onRemoveService} />
          )
        ) : (
          <div 
            className="text-center py-12 border border-border/30 rounded-lg bg-muted/30"
            role="alert"
            aria-live="polite"
          >
            <p className="text-muted-foreground">No services selected for comparison</p>
            <Button variant="outline" className="mt-4" onClick={() => window.history.back()}>
              Return to Services
            </Button>
          </div>
        )}
      </MarketplaceErrorBoundary>
      
      {/* Skip back link for keyboard navigation */}
      <div className="text-center mt-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          className="mx-auto text-sm text-muted-foreground"
        >
          Back to top
        </Button>
      </div>
    </div>
  );
}
