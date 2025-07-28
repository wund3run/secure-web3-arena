
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle, MessageSquare, FileText, AlertTriangle, Settings } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  type: 'message' | 'file_upload' | 'status_update' | 'vulnerability' | 'milestone';
  title: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationCenterProps {
  auditId: string;
  onUnreadCountChange: (count: number) => void;
}

export function NotificationCenter({ auditId, onUnreadCountChange }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'vulnerability',
      title: 'New Critical Vulnerability Found',
      content: 'Reentrancy vulnerability discovered in withdraw() function',
      isRead: false,
      createdAt: new Date(Date.now() - 3600000),
      priority: 'high'
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message from Sarah Chen',
      content: 'I\'ve completed the initial code review. Please check the findings.',
      isRead: false,
      createdAt: new Date(Date.now() - 7200000),
      priority: 'medium'
    },
    {
      id: '3',
      type: 'file_upload',
      title: 'File Uploaded',
      content: 'Updated_Contract.sol has been uploaded to the project',
      isRead: true,
      createdAt: new Date(Date.now() - 86400000),
      priority: 'low'
    },
    {
      id: '4',
      type: 'milestone',
      title: 'Milestone Completed',
      content: 'Initial Code Review milestone has been marked as complete',
      isRead: true,
      createdAt: new Date(Date.now() - 172800000),
      priority: 'medium'
    }
  ]);

  React.useEffect(() => {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    onUnreadCountChange(unreadCount);
  }, [notifications, onUnreadCountChange]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'file_upload': return <FileText className="h-4 w-4 text-green-500" />;
      case 'vulnerability': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'milestone': return <CheckCircle className="h-4 w-4 text-purple-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-blue-500';
      default: return 'border-l-gray-300';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
              {unreadNotifications.length > 0 && (
                <Badge variant="error" className="ml-2">
                  {unreadNotifications.length}
                </Badge>
              )}
            </CardTitle>
            <div className="flex gap-2">
              {unreadNotifications.length > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Mark All Read
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Unread Notifications */}
      {unreadNotifications.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Unread ({unreadNotifications.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {unreadNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 bg-blue-50 border-l-4 ${getPriorityColor(notification.priority)} rounded-r-lg cursor-pointer hover:bg-blue-100 transition-colors`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{notification.content}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {notification.priority} priority
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Read Notifications */}
      {readNotifications.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {readNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border-l-4 ${getPriorityColor(notification.priority)} rounded-r-lg opacity-75`}
              >
                <div className="flex items-start gap-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{notification.content}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {notifications.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No notifications</h3>
            <p className="text-muted-foreground">
              You'll receive notifications here for messages, file uploads, and project updates.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
