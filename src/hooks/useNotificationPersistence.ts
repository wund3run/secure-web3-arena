
import { useCallback } from 'react';
import { Notification } from '@/types/notification.types';

export const useNotificationPersistence = () => {
  const saveNotifications = useCallback((notifications: Notification[]) => {
    try {
      // Only save to localStorage if we have notifications and user is logged in
      if (notifications.length > 0) {
        const notificationsToSave = notifications.slice(0, 50); // Limit to 50 notifications
        localStorage.setItem('hawkly_notifications', JSON.stringify(notificationsToSave));
      }
    } catch (error) {
      console.warn('Failed to save notifications to localStorage:', error);
    }
  }, []);

  const loadNotifications = useCallback((): Notification[] => {
    try {
      const saved = localStorage.getItem('hawkly_notifications');
      if (saved) {
        const parsed = JSON.parse(saved);
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

  const clearPersistedNotifications = useCallback(() => {
    try {
      localStorage.removeItem('hawkly_notifications');
    } catch (error) {
      console.warn('Failed to clear persisted notifications:', error);
    }
  }, []);

  return {
    saveNotifications,
    loadNotifications,
    clearPersistedNotifications
  };
};
