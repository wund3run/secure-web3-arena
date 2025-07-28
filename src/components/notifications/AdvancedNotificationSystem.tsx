
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Settings,
  Filter,
  Archive,
  Star,
  Clock,
  Shield,
  Zap,
  MessageSquare,
  FileText,
  Users,
  TrendingUp
} from 'lucide-react';

export function AdvancedNotificationSystem() {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'security_critical',
      title: 'Critical Security Vulnerability Detected',
      message: 'Reentrancy vulnerability found in smart contract withdraw function',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      priority: 'critical',
      category: 'security',
      actionRequired: true,
      relatedUsers: ['Alex Chen', 'Sarah Kim']
    },
    {
      id: '2',
      type: 'milestone_complete',
      title: 'Audit Milestone Completed',
      message: 'Phase 2 security assessment has been successfully completed',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      priority: 'high',
      category: 'project',
      actionRequired: false,
      relatedUsers: ['Mike Johnson']
    },
    {
      id: '3',
      type: 'team_update',
      title: 'New Team Member Added',
      message: 'Emma Davis has joined the Security Team Alpha',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      priority: 'medium',
      category: 'team',
      actionRequired: false,
      relatedUsers: ['Emma Davis']
    },
    {
      id: '4',
      type: 'deadline_reminder',
      title: 'Audit Deadline Approaching',
      message: 'DeFi Protocol audit is due in 2 days',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true,
      priority: 'medium',
      category: 'deadline',
      actionRequired: true,
      relatedUsers: []
    }
  ]);

  const [settings, setSettings] = useState({
    realTimeNotifications: true,
    emailDigest: true,
    securityAlerts: true,
    milestoneUpdates: true,
    teamNotifications: true,
    quietHours: false,
    soundEnabled: true
  });

  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'security_critical':
        return <Shield className="h-5 w-5 text-red-500" />;
      case 'milestone_complete':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'team_update':
        return <Users className="h-5 w-5 text-blue-500" />;
      case 'deadline_reminder':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const categoryMatch = filterCategory === 'all' || notification.category === filterCategory;
    const priorityMatch = filterPriority === 'all' || notification.priority === filterPriority;
    return categoryMatch && priorityMatch;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Advanced Notification System
          </h2>
          <p className="text-muted-foreground">
            Stay informed with intelligent, contextual notifications
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge variant="error" className="animate-pulse">
              {unreadCount} unread
            </Badge>
          )}
          <Button variant="outline" onClick={markAllAsRead}>
            Mark All Read
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="notifications">
            Notifications
            {unreadCount > 0 && (
              <Badge variant="error" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <div className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="text-sm font-medium">Filters:</span>
                  </div>
                  <select 
                    value={filterCategory} 
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="all">All Categories</option>
                    <option value="security">Security</option>
                    <option value="project">Project</option>
                    <option value="team">Team</option>
                    <option value="deadline">Deadlines</option>
                  </select>
                  <select 
                    value={filterPriority} 
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="all">All Priorities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Notifications List */}
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    !notification.read ? 'border-blue-200 bg-blue-50/30' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{notification.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                            
                            {notification.relatedUsers.length > 0 && (
                              <div className="flex items-center gap-1 mt-2">
                                <Users className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {notification.relatedUsers.join(', ')}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            <Badge className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                            {!notification.read && (
                              <div className="h-2 w-2 bg-blue-500 rounded-full" />
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                          
                          <div className="flex items-center gap-1">
                            {notification.actionRequired && (
                              <Badge variant="outline" className="text-xs">
                                <Zap className="h-3 w-3 mr-1" />
                                Action Required
                              </Badge>
                            )}
                            <Button variant="ghost" size="sm">
                              <Star className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Archive className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Notification Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <div className="text-xs text-muted-foreground mt-1">This week (+23%)</div>
                <Progress value={75} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2m</div>
                <div className="text-xs text-muted-foreground mt-1">Average response time</div>
                <Progress value={85} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Security Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-muted-foreground mt-1">This month (-15%)</div>
                <Progress value={60} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Real-time notifications</div>
                    <div className="text-sm text-muted-foreground">Get instant notifications for new events</div>
                  </div>
                  <Switch 
                    checked={settings.realTimeNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, realTimeNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email digest</div>
                    <div className="text-sm text-muted-foreground">Daily summary of notifications</div>
                  </div>
                  <Switch 
                    checked={settings.emailDigest}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailDigest: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Security alerts</div>
                    <div className="text-sm text-muted-foreground">Critical security notifications</div>
                  </div>
                  <Switch 
                    checked={settings.securityAlerts}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, securityAlerts: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Milestone updates</div>
                    <div className="text-sm text-muted-foreground">Project milestone notifications</div>
                  </div>
                  <Switch 
                    checked={settings.milestoneUpdates}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, milestoneUpdates: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Team notifications</div>
                    <div className="text-sm text-muted-foreground">Team member updates and changes</div>
                  </div>
                  <Switch 
                    checked={settings.teamNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, teamNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Sound notifications</div>
                    <div className="text-sm text-muted-foreground">Play sound for new notifications</div>
                  </div>
                  <Switch 
                    checked={settings.soundEnabled}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, soundEnabled: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Quiet hours</div>
                    <div className="text-sm text-muted-foreground">Disable notifications during specified hours</div>
                  </div>
                  <Switch 
                    checked={settings.quietHours}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, quietHours: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                <Archive className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Archived notifications will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
