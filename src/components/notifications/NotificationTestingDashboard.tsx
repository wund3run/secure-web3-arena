
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { Bell, Wifi, WifiOff } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function NotificationTestingDashboard() {
  const { notifications, isConnected, connectionStatus } = useRealtimeSync({ channel: 'notifications' });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Dashboard
          </div>
          <Badge variant={isConnected ? "default" : "destructive"}>
            {isConnected ? (
              <>
                <Wifi className="h-3 w-3 mr-1" />
                {connectionStatus}
              </>
            ) : (
              <>
                <WifiOff className="h-3 w-3 mr-1" />
                {connectionStatus}
              </>
            )}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Notifications:</span>
              <div className="font-bold text-lg">{notifications.length}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Connection Status:</span>
              <div className="font-medium capitalize">{connectionStatus}</div>
            </div>
          </div>

          {notifications.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Recent Notifications</h4>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {notifications.slice(0, 5).map((notification) => (
                  <div 
                    key={notification.id}
                    className="flex items-center justify-between p-2 rounded border text-xs"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{notification.message}</div>
                      <div className="text-muted-foreground">
                        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {notification.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
