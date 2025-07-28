import { useContext } from 'react';
// import { useNotification } from '../contexts/NotificationContext';
import { useAuth } from '@/contexts/auth';

export const useNotificationHelpers = () => {
  const { notify } = useNotification();
  const { user } = useAuth();

  const notifyAuditStatusChange = (auditId: string, status: string) => {
    if (!user) return;
    
    notify({
      title: 'Audit Status Updated',
      message: `Your audit status has changed to: ${status}`,
      type: 'info',
      category: 'audit',
      actionUrl: `/audits/${auditId}`,
      actionLabel: 'View Audit',
    });
  };

  const notifyNewMessage = (auditId: string, senderName?: string) => {
    if (!user) return;
    
    notify({
      title: 'New Message',
      message: senderName ? `${senderName} sent you a message` : 'You have a new message',
      type: 'info',
      category: 'message',
      actionUrl: `/audits/${auditId}`,
      actionLabel: 'View Message',
    });
  };

  const notifyPaymentUpdate = (message: string, type: 'success' | 'warning' | 'error' = 'success') => {
    if (!user) return;
    
    notify({
      title: 'Payment Update',
      message,
      type,
      category: 'payment',
    });
  };

  const notifySystemUpdate = (title: string, message: string) => {
    if (!user) return;
    
    notify({
      title,
      message,
      type: 'info',
      category: 'system',
    });
  };

  return {
    notifyAuditStatusChange,
    notifyNewMessage,
    notifyPaymentUpdate,
    notifySystemUpdate,
  };
};
