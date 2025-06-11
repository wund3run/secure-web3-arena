
import { useState, useEffect, useCallback } from 'react';

export function useBrowserNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported('Notification' in window);
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.warn('Failed to request notification permission:', error);
      return false;
    }
  }, [isSupported]);

  const sendBrowserNotification = useCallback((
    title: string, 
    options?: NotificationOptions
  ) => {
    if (!isSupported || permission !== 'granted') {
      return null;
    }

    try {
      const notification = new Notification(title, {
        icon: '/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png',
        badge: '/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png',
        requireInteraction: false,
        ...options
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
      console.warn('Failed to show browser notification:', error);
      return null;
    }
  }, [isSupported, permission]);

  return {
    isSupported,
    permission,
    canSendNotifications: isSupported && permission === 'granted',
    requestPermission,
    sendBrowserNotification
  };
}
