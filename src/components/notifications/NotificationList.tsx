
import React from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import { 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  XCircle, 
  MessageSquare,
  CreditCard,
  Shield,
  Settings,
  Trash2
} from 'lucide-react';

const getNotificationIcon = (type: string, category: string) => {
  if (category === 'audit') return <Shield className="h-4 w-4" />;
  if (category === 'payment') return <CreditCard className="h-4 w-4" />;
  if (category === 'message') return <MessageSquare className="h-4 w-4" />;
  if (category === 'system') return <Settings className="h-4 w-4" />;

  switch (type) {
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'error':
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Info className="h-4 w-4 text-blue-500" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'success': return 'text-green-600';
    case 'warning': return 'text-yellow-600';
    case 'error': return 'text-red-600';
    default: return 'text-blue-600';
  }
};

export const NotificationList = () => {
  const { notifications, markAsRead, removeNotification, clearAll } = useNotifications();

  if (notifications.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No notifications yet</p>
        <p className="text-xs mt-1">You'll see updates about your audits and payments here</p>
      </div>
    );
  }

  return (
    <div className="max-h-96">
      <div className="flex items-center justify-between p-4 border-b">
        <span className="text-sm font-medium">
          {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="text-xs h-6"
        >
          <Trash2 className="h-3 w-3 mr-1" />
          Clear all
        </Button>
      </div>
      
      <ScrollArea className="max-h-80">
        <div className="divide-y">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-muted/50 transition-colors ${
                !notification.read ? 'bg-blue-50/30 border-l-2 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {getNotificationIcon(notification.type, notification.category)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium leading-tight">
                        {notification.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {notification.message}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeNotification(notification.id)}
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <XCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getTypeColor(notification.type)}`}
                    >
                      {notification.category}
                    </Badge>
                    
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                  
                  {notification.actionUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 h-6 text-xs"
                      onClick={() => {
                        markAsRead(notification.id);
                        window.location.href = notification.actionUrl!;
                      }}
                    >
                      {notification.actionLabel || 'View'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
