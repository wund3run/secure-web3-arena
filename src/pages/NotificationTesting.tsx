
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { NotificationTestingDashboard } from '@/components/notifications/NotificationTestingDashboard';
import { NotificationTester } from '@/components/notifications/NotificationTester';
import { RealtimeNotifications } from '@/components/realtime/RealtimeNotifications';
import { useAuth } from '@/contexts/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock } from 'lucide-react';

export default function NotificationTesting() {
  const { user } = useAuth();

  return (
    <StandardLayout 
      title="Notification Testing - Hawkly"
      description="Test and monitor the notification system functionality"
    >
      <Helmet>
        <title>Notification Testing - Hawkly</title>
        <meta name="description" content="Test and monitor the notification system" />
      </Helmet>

      <div className="container py-8 max-w-6xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notification Testing</h1>
            <p className="text-muted-foreground">
              Test and monitor the notification system functionality
            </p>
          </div>

          {!user ? (
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                You must be signed in to test the notification system.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <NotificationTestingDashboard />
              </div>
              <div className="space-y-6">
                <NotificationTester />
                <RealtimeNotifications />
              </div>
            </div>
          )}
        </div>
      </div>
    </StandardLayout>
  );
}
