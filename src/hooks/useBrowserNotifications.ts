
import { useState, useEffect } from 'react';

export function useBrowserNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    }
    return 'denied';
  };

  const sendBrowserNotification = (title: string, options?: NotificationOptions) => {
    if (permission === 'granted' && 'Notification' in window) {
      new Notification(title, options);
    }
  };

  const canSendNotifications = permission === 'granted';

  return {
    permission,
    requestPermission,
    sendBrowserNotification,
    canSendNotifications,
  };
}
