
import React, { Suspense } from 'react';
import { useAuth } from '@/contexts/auth';
import { AdaptiveDashboardLayout } from '../adaptive/AdaptiveDashboardLayout';
import { SmartBreadcrumbs } from '@/components/navigation/SmartBreadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, TrendingUp, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { DashboardErrorFallback } from '@/components/dashboard/error/DashboardErrorFallback';
import { EnhancedSkeleton } from '@/components/ui/EnhancedSkeleton';
import { ResponsiveGrid } from '@/components/layout/ResponsiveGrid';
import { OnboardingWizard } from '@/components/dashboard/widgets/enhanced/OnboardingWizard';
import { QuickActions } from '@/components/dashboard/widgets/enhanced/QuickActions';
import { EnhancedProgressBar } from '@/components/ui/EnhancedProgressBar';
import { MetricsOverview } from '@/components/dashboard/widgets/MetricsOverview';
import { EnhancedProjectsOverview } from '@/components/dashboard/widgets/EnhancedProjectsOverview';
import { EnhancedRecentActivity } from '@/components/dashboard/widgets/EnhancedRecentActivity';
import { CodeSplittingWrapper } from '@/components/utils/CodeSplittingWrapper';

export function ImprovedProjectOwnerDashboard() {
  const { user, userProfile } = useAuth();
  
  // Check if user needs onboarding
  const needsOnboarding = !userProfile?.projects_completed || userProfile.projects_completed === 0;

  if (!user) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please log in to access your dashboard.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Breadcrumb Navigation */}
      <SmartBreadcrumbs />
      
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {userProfile?.full_name || user.email}
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your security audits and track project progress
          </p>
          
          {/* Overall Progress Indicator */}
          <div className="mt-4 max-w-md">
            <EnhancedProgressBar
              value={userProfile?.projects_completed || 0}
              max={10}
              label="Platform Journey"
              variant="success"
              milestones={[
                { value: 1, label: 'First Audit', completed: (userProfile?.projects_completed || 0) >= 1 },
                { value: 5, label: 'Regular User', completed: (userProfile?.projects_completed || 0) >= 5 },
                { value: 10, label: 'Power User', completed: (userProfile?.projects_completed || 0) >= 10 }
              ]}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button size="sm" variant="outline" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Audit Request
          </Button>
        </div>
      </div>

      {/* Onboarding for new users */}
      {needsOnboarding && (
        <ErrorBoundary fallback={<div>Failed to load onboarding</div>}>
          <Suspense fallback={<EnhancedSkeleton className="h-48" />}>
            <OnboardingWizard />
          </Suspense>
        </ErrorBoundary>
      )}

      {/* Quick Metrics Overview */}
      <ErrorBoundary fallback={<DashboardErrorFallback error={new Error('Metrics failed')} retry={() => window.location.reload()} />}>
        <Suspense fallback={
          <ResponsiveGrid cols={{ default: 1, md: 2, lg: 4 }}>
            {[...Array(4)].map((_, i) => (
              <EnhancedSkeleton key={i} className="h-24" />
            ))}
          </ResponsiveGrid>
        }>
          <MetricsOverview userId={user.id} />
        </Suspense>
      </ErrorBoundary>

      {/* Quick Actions */}
      <ErrorBoundary fallback={<div>Quick actions unavailable</div>}>
        <Suspense fallback={<EnhancedSkeleton className="h-32" />}>
          <QuickActions />
        </Suspense>
      </ErrorBoundary>

      {/* Main Dashboard Grid */}
      <ResponsiveGrid cols={{ default: 1, lg: 3 }}>
        {/* Projects Overview - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <ErrorBoundary fallback={<DashboardErrorFallback error={new Error('Projects data failed')} retry={() => window.location.reload()} />}>
            <Suspense fallback={<EnhancedSkeleton className="h-96" />}>
              <EnhancedProjectsOverview userId={user.id} />
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* Security Insights - Takes 1 column */}
        <div>
          <ErrorBoundary fallback={<DashboardErrorFallback error={new Error('Security data failed')} retry={() => window.location.reload()} />}>
            <Suspense fallback={<EnhancedSkeleton className="h-96" />}>
              <CodeSplittingWrapper component="analytics" userId={user.id} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </ResponsiveGrid>

      {/* Recent Activity */}
      <ErrorBoundary fallback={<DashboardErrorFallback error={new Error('Activity data failed')} retry={() => window.location.reload()} />}>
        <Suspense fallback={<EnhancedSkeleton className="h-64" />}>
          <EnhancedRecentActivity userId={user.id} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
