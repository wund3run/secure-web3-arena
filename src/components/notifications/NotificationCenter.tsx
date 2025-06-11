
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, CheckCircle, AlertCircle, FileText, MessageSquare, Calendar, Settings, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'audit_update' | 'message' | 'payment' | 'system' | 'milestone';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  isImportant: boolean;
  actionUrl?: string;
  senderName?: string;
  senderAvatar?: string;
  metadata?: any;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'audit_update',
    title: 'Audit Progress Update',
    message: 'Dr. Alexandra Petrov has completed the static analysis phase of your DeFi protocol audit. 2 potential issues identified.',
    timestamp: new Date(Date.now() - 300000),
    isRead: false,
    isImportant: true,
    senderName: 'Dr. Alexandra Petrov',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b332e234?w=100&h=100&fit=crop&crop=face',
    actionUrl: '/dashboard/audits/defi-protocol-v2'
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    message: 'Marcus Chen: "I\'ve reviewed the gas optimization suggestions. The changes look good to implement."',
    timestamp: new Date(Date.now() - 1800000),
    isRead: false,
    isImportant: false,
    senderName: 'Marcus Chen',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    actionUrl: '/dashboard/messages/marcus-chen'
  },
  {
    id: '3',
    type: 'milestone',
    title: 'Milestone Completed',
    message: 'The "Initial Security Review" milestone for your NFT Marketplace project has been completed.',
    timestamp: new Date(Date.now() - 3600000),
    isRead: true,
    isImportant: true,
    actionUrl: '/dashboard/audits/nft-marketplace'
  },
  {
    id: '4',
    type: 'payment',
    title: 'Payment Processed',
    message: 'Payment of $18,500 has been processed for the NFT Marketplace audit. Funds have been released to the auditor.',
    timestamp: new Date(Date.now() - 7200000),
    isRead: true,
    isImportant: false,
    actionUrl: '/dashboard/payments'
  },
  {
    id: '5',
    type: 'system',
    title: 'Security Alert',
    message: 'A new critical vulnerability has been discovered in Solidity compiler version 0.8.19. Please review your projects.',
    timestamp: new Date(Date.now() - 86400000),
    isRead: false,
    isImportant: true,
    actionUrl: '/security-alerts'
  }
];

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const importantCount = notifications.filter(n => n.isImportant && !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'unread':
        return notifications.filter(n => !n.isRead);
      case 'important':
        return notifications.filter(n => n.isImportant);
      default:
        return notifications;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'audit_update':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case 'milestone':
        return <CheckCircle className="h-4 w-4 text-purple-500" />;
      case 'payment':
        return <Calendar className="h-4 w-4 text-orange-500" />;
      case 'system':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  const filteredNotifications = getFilteredNotifications();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="default" className="h-5 w-5 rounded-full text-xs p-0 flex items-center justify-center">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="all" className="w-full">
          <div className="px-6 pb-3">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" onClick={() => setFilter('all')}>
                All ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread" onClick={() => setFilter('unread')}>
                Unread ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="important" onClick={() => setFilter('important')}>
                Important ({importantCount})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="divide-y">
              {filteredNotifications.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No notifications to show</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-muted/50 transition-colors ${
                      !notification.isRead ? 'bg-primary/5 border-l-2 border-primary' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {notification.senderAvatar ? (
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={notification.senderAvatar} />
                            <AvatarFallback>
                              {notification.senderName?.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">{notification.title}</p>
                              {notification.isImportant && (
                                <Badge variant="destructive" className="text-xs px-1.5 py-0">
                                  Important
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-muted-foreground">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              {notification.actionUrl && (
                                <Button variant="link" size="sm" className="text-xs px-0 h-auto">
                                  View Details
                                </Button>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 ml-2">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-8 w-8 p-0"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="unread" className="mt-0">
            <div className="divide-y">
              {filteredNotifications.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>All caught up! No unread notifications.</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 hover:bg-muted/50 transition-colors bg-primary/5 border-l-2 border-primary"
                  >
                    {/* Same notification structure as above */}
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {notification.senderAvatar ? (
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={notification.senderAvatar} />
                            <AvatarFallback>
                              {notification.senderName?.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">{notification.title}</p>
                              {notification.isImportant && (
                                <Badge variant="destructive" className="text-xs px-1.5 py-0">
                                  Important
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-muted-foreground">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              {notification.actionUrl && (
                                <Button variant="link" size="sm" className="text-xs px-0 h-auto">
                                  View Details
                                </Button>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 ml-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-8 w-8 p-0"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="important" className="mt-0">
            <div className="divide-y">
              {filteredNotifications.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No important notifications at this time.</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-muted/50 transition-colors ${
                      !notification.isRead ? 'bg-primary/5 border-l-2 border-primary' : ''
                    }`}
                  >
                    {/* Same notification structure as above */}
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {notification.senderAvatar ? (
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={notification.senderAvatar} />
                            <AvatarFallback>
                              {notification.senderName?.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">{notification.title}</p>
                              <Badge variant="destructive" className="text-xs px-1.5 py-0">
                                Important
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-muted-foreground">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              {notification.actionUrl && (
                                <Button variant="link" size="sm" className="text-xs px-0 h-auto">
                                  View Details
                                </Button>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 ml-2">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-8 w-8 p-0"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
