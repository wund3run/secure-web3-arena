import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { Notification } from '@/types/notification.types';

export const useNotificationPersistence = () => {
  const { user } = useAuth();
  const [persistedNotifications, setPersistedNotifications] = useState<Notification[]>([]);

  const saveNotifications = (notifications: Notification[]) => {
    if (!user?.id) return;
    
    // Keep only the last 50 notifications to avoid localStorage bloat
    const toSave = notifications.slice(0, 50);
    localStorage.setItem(`notifications_${user.id}`, JSON.stringify(toSave));
    setPersistedNotifications(toSave);
  };

  const loadNotifications = (): Notification[] => {
    if (!user?.id) return [];
    
    const saved = localStorage.getItem(`notifications_${user.id}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert timestamp strings back to Date objects
        return parsed.map((notification: any) => ({
          ...notification,
          timestamp: new Date(notification.timestamp)
        }));
      } catch (error) {
        console.error('Failed to parse saved notifications:', error);
        return [];
      }
    }
    return [];
  };

  const clearPersistedNotifications = () => {
    if (!user?.id) return;
    localStorage.removeItem(`notifications_${user.id}`);
    setPersistedNotifications([]);
  };

  useEffect(() => {
    if (user?.id) {
      const loaded = loadNotifications();
      setPersistedNotifications(loaded);
    }
  }, [user?.id]);

  return {
    persistedNotifications,
    saveNotifications,
    loadNotifications,
    clearPersistedNotifications,
  };
};
