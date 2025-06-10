
import { useCallback } from 'react';
import { Notification } from '@/types/notification.types';

const STORAGE_KEY = 'hawkly_notifications';
const MAX_STORED_NOTIFICATIONS = 100;

export const useNotificationPersistence = () => {
  const saveNotifications = useCallback((notifications: Notification[]) => {
    try {
      const toStore = notifications.slice(0, MAX_STORED_NOTIFICATIONS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch (error) {
      console.error('Failed to save notifications to localStorage:', error);
    }
  }, []);

  const loadNotifications = useCallback((): Notification[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }));
      }
    } catch (error) {
      console.error('Failed to load notifications from localStorage:', error);
    }
    return [];
  }, []);

  const clearStoredNotifications = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear stored notifications:', error);
    }
  }, []);

  return {
    saveNotifications,
    loadNotifications,
    clearStoredNotifications,
  };
};
