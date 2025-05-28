
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { Notification, NotificationContextType } from '@/types/notification.types';
import { toast } from 'sonner';

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

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for new notifications
    toast(notification.title, {
      description: notification.message,
      action: notification.actionUrl ? {
        label: notification.actionLabel || 'View',
        onClick: () => window.location.href = notification.actionUrl!,
      } : undefined,
    });
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

  // Set up real-time listeners for audit updates
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
            addNotification({
              title: 'Audit Status Updated',
              message: `Your audit request has been updated`,
              type: 'info',
              category: 'audit',
              userId: user.id,
              actionUrl: `/audits/${payload.new.id}`,
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
              actionUrl: `/audits/${payload.new.audit_request_id}`,
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
