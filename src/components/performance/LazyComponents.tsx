
import React, { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Lazy load heavy components for better performance
export const LazyPlatformAuditSystem = React.lazy(() => 
  import('@/components/platform/platform-audit-system').then(module => ({
    default: module.PlatformAuditSystem
  }))
);

export const LazyPlatformAnalyzer = React.lazy(() => 
  import('@/components/analysis/PlatformAnalyzer').then(module => ({
    default: module.PlatformAnalyzer
  }))
);

export const LazyAdminPlatformReport = React.lazy(() => 
  import('@/components/admin/PlatformReport').then(module => ({
    default: module.default
  }))
);

interface LazyComponentWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LazyComponentWrapper({ 
  children, 
  fallback = (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <LoadingSpinner size="lg" brand />
      <p className="text-sm text-muted-foreground">Loading component...</p>
    </div>
  )
}: LazyComponentWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}
