
import React, { Suspense, lazy } from 'react';
import { EnhancedSkeleton } from '@/components/ui/enhanced-skeleton';

// Lazy load heavy components
const AdminDashboard = lazy(() => import('@/components/admin/AdminDashboard'));
const EnhancedAuditorDashboard = lazy(() => import('@/components/dashboard/enhanced/EnhancedAuditorDashboard'));
const RealtimeAuditQueue = lazy(() => import('@/components/admin/dashboard/RealtimeAuditQueue'));
const AnalyticsCharts = lazy(() => import('@/components/analytics/AnalyticsCharts'));

interface CodeSplittingWrapperProps {
  component: 'admin' | 'auditor' | 'audit-queue' | 'analytics';
  fallbackHeight?: string;
  [key: string]: any;
}

export const CodeSplittingWrapper: React.FC<CodeSplittingWrapperProps> = ({
  component,
  fallbackHeight = 'h-96',
  ...props
}) => {
  const renderComponent = () => {
    switch (component) {
      case 'admin':
        return <AdminDashboard {...props} />;
      case 'auditor':
        return <EnhancedAuditorDashboard {...props} />;
      case 'audit-queue':
        return <RealtimeAuditQueue {...props} />;
      case 'analytics':
        return <AnalyticsCharts {...props} />;
      default:
        return <div>Component not found</div>;
    }
  };

  return (
    <Suspense 
      fallback={
        <div className={`w-full ${fallbackHeight} flex items-center justify-center`}>
          <EnhancedSkeleton variant="card" className="w-full h-full" />
        </div>
      }
    >
      {renderComponent()}
    </Suspense>
  );
};
