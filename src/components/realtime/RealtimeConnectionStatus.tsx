
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function RealtimeConnectionStatus() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  useEffect(() => {
    const testChannel = supabase.channel('connection-test');
    
    testChannel.subscribe((status) => {
      setIsConnected(status === 'SUBSCRIBED');
      setLastChecked(new Date());
    });

    return () => {
      supabase.removeChannel(testChannel);
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {isConnected ? (
          <Wifi className="h-4 w-4 text-green-500" />
        ) : (
          <WifiOff className="h-4 w-4 text-red-500" />
        )}
        <Badge variant={isConnected ? "default" : "destructive"} className="text-xs">
          {isConnected ? "Real-time Active" : "Disconnected"}
        </Badge>
      </div>
      {lastChecked && (
        <span className="text-xs text-muted-foreground">
          Last checked: {lastChecked.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}
