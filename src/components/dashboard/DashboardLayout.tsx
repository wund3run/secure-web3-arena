
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleBasedDashboardContent } from './role-based-dashboard-content';
import { DashboardWidgets } from './DashboardWidgets';
import LoadingState from '@/components/ui/loading-state';
import { UserStats } from './stats/UserStats';
import { Button } from '@/components/ui/button';
import { CalendarDays, FileText, ClipboardCheck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ActionGuard } from '@/components/auth/ActionGuard';

interface DashboardLayoutProps {
  dashboardType?: string;
}

type DashboardTab = "overview" | "analytics" | "projects" | "reports" | "skills" | "security" | "management";

export function DashboardLayout({ dashboardType = '' }: DashboardLayoutProps) {
  const { user, loading, userProfile, getUserType } = useAuth();
  const [activeTab, setActiveTab] = React.useState<DashboardTab>('overview');
  
  if (loading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  const userType = getUserType();
  const isAuditor = userType === 'auditor';
  const isAdmin = userType === 'admin';
  
  return (
    <div className="container py-8 max-w-7xl">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isAdmin ? 'Admin Panel' : isAuditor ? 'Auditor Dashboard' : 'Project Owner Dashboard'}
            </h1>
            <p className="text-muted-foreground">
              {isAdmin ? 'Manage platform operations and user activities.' :
               isAuditor ? 'Monitor your audit performance, active projects and reputation.' : 
               'Manage your projects, track audit progress and security metrics.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <UserStats userType={userType} />
            
            <div className="flex flex-wrap gap-2">
              <ActionGuard action="submit_audit_service">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/audits">
                    <ClipboardCheck className="mr-2 h-4 w-4" />
                    Active Audits
                  </Link>
                </Button>
              </ActionGuard>
              
              <ActionGuard action="create_audit_request">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/request-audit">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Request Audit
                  </Link>
                </Button>
              </ActionGuard>

              <ActionGuard action="access_admin_panel">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin">
                    <FileText className="mr-2 h-4 w-4" />
                    Admin Panel
                  </Link>
                </Button>
              </ActionGuard>
              
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard/analytics">
                  <FileText className="mr-2 h-4 w-4" />
                  Reports
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as DashboardTab)}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="projects">{isAuditor ? 'Audits' : 'Projects'}</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            {isAuditor && <TabsTrigger value="skills">Skills & Certs</TabsTrigger>}
            {!isAuditor && !isAdmin && <TabsTrigger value="security">Security</TabsTrigger>}
            {isAdmin && <TabsTrigger value="management">Management</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="overview">
            <RoleBasedDashboardContent />
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
          
          {!isAuditor && !isAdmin && (
            <TabsContent value="security">
              <DashboardWidgets userType={userType} section="security" />
            </TabsContent>
          )}
          
          {isAdmin && (
            <TabsContent value="management">
              <DashboardWidgets userType={userType} section="management" />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
