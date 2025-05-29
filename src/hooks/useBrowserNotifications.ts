
import { useState, useEffect } from 'react';

export const useBrowserNotifications = () => {
  const [canSendNotifications, setCanSendNotifications] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setCanSendNotifications(Notification.permission === 'granted');
      
      // Request permission if not already granted or denied
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          setCanSendNotifications(permission === 'granted');
        });
      }
    }
  }, []);

  const sendBrowserNotification = (title: string, options?: NotificationOptions) => {
    if (canSendNotifications && 'Notification' in window) {
      try {
        new Notification(title, options);
      } catch (error) {
        console.warn('Failed to send browser notification:', error);
      }
    }
  };

  return {
    canSendNotifications,
    sendBrowserNotification
  };
};
