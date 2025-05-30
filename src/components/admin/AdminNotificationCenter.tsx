
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, AlertTriangle, CheckCircle, Clock, X } from "lucide-react";
import { toast } from "sonner";

interface AdminNotification {
  id: string;
  type: "critical" | "warning" | "info" | "success";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
}

export function AdminNotificationCenter() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([
    {
      id: "1",
      type: "critical",
      title: "High Priority Audit",
      message: "Critical vulnerability found in DeFi Protocol audit requires immediate attention",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      actionRequired: true
    },
    {
      id: "2", 
      type: "warning",
      title: "Auditor Verification Pending",
      message: "3 new auditor applications waiting for verification review",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      actionRequired: true
    },
    {
      id: "3",
      type: "success",
      title: "Audit Completed",
      message: "NFT Marketplace security audit completed successfully",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true
    },
    {
      id: "4",
      type: "info", 
      title: "System Maintenance",
      message: "Scheduled maintenance window completed without issues",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const getNotificationVariant = (type: string) => {
    switch (type) {
      case "critical":
        return "destructive";
      case "warning":
        return "secondary";
      case "success":
        return "default";
      default:
        return "outline";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success("Notification dismissed");
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
          >
            Mark all read
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border transition-colors ${
                  !notification.read ? "bg-muted/50 border-primary/20" : "bg-muted/20"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium truncate">
                          {notification.title}
                        </p>
                        <Badge variant={getNotificationVariant(notification.type) as any} className="text-xs">
                          {notification.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(notification.timestamp)}
                        </span>
                        {notification.actionRequired && (
                          <Badge variant="outline" className="text-xs">
                            Action Required
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <CheckCircle className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissNotification(notification.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
