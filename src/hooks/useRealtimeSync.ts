import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
// Add missing types
interface RealtimeSyncOptions {
  channel?: string;
  userId?: string;
}

interface RealtimeSyncState {
  isConnected: boolean;
  lastSync: Date;
  syncStatus: 'idle' | 'syncing';
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
}

interface RealtimeNotification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
}

export function useRealtimeSync(options?: RealtimeSyncOptions) {
  const [state, setState] = useState<RealtimeSyncState>({
    isConnected: true,
    lastSync: new Date(),
    syncStatus: 'idle',
    connectionStatus: 'connected',
  });

  const channel = options?.channel || 'default';
  const userId = options?.userId;

  const [notifications, setNotifications] = useState<RealtimeNotification[]>([]);

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
        const notification: RealtimeNotification = {
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
    const notification: RealtimeNotification = {
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

  useEffect(() => {
    setState(prev => ({ ...prev, connectionStatus: 'connecting' }));

    const realtimeChannel = supabase
      .channel(channel)
      .on('presence', { event: 'sync' }, () => {
        setState(prev => ({
          ...prev,
          isConnected: true,
          connectionStatus: 'connected',
          lastSync: new Date(),
        }));
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
          setState(prev => ({
            ...prev,
            isConnected: true,
            connectionStatus: 'connected',
            lastSync: new Date(),
          }));
          // Track user presence if userId is provided
          if (userId) {
            realtimeChannel.track({
              user_id: userId,
              online_at: new Date().toISOString(),
            });
          }
        } else if (status === 'CHANNEL_ERROR') {
          setState(prev => ({
            ...prev,
            isConnected: false,
            connectionStatus: 'disconnected',
          }));
        }
      });

    return () => {
      realtimeChannel.unsubscribe();
      setState(prev => ({
        ...prev,
        isConnected: false,
        connectionStatus: 'disconnected',
      }));
    };
  }, [channel, userId]);

  return {
    notifications,
    isConnected: state.isConnected,
    connectionStatus: state.connectionStatus,
    lastSync: state.lastSync,
    clearNotifications,
    addNotification,
    forceSync,
    sendNotification,
  };
}
