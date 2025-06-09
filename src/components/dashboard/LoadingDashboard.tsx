
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const LoadingDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-6">
        {/* Logo and branding header */}
        <div className="flex items-center justify-center mb-8">
          <img 
            src="/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
            alt="Hawkly Logo"
            className="h-12 w-12 object-contain bg-transparent animate-pulse"
            style={{ backgroundColor: 'transparent' }}
          />
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <div className="space-y-3">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="flex items-center justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
