
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useRealtimeSync() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check initial connection status
    setIsConnected(supabase.realtime.isConnected());

    // Listen for connection state changes
    const channel = supabase.channel('connection-status');
    
    channel
      .on('system', {}, (payload) => {
        if (payload.type === 'connected') {
          setIsConnected(true);
        } else if (payload.type === 'disconnected') {
          setIsConnected(false);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { isConnected };
}
