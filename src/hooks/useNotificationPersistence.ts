
import { useCallback } from 'react';
import { Notification } from '@/types/notification.types';

export const useNotificationPersistence = () => {
  const saveNotifications = useCallback((notifications: Notification[]) => {
    try {
      localStorage.setItem('hawkly_notifications', JSON.stringify(notifications));
    } catch (error) {
      console.warn('Failed to save notifications to localStorage:', error);
    }
  }, []);

  const loadNotifications = useCallback((): Notification[] => {
    try {
      const stored = localStorage.getItem('hawkly_notifications');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert timestamp strings back to Date objects
        return parsed.map((notification: any) => ({
          ...notification,
          timestamp: new Date(notification.timestamp)
        }));
      }
    } catch (error) {
      console.warn('Failed to load notifications from localStorage:', error);
    }
    return [];
  }, []);

  return {
    saveNotifications,
    loadNotifications
  };
};
