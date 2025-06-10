
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface RealtimeNotification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
}

interface UseRealtimeSyncOptions {
  channel: string;
  events?: string[];
  autoReconnect?: boolean;
  maxReconnectAttempts?: number;
}

export const useRealtimeSync = (options?: UseRealtimeSyncOptions) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [notifications, setNotifications] = useState<RealtimeNotification[]>([]);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  
  const channelRef = useRef<RealtimeChannel | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  
  const {
    channel: channelName = 'default',
    events = ['*'],
    autoReconnect = true,
    maxReconnectAttempts = 5
  } = options || {};

  const addNotification = useCallback((message: string, type: RealtimeNotification['type'] = 'info') => {
    const notification: RealtimeNotification = {
      id: crypto.randomUUID(),
      message,
      type,
      timestamp: new Date()
    };
    
    setNotifications(prev => [notification, ...prev.slice(0, 49)]); // Keep max 50
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 10000);
  }, []);

  const connect = useCallback(() => {
    if (channelRef.current) {
      channelRef.current.unsubscribe();
    }

    setConnectionStatus('connecting');
    
    const channel = supabase.channel(channelName, {
      config: {
        presence: { key: `user_${Date.now()}` }
      }
    });

    // Handle connection events
    channel
      .on('system', {}, (payload) => {
        console.log('Realtime system event:', payload);
        
        if (payload.status === 'ok') {
          setIsConnected(true);
          setConnectionStatus('connected');
          setReconnectAttempts(0);
          addNotification(`Connected to ${channelName}`, 'success');
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
        console.log('Database change:', payload);
        addNotification(`Database updated: ${payload.table}`, 'info');
      })
      .subscribe((status) => {
        console.log('Channel subscription status:', status);
        
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          setConnectionStatus('connected');
          setReconnectAttempts(0);
        } else if (status === 'CHANNEL_ERROR') {
          setIsConnected(false);
          setConnectionStatus('error');
          addNotification('Connection error occurred', 'error');
          
          if (autoReconnect && reconnectAttempts < maxReconnectAttempts) {
            const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
            
            reconnectTimeoutRef.current = setTimeout(() => {
              setReconnectAttempts(prev => prev + 1);
              connect();
            }, delay);
          }
        } else if (status === 'CLOSED') {
          setIsConnected(false);
          setConnectionStatus('disconnected');
          addNotification('Connection closed', 'warning');
        }
      });

    channelRef.current = channel;
  }, [channelName, autoReconnect, maxReconnectAttempts, reconnectAttempts, addNotification]);

  const disconnect = useCallback(() => {
    if (channelRef.current) {
      channelRef.current.unsubscribe();
      channelRef.current = null;
    }
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    setIsConnected(false);
    setConnectionStatus('disconnected');
    setReconnectAttempts(0);
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Auto-connect on mount
  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  // Handle browser visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !isConnected) {
        connect();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isConnected, connect]);

  return {
    isConnected,
    connectionStatus,
    notifications,
    connect,
    disconnect,
    clearNotifications,
    reconnectAttempts,
    maxReconnectAttempts
  };
};
