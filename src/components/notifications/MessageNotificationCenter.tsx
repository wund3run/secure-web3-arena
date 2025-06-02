
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Check, MessageSquare, FileText, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface MessageNotification {
  id: string;
  user_id: string;
  message_id: string;
  notification_type: string;
  read_at: string | null;
  created_at: string;
  message?: {
    content: string;
    sender_id: string;
    conversation_id: string;
    sender_profile?: {
      full_name: string;
    };
  };
}

export const MessageNotificationCenter: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<MessageNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetchNotifications();
    setupRealtimeSubscription();
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      const { data: notificationData, error } = await supabase
        .from('message_notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      // Fetch related chat messages and sender profiles separately
      const messageIds = notificationData?.map(n => n.message_id).filter(Boolean) || [];
      const { data: messages } = await supabase
        .from('chat_messages')
        .select('*')
        .in('id', messageIds);

      const senderIds = messages?.map(m => m.sender_id).filter(Boolean) || [];
      const { data: senderProfiles } = await supabase
        .from('extended_profiles')
        .select('*')
        .in('id', senderIds);

      const formattedNotifications = (notificationData || []).map(notification => {
        const message = messages?.find(m => m.id === notification.message_id);
        const senderProfile = message ? senderProfiles?.find(p => p.id === message.sender_id) : null;

        return {
          ...notification,
          message: message ? {
            content: message.content,
            sender_id: message.sender_id,
            conversation_id: message.conversation_id,
            sender_profile: {
              full_name: senderProfile?.full_name || 'Unknown User'
            }
          } : undefined
        };
      });

      setNotifications(formattedNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    if (!user) return;

    const channel = supabase
      .channel('notification_updates')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'message_notifications',
        filter: `user_id=eq.${user.id}`
      }, () => {
        fetchNotifications();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('message_notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, read_at: new Date().toISOString() }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    const unreadIds = notifications
      .filter(n => !n.read_at)
      .map(n => n.id);

    if (unreadIds.length === 0) return;

    try {
      const { error } = await supabase
        .from('message_notifications')
        .update({ read_at: new Date().toISOString() })
        .in('id', unreadIds);

      if (error) throw error;

      setNotifications(prev =>
        prev.map(notification => ({
          ...notification,
          read_at: notification.read_at || new Date().toISOString()
        }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'file_shared':
        return <FileText className="h-4 w-4" />;
      case 'milestone_update':
        return <Clock className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getNotificationTitle = (type: string) => {
    switch (type) {
      case 'file_shared':
        return 'File Shared';
      case 'milestone_update':
        return 'Milestone Update';
      default:
        return 'New Message';
    }
  };

  const unreadCount = notifications.filter(n => !n.read_at).length;

  if (loading) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="default" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Mark all read
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No notifications</h3>
            <p className="text-muted-foreground">
              You're all caught up! New notifications will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-colors ${
                  notification.read_at ? 'bg-background' : 'bg-muted/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {notification.message?.sender_profile?.full_name?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getNotificationIcon(notification.notification_type)}
                      <span className="font-medium text-sm">
                        {getNotificationTitle(notification.notification_type)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        from {notification.message?.sender_profile?.full_name || 'Unknown User'}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {notification.message?.content || 'New notification'}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                      </span>

                      {!notification.read_at && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Mark read
                        </Button>
                      )}
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
};
