import { useCallback } from 'react';
import { Notification } from '@/types/notification.types';

const NOTIFICATIONS_KEY = 'hawkly_notifications';
const MAX_STORED_NOTIFICATIONS = 100;

export function useNotificationPersistence() {
  const saveNotifications = useCallback((notifications: Notification[]) => {
    try {
      const toStore = notifications.slice(0, MAX_STORED_NOTIFICATIONS);
      localStorage.setItem(key, JSON.stringify(toStore));
    } catch (error) {
      console.warn('Failed to persist notifications:', error);
    }
  }, []);

  const loadNotifications = useCallback((): Notification[] => {
    try {
      const key = getStorageKey();
      const stored = localStorage.getItem(key);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      return parsed.map((notification: any) => ({
        ...notification,
        timestamp: new Date(notification.timestamp)
      }));
    } catch (error) {
      console.warn('Failed to load notifications:', error);
      return [];
    }
  }, []);

  const clearStoredNotifications = useCallback(() => {
    try {
      const key = getStorageKey();
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to clear notifications:', error);
    }
  }, []);

  return {
    saveNotifications,
    loadNotifications,
    clearStoredNotifications,
  };
}
