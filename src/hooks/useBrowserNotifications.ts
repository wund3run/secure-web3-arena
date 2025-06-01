
import { useState, useEffect, useCallback } from 'react';

export const useBrowserNotifications = () => {
  const [canSendNotifications, setCanSendNotifications] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
      setCanSendNotifications(Notification.permission === 'granted');
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      setCanSendNotifications(result === 'granted');
      return result;
    }
    return 'denied';
  }, []);

  const sendBrowserNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (canSendNotifications && 'Notification' in window) {
      const notification = new Notification(title, {
        icon: '/manifest.json',
        badge: '/manifest.json',
        timestamp: Date.now(),
        ...options,
      });

      notification.onclick = () => {
        window.focus();
        if (options?.data?.actionUrl) {
          window.location.href = options.data.actionUrl;
        }
        notification.close();
      };

      // Auto-close after 5 seconds
      setTimeout(() => notification.close(), 5000);

      return notification;
    }
    return null;
  }, [canSendNotifications]);

  return {
    canSendNotifications,
    permission,
    requestPermission,
    sendBrowserNotification,
  };
};
