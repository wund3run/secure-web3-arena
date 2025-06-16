
import { useState, useEffect, useCallback } from 'react';

export function useBrowserNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [canSendNotifications, setCanSendNotifications] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
      setCanSendNotifications(Notification.permission === 'granted');
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      setCanSendNotifications(result === 'granted');
      return result === 'granted';
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }, []);

  const sendBrowserNotification = useCallback((
    title: string,
    options?: NotificationOptions & { data?: any }
  ) => {
    if (!canSendNotifications) return null;

    try {
      const notification = new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options,
      });

      // Auto-close after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

      // Handle click events
      notification.onclick = () => {
        window.focus();
        if (options?.data?.actionUrl) {
          window.location.href = options.data.actionUrl;
        }
        notification.close();
      };

      return notification;
    } catch (error) {
      console.error('Failed to send browser notification:', error);
      return null;
    }
  }, [canSendNotifications]);

  return {
    permission,
    canSendNotifications,
    requestPermission,
    sendBrowserNotification,
  };
}
