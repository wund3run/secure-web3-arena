
import { useState, useEffect } from 'react';

export const useBrowserNotifications = () => {
  const [canSendNotifications, setCanSendNotifications] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const supported = 'Notification' in window;
    setIsSupported(supported);
    
    if (supported) {
      setPermission(Notification.permission);
      setCanSendNotifications(Notification.permission === 'granted');
    }
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    if (!isSupported) return false;
    
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      const granted = result === 'granted';
      setCanSendNotifications(granted);
      return granted;
    } catch (error) {
      console.warn('Failed to request notification permission:', error);
      return false;
    }
  };

  const sendBrowserNotification = (title: string, options?: NotificationOptions) => {
    if (canSendNotifications && isSupported) {
      try {
        new Notification(title, options);
      } catch (error) {
        console.warn('Failed to send browser notification:', error);
      }
    }
  };

  return {
    canSendNotifications,
    sendBrowserNotification,
    requestPermission,
    permission,
    isSupported
  };
};
