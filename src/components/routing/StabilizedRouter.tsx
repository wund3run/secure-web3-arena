import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { RouteErrorBoundary } from '@/components/error-handling/RouteErrorBoundary';
import LoadingState from '@/components/ui/loading-state';
import EnhancedLayout from '@/components/layout/EnhancedLayout';
import AppRoutes from '@/AppRoutes';

const RouteWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RouteErrorBoundary>
    <Suspense fallback={<LoadingState message="Loading page..." />}>
      {children}
    </Suspense>
  </RouteErrorBoundary>
);

export function StabilizedRouter() {
  const location = useLocation();
  
  // Determine if we should hide the footer for certain routes
  const hideFooter = ['/admin', '/dashboard'].some(path => 
    location.pathname.startsWith(path)
  );

  return (
    <EnhancedLayout hideFooter={hideFooter}>
      <RouteErrorBoundary>
        <Suspense fallback={<LoadingState message="Loading page..." />}>
          <AppRoutes />
        </Suspense>
      </RouteErrorBoundary>
    </EnhancedLayout>
  );
}
