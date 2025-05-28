
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Notification {
  id: string;
  userId: string;
  type: 'payment' | 'audit_update' | 'message' | 'dispute' | 'milestone' | 'system';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isRead: boolean;
  actionUrl?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  expiresAt?: Date;
}

export const useNotificationSystem = (userId?: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    // Set up real-time subscription for notifications
    const channel = supabase.channel(`notifications_${userId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      }, (payload) => {
        const newNotification: Notification = {
          id: payload.new.id,
          userId: payload.new.user_id,
          type: payload.new.type,
          title: payload.new.title,
          message: payload.new.message,
          priority: payload.new.priority,
          isRead: payload.new.is_read,
          actionUrl: payload.new.action_url,
          metadata: payload.new.metadata,
          createdAt: new Date(payload.new.created_at),
          expiresAt: payload.new.expires_at ? new Date(payload.new.expires_at) : undefined,
        };

        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(prev => prev + 1);

        // Show toast notification based on priority
        const toastOptions = {
          duration: newNotification.priority === 'urgent' ? 10000 : 5000,
        };

        switch (newNotification.priority) {
          case 'urgent':
            toast.error(newNotification.title, {
              description: newNotification.message,
              ...toastOptions,
            });
            break;
          case 'high':
            toast.warning(newNotification.title, {
              description: newNotification.message,
              ...toastOptions,
            });
            break;
          case 'medium':
            toast.info(newNotification.title, {
              description: newNotification.message,
              ...toastOptions,
            });
            break;
          default:
            toast.success(newNotification.title, {
              description: newNotification.message,
              ...toastOptions,
            });
        }
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      }, (payload) => {
        setNotifications(prev => 
          prev.map(notif => 
            notif.id === payload.new.id 
              ? { ...notif, isRead: payload.new.is_read }
              : notif
          )
        );
        
        if (payload.new.is_read && !payload.old.is_read) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
      })
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    // Load initial notifications
    loadNotifications();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const loadNotifications = useCallback(async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      const mappedNotifications: Notification[] = data.map(item => ({
        id: item.id,
        userId: item.user_id,
        type: item.type,
        title: item.title,
        message: item.message,
        priority: item.priority,
        isRead: item.is_read,
        actionUrl: item.action_url,
        metadata: item.metadata,
        createdAt: new Date(item.created_at),
        expiresAt: item.expires_at ? new Date(item.expires_at) : undefined,
      }));

      setNotifications(mappedNotifications);
      setUnreadCount(mappedNotifications.filter(n => !n.isRead).length);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  }, [userId]);

  const markAsRead = useCallback(async (notificationIds: string[]) => {
    if (!userId || !notificationIds.length) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .in('id', notificationIds);

      if (error) throw error;
    } catch (error) {
      console.error('Failed to mark notifications as read:', error);
      toast.error('Failed to update notifications');
    }
  }, [userId]);

  const markAllAsRead = useCallback(async () => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', userId)
        .eq('is_read', false);

      if (error) throw error;

      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      toast.error('Failed to update notifications');
    }
  }, [userId]);

  const deleteNotification = useCallback(async (notificationId: string) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId)
        .eq('user_id', userId);

      if (error) throw error;

      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      toast.success('Notification deleted');
    } catch (error) {
      console.error('Failed to delete notification:', error);
      toast.error('Failed to delete notification');
    }
  }, [userId]);

  const sendNotification = useCallback(async (
    targetUserId: string,
    type: Notification['type'],
    title: string,
    message: string,
    priority: Notification['priority'] = 'medium',
    actionUrl?: string,
    metadata?: Record<string, any>
  ) => {
    try {
      const { error } = await supabase.functions.invoke('send-notification', {
        body: {
          user_id: targetUserId,
          type,
          title,
          message,
          priority,
          action_url: actionUrl,
          metadata,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('Failed to send notification:', error);
      throw error;
    }
  }, []);

  return {
    notifications,
    unreadCount,
    isConnected,
    loadNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    sendNotification,
  };
};
