
import { useEffect } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';

export const usePaymentNotifications = () => {
  const { addNotification } = useNotifications();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Payment status notifications
    const paymentChannel = supabase
      .channel('payment_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'payments',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            addNotification({
              title: 'Payment Initiated',
              message: `Payment of $${payload.new.amount} has been initiated`,
              type: 'info',
              category: 'payment',
              userId: user.id,
              actionUrl: '/escrow',
              actionLabel: 'View Escrow',
            });
          } else if (payload.eventType === 'UPDATE') {
            const oldStatus = payload.old?.status;
            const newStatus = payload.new?.status;
            
            if (oldStatus !== newStatus) {
              const statusConfig = {
                'completed': { type: 'success' as const, message: 'Payment completed successfully' },
                'failed': { type: 'error' as const, message: 'Payment failed - please try again' },
                'refunded': { type: 'info' as const, message: 'Payment has been refunded' },
              };

              const config = statusConfig[newStatus as keyof typeof statusConfig];
              if (config) {
                addNotification({
                  title: 'Payment Update',
                  message: config.message,
                  type: config.type,
                  category: 'payment',
                  userId: user.id,
                  actionUrl: '/escrow',
                  actionLabel: 'View Details',
                });
              }
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(paymentChannel);
    };
  }, [user, addNotification]);
};
