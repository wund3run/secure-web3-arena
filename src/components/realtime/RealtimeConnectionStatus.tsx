
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const RealtimeConnectionStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const channel = supabase.channel('connection-status');
    
    channel
      .on('system', {}, (payload) => {
        if (payload.event === 'connected') {
          setIsConnected(true);
          setReconnecting(false);
        } else if (payload.event === 'disconnected') {
          setIsConnected(false);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleReconnect = async () => {
    setReconnecting(true);
    try {
      // Attempt to reconnect
      await supabase.realtime.disconnect();
      await supabase.realtime.connect();
    } catch (error) {
      console.error('Reconnection failed:', error);
    } finally {
      setReconnecting(false);
    }
  };

  if (isConnected) {
    return (
      <Badge variant="default" className="flex items-center gap-1 bg-green-500">
        <Wifi className="h-3 w-3" />
        Online
      </Badge>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Badge variant="error" className="flex items-center gap-1">
        <WifiOff className="h-3 w-3" />
        Offline
      </Badge>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleReconnect}
        disabled={reconnecting}
        className="h-6 px-2"
      >
        <RefreshCw className={`h-3 w-3 ${reconnecting ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  );
};
