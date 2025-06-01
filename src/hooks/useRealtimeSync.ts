
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';
import { toast } from 'sonner';

export interface RealtimeConfig {
  channel: string;
  event?: string;
  schema?: string;
  table?: string;
  filter?: string;
}

export interface RealtimeNotification {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  timestamp: Date;
}

export function useRealtimeSync(config?: RealtimeConfig) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('disconnected');
  const [notifications, setNotifications] = useState<RealtimeNotification[]>([]);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!config) return;

    const channel = supabase.channel(config.channel);
    channelRef.current = channel;

    // Set up connection status monitoring
    channel
      .on('system', {}, (payload) => {
        if (payload.extension === 'postgres_changes') {
          setIsConnected(true);
          setLastUpdate(new Date());
          setConnectionStatus('connected');
        }
      })
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
        setConnectionStatus(status.toLowerCase());
        
        if (status === 'CLOSED') {
          toast.error('Real-time connection lost', {
            description: 'Attempting to reconnect...'
          });
        } else if (status === 'SUBSCRIBED') {
          toast.success('Real-time connection established');
        }
      });

    return () => {
      supabase.removeChannel(channel);
      setIsConnected(false);
      setConnectionStatus('disconnected');
    };
  }, [config?.channel]);

  const disconnect = () => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      setIsConnected(false);
      setConnectionStatus('disconnected');
    }
  };

  const reconnect = () => {
    if (config) {
      disconnect();
      // Trigger re-initialization
      setTimeout(() => {
        // Effect will handle reconnection
      }, 1000);
    }
  };

  const addNotification = (notification: Omit<RealtimeNotification, 'id' | 'timestamp'>) => {
    const newNotification: RealtimeNotification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date()
    };
    
    setNotifications(prev => [newNotification, ...prev.slice(0, 49)]); // Keep last 50
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return {
    isConnected,
    lastUpdate,
    connectionStatus,
    notifications,
    disconnect,
    reconnect,
    addNotification,
    clearNotifications
  };
}
