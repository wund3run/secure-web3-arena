import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { useNotifications } from '@/contexts/NotificationContext';
import { toast } from 'sonner';

export function useRealtimeNotifications() {
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (!user) return;

    // Subscribe to message notifications
    const messageChannel = supabase
      .channel('message_notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'message_notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const notification = payload.new;
          addNotification({
            title: 'New Message',
            message: 'You have received a new message',
            type: 'info',
            category: 'message',
            actionUrl: `/messages`,
            actionLabel: 'View Message',
          });
        }
      )
      .subscribe();

    // Subscribe to audit status updates
    const auditChannel = supabase
      .channel('audit_notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_status_updates',
        },
        (payload) => {
          const update = payload.new;
          if (update.user_id === user.id) {
            addNotification({
              title: 'Audit Update',
              message: update.message || 'Your audit status has been updated',
              type: 'info',
              category: 'audit',
              actionUrl: `/audit/${update.audit_request_id}`,
              actionLabel: 'View Audit',
            });
          }
        }
      )
      .subscribe();

    // Subscribe to payment notifications
    const paymentChannel = supabase
      .channel('payment_notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'payment_transactions',
        },
        (payload) => {
          const transaction = payload.new;
          if (transaction.client_id === user.id || transaction.auditor_id === user.id) {
            addNotification({
              title: 'Payment Update',
              message: `Payment ${transaction.status}`,
              type: transaction.status === 'completed' ? 'success' : 'info',
              category: 'payment',
              actionUrl: `/escrow`,
              actionLabel: 'View Transaction',
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageChannel);
      supabase.removeChannel(auditChannel);
      supabase.removeChannel(paymentChannel);
    };
  }, [user, addNotification]);
}
