
import React from 'react';
import { EnhancedCard, EnhancedCardContent } from '@/components/ui/enhanced-card';
import { EnhancedSkeleton } from '@/components/ui/enhanced-skeleton';
import LoadingTrivia from '@/components/ui/loading-trivia';

export const LoadingDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        {/* Header section */}
        <div className="space-y-4">
          <EnhancedSkeleton className="h-8 w-64" variant="text" />
          <EnhancedSkeleton className="h-4 w-96" variant="text" />
        </div>
        
        {/* Quick stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <EnhancedCard key={i} variant="outlined">
              <EnhancedCardContent className="p-6">
                <EnhancedSkeleton className="h-4 w-24 mb-3" variant="text" />
                <EnhancedSkeleton className="h-8 w-16 mb-2" variant="text" />
                <EnhancedSkeleton className="h-3 w-32" variant="text" />
              </EnhancedCardContent>
            </EnhancedCard>
          ))}
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Large widget - Projects Overview */}
          <div className="lg:col-span-2">
            <EnhancedCard variant="elevated">
              <EnhancedCardContent className="p-6">
                <EnhancedSkeleton className="h-6 w-48 mb-4" variant="text" />
                <div className="space-y-3">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="flex items-center justify-between p-3 rounded border">
                      <div className="flex-1">
                        <EnhancedSkeleton className="h-4 w-32 mb-1" variant="text" />
                        <EnhancedSkeleton className="h-3 w-24" variant="text" />
                      </div>
                      <EnhancedSkeleton className="h-6 w-16" variant="button" />
                    </div>
                  ))}
                </div>
              </EnhancedCardContent>
            </EnhancedCard>
          </div>
          
          {/* Side widgets */}
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <EnhancedCard key={i} variant="security">
                <EnhancedCardContent className="p-6">
                  <EnhancedSkeleton className="h-5 w-36 mb-4" variant="text" />
                  <div className="space-y-2">
                    <EnhancedSkeleton className="h-3 w-full" variant="text" />
                    <EnhancedSkeleton className="h-3 w-4/5" variant="text" />
                    <EnhancedSkeleton className="h-3 w-3/5" variant="text" />
                  </div>
                </EnhancedCardContent>
              </EnhancedCard>
            ))}
          </div>
        </div>
        
        {/* Loading trivia at the bottom */}
        <div className="flex justify-center pt-8">
          <LoadingTrivia 
            message="Loading your security dashboard..." 
            size="md" 
            showTrivia={true}
          />
        </div>
      </div>
    </div>
  );
};
