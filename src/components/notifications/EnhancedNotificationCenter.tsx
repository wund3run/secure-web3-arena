import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Bell, 
  Settings, 
  Mail, 
  MessageSquare, 
  DollarSign, 
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  MailOpen
} from 'lucide-react';
import { useNotifications } from '@/contexts/useNotifications';
import { formatDistanceToNow } from 'date-fns';

export const EnhancedNotificationCenter = () => {
  const { notifications, markAsRead, markAllAsRead, clearAll } = useNotifications();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [auditAlerts, setAuditAlerts] = useState(true);
  const [messageAlerts, setMessageAlerts] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'audit': return <Shield className="h-4 w-4" />;
      case 'message': return <MessageSquare className="h-4 w-4" />;
      case 'payment': return <DollarSign className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read);
  const recentNotifications = notifications.slice(0, 10);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Notification Center</h1>
          {unreadNotifications.length > 0 && (
            <Badge variant="destructive">{unreadNotifications.length} unread</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <MailOpen className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline" onClick={clearAll}>
            Clear All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <ScrollArea className="h-[600px]">
            {notifications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No notifications yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <Card 
                    key={notification.id}
                    className={`transition-all cursor-pointer hover:shadow-md ${
                      !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/50' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {getCategoryIcon(notification.category)}
                            <h3 className="font-semibold text-sm truncate">
                              {notification.title}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {notification.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                            </span>
                            {!notification.read && (
                              <Badge variant="secondary" className="text-xs">New</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Delivery Methods</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <Label htmlFor="push-notifications">Browser Notifications</Label>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Categories</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <Label htmlFor="audit-alerts">Audit Updates</Label>
                    </div>
                    <Switch
                      id="audit-alerts"
                      checked={auditAlerts}
                      onCheckedChange={setAuditAlerts}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <Label htmlFor="message-alerts">Messages</Label>
                    </div>
                    <Switch
                      id="message-alerts"
                      checked={messageAlerts}
                      onCheckedChange={setMessageAlerts}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <Label htmlFor="payment-alerts">Payments & Escrow</Label>
                    </div>
                    <Switch
                      id="payment-alerts"
                      checked={paymentAlerts}
                      onCheckedChange={setPaymentAlerts}
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
