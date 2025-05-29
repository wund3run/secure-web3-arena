
import { useEffect } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';

export const useAuditNotifications = () => {
  const { addNotification } = useNotifications();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Audit status change notifications
    const auditChannel = supabase
      .channel('audit_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'audit_requests',
          filter: `client_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            const oldStatus = payload.old?.status;
            const newStatus = payload.new?.status;
            
            if (oldStatus !== newStatus) {
              addNotification({
                title: 'Audit Status Update',
                message: `Your audit status has changed to: ${newStatus}`,
                type: 'info',
                category: 'audit',
                actionUrl: `/audit/${payload.new.id}`,
                actionLabel: 'View Audit',
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(auditChannel);
    };
  }, [user, addNotification]);
};
