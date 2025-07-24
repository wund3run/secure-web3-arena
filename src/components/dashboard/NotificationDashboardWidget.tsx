import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/contexts/useNotifications';
import { useBrowserNotifications } from '@/hooks/useBrowserNotifications';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { Bell, Settings, Wifi, WifiOff } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const NotificationDashboardWidget = () => {
  const { notifications, unreadCount } = useNotifications();
  const { canSendNotifications, requestPermission } = useBrowserNotifications();
  const { isConnected, connectionStatus } = useRealtimeSync({ channel: 'dashboard' });

  const recentNotifications = notifications.slice(0, 5);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isConnected ? "default" : "destructive"} className="text-xs">
              {isConnected ? (
                <>
                  <Wifi className="h-3 w-3 mr-1" />
                  Live
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3 mr-1" />
                  Offline
                </>
              )}
            </Badge>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
        </CardTitle>
        <CardDescription>
          Real-time notifications and system status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!canSendNotifications && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 mb-2">
              Enable browser notifications for real-time alerts
            </p>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={requestPermission}
              className="text-yellow-800 border-yellow-300"
            >
              Enable Notifications
            </Button>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Recent Activity</h4>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          
          {recentNotifications.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No recent notifications
            </p>
          ) : (
            <div className="space-y-2">
              {recentNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className="flex items-start gap-2 p-2 rounded-lg bg-muted/50 border text-xs"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{notification.title}</p>
                    <p className="text-muted-foreground truncate">{notification.message}</p>
                    <p className="text-muted-foreground mt-1">
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-2 border-t">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground">Connection:</span>
              <div className="font-medium capitalize">{connectionStatus}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Total:</span>
              <div className="font-medium">{notifications.length}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
