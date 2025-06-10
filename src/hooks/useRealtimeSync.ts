
import { useState, useEffect } from 'react';

interface RealtimeSyncState {
  isConnected: boolean;
  lastSync: Date | null;
  syncStatus: 'idle' | 'syncing' | 'error';
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
}

interface RealtimeSyncOptions {
  channel?: string;
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: Date;
}

export function useRealtimeSync(options?: RealtimeSyncOptions) {
  const [state, setState] = useState<RealtimeSyncState>({
    isConnected: true, // Simulate connected state for demo
    lastSync: new Date(),
    syncStatus: 'idle',
    connectionStatus: 'connected'
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate real-time connection monitoring
    const interval = setInterval(() => {
      const isConnected = Math.random() > 0.1; // 90% uptime simulation
      setState(prev => ({
        ...prev,
        lastSync: new Date(),
        isConnected,
        connectionStatus: isConnected ? 'connected' : 'disconnected'
      }));

      // Simulate occasional notifications
      if (Math.random() > 0.8) {
        const notification: Notification = {
          id: Date.now().toString(),
          type: ['info', 'success', 'warning'][Math.floor(Math.random() * 3)] as any,
          message: `System update from ${options?.channel || 'default'} channel`,
          timestamp: new Date()
        };
        setNotifications(prev => [notification, ...prev.slice(0, 9)]); // Keep last 10
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [options?.channel]);

  const forceSync = () => {
    setState(prev => ({ ...prev, syncStatus: 'syncing' }));
    
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        syncStatus: 'idle',
        lastSync: new Date(),
        isConnected: true,
        connectionStatus: 'connected'
      }));
    }, 1000);
  };

  const sendNotification = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const notification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 9)]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return {
    ...state,
    notifications,
    forceSync,
    sendNotification,
    clearNotifications
  };
}
