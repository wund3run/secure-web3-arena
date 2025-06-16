
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RealtimeNotification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
}

interface UseRealtimeSyncProps {
  channel: string;
  userId?: string;
}

export function useRealtimeSync({ channel, userId }: UseRealtimeSyncProps) {
  const [notifications, setNotifications] = useState<RealtimeNotification[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const [lastSync, setLastSync] = useState<Date | null>(null);

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
