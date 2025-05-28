
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

    // Set up real-time subscription for audit log changes as a notification source
    const channel = supabase.channel(`notifications_${userId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'audit_log',
      }, (payload) => {
        const newNotification: Notification = {
          id: payload.new.id,
          userId: userId,
          type: 'audit_update',
          title: 'Audit Update',
          message: payload.new.action,
          priority: 'medium',
          isRead: false,
          actionUrl: `/audits/${payload.new.audit_request_id}`,
          metadata: { audit_request_id: payload.new.audit_request_id },
          createdAt: new Date(payload.new.created_at),
        };

        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(prev => prev + 1);

        toast.info(newNotification.title, {
          description: newNotification.message,
          duration: 5000,
        });
      })
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    // Load initial notifications from audit log
    loadNotifications();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const loadNotifications = useCallback(async () => {
    if (!userId) return;

    try {
      // Load recent audit log entries as notifications
      const { data, error } = await supabase
        .from('audit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      const mappedNotifications: Notification[] = data.map(item => ({
        id: item.id,
        userId: userId,
        type: 'audit_update',
        title: 'Audit Update',
        message: item.action,
        priority: 'medium',
        isRead: false,
        actionUrl: `/audits/${item.audit_request_id}`,
        metadata: { audit_request_id: item.audit_request_id },
        createdAt: new Date(item.created_at),
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
      // Update local state since we don't have a notifications table
      setNotifications(prev => 
        prev.map(notif => 
          notificationIds.includes(notif.id) 
            ? { ...notif, isRead: true }
            : notif
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - notificationIds.length));
    } catch (error) {
      console.error('Failed to mark notifications as read:', error);
      toast.error('Failed to update notifications');
    }
  }, [userId]);

  const markAllAsRead = useCallback(async () => {
    if (!userId) return;

    try {
      setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
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
      // Since we don't have edge functions set up, we'll simulate sending
      console.log('Notification sent:', { targetUserId, type, title, message });
      
      // Create a local notification for demo purposes
      const newNotification: Notification = {
        id: crypto.randomUUID(),
        userId: targetUserId,
        type,
        title,
        message,
        priority,
        isRead: false,
        actionUrl,
        metadata,
        createdAt: new Date(),
      };

      if (targetUserId === userId) {
        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Failed to send notification:', error);
      throw error;
    }
  }, [userId]);

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
