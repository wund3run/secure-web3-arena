
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomizableDashboard } from './CustomizableDashboard';
import { DashboardWidgets } from './DashboardWidgets';
import LoadingState from '@/components/ui/loading-state';
import { AuditorDashboardConfig } from './configs/AuditorDashboardConfig';
import { ProjectOwnerDashboardConfig } from './configs/ProjectOwnerDashboardConfig';
import { UserStats } from './stats/UserStats';

export function DashboardLayout() {
  const { user, loading, userProfile } = useAuth();
  const [activeTab, setActiveTab] = React.useState('overview');
  
  if (loading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  // Determine user type from profile
  const userType = userProfile?.user_type || 'project_owner';
  const isAuditor = userType === 'auditor';
  
  return (
    <div className="container py-8 max-w-7xl">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{isAuditor ? 'Auditor' : 'Project Owner'} Dashboard</h1>
            <p className="text-muted-foreground">
              {isAuditor 
                ? 'Monitor your audit performance, active projects and reputation.' 
                : 'Manage your projects, track audit progress and security metrics.'}
            </p>
          </div>
          <UserStats userType={userType} />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <CustomizableDashboard
              title="Dashboard Overview"
              description="Key metrics and information for your activities"
              widgets={isAuditor ? AuditorDashboardConfig : ProjectOwnerDashboardConfig}
              className="mt-6"
            />
          </TabsContent>
          <TabsContent value="analytics">
            <DashboardWidgets userType={userType} section="analytics" />
          </TabsContent>
          <TabsContent value="projects">
            <DashboardWidgets userType={userType} section="projects" />
          </TabsContent>
          <TabsContent value="reports">
            <DashboardWidgets userType={userType} section="reports" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
