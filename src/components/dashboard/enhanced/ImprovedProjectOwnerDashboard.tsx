
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { AdaptiveDashboardLayout } from '../adaptive/AdaptiveDashboardLayout';
import { SmartBreadcrumbs } from '@/components/navigation/SmartBreadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export function ImprovedProjectOwnerDashboard() {
  const { user, userProfile } = useAuth();
  
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
            Here's what's happening with your security audits
          </p>
        </div>
      </div>

      {/* Adaptive Dashboard Content */}
      <AdaptiveDashboardLayout />
    </div>
  );
}
