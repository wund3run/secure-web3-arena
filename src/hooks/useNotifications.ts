
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  action_url?: string;
  created_at: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      // Create mock notifications for now since table doesn't exist in types
      const mockNotifications: Notification[] = [
        {
          id: '1',
          user_id: 'current-user',
          title: 'Welcome to Hawkly',
          message: 'Your account has been created successfully',
          type: 'info',
          is_read: false,
          created_at: new Date().toISOString()
        }
      ];
      
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.is_read).length);
    } catch (err: unknown) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, is_read: true } 
            : notification
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err: unknown) {
      toast.error('Failed to mark notification as read');
    }
  };

  const markAllAsRead = async () => {
    try {
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, is_read: true }))
      );
      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch (err: unknown) {
      toast.error('Failed to mark all notifications as read');
    }
  };

  const createNotification = async (notification: {
    user_id: string;
    title: string;
    message: string;
    type?: string;
    action_url?: string;
  }) => {
    try {
      const newNotification: Notification = {
        id: `temp-${Date.now()}`,
        user_id: notification.user_id,
        title: notification.title,
        message: notification.message,
        type: notification.type || 'info',
        is_read: false,
        action_url: notification.action_url,
        created_at: new Date().toISOString()
      };

      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
    } catch (err: unknown) {
      console.error('Failed to create notification:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    createNotification,
  };
};
