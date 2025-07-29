
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface WebSocketState {
  isConnected: boolean;
  connectionAttempts: number;
  lastPing: Date | null;
}

export const useWebSocketConnection = () => {
  const [state, setState] = useState<WebSocketState>({
    isConnected: false,
    connectionAttempts: 0,
    lastPing: null,
  });

  const checkConnection = useCallback(async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .select('count(*)', { count: 'exact', head: true });
      
      if (error) {
        setState(prev => ({ ...prev, isConnected: false }));
        return false;
      }
      
      const realtimeConnected = supabase.realtime.isConnected();
      setState(prev => ({ 
        ...prev, 
        isConnected: realtimeConnected,
        lastPing: new Date()
      }));
      return realtimeConnected;
    } catch (error: unknown) {
      console.error('Connection check failed:', error);
      setState(prev => ({ ...prev, isConnected: false }));
      return false;
    }
  }, []);

  const reconnect = useCallback(async () => {
    setState(prev => ({ 
      ...prev, 
      connectionAttempts: prev.connectionAttempts + 1 
    }));
    
    try {
      await supabase.realtime.disconnect();
      await new Promise(resolve => setTimeout(resolve, 1000));
      await supabase.realtime.connect();
      await checkConnection();
    } catch (error: unknown) {
      console.error('Reconnection failed:', error);
      toast.error('Failed to reconnect to real-time services');
    }
  }, [checkConnection]);

  useEffect(() => {
    const pingInterval = setInterval(checkConnection, 30000); // Check every 30 seconds
    checkConnection(); // Initial check

    return () => clearInterval(pingInterval);
  }, [checkConnection]);

  return {
    ...state,
    reconnect,
    checkConnection,
  };
};
