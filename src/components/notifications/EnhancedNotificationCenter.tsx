
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { 
  Bell, 
  Filter, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  MessageSquare,
  Shield,
  CreditCard,
  Clock,
  MarkAsUnread,
  Archive,
  Trash2
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'audit' | 'message' | 'payment' | 'system' | 'security';
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: {
    auditId?: string;
    senderId?: string;
    amount?: string;
  };
}

export const EnhancedNotificationCenter = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  // Mock notifications data
  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'Audit Milestone Completed',
      message: 'Code review phase completed for DeFi Lending Protocol audit',
      type: 'success',
      category: 'audit',
      priority: 'high',
      timestamp: '2025-01-15T10:30:00Z',
      read: false,
      actionUrl: '/audit/defi-lending',
      actionLabel: 'View Progress',
      metadata: { auditId: 'audit-1' }
    },
    {
      id: '2',
      title: 'Critical Vulnerability Found',
      message: 'Reentrancy vulnerability identified in withdraw function',
      type: 'error',
      category: 'security',
      priority: 'critical',
      timestamp: '2025-01-15T09:45:00Z',
      read: false,
      actionUrl: '/audit/defi-lending/findings',
      actionLabel: 'View Details'
    },
    {
      id: '3',
      title: 'New Message from Auditor',
      message: 'Alex Chen sent you a message about the audit findings',
      type: 'info',
      category: 'message',
      priority: 'medium',
      timestamp: '2025-01-15T09:15:00Z',
      read: true,
      actionUrl: '/messages/alex-chen',
      actionLabel: 'Read Message',
      metadata: { senderId: 'alex-chen' }
    },
    {
      id: '4',
      title: 'Payment Processed',
      message: 'Payment of $5,000 for audit services has been processed',
      type: 'success',
      category: 'payment',
      priority: 'medium',
      timestamp: '2025-01-14T16:20:00Z',
      read: true,
      actionUrl: '/payments/invoice-123',
      actionLabel: 'View Receipt',
      metadata: { amount: '$5,000' }
    },
    {
      id: '5',
      title: 'System Maintenance Scheduled',
      message: 'Platform maintenance scheduled for tonight 2:00 AM - 4:00 AM UTC',
      type: 'warning',
      category: 'system',
      priority: 'low',
      timestamp: '2025-01-14T12:00:00Z',
      read: true
    }
  ];

  const [notifications, setNotifications] = useState(mockNotifications);

  const getNotificationIcon = (type: string, category: string) => {
    if (category === 'audit') return <Shield className="h-4 w-4" />;
    if (category === 'message') return <MessageSquare className="h-4 w-4" />;
    if (category === 'payment') return <CreditCard className="h-4 w-4" />;
    
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'unread' && !notification.read) ||
                         (activeFilter === 'priority' && ['critical', 'high'].includes(notification.priority)) ||
                         notification.category === activeFilter;
    
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalCount = notifications.filter(n => n.priority === 'critical').length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Notification Center</h1>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount} unread</Badge>
            )}
            {criticalCount > 0 && (
              <Badge variant="outline" className="border-red-500 text-red-500">
                {criticalCount} critical
              </Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            Mark All Read
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('all')}
              >
                All
              </Button>
              <Button
                variant={activeFilter === 'unread' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('unread')}
              >
                Unread
              </Button>
              <Button
                variant={activeFilter === 'priority' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('priority')}
              >
                Priority
              </Button>
              <Button
                variant={activeFilter === 'audit' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('audit')}
              >
                Audits
              </Button>
              <Button
                variant={activeFilter === 'message' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('message')}
              >
                Messages
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No notifications found</p>
              </div>
            ) : (
              <div className="divide-y">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-muted/50 transition-colors ${
                      !notification.read ? 'bg-blue-50/50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type, notification.category)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`font-medium text-sm ${!notification.read ? 'font-semibold' : ''}`}>
                                {notification.title}
                              </h3>
                              <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`} />
                              <Badge variant="outline" className="text-xs">
                                {notification.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              {notification.actionUrl && (
                                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                                  {notification.actionLabel || 'View'}
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-auto p-1"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-auto p-1 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
