
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { Notification, NotificationContextType } from '@/types/notification.types';
import { toast } from 'sonner';
import { useNotificationPersistence } from '@/hooks/useNotificationPersistence';
import { useBrowserNotifications } from '@/hooks/useBrowserNotifications';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();
  const { saveNotifications, loadNotifications } = useNotificationPersistence();
  const { sendBrowserNotification, canSendNotifications } = useBrowserNotifications();

  // Load persisted notifications on mount
  useEffect(() => {
    if (user?.id) {
      const loaded = loadNotifications();
      setNotifications(loaded);
    }
  }, [user?.id]);

  // Save notifications whenever they change
  useEffect(() => {
    if (notifications.length > 0) {
      saveNotifications(notifications);
    }
  }, [notifications, saveNotifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast notification
    toast(notification.title, {
      description: notification.message,
      action: notification.actionUrl ? {
        label: notification.actionLabel || 'View',
        onClick: () => window.location.href = notification.actionUrl!,
      } : undefined,
    });

    // Send browser notification if enabled
    if (canSendNotifications) {
      sendBrowserNotification(notification.title, {
        body: notification.message,
        data: { actionUrl: notification.actionUrl },
      });
    }

    // Play notification sound
    if ((window as any).playNotificationSound) {
      (window as any).playNotificationSound();
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Enhanced real-time listeners
  useEffect(() => {
    if (!user) return;

    const auditRequestsSubscription = supabase
      .channel('audit_requests_changes')
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
                title: 'Audit Status Updated',
                message: `Your audit "${payload.new.project_name}" status changed to: ${newStatus}`,
                type: newStatus === 'approved' ? 'success' : newStatus === 'rejected' ? 'error' : 'info',
                category: 'audit',
                userId: user.id,
                actionUrl: `/audit/${payload.new.id}`,
                actionLabel: 'View Audit',
              });
            }
          } else if (payload.eventType === 'INSERT') {
            addNotification({
              title: 'New Audit Request',
              message: `New audit request "${payload.new.project_name}" has been created`,
              type: 'info',
              category: 'audit',
              userId: user.id,
              actionUrl: `/audit/${payload.new.id}`,
              actionLabel: 'View Audit',
            });
          }
        }
      )
      .subscribe();

    const messagesSubscription = supabase
      .channel('new_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_messages',
        },
        (payload) => {
          // Only notify if the message is not from the current user
          if (payload.new.sender_id !== user.id) {
            addNotification({
              title: 'New Message',
              message: 'You have received a new message in your audit',
              type: 'info',
              category: 'message',
              userId: user.id,
              actionUrl: `/audit/${payload.new.audit_request_id}`,
              actionLabel: 'View Message',
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(auditRequestsSubscription);
      supabase.removeChannel(messagesSubscription);
    };
  }, [user]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
