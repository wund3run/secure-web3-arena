
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Bell, BellOff, Clock, AlertTriangle, CheckCircle, 
  Info, Zap, Settings, X, Volume2
} from "lucide-react";
import { toast } from "sonner";

interface NotificationPreferences {
  auditUpdates: boolean;
  securityAlerts: boolean;
  marketTrends: boolean;
  systemMaintenance: boolean;
  promotions: boolean;
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
  quietHours: boolean;
  quietStart: string;
  quietEnd: string;
  soundEnabled: boolean;
  volume: number;
}

interface SmartNotification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  actionRequired: boolean;
  read: boolean;
  scheduled?: Date;
}

export function SmartNotificationSystem() {
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    auditUpdates: true,
    securityAlerts: true,
    marketTrends: false,
    systemMaintenance: true,
    promotions: false,
    frequency: 'immediate',
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '08:00',
    soundEnabled: true,
    volume: 0.7
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage
    const saved = localStorage.getItem('notification-preferences');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Simulate incoming notifications
    const interval = setInterval(() => {
      generateSmartNotification();
    }, 30000); // Every 30 seconds for demo

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Save preferences
    localStorage.setItem('notification-preferences', JSON.stringify(preferences));
  }, [preferences]);

  const generateSmartNotification = () => {
    const sampleNotifications = [
      {
        type: 'info' as const,
        title: 'New Audit Request',
        message: 'A new smart contract audit request matches your expertise',
        priority: 'medium' as const,
        category: 'auditUpdates',
        actionRequired: true
      },
      {
        type: 'warning' as const,
        title: 'Security Alert',
        message: 'Critical vulnerability detected in popular DeFi protocol',
        priority: 'high' as const,
        category: 'securityAlerts',
        actionRequired: false
      },
      {
        type: 'success' as const,
        title: 'Audit Completed',
        message: 'Your audit report has been successfully submitted',
        priority: 'low' as const,
        category: 'auditUpdates',
        actionRequired: false
      },
      {
        type: 'info' as const,
        title: 'Market Trend',
        message: 'Cross-chain bridge audits increasing by 45% this month',
        priority: 'low' as const,
        category: 'marketTrends',
        actionRequired: false
      }
    ];

    const sample = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)];
    
    // Check if category is enabled
    if (!preferences[sample.category as keyof NotificationPreferences]) {
      return;
    }

    // Check quiet hours
    if (preferences.quietHours && isInQuietHours()) {
      return;
    }

    const notification: SmartNotification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...sample,
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [notification, ...prev.slice(0, 49)]); // Keep only 50 most recent

    // Show browser notification
    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      });
    }

    // Show toast based on priority
    if (notification.priority === 'urgent' || notification.priority === 'high') {
      toast.error(notification.title, {
        description: notification.message
      });
    } else if (notification.type === 'success') {
      toast.success(notification.title, {
        description: notification.message
      });
    } else {
      toast.info(notification.title, {
        description: notification.message
      });
    }

    // Play sound if enabled
    if (preferences.soundEnabled) {
      playNotificationSound();
    }
  };

  const isInQuietHours = (): boolean => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const [startHour, startMin] = preferences.quietStart.split(':').map(Number);
    const [endHour, endMin] = preferences.quietEnd.split(':').map(Number);
    
    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;
    
    if (startTime <= endTime) {
      return currentTime >= startTime && currentTime <= endTime;
    } else {
      return currentTime >= startTime || currentTime <= endTime;
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio('/notification-sound.mp3');
    audio.volume = preferences.volume;
    audio.play().catch(() => {
      // Ignore audio play errors
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-4">
      {/* Notification Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Smart Notifications</CardTitle>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              >
                <Settings className="h-4 w-4" />
              </Button>
              {unreadCount > 0 && (
                <Button size="sm" variant="outline" onClick={markAllAsRead}>
                  Mark All Read
                </Button>
              )}
              {notifications.length > 0 && (
                <Button size="sm" variant="outline" onClick={clearAllNotifications}>
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        {/* Settings Panel */}
        {isSettingsOpen && (
          <CardContent className="border-t">
            <div className="space-y-4">
              <h4 className="font-medium">Notification Preferences</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Audit Updates</label>
                    <Switch
                      checked={preferences.auditUpdates}
                      onCheckedChange={(checked) =>
                        setPreferences(prev => ({ ...prev, auditUpdates: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Security Alerts</label>
                    <Switch
                      checked={preferences.securityAlerts}
                      onCheckedChange={(checked) =>
                        setPreferences(prev => ({ ...prev, securityAlerts: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Market Trends</label>
                    <Switch
                      checked={preferences.marketTrends}
                      onCheckedChange={(checked) =>
                        setPreferences(prev => ({ ...prev, marketTrends: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">System Maintenance</label>
                    <Switch
                      checked={preferences.systemMaintenance}
                      onCheckedChange={(checked) =>
                        setPreferences(prev => ({ ...prev, systemMaintenance: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Sound Notifications</label>
                    <Switch
                      checked={preferences.soundEnabled}
                      onCheckedChange={(checked) =>
                        setPreferences(prev => ({ ...prev, soundEnabled: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Quiet Hours</label>
                    <Switch
                      checked={preferences.quietHours}
                      onCheckedChange={(checked) =>
                        setPreferences(prev => ({ ...prev, quietHours: checked }))
                      }
                    />
                  </div>
                </div>
              </div>

              {preferences.soundEnabled && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    <label className="text-sm">Volume</label>
                  </div>
                  <Slider
                    value={[preferences.volume * 100]}
                    onValueChange={([value]) =>
                      setPreferences(prev => ({ ...prev, volume: value / 100 }))
                    }
                    max={100}
                    step={10}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Notifications List */}
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-8">
              <div className="text-center">
                <BellOff className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No notifications yet</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`${!notification.read ? 'border-l-4 border-l-primary' : ''} ${
                notification.priority === 'urgent' ? 'border-red-500' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h4>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getPriorityColor(notification.priority)}`}
                        >
                          {notification.priority}
                        </Badge>
                        {notification.actionRequired && (
                          <Badge variant="secondary" className="text-xs">
                            <Zap className="h-3 w-3 mr-1" />
                            Action Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {notification.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 ml-2">
                    {!notification.read && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark Read
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
