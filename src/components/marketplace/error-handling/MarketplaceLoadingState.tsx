
import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface MarketplaceLoadingStateProps {
  type?: 'grid' | 'list' | 'detail';
  count?: number;
}

// Memoize the component to prevent unnecessary re-renders
export const MarketplaceLoadingState: React.FC<MarketplaceLoadingStateProps> = memo(({ 
  type = 'grid',
  count = 4
}) => {
  // Limit the number of skeleton items for initial render performance
  const renderCount = Math.min(count, type === 'grid' ? 6 : 4);

  if (type === 'detail') {
    return (
      <div className="space-y-6">
        {/* Logo and branding header */}
        <div className="flex items-center justify-center mb-8">
          <img 
            src="/hawkly-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
            alt="Hawkly Logo"
            className="h-12 w-12 object-contain bg-transparent animate-pulse"
            style={{ backgroundColor: 'transparent' }}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <Skeleton className="h-64 w-full md:w-1/3 rounded-lg" />
          <div className="space-y-4 w-full md:w-2/3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
            <div className="pt-4">
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Skeleton className="h-24 rounded-md" />
          <Skeleton className="h-24 rounded-md" />
          <Skeleton className="h-24 rounded-md" />
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {/* Logo and branding header */}
        <div className="flex items-center justify-center mb-8">
          <img 
            src="/hawkly-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
            alt="Hawkly Logo"
            className="h-12 w-12 object-contain bg-transparent animate-pulse"
            style={{ backgroundColor: 'transparent' }}
          />
        </div>
        
        {Array.from({ length: renderCount }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
            <Skeleton 
              className="h-16 w-16 rounded-md" 
              style={{ animationDelay: `${i * 150}ms` }}
            />
            <div className="space-y-2 flex-1">
              <Skeleton 
                className="h-4 w-1/3" 
                style={{ animationDelay: `${i * 175}ms` }}
              />
              <Skeleton 
                className="h-3 w-1/2" 
                style={{ animationDelay: `${i * 200}ms` }}
              />
            </div>
            <Skeleton 
              className="h-8 w-24" 
              style={{ animationDelay: `${i * 225}ms` }}
            />
          </div>
        ))}
      </div>
    );
  }

  // Default grid loading state with staggered animations
  return (
    <div className="space-y-6">
      {/* Logo and branding header */}
      <div className="flex items-center justify-center mb-8">
        <img 
          src="/hawkly-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png" 
          alt="Hawkly Logo"
          className="h-12 w-12 object-contain bg-transparent animate-pulse"
          style={{ backgroundColor: 'transparent' }}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: renderCount }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton 
              className="h-48 w-full" 
              variant={i % 2 === 0 ? 'default' : 'card'}
              style={{ animationDelay: `${i * 100}ms` }}
            />
            <CardContent className="p-4 space-y-2">
              <Skeleton 
                className="h-5 w-3/4" 
                style={{ animationDelay: `${i * 125}ms` }}
              />
              <Skeleton 
                className="h-4 w-1/2" 
                variant="text"
                style={{ animationDelay: `${i * 150}ms` }}
              />
              <div className="flex justify-between items-center pt-4">
                <Skeleton 
                  className="h-6 w-16" 
                  style={{ animationDelay: `${i * 175}ms` }}
                />
                <Skeleton 
                  className="h-8 w-20" 
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
});
