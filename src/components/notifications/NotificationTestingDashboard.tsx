
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNotifications } from '@/contexts/NotificationContext';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { useBrowserNotifications } from '@/hooks/useBrowserNotifications';
import { Badge } from '@/components/ui/badge';
import { Activity, Bell, Wifi, WifiOff, CheckCircle, XCircle } from 'lucide-react';

export const NotificationTestingDashboard = () => {
  const { notifications, unreadCount } = useNotifications();
  const { isConnected, connectionStatus } = useRealtimeSync({ channel: 'dashboard' });
  const { canSendNotifications, permission } = useBrowserNotifications();

  const stats = {
    total: notifications.length,
    unread: unreadCount,
    read: notifications.length - unreadCount,
    byType: notifications.reduce((acc, notif) => {
      acc[notif.type] = (acc[notif.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byCategory: notifications.reduce((acc, notif) => {
      acc[notif.category] = (acc[notif.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Notification System Dashboard</h2>
        <p className="text-muted-foreground">
          Monitor and test the notification system functionality
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Real-time</span>
                <Badge variant={isConnected ? "default" : "destructive"} className="text-xs">
                  {isConnected ? (
                    <>
                      <Wifi className="h-3 w-3 mr-1" />
                      Connected
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-3 w-3 mr-1" />
                      Disconnected
                    </>
                  )}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Browser</span>
                <Badge variant={canSendNotifications ? "default" : "secondary"} className="text-xs">
                  {canSendNotifications ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Enabled
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 mr-1" />
                      Disabled
                    </>
                  )}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Permission</span>
                <Badge 
                  variant={permission === 'granted' ? "default" : "secondary"} 
                  className="text-xs capitalize"
                >
                  {permission}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notification Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Total</span>
                <span className="text-sm font-medium">{stats.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Unread</span>
                <Badge variant="destructive" className="text-xs">
                  {stats.unread}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Read</span>
                <span className="text-sm font-medium">{stats.read}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">By Type</p>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(stats.byType).map(([type, count]) => (
                    <Badge key={type} variant="outline" className="text-xs">
                      {type}: {count}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">By Category</p>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(stats.byCategory).map(([category, count]) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}: {count}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest notifications received in this session
          </CardDescription>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No notifications yet. Use the tester to generate some!
            </p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {notifications.slice(0, 10).map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-2 p-2 rounded-lg bg-muted/50 border text-xs"
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    notification.type === 'success' ? 'bg-green-500' :
                    notification.type === 'error' ? 'bg-red-500' :
                    notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{notification.title}</p>
                    <p className="text-muted-foreground truncate">{notification.message}</p>
                    <p className="text-muted-foreground mt-1">
                      {notification.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {notification.category}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
