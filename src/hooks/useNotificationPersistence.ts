
import { useCallback } from 'react';
import { Notification } from '@/types/notification.types';

const NOTIFICATIONS_KEY = 'hawkly_notifications';
const MAX_STORED_NOTIFICATIONS = 100;

export function useNotificationPersistence() {
  const saveNotifications = useCallback((notifications: Notification[]) => {
    try {
      const toStore = notifications.slice(0, MAX_STORED_NOTIFICATIONS);
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(toStore));
    } catch (error) {
      console.warn('Failed to save notifications to localStorage:', error);
    }
  }, []);

  const loadNotifications = useCallback((): Notification[] => {
    try {
      const stored = localStorage.getItem(NOTIFICATIONS_KEY);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed.map(notification => ({
        ...notification,
        timestamp: new Date(notification.timestamp),
      })) : [];
    } catch (error) {
      console.warn('Failed to load notifications from localStorage:', error);
      return [];
    }
  }, []);

  const clearStoredNotifications = useCallback(() => {
    try {
      localStorage.removeItem(NOTIFICATIONS_KEY);
    } catch (error) {
      console.warn('Failed to clear notifications from localStorage:', error);
    }
  }, []);

  return {
    saveNotifications,
    loadNotifications,
    clearStoredNotifications,
  };
}
