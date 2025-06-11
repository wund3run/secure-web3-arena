
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { useNotifications } from '@/contexts/NotificationContext';
import { toast } from 'sonner';

export function useRealtimeNotifications() {
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (!user?.id) return;

    // Subscribe to real-time notifications
    const channel = supabase
      .channel('user-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const notification = payload.new;
          addNotification({
            title: notification.title,
            message: notification.message,
            type: notification.type || 'info',
            category: 'system',
            actionUrl: notification.action_url,
            actionLabel: 'View'
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_status_updates',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const update = payload.new;
          addNotification({
            title: 'Audit Update',
            message: update.message || `${update.status_type}: ${update.title}`,
            type: 'info',
            category: 'audit',
            actionUrl: `/audits/${update.audit_request_id}`,
            actionLabel: 'View Audit'
          });

          // Also show a toast for immediate feedback
          toast.success('Audit Update', {
            description: update.title
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'message_notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const messageNotification = payload.new;
          addNotification({
            title: 'New Message',
            message: `You have a new ${messageNotification.notification_type}`,
            type: 'info',
            category: 'message',
            actionUrl: '/messages',
            actionLabel: 'View Messages'
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, addNotification]);

  return null;
}
