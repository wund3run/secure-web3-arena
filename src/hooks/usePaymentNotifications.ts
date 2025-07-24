import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { useNotifications } from '@/contexts/NotificationContext';

export function usePaymentNotifications() {
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (!user) return;

    // Subscribe to payment transaction updates
    const paymentChannel = supabase
      .channel('payment_updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'payment_transactions',
          filter: `client_id=eq.${user.id}`,
        },
        (payload) => {
          const transaction = payload.new;
          addNotification({
            title: 'Payment Processing',
            message: `Payment of $${transaction.amount} is being processed`,
            type: 'info',
            category: 'payment',
            actionUrl: '/escrow',
            actionLabel: 'View Transactions',
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'payment_transactions',
          filter: `client_id=eq.${user.id}`,
        },
        (payload) => {
          const oldTransaction = payload.old;
          const newTransaction = payload.new;
          
          if (oldTransaction.status !== newTransaction.status) {
            const isSuccess = newTransaction.status === 'completed';
            addNotification({
              title: isSuccess ? 'Payment Successful' : 'Payment Update',
              message: `Payment ${newTransaction.status}: $${newTransaction.amount}`,
              type: isSuccess ? 'success' : newTransaction.status === 'failed' ? 'error' : 'info',
              category: 'payment',
              actionUrl: '/escrow',
              actionLabel: 'View Details',
            });
          }
        }
      )
      .subscribe();

    // Subscribe to escrow contract updates
    const escrowChannel = supabase
      .channel('escrow_updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'escrow_contracts',
          filter: `client_id=eq.${user.id}`,
        },
        (payload) => {
          const oldContract = payload.old;
          const newContract = payload.new;
          
          if (oldContract.status !== newContract.status) {
            addNotification({
              title: 'Escrow Status Updated',
              message: `Escrow contract status changed to ${newContract.status}`,
              type: newContract.status === 'completed' ? 'success' : 'info',
              category: 'escrow',
              actionUrl: '/escrow',
              actionLabel: 'View Contract',
            });
          }
        }
      )
      .subscribe();

    // Subscribe to milestone payment releases
    const milestonePaymentChannel = supabase
      .channel('milestone_payments')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'transactions',
          filter: `type=eq.release`,
        },
        async (payload) => {
          const transaction = payload.new;
          
          // Check if this transaction belongs to current user's contract
          const { data: contract } = await supabase
            .from('escrow_contracts')
            .select('client_id, auditor_id')
            .eq('id', transaction.escrow_contract_id)
            .single();

          if (contract && (contract.client_id === user.id || contract.auditor_id === user.id)) {
            const isClient = contract.client_id === user.id;
            addNotification({
              title: 'Milestone Payment Released',
              message: isClient 
                ? `Payment of $${transaction.amount} released to auditor`
                : `You received a payment of $${transaction.amount}`,
              type: 'success',
              category: 'payment',
              actionUrl: '/escrow',
              actionLabel: 'View Details',
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(paymentChannel);
      supabase.removeChannel(escrowChannel);
      supabase.removeChannel(milestonePaymentChannel);
    };
  }, [user, addNotification]);
}
