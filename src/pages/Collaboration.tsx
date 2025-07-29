
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RealTimeCollaborationHub } from '@/components/collaboration/RealTimeCollaborationHub';
import { EnhancedMessagingCenter } from '@/components/communication/EnhancedMessagingCenter';
import { AdvancedNotificationSystem } from '@/components/notifications/AdvancedNotificationSystem';

export default function Collaboration() {
  return (
    <StandardLayout 
      title="Collaboration - Hawkly"
      description="Real-time collaboration and communication hub"
    >
      <Helmet>
        <title>Collaboration - Hawkly</title>
        <meta name="description" content="Advanced real-time collaboration, messaging, and notification systems for audit teams" />
      </Helmet>

      <div className="container py-8 max-w-7xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Collaboration Center</h1>
            <p className="text-muted-foreground text-lg">
              Real-time collaboration, secure messaging, and intelligent notifications
            </p>
          </div>

          <Tabs defaultValue="hub" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="hub">Collaboration Hub</TabsTrigger>
              <TabsTrigger value="messaging">Messaging Center</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="hub">
              <RealTimeCollaborationHub />
            </TabsContent>

            <TabsContent value="messaging">
              <EnhancedMessagingCenter />
            </TabsContent>

            <TabsContent value="notifications">
              <AdvancedNotificationSystem />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </StandardLayout>
  );
}
