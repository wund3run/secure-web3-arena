
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

export interface MessageNotification {
  id: string;
  user_id: string;
  message_id: string;
  notification_type: 'message' | 'file_shared' | 'milestone_update' | 'audit_update';
  is_read: boolean;
  sent_at: string;
  read_at?: string;
  delivery_status: 'pending' | 'sent' | 'delivered' | 'failed';
  created_at: string;
  chat_message?: {
    content: string;
    sender_id: string;
    message_type: string;
  };
}

export const useMessageNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<MessageNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('message_notifications')
        .select(`
          *,
          chat_message:chat_messages(content, sender_id, message_type)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      setNotifications(data || []);
      setUnreadCount(data?.filter(n => !n.is_read).length || 0);
    } catch (err: any) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('message_notifications')
        .update({ 
          is_read: true, 
          read_at: new Date().toISOString() 
        })
        .eq('id', notificationId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err: any) {
      console.error('Failed to mark notification as read:', err);
    }
  }, [user]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('message_notifications')
        .update({ 
          is_read: true, 
          read_at: new Date().toISOString() 
        })
        .eq('user_id', user.id)
        .eq('is_read', false);

      if (error) throw error;
      
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (err: any) {
      console.error('Failed to mark all notifications as read:', err);
    }
  }, [user]);

  // Set up real-time subscription for new notifications
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('user_notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'message_notifications',
          filter: `user_id=eq.${user.id}`,
        },
        async (payload) => {
          const newNotification = payload.new as MessageNotification;
          
          // Fetch the related message data
          const { data: messageData } = await supabase
            .from('chat_messages')
            .select('content, sender_id, message_type')
            .eq('id', newNotification.message_id)
            .single();

          const enrichedNotification = {
            ...newNotification,
            chat_message: messageData,
          };

          setNotifications(prev => [enrichedNotification, ...prev]);
          setUnreadCount(prev => prev + 1);

          // Show toast notification
          toast.info('New message received', {
            description: messageData?.content?.slice(0, 50) + '...',
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'message_notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const updatedNotification = payload.new as MessageNotification;
          setNotifications(prev =>
            prev.map(n => n.id === updatedNotification.id ? updatedNotification : n)
          );
        }
      )
      .subscribe();

    // Fetch initial notifications
    fetchNotifications();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications,
  };
};
