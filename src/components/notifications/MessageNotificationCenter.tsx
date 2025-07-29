
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Check, MessageSquare, FileText, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NotificationItem {
  id: string;
  user_id: string;
  message_id?: string;
  notification_type: 'message' | 'file_shared' | 'milestone_update' | 'audit_update';
  is_read: boolean;
  created_at: string;
  sender?: {
    name: string;
    avatar_url?: string;
  };
  content?: string;
  title?: string;
}

export function MessageNotificationCenter() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock notifications for demonstration
    const mockNotifications: NotificationItem[] = [
      {
        id: '1',
        user_id: 'current-user',
        message_id: 'msg-1',
        notification_type: 'message',
        is_read: false,
        created_at: new Date(Date.now() - 300000).toISOString(),
        sender: {
          name: 'Sarah Chen',
          avatar_url: ''
        },
        title: 'New message from Sarah Chen',
        content: 'I\'ve completed the initial review of your smart contract.'
      },
      {
        id: '2',
        user_id: 'current-user',
        notification_type: 'file_shared',
        is_read: false,
        created_at: new Date(Date.now() - 600000).toISOString(),
        sender: {
          name: 'Alex Rodriguez',
          avatar_url: ''
        },
        title: 'File shared by Alex Rodriguez',
        content: 'Security Report Draft - DeFi Protocol Audit'
      },
      {
        id: '3',
        user_id: 'current-user',
        notification_type: 'milestone_update',
        is_read: true,
        created_at: new Date(Date.now() - 3600000).toISOString(),
        sender: {
          name: 'Maya Patel',
          avatar_url: ''
        },
        title: 'Milestone completed',
        content: 'Code Review phase has been completed for NFT Marketplace audit'
      },
      {
        id: '4',
        user_id: 'current-user',
        notification_type: 'audit_update',
        is_read: true,
        created_at: new Date(Date.now() - 7200000).toISOString(),
        title: 'Audit status update',
        content: 'Your DeFi Protocol audit has moved to the Testing phase'
      }
    ];

    setNotifications(mockNotifications);
    setLoading(false);
  }, []);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, is_read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, is_read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'file_shared':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'milestone_update':
        return <Check className="h-4 w-4 text-purple-500" />;
      case 'audit_update':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (loading) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading notifications...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="error" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No notifications</h3>
            <p className="text-muted-foreground">
              You're all caught up! New notifications will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                  !notification.is_read ? 'bg-blue-50 border-blue-200' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {notification.sender ? (
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={notification.sender.avatar_url} />
                        <AvatarFallback>
                          {getInitials(notification.sender.name)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        {getNotificationIcon(notification.notification_type)}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-sm">
                          {notification.title}
                        </h4>
                        {notification.content && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.content}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        {!notification.is_read && (
                          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                        )}
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
