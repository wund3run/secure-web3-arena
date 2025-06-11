
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';

interface RealtimeStatusIndicatorProps {
  channel?: string;
  className?: string;
}

export function RealtimeStatusIndicator({ 
  channel = 'global',
  className = ""
}: RealtimeStatusIndicatorProps) {
  const { isConnected, connectionStatus } = useRealtimeSync({ channel });

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="h-3 w-3" />;
      case 'connecting':
        return <Loader2 className="h-3 w-3 animate-spin" />;
      case 'disconnected':
      default:
        return <WifiOff className="h-3 w-3" />;
    }
  };

  const getStatusVariant = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'default';
      case 'connecting':
        return 'secondary';
      case 'disconnected':
      default:
        return 'destructive';
    }
  };

  return (
    <Badge 
      variant={getStatusVariant()} 
      className={`text-xs flex items-center gap-1 ${className}`}
    >
      {getStatusIcon()}
      <span className="capitalize">{connectionStatus}</span>
    </Badge>
  );
}
