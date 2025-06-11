
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { useNotifications } from '@/contexts/NotificationContext';

export function usePaymentNotifications() {
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('payment-events')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'payment_transactions',
        },
        (payload) => {
          const oldRecord = payload.old;
          const newRecord = payload.new;

          // Only notify users involved in the transaction
          const isUserInvolved = 
            newRecord.client_id === user.id || 
            newRecord.auditor_id === user.id;

          if (!isUserInvolved) return;

          // Payment status change notifications
          if (oldRecord.status !== newRecord.status) {
            let notificationType: 'success' | 'error' | 'warning' | 'info' = 'info';
            let message = '';

            switch (newRecord.status) {
              case 'completed':
                notificationType = 'success';
                message = newRecord.auditor_id === user.id 
                  ? `Payment of $${newRecord.amount} received successfully`
                  : `Payment of $${newRecord.amount} completed successfully`;
                break;
              case 'failed':
                notificationType = 'error';
                message = `Payment of $${newRecord.amount} failed. Please check your payment method.`;
                break;
              case 'pending':
                notificationType = 'info';
                message = `Payment of $${newRecord.amount} is being processed`;
                break;
              case 'refunded':
                notificationType = 'warning';
                message = `Payment of $${newRecord.amount} has been refunded`;
                break;
              default:
                return;
            }

            addNotification({
              title: 'Payment Update',
              message,
              type: notificationType,
              category: 'payment',
              actionUrl: `/payments/${newRecord.id}`,
              actionLabel: 'View Details'
            });
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'transactions',
        },
        (payload) => {
          const transaction = payload.new;

          // Escrow milestone notifications
          if (transaction.type === 'milestone_payment') {
            const isUserInvolved = 
              transaction.sender_id === user.id || 
              transaction.recipient_id === user.id;

            if (isUserInvolved) {
              addNotification({
                title: 'Milestone Payment',
                message: transaction.recipient_id === user.id
                  ? `You received a milestone payment of $${transaction.amount}`
                  : `Milestone payment of $${transaction.amount} sent successfully`,
                type: 'success',
                category: 'escrow',
                actionUrl: `/escrow/${transaction.escrow_contract_id}`,
                actionLabel: 'View Escrow'
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, addNotification]);
}
