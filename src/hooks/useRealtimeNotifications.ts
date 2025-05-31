
import { useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/auth';
import { useNotifications } from '@/contexts/NotificationContext';
import { supabase } from '@/integrations/supabase/client';

export const useRealtimeNotifications = () => {
  const { user } = useAuth();
  const { addNotification, refreshNotifications } = useNotifications();

  const setupRealtimeSubscription = useCallback(() => {
    if (!user) return null;

    const channel = supabase
      .channel('user-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('New notification received:', payload);
          
          addNotification({
            id: payload.new.id,
            title: payload.new.title,
            message: payload.new.message,
            type: payload.new.type,
            category: 'realtime',
            userId: user.id,
            actionUrl: payload.new.action_url,
            actionLabel: 'View',
          });

          // Refresh the notifications list
          refreshNotifications();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'audit_progress',
        },
        (payload) => {
          console.log('Audit progress updated:', payload);
          
          // Only notify if this user is involved
          if (payload.new.auditor_id === user.id || 
              (payload.old && payload.old.auditor_id === user.id)) {
            addNotification({
              title: 'Audit Progress Updated',
              message: `Progress updated to ${payload.new.progress_percentage}%`,
              type: 'info',
              category: 'audit_progress',
              userId: user.id,
              actionUrl: `/audit/${payload.new.audit_request_id}`,
              actionLabel: 'View Audit',
            });
          }
        }
      )
      .subscribe();

    return channel;
  }, [user, addNotification, refreshNotifications]);

  useEffect(() => {
    const channel = setupRealtimeSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [setupRealtimeSubscription]);
};
