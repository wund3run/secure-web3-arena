
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { DashboardAuditor } from './DashboardAuditor';
import { DashboardProject } from './DashboardProject';
import { SkipToContent } from '@/components/layout/SkipToContent';

interface DashboardLayoutProps {
  dashboardType: string;
}

export function DashboardLayout({ dashboardType }: DashboardLayoutProps) {
  const { user, userProfile } = useAuth();
  const userType = userProfile?.user_type || user?.user_metadata?.user_type;
  
  return (
    <div className="container mx-auto px-4 py-6">
      <SkipToContent targetId="dashboard-content" />
      <div id="dashboard-content" tabIndex={-1}>
        {dashboardType === 'auditor' || userType === 'auditor' ? (
          <DashboardAuditor />
        ) : (
          <DashboardProject />
        )}
      </div>
    </div>
  );
}
