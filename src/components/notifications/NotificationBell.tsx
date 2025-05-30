
import React, { useState } from 'react';
import { Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNotifications } from '@/contexts/NotificationContext';
import { NotificationList } from './NotificationList';
import { NotificationPreferences } from './NotificationPreferences';
import { NotificationSound } from './NotificationSound';

export const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const { unreadCount, markAllAsRead } = useNotifications();

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && unreadCount > 0) {
      // Mark all as read when opening the notifications
      setTimeout(() => markAllAsRead(), 2000);
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
        className="w-96 p-0 bg-background border shadow-lg z-50" 
        align="end"
        side="bottom"
      >
        <Tabs defaultValue="notifications" className="w-full">
          <div className="flex items-center justify-between p-4 border-b">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="notifications">
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </TabsTrigger>
            </TabsList>
            <NotificationSound />
          </div>
          
          <TabsContent value="notifications" className="m-0">
            <NotificationList />
          </TabsContent>
          
          <TabsContent value="settings" className="m-0 p-4">
            <NotificationPreferences />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
