
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { AuditProgressTracker } from '@/components/dashboard/AuditProgressTracker';
import { RealtimeChatSupport } from '@/components/chat/RealtimeChatSupport';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, MessageSquare, BarChart3, Settings } from 'lucide-react';

export default function Dashboard() {
  return (
    <StandardLayout
      title="Dashboard | Hawkly"
      description="Manage your security audits, communications, and project progress"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your audits, track progress, and communicate with security experts
          </p>
        </div>

        <Tabs defaultValue="audits" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="audits" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Audit Progress
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="audits">
            <AuditProgressTracker />
          </TabsContent>

          <TabsContent value="messages">
            <RealtimeChatSupport />
          </TabsContent>

          <TabsContent value="notifications">
            <div className="flex justify-center">
              <NotificationCenter />
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="text-center py-12">
              <Settings className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Settings Panel</h3>
              <p className="text-muted-foreground">
                Account settings and preferences will be available here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StandardLayout>
  );
}
