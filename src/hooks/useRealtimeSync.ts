
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface RealtimeNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: Date;
}

interface UseRealtimeSyncOptions {
  channel: string;
  events?: string[];
}

export const useRealtimeSync = (options?: UseRealtimeSyncOptions) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const [notifications, setNotifications] = useState<RealtimeNotification[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  useEffect(() => {
    if (!options?.channel) return;

    const channelName = `realtime_${options.channel}`;
    setConnectionStatus('connecting');

    const realtimeChannel = supabase
      .channel(channelName)
      .on('presence', { event: 'sync' }, () => {
        setIsConnected(true);
        setConnectionStatus('connected');
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key, leftPresences);
      })
      .on('broadcast', { event: 'notification' }, (payload: any) => {
        // Ensure the type is valid, default to 'info' if not
        const validTypes = ['info', 'success', 'warning', 'error'] as const;
        const payloadType = payload.type as string;
        const notificationType: 'info' | 'success' | 'warning' | 'error' = 
          validTypes.includes(payloadType as any) ? payloadType as any : 'info';
        
        const notification: RealtimeNotification = {
          id: crypto.randomUUID(),
          type: notificationType,
          message: payload.message || 'New notification',
          timestamp: new Date(),
        };
        setNotifications(prev => [notification, ...prev].slice(0, 50)); // Keep last 50
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          setConnectionStatus('connected');
        } else if (status === 'CHANNEL_ERROR') {
          setIsConnected(false);
          setConnectionStatus('disconnected');
        }
      });

    setChannel(realtimeChannel);

    return () => {
      realtimeChannel.unsubscribe();
      setIsConnected(false);
      setConnectionStatus('disconnected');
    };
  }, [options?.channel]);

  const sendNotification = useCallback((type: RealtimeNotification['type'], message: string) => {
    if (channel) {
      channel.send({
        type: 'broadcast',
        event: 'notification',
        payload: { type, message }
      });
    }
  }, [channel]);

  return {
    isConnected,
    connectionStatus,
    notifications,
    clearNotifications,
    sendNotification,
  };
};
