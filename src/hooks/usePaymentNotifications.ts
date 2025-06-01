
import { useEffect } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';

export const usePaymentNotifications = () => {
  const { addNotification } = useNotifications();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Subscribe to payment-related events
    const paymentChannel = supabase
      .channel('payment_notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_log',
          filter: `action=like.%payment%`,
        },
        (payload) => {
          if (payload.new?.action.includes('payment')) {
            const paymentType = payload.new.action.includes('received') ? 'success' : 'info';
            
            addNotification({
              title: 'Payment Update',
              message: `Payment ${payload.new.action.replace('payment_', '')}`,
              type: paymentType,
              category: 'payment',
              userId: user.id,
              actionUrl: `/audit/${payload.new.audit_request_id}`,
              actionLabel: 'View Details',
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(paymentChannel);
    };
  }, [user, addNotification]);
};
