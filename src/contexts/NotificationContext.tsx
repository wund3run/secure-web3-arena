
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  const { saveNotifications, loadNotifications } = useNotificationPersistence();
  const { sendBrowserNotification, canSendNotifications } = useBrowserNotifications();

  // Load persisted notifications on mount
  useEffect(() => {
    try {
      const loaded = loadNotifications();
      setNotifications(loaded);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  }, [loadNotifications]);

  // Save notifications whenever they change
  useEffect(() => {
    if (notifications.length > 0) {
      try {
        saveNotifications(notifications);
      } catch (error) {
        console.error('Failed to save notifications:', error);
      }
    }
  }, [notifications, saveNotifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    try {
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
    } catch (error) {
      console.error('Failed to add notification:', error);
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
