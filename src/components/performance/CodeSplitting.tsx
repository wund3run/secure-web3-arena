
import React, { Suspense, lazy } from 'react';
import { EnhancedSkeleton } from '@/components/ui/enhanced-skeleton';

// Lazy load heavy components with proper default export handling
const AdminDashboard = lazy(() => 
  import('@/components/admin/AdminDashboard').then(module => ({ 
    default: module.AdminDashboard 
  }))
);

const RealtimeAuditQueue = lazy(() => 
  import('@/components/admin/dashboard/RealtimeAuditQueue').then(module => ({ 
    default: module.RealtimeAuditQueue 
  }))
);

// Create a simple analytics placeholder component
const AnalyticsCharts = lazy(() => Promise.resolve({
  default: () => (
    <div className="p-6 bg-card rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">Analytics Dashboard</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Active Audits</p>
          <p className="text-2xl font-bold">56</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Revenue</p>
          <p className="text-2xl font-bold">$12,345</p>
        </div>
      </div>
    </div>
  )
}));

interface CodeSplittingWrapperProps {
  component: 'admin' | 'audit-queue' | 'analytics';
  fallbackHeight?: string;
  [key: string]: unknown;
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
