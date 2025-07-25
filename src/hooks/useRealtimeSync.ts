import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RealtimeNotification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
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

  const addNotification = (notification: Omit<RealtimeNotification, 'id' | 'timestamp'>) => {
    const newNotification: RealtimeNotification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 49)]); // Keep max 50 notifications
  };

  const forceSync = () => {
    setLastSync(new Date());
    // Trigger a manual sync by refreshing the connection
    setConnectionStatus('connecting');
  };

  const sendNotification = (notification: Omit<RealtimeNotification, 'id' | 'timestamp'>) => {
    addNotification(notification);
  };

  useEffect(() => {
    setConnectionStatus('connecting');
    
    const realtimeChannel = supabase
      .channel(channel)
      .on('presence', { event: 'sync' }, () => {
        setIsConnected(true);
        setConnectionStatus('connected');
        setLastSync(new Date());
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        addNotification({
          message: `User ${key} joined`,
          type: 'info',
        });
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        addNotification({
          message: `User ${key} left`,
          type: 'info',
        });
      })
      .on('broadcast', { event: 'notification' }, ({ payload }) => {
        addNotification(payload);
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          setConnectionStatus('connected');
          setLastSync(new Date());
          
          // Track user presence if userId is provided
          if (userId) {
            realtimeChannel.track({
              user_id: userId,
              online_at: new Date().toISOString(),
            });
          }
        } else if (status === 'CHANNEL_ERROR') {
          setIsConnected(false);
          setConnectionStatus('disconnected');
        }
      });

    return () => {
      realtimeChannel.unsubscribe();
      setIsConnected(false);
      setConnectionStatus('disconnected');
    };
  }, [channel, userId]);

  return {
    notifications,
    isConnected,
    connectionStatus,
    lastSync,
    clearNotifications,
    addNotification,
    forceSync,
    sendNotification,
  };
}
