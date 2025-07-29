
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { ProjectOwnerDashboard } from './enhanced/ProjectOwnerDashboard';
import { EnhancedAuditorDashboard } from './enhanced/EnhancedAuditorDashboard';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { LoadingDashboard } from './LoadingDashboard';
import { UnauthenticatedDashboard } from './UnauthenticatedDashboard';
import { NotificationDashboardWidget } from './NotificationDashboardWidget';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, BarChart3, Settings, Bell, MessageSquare, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardSwitcherProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userType: string;
}

function DashboardSwitcher({ currentView, onViewChange, userType }: DashboardSwitcherProps) {
  const views = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'projects', label: userType === 'auditor' ? 'Audits' : 'Projects', icon: Shield },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'escrow', label: 'Payments', icon: DollarSign },
    { id: 'notifications', label: 'Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex items-center gap-2 mb-6 p-1 bg-muted rounded-lg flex-wrap">
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

function QuickAccessPanel() {
  const quickActions = [
    { title: 'Start New Audit', href: '/request-audit', icon: Shield, color: 'bg-blue-100 text-blue-600' },
    { title: 'Escrow Payments', href: '/escrow', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { title: 'Live Collaboration', href: '/collaboration', icon: Users, color: 'bg-purple-100 text-purple-600' },
    { title: 'Analytics Hub', href: '/analytics', icon: BarChart3, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Button key={action.title} asChild variant="outline" className="h-16 flex-col gap-2">
              <Link to={action.href}>
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <action.icon className="h-4 w-4" />
                </div>
                <span className="text-xs">{action.title}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
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
            Welcome back! Here's what's happening with your {userType === 'auditor' ? 'audits' : 'projects'}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{userType}</Badge>
          <Button asChild>
            <Link to="/features">Explore Features</Link>
          </Button>
        </div>
      </div>
      <DashboardSwitcher 
        currentView={currentView}
        onViewChange={setCurrentView}
        userType={userType}
      />
    </div>
  );

  // Render overview content
  const renderOverviewContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {userType === 'auditor' ? (
          <EnhancedAuditorDashboard />
        ) : userType === 'admin' ? (
          <AdminDashboard />
        ) : (
          <ProjectOwnerDashboard />
        )}
      </div>
      <div className="space-y-6">
        <NotificationDashboardWidget />
        <QuickAccessPanel />
      </div>
    </div>
  );

  // Render content based on current view
  const renderViewContent = () => {
    switch (currentView) {
      case 'overview':
        return renderOverviewContent();
      case 'messages':
        return (
          <Card>
            <CardContent className="text-center py-8">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Messages</h3>
              <p className="text-muted-foreground mb-4">
                Communicate with auditors and clients in real-time
              </p>
              <Button asChild>
                <Link to="/messages">Open Messages</Link>
              </Button>
            </CardContent>
          </Card>
        );
      case 'escrow':
        return (
          <Card>
            <CardContent className="text-center py-8">
              <DollarSign className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Escrow & Payments</h3>
              <p className="text-muted-foreground mb-4">
                Manage secure milestone-based payments
              </p>
              <Button asChild>
                <Link to="/escrow">Manage Payments</Link>
              </Button>
            </CardContent>
          </Card>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <NotificationDashboardWidget />
            <Card>
              <CardContent className="text-center py-8">
                <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Advanced Notifications</h3>
                <p className="text-muted-foreground mb-4">
                  Configure smart alerts and real-time updates
                </p>
                <Button asChild variant="outline">
                  <Link to="/collaboration">Configure Notifications</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return renderOverviewContent();
    }
  };

  return (
    <div className="space-y-6">
      {renderDashboardHeader()}
      {renderViewContent()}
    </div>
  );
};
