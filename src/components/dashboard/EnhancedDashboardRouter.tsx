
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { ProjectOwnerDashboard } from './enhanced/ProjectOwnerDashboard';
import { EnhancedAuditorDashboard } from './enhanced/EnhancedAuditorDashboard';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { LoadingDashboard } from './LoadingDashboard';
import { UnauthenticatedDashboard } from './UnauthenticatedDashboard';
import { AuditProgressTracker } from './enhanced/AuditProgressTracker';
import { RealtimeChatSystem } from '@/components/chat/RealtimeChatSystem';
import { EnhancedNotificationCenter } from '@/components/notifications/EnhancedNotificationCenter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, MessageSquare, Bell, Shield, Users, Settings } from 'lucide-react';

export const EnhancedDashboardRouter = () => {
  const { user, getUserType, loading } = useAuth();

  if (loading) {
    return <LoadingDashboard />;
  }

  if (!user) {
    return <UnauthenticatedDashboard />;
  }

  const userType = getUserType();

  const renderDashboardContent = () => {
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
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Enhanced Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your comprehensive security management center.
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          {userType === 'auditor' && <Shield className="h-4 w-4" />}
          {userType === 'project_owner' && <Users className="h-4 w-4" />}
          {userType === 'admin' && <Settings className="h-4 w-4" />}
          {userType}
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Audit Progress
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Real-time Chat
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {renderDashboardContent()}
        </TabsContent>

        <TabsContent value="progress" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Audit Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <AuditProgressTracker />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Communication</CardTitle>
            </CardHeader>
            <CardContent>
              <RealtimeChatSystem />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Center</CardTitle>
            </CardHeader>
            <CardContent>
              <EnhancedNotificationCenter />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
