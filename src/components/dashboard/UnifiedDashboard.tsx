
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { ProjectOwnerDashboard } from './enhanced/ProjectOwnerDashboard';
import { EnhancedAuditorDashboard } from './enhanced/EnhancedAuditorDashboard';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { LoadingDashboard } from './LoadingDashboard';
import { UnauthenticatedDashboard } from './UnauthenticatedDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, BarChart3, Settings, Bell } from 'lucide-react';

interface DashboardSwitcherProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userType: string;
}

function DashboardSwitcher({ currentView, onViewChange, userType }: DashboardSwitcherProps) {
  const views = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'projects', label: userType === 'auditor' ? 'Audits' : 'Projects', icon: Shield },
    { id: 'messages', label: 'Messages', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex items-center gap-2 mb-6 p-1 bg-muted rounded-lg">
      {views.map((view) => (
        <Button
          key={view.id}
          variant={currentView === view.id ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewChange(view.id)}
          className="flex items-center gap-2"
        >
          <view.icon className="h-4 w-4" />
          {view.label}
        </Button>
      ))}
    </div>
  );
}

export const UnifiedDashboard = () => {
  const { user, getUserType, loading } = useAuth();
  const [currentView, setCurrentView] = React.useState('overview');

  if (loading) {
    return <LoadingDashboard />;
  }

  if (!user) {
    return <UnauthenticatedDashboard />;
  }

  const userType = getUserType();

  // Render unified dashboard header
  const renderDashboardHeader = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.email}
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          {userType === 'project_owner' ? 'Project Owner' : 
           userType === 'auditor' ? 'Security Auditor' :
           userType === 'admin' ? 'Administrator' : 'User'}
        </Badge>
      </div>
      
      <DashboardSwitcher 
        currentView={currentView}
        onViewChange={setCurrentView}
        userType={userType}
      />
    </div>
  );

  // Quick stats component
  const renderQuickStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {userType === 'auditor' ? 'Active Audits' : 'Active Projects'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">+2 from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {userType === 'auditor' ? 'Total Earnings' : 'Total Spent'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Average Rating
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">4.8</div>
          <p className="text-xs text-muted-foreground">From 156 reviews</p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto py-8">
      {renderDashboardHeader()}
      
      {currentView === 'overview' && renderQuickStats()}
      
      {/* Render appropriate dashboard based on user type */}
      <div className="dashboard-content">
        {(() => {
          switch (userType) {
            case 'project_owner':
              return <ProjectOwnerDashboard />;
            case 'auditor':
              return <EnhancedAuditorDashboard />;
            case 'admin':
              return <AdminDashboard />;
            default:
              return <ProjectOwnerDashboard />;
          }
        })()}
      </div>
    </div>
  );
};
