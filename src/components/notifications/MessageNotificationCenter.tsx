
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, 
  MessageSquare, 
  File, 
  CheckCircle, 
  Check,
  Trash2 
} from 'lucide-react';
import { useMessageNotifications, MessageNotification } from '@/hooks/useMessageNotifications';
import { formatDistanceToNow } from 'date-fns';

export const MessageNotificationCenter: React.FC = () => {
  const { 
    notifications, 
    unreadCount, 
    loading, 
    markAsRead, 
    markAllAsRead 
  } = useMessageNotifications();

  const getNotificationIcon = (type: MessageNotification['notification_type']) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'file_shared':
        return <File className="h-4 w-4" />;
      case 'milestone_update':
        return <CheckCircle className="h-4 w-4" />;
      case 'audit_update':
        return <Bell className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationTitle = (notification: MessageNotification) => {
    switch (notification.notification_type) {
      case 'message':
        return 'New Message';
      case 'file_shared':
        return 'File Shared';
      case 'milestone_update':
        return 'Milestone Update';
      case 'audit_update':
        return 'Audit Update';
      default:
        return 'Notification';
    }
  };

  const renderNotification = (notification: MessageNotification) => {
    return (
      <div
        key={notification.id}
        className={`p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors ${
          !notification.is_read ? 'bg-blue-50/50 border-l-4 border-l-blue-500' : ''
        }`}
      >
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-full ${
            !notification.is_read ? 'bg-blue-100 text-blue-600' : 'bg-muted text-muted-foreground'
          }`}>
            {getNotificationIcon(notification.notification_type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-sm">
                {getNotificationTitle(notification)}
              </h4>
              <div className="flex items-center gap-2">
                {!notification.is_read && (
                  <Badge variant="secondary" className="text-xs">
                    New
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                </span>
              </div>
            </div>
            
            {notification.chat_message && (
              <p className="text-sm text-muted-foreground truncate">
                {notification.chat_message.content}
              </p>
            )}
            
            <div className="flex items-center gap-2 mt-2">
              {!notification.is_read && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markAsRead(notification.id)}
                  className="h-6 text-xs"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Mark as read
                </Button>
              )}
              <Badge variant="outline" className="text-xs">
                {notification.delivery_status}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Message Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-0">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No notifications yet</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            {notifications.map(renderNotification)}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
