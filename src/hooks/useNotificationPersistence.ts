
import { useCallback } from 'react';
import { Notification } from '@/types/notification.types';

export function useNotificationPersistence() {
  const saveNotifications = useCallback((notifications: Notification[]) => {
    try {
      localStorage.setItem('hawkly_notifications', JSON.stringify(notifications));
    } catch (error) {
      console.error('Failed to save notifications:', error);
    }
  }, []);

  const loadNotifications = useCallback((): Notification[] => {
    try {
      const stored = localStorage.getItem('hawkly_notifications');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }));
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
    return [];
  }, []);

  return { saveNotifications, loadNotifications };
}
