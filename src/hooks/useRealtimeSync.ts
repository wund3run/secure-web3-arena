
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Notification {
  id: string;
  message: string;
  type: string;
  timestamp: Date;
}

export function useRealtimeSync() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setConnectionStatus('connecting');
    
    // Check initial connection status
    const connected = supabase.realtime.isConnected();
    setIsConnected(connected);
    setConnectionStatus(connected ? 'connected' : 'disconnected');

    // Listen for connection state changes
    const channel = supabase.channel('connection-status');
    
    channel
      .on('system', {}, (payload) => {
        if (payload.type === 'connected') {
          setIsConnected(true);
          setConnectionStatus('connected');
        } else if (payload.type === 'disconnected') {
          setIsConnected(false);
          setConnectionStatus('disconnected');
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return { 
    isConnected, 
    connectionStatus,
    notifications,
    clearNotifications
  };
}
