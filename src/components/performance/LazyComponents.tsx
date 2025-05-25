
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
  fallback = <LoadingSpinner size="lg" text="Loading component..." /> 
}: LazyComponentWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}
