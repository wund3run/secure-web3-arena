
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNotifications } from '@/contexts/NotificationContext';
import { useBrowserNotifications } from '@/hooks/useBrowserNotifications';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { useAuth } from '@/contexts/auth';
import { TestTube, Bell, Zap, AlertTriangle, CheckCircle, X } from 'lucide-react';

export const NotificationTester = () => {
  const { addNotification } = useNotifications();
  const { sendBrowserNotification, canSendNotifications, requestPermission } = useBrowserNotifications();
  const { sendNotification: sendRealtimeNotification } = useRealtimeSync({ channel: 'testing' });
  const { user } = useAuth();

  const testNotifications = {
    audit_update: {
      title: 'Audit Status Updated',
      message: 'Your audit has moved to the review phase',
      type: 'info' as const,
      category: 'audit' as const,
    },
    new_message: {
      title: 'New Message',
      message: 'You have received a new message from your auditor',
      type: 'info' as const,
      category: 'message' as const,
    },
    payment_success: {
      title: 'Payment Processed',
      message: 'Your payment of $2,500 has been successfully processed',
      type: 'success' as const,
      category: 'payment' as const,
    },
    security_alert: {
      title: 'Critical Finding',
      message: 'A high-severity vulnerability has been identified',
      type: 'error' as const,
      category: 'audit' as const,
    },
    system_update: {
      title: 'System Maintenance',
      message: 'Scheduled maintenance will begin in 30 minutes',
      type: 'warning' as const,
      category: 'system' as const,
    },
  };

  const sendTestNotification = (type: keyof typeof testNotifications) => {
    if (!user) return;

    const notification = testNotifications[type];
    
    // Send in-app notification
    addNotification({
      ...notification,
      userId: user.id,
      actionUrl: '/dashboard',
      actionLabel: 'View Details',
    });

    // Send browser notification if enabled
    if (canSendNotifications) {
      sendBrowserNotification(notification.title, {
        body: notification.message,
        data: { actionUrl: '/dashboard' },
      });
    }

    // Send real-time notification
    sendRealtimeNotification(notification.type, notification.message);
  };

  const sendAllTests = () => {
    Object.keys(testNotifications).forEach((type, index) => {
      setTimeout(() => {
        sendTestNotification(type as keyof typeof testNotifications);
      }, index * 1000);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-4 w-4" />
          Notification Tester
        </CardTitle>
        <CardDescription>
          Test different types of notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!canSendNotifications && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                Browser notifications disabled
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={requestPermission}
              className="text-yellow-800 border-yellow-300"
            >
              Enable Browser Notifications
            </Button>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Quick Tests</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => sendTestNotification('audit_update')}
              className="flex items-center gap-1"
            >
              <Bell className="h-3 w-3" />
              Audit Update
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => sendTestNotification('new_message')}
              className="flex items-center gap-1"
            >
              <Zap className="h-3 w-3" />
              New Message
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => sendTestNotification('payment_success')}
              className="flex items-center gap-1"
            >
              <CheckCircle className="h-3 w-3" />
              Payment
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => sendTestNotification('security_alert')}
              className="flex items-center gap-1"
            >
              <AlertTriangle className="h-3 w-3" />
              Security Alert
            </Button>
          </div>
        </div>

        <Button onClick={sendAllTests} className="w-full" variant="secondary">
          Send All Test Notifications
        </Button>
      </CardContent>
    </Card>
  );
};
