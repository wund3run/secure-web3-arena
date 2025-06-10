
import { useEffect } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';

export const usePaymentNotifications = () => {
  const { addNotification } = useNotifications();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Payment transaction notifications
    const paymentChannel = supabase
      .channel('payment_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'payment_transactions',
          filter: `client_id=eq.${user.id}`,
        },
        (payload) => {
          const transaction = payload.new;
          const oldTransaction = payload.old;
          
          if (payload.eventType === 'UPDATE' && 
              oldTransaction?.status !== transaction?.status) {
            
            const statusMessages = {
              'completed': { type: 'success' as const, message: 'Payment completed successfully' },
              'failed': { type: 'error' as const, message: 'Payment failed - please try again' },
              'pending': { type: 'info' as const, message: 'Payment is being processed' },
              'refunded': { type: 'warning' as const, message: 'Payment has been refunded' },
            };

            const statusConfig = statusMessages[transaction.status as keyof typeof statusMessages];
            
            if (statusConfig) {
              addNotification({
                title: `Payment ${transaction.status}`,
                message: statusConfig.message,
                type: statusConfig.type,
                category: 'payment',
                userId: user.id,
              });
            }
          }
        }
      )
      .subscribe();

    // Escrow contract notifications
    const escrowChannel = supabase
      .channel('escrow_updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'escrow_contracts',
        },
        (payload) => {
          // Check if user is involved in this contract
          if (payload.new?.client_id === user.id || payload.new?.auditor_id === user.id) {
            const oldStatus = payload.old?.status;
            const newStatus = payload.new?.status;
            
            if (oldStatus !== newStatus) {
              addNotification({
                title: 'Escrow Status Updated',
                message: `Contract status changed to ${newStatus}`,
                type: 'info',
                category: 'payment',
                userId: user.id,
                actionUrl: `/escrow/${payload.new.id}`,
                actionLabel: 'View Contract',
              });
            }
          }
        }
      )
      .subscribe();

    // Milestone completion notifications
    const milestoneChannel = supabase
      .channel('milestone_payments')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'milestones',
        },
        (payload) => {
          if (payload.new?.is_completed && !payload.old?.is_completed) {
            // Fetch escrow contract to check if user is involved
            supabase
              .from('escrow_contracts')
              .select('client_id, auditor_id, title')
              .eq('id', payload.new.escrow_contract_id)
              .single()
              .then(({ data }) => {
                if (data && (data.client_id === user.id || data.auditor_id === user.id)) {
                  addNotification({
                    title: 'Milestone Payment Released',
                    message: `Payment for "${payload.new.title}" has been released`,
                    type: 'success',
                    category: 'payment',
                    userId: user.id,
                    actionUrl: `/escrow/${payload.new.escrow_contract_id}`,
                    actionLabel: 'View Contract',
                  });
                }
              });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(paymentChannel);
      supabase.removeChannel(escrowChannel);
      supabase.removeChannel(milestoneChannel);
    };
  }, [user, addNotification]);
};
