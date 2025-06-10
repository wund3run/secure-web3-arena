
import React, { Suspense } from 'react';
import { useAuth } from '@/contexts/auth';
import ErrorBoundary from '@/components/ui/error-boundary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/enhanced-skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Plus, AlertCircle, TrendingUp, Shield, Clock, Users } from 'lucide-react';
import { EnhancedProjectsOverview } from '../widgets/enhanced/EnhancedProjectsOverview';
import { EnhancedSecurityInsights } from '../widgets/enhanced/EnhancedSecurityInsights';
import { EnhancedRecentActivity } from '../widgets/enhanced/EnhancedRecentActivity';
import { QuickActions } from '../widgets/enhanced/QuickActions';
import { MetricsOverview } from '../widgets/enhanced/MetricsOverview';
import { OnboardingWizard } from '../widgets/enhanced/OnboardingWizard';

// Loading fallback component
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
      </div>
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
          <Suspense fallback={<Skeleton className="h-48" />}>
            <OnboardingWizard />
          </Suspense>
        </ErrorBoundary>
      )}

      {/* Quick Metrics Overview */}
      <ErrorBoundary fallback={<DashboardErrorFallback error={new Error('Metrics failed')} retry={() => window.location.reload()} />}>
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        }>
          <MetricsOverview userId={user.id} />
        </Suspense>
      </ErrorBoundary>

      {/* Quick Actions */}
      <ErrorBoundary fallback={<div>Quick actions unavailable</div>}>
        <Suspense fallback={<Skeleton className="h-32" />}>
          <QuickActions />
        </Suspense>
      </ErrorBoundary>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects Overview - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <ErrorBoundary fallback={<DashboardErrorFallback error={new Error('Projects data failed')} retry={() => window.location.reload()} />}>
            <Suspense fallback={<Skeleton className="h-96" />}>
              <EnhancedProjectsOverview userId={user.id} />
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* Security Insights - Takes 1 column */}
        <div>
          <ErrorBoundary fallback={<DashboardErrorFallback error={new Error('Security data failed')} retry={() => window.location.reload()} />}>
            <Suspense fallback={<Skeleton className="h-96" />}>
              <EnhancedSecurityInsights userId={user.id} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>

      {/* Recent Activity */}
      <ErrorBoundary fallback={<DashboardErrorFallback error={new Error('Activity data failed')} retry={() => window.location.reload()} />}>
        <Suspense fallback={<Skeleton className="h-64" />}>
          <EnhancedRecentActivity userId={user.id} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
