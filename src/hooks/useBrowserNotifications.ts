
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth';

export const useBrowserNotifications = () => {
  const { user } = useAuth();
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported('Notification' in window);
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!isSupported) return false;
    
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  };

  const sendBrowserNotification = (title: string, options?: NotificationOptions) => {
    if (!isSupported || permission !== 'granted' || !user) return;

    try {
      const notification = new Notification(title, {
        icon: '/hawkly-logo.svg',
        badge: '/hawkly-logo.svg',
        tag: 'hawkly-notification',
        requireInteraction: false,
        ...options,
      });

      // Auto close after 5 seconds
      setTimeout(() => notification.close(), 5000);

      return notification;
    } catch (error) {
      console.error('Failed to send browser notification:', error);
    }
  };

  return {
    isSupported,
    permission,
    requestPermission,
    sendBrowserNotification,
    canSendNotifications: permission === 'granted',
  };
};
