import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { X, ExternalLink, CheckCheck, Bell } from 'lucide-react';
import { useNotifications } from '@/contexts/useNotifications';
import { cn } from '@/lib/utils';

export const NotificationList = () => {
  const { notifications, removeNotification, clearAll, markAsRead } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'audit': return 'bg-blue-100 text-blue-800';
      case 'message': return 'bg-green-100 text-green-800';
      case 'payment': return 'bg-yellow-100 text-yellow-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>No notifications yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Notifications</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="text-xs"
        >
          Clear all
        </Button>
      </div>
      
      <ScrollArea className="max-h-96">
        <div className="space-y-1">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors",
                !notification.read && "bg-blue-50"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{getNotificationIcon(notification.type)}</span>
                    <Badge 
                      variant="secondary" 
                      className={cn("text-xs", getCategoryColor(notification.category))}
                    >
                      {notification.category}
                    </Badge>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                    )}
                  </div>
                  
                  <h4 className="font-medium text-sm text-gray-900 truncate">
                    {notification.title}
                  </h4>
                  
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </span>
                    
                    <div className="flex items-center gap-1">
                      {notification.actionUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => window.location.href = notification.actionUrl!}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                      
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckCheck className="h-3 w-3" />
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                        onClick={() => removeNotification(notification.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
