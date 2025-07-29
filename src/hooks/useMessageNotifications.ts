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
  sent_at: string | null;
  read_at: string | null;
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
      
      // Type the data properly by ensuring the types match our interface
      const typedNotifications: MessageNotification[] = (data || []).map(item => ({
        id: item.id,
        user_id: item.user_id,
        message_id: item.message_id,
        notification_type: item.notification_type as MessageNotification['notification_type'],
        is_read: item.is_read,
        sent_at: item.sent_at,
        read_at: item.read_at,
        delivery_status: item.delivery_status as MessageNotification['delivery_status'],
        created_at: item.created_at,
        chat_message: item.chat_message ? {
          content: item.chat_message.content,
          sender_id: item.chat_message.sender_id,
          message_type: item.chat_message.message_type
        } : undefined
      }));
      
      setNotifications(typedNotifications);
      setUnreadCount(typedNotifications.filter(n => !n.is_read).length);
    } catch (err: unknown) {
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
    } catch (err: unknown) {
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
    } catch (err: unknown) {
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
          const newNotification = payload.new;
          
          // Fetch the related message data
          const { data: messageData } = await supabase
            .from('chat_messages')
            .select('content, sender_id, message_type')
            .eq('id', newNotification.message_id)
            .single();

          const typedNotification: MessageNotification = {
            id: newNotification.id,
            user_id: newNotification.user_id,
            message_id: newNotification.message_id,
            notification_type: newNotification.notification_type as MessageNotification['notification_type'],
            is_read: newNotification.is_read,
            sent_at: newNotification.sent_at,
            read_at: newNotification.read_at,
            delivery_status: newNotification.delivery_status as MessageNotification['delivery_status'],
            created_at: newNotification.created_at,
            chat_message: messageData ? {
              content: messageData.content,
              sender_id: messageData.sender_id,
              message_type: messageData.message_type
            } : undefined
          };

          setNotifications(prev => [typedNotification, ...prev]);
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
          const updatedNotification = payload.new;
          const typedNotification: MessageNotification = {
            id: updatedNotification.id,
            user_id: updatedNotification.user_id,
            message_id: updatedNotification.message_id,
            notification_type: updatedNotification.notification_type as MessageNotification['notification_type'],
            is_read: updatedNotification.is_read,
            sent_at: updatedNotification.sent_at,
            read_at: updatedNotification.read_at,
            delivery_status: updatedNotification.delivery_status as MessageNotification['delivery_status'],
            created_at: updatedNotification.created_at
          };
          
          setNotifications(prev =>
            prev.map(n => n.id === typedNotification.id ? typedNotification : n)
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
