
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/auth';

export const NotificationTester = () => {
  const { addNotification } = useNotifications();
  const { user } = useAuth();

  if (!user) return null;

  const testNotifications = [
    {
      title: 'Audit Approved',
      message: 'Your smart contract audit has been approved and is now in progress.',
      type: 'success' as const,
      category: 'audit' as const,
    },
    {
      title: 'New Message',
      message: 'You have received a new message from your auditor.',
      type: 'info' as const,
      category: 'message' as const,
    },
    {
      title: 'Payment Processed',
      message: 'Your payment of $2,500 has been successfully processed.',
      type: 'success' as const,
      category: 'payment' as const,
    },
    {
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight from 2-4 AM UTC.',
      type: 'warning' as const,
      category: 'system' as const,
    },
    {
      title: 'Critical Security Alert',
      message: 'A critical vulnerability has been detected in your contract.',
      type: 'error' as const,
      category: 'audit' as const,
    },
  ];

  const sendTestNotification = (notification: typeof testNotifications[0]) => {
    addNotification({
      ...notification,
      actionUrl: '/dashboard',
      actionLabel: 'View Details',
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Notification Tester</CardTitle>
        <CardDescription>
          Test different types of notifications (Development Only)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {testNotifications.map((notification, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() => sendTestNotification(notification)}
          >
            <span className="mr-2">
              {notification.type === 'success' && '✅'}
              {notification.type === 'info' && 'ℹ️'}
              {notification.type === 'warning' && '⚠️'}
              {notification.type === 'error' && '❌'}
            </span>
            {notification.title}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
