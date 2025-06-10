
import React from 'react';
import { ServiceCard } from './card/ServiceCard';
import { useMarketplaceServices } from '@/hooks/useMarketplaceServices';
import { EnhancedSkeleton } from '@/components/ui/enhanced-skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ServiceGridProps {
  filters?: Record<string, any>;
  searchQuery?: string;
  category?: string;
}

export function ServiceGrid({ filters, searchQuery, category }: ServiceGridProps) {
  const { services, loading, error } = useMarketplaceServices();

  // Filter services based on criteria
  const filteredServices = React.useMemo(() => {
    if (!services) return [];
    
    let filtered = [...services];
    
    // Apply category filter
    if (category && category !== 'all') {
      filtered = filtered.filter(service => 
        service.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply additional filters
    if (filters) {
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        filtered = filtered.filter(service => {
          const price = service.min_price || 0;
          return price >= min && price <= max;
        });
      }
      
      if (filters.blockchains?.length > 0) {
        filtered = filtered.filter(service =>
          service.blockchain_ecosystems?.some(blockchain =>
            filters.blockchains.includes(blockchain)
          )
        );
      }
      
      if (filters.featured) {
        filtered = filtered.filter(service => service.featured);
      }
    }
    
    return filtered;
  }, [services, category, searchQuery, filters]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <EnhancedSkeleton key={i} variant="card" className="h-80" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load services. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (filteredServices.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-muted-foreground">No services found</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredServices.map((service) => (
        <ServiceCard
          key={service.id}
          id={service.id}
          title={service.title}
          description={service.description}
          provider={{
            name: service.provider_id, // This should be populated from profiles join
            reputation: service.average_rating || 0,
            level: service.verification_status === 'approved' ? 'verified' : 'rookie',
            isVerified: service.verification_status === 'approved'
          }}
          pricing={{
            amount: service.min_price || 0,
            currency: 'USD'
          }}
          rating={service.average_rating || 0}
          completedJobs={service.review_count || 0}
          category={service.category}
          tags={service.tags || []}
        />
      ))}
    </div>
  );
}
