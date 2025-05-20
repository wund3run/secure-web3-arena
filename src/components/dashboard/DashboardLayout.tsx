
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomizableDashboard } from './CustomizableDashboard';
import { DashboardWidgets } from './DashboardWidgets';
import LoadingState from '@/components/ui/loading-state';
import { AuditorDashboardConfig } from './configs/AuditorDashboardConfig';
import { ProjectOwnerDashboardConfig } from './configs/ProjectOwnerDashboardConfig';
import { UserStats } from './stats/UserStats';
import { Button } from '@/components/ui/button';
import { CalendarDays, FileText, ClipboardCheck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardLayoutProps {
  dashboardType?: string;
}

export function DashboardLayout({ dashboardType = '' }: DashboardLayoutProps) {
  const { user, loading, userProfile } = useAuth();
  const [activeTab, setActiveTab] = React.useState('overview');
  
  if (loading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  // Determine user type from dashboardType prop, userProfile, or fallback
  const userType = dashboardType === 'auditor' 
    ? 'auditor' 
    : dashboardType === 'project' 
      ? 'project_owner' 
      : userProfile?.user_type || 'project_owner';
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
          <div className="flex items-center gap-3">
            <UserStats userType={userType} />
            
            <div className="flex flex-wrap gap-2">
              {isAuditor ? (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/audits">
                      <ClipboardCheck className="mr-2 h-4 w-4" />
                      Active Audits
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/dashboard/analytics">
                      <FileText className="mr-2 h-4 w-4" />
                      Reports
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/request-audit">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Request Audit
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/calendar">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      Schedule
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="projects">{isAuditor ? 'Audits' : 'Projects'}</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            {isAuditor && <TabsTrigger value="skills">Skills & Certs</TabsTrigger>}
            {!isAuditor && <TabsTrigger value="security">Security</TabsTrigger>}
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
          {isAuditor && (
            <TabsContent value="skills">
              <DashboardWidgets userType={userType} section="skills" />
            </TabsContent>
          )}
          {!isAuditor && (
            <TabsContent value="security">
              <DashboardWidgets userType={userType} section="security" />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
