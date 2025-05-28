
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useNotifications } from '@/contexts/NotificationContext';
import { NotificationList } from './NotificationList';

export const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const { unreadCount, markAllAsRead } = useNotifications();

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && unreadCount > 0) {
      // Mark all as read when opening the notifications
      setTimeout(() => markAllAsRead(), 1000);
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 bg-background border shadow-lg z-50" 
        align="end"
        side="bottom"
      >
        <NotificationList />
      </PopoverContent>
    </Popover>
  );
};
