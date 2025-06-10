
import React, { Suspense } from 'react';
import { useAuth } from '@/contexts/auth';
import ErrorBoundary from '@/components/ui/error-boundary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedSkeleton } from '@/components/ui/enhanced-skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Plus, AlertCircle, TrendingUp, Shield, Clock, Users } from 'lucide-react';
import { EnhancedProjectsOverview } from '../widgets/enhanced/EnhancedProjectsOverview';
import { EnhancedSecurityInsights } from '../widgets/enhanced/EnhancedSecurityInsights';
import { EnhancedRecentActivity } from '../widgets/enhanced/EnhancedRecentActivity';
import { QuickActions } from '../widgets/enhanced/QuickActions';
import { MetricsOverview } from '../widgets/enhanced/MetricsOverview';
import { OnboardingWizard } from '../widgets/enhanced/OnboardingWizard';
import { ResponsiveGrid } from '@/components/ui/responsive-grid';
import { EnhancedProgressBar } from '@/components/ui/enhanced-progress-bar';
import { CodeSplittingWrapper } from '@/components/performance/CodeSplitting';

// Enhanced loading fallback component
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <ResponsiveGrid cols={{ default: 1, md: 2, lg: 4 }}>
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <EnhancedSkeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <EnhancedSkeleton className="h-8 w-16 mb-2" />
              <EnhancedSkeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </ResponsiveGrid>
      <ResponsiveGrid cols={{ default: 1, lg: 2 }}>
        <EnhancedSkeleton className="h-96" />
        <EnhancedSkeleton className="h-96" />
      </ResponsiveGrid>
    </div>
  );
}

// Error fallback for dashboard sections
function DashboardErrorFallback({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>Failed to load dashboard data: {error.message}</span>
        <Button variant="outline" size="sm" onClick={retry}>
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  );
}

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
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-gradient">
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
