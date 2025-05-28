
import { useNotifications } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/auth';

export const useNotificationHelpers = () => {
  const { addNotification } = useNotifications();
  const { user } = useAuth();

  const notifyAuditStatusChange = (auditId: string, status: string) => {
    if (!user) return;
    
    addNotification({
      title: 'Audit Status Updated',
      message: `Your audit status has changed to: ${status}`,
      type: 'info',
      category: 'audit',
      userId: user.id,
      actionUrl: `/audits/${auditId}`,
      actionLabel: 'View Audit',
    });
  };

  const notifyNewMessage = (auditId: string, senderName?: string) => {
    if (!user) return;
    
    addNotification({
      title: 'New Message',
      message: senderName ? `${senderName} sent you a message` : 'You have a new message',
      type: 'info',
      category: 'message',
      userId: user.id,
      actionUrl: `/audits/${auditId}`,
      actionLabel: 'View Message',
    });
  };

  const notifyPaymentUpdate = (message: string, type: 'success' | 'warning' | 'error' = 'success') => {
    if (!user) return;
    
    addNotification({
      title: 'Payment Update',
      message,
      type,
      category: 'payment',
      userId: user.id,
    });
  };

  const notifySystemUpdate = (title: string, message: string) => {
    if (!user) return;
    
    addNotification({
      title,
      message,
      type: 'info',
      category: 'system',
      userId: user.id,
    });
  };

  return {
    notifyAuditStatusChange,
    notifyNewMessage,
    notifyPaymentUpdate,
    notifySystemUpdate,
  };
};
