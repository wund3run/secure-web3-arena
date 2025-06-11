
import { useCallback } from 'react';
import { useAuth } from '@/contexts/auth';
import { Notification } from '@/types/notification.types';

const STORAGE_KEY = 'hawkly_notifications';
const MAX_STORED_NOTIFICATIONS = 100;

export function useNotificationPersistence() {
  const { user } = useAuth();

  const getStorageKey = useCallback(() => {
    return user?.id ? `${STORAGE_KEY}_${user.id}` : STORAGE_KEY;
  }, [user?.id]);

  const saveNotifications = useCallback((notifications: Notification[]) => {
    try {
      const key = getStorageKey();
      const toStore = notifications.slice(0, MAX_STORED_NOTIFICATIONS);
      localStorage.setItem(key, JSON.stringify(toStore));
    } catch (error) {
      console.warn('Failed to persist notifications:', error);
    }
  }, [getStorageKey]);

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
  }, [getStorageKey]);

  const clearNotifications = useCallback(() => {
    try {
      const key = getStorageKey();
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to clear notifications:', error);
    }
  }, [getStorageKey]);

  return {
    saveNotifications,
    loadNotifications,
    clearNotifications
  };
}
