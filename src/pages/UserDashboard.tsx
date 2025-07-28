
import React, { useState, useEffect } from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { HawklyCard } from '@/components/ui/hawkly-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import {
  BarChart3,
  Calendar,
  Clock,
  Code,
  FileText,
  Filter,
  Lock,
  PieChart,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  Star,
  Users,
  Wallet,
  ArrowRight,
  BellRing,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  BookOpen,
  Clock3,
  LineChart,
  GitPullRequest,
  GitMerge,
  AlertCircle,
  FileCode
} from 'lucide-react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'needs_review';
  securityScore: number;
  lastUpdate: string;
  auditType: string;
  dueDate?: string;
  priorityLevel: 'high' | 'medium' | 'low';
  findings?: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    informational: number;
  };
}

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  projectId?: string;
  projectName?: string;
  actionBy?: string;
  status?: string;
  severity?: 'critical' | 'high' | 'medium' | 'low' | 'informational';
}

interface Notification {
  id: string;
  type: 'audit' | 'security' | 'platform' | 'message';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface SecurityMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
}

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState<Project[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const { toast } = useToast();

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setProjects([
        {
          id: 'proj-001',
          name: 'DeFi Staking Protocol',
          description: 'Smart contract-based staking system with yield optimization',
          status: 'in_progress',
          securityScore: 78,
          lastUpdate: '2025-08-05T14:30:00Z',
          auditType: 'Smart Contract Audit',
          dueDate: '2025-08-15T00:00:00Z',
          priorityLevel: 'high',
          findings: {
            critical: 1,
            high: 3,
            medium: 7,
            low: 12,
            informational: 5
          }
        },
        {
          id: 'proj-002',
          name: 'NFT Marketplace',
          description: 'Decentralized marketplace for trading NFTs with royalty system',
          status: 'pending',
          securityScore: 65,
          lastUpdate: '2025-08-04T09:15:00Z',
          auditType: 'Full Platform Audit',
          dueDate: '2025-08-25T00:00:00Z',
          priorityLevel: 'medium'
        },
        {
          id: 'proj-003',
          name: 'Cross-Chain Bridge',
          description: 'Bridge for transferring assets between multiple blockchains',
          status: 'completed',
          securityScore: 92,
          lastUpdate: '2025-08-01T16:45:00Z',
          auditType: 'Security Assessment',
          priorityLevel: 'high',
          findings: {
            critical: 0,
            high: 1,
            medium: 4,
            low: 9,
            informational: 12
          }
        },
        {
          id: 'proj-004',
          name: 'DAO Governance System',
          description: 'On-chain voting and proposal system for decentralized organizations',
          status: 'needs_review',
          securityScore: 81,
          lastUpdate: '2025-08-03T11:20:00Z',
          auditType: 'Smart Contract Audit',
          dueDate: '2025-08-10T00:00:00Z',
          priorityLevel: 'medium',
          findings: {
            critical: 0,
            high: 2,
            medium: 5,
            low: 8,
            informational: 7
          }
        }
      ]);

      setActivities([
        {
          id: 'act-001',
          type: 'audit_update',
          description: 'Initial audit findings submitted',
          timestamp: '2025-08-05T13:45:00Z',
          projectId: 'proj-001',
          projectName: 'DeFi Staking Protocol',
          actionBy: 'Senior Auditor',
          status: 'in_progress'
        },
        {
          id: 'act-002',
          type: 'vulnerability',
          description: 'Critical vulnerability identified in staking contract',
          timestamp: '2025-08-05T10:30:00Z',
          projectId: 'proj-001',
          projectName: 'DeFi Staking Protocol',
          severity: 'critical'
        },
        {
          id: 'act-003',
          type: 'audit_scheduled',
          description: 'Audit scheduled for NFT Marketplace',
          timestamp: '2025-08-04T09:15:00Z',
          projectId: 'proj-002',
          projectName: 'NFT Marketplace',
          actionBy: 'Audit Manager'
        },
        {
          id: 'act-004',
          type: 'audit_completed',
          description: 'Final audit report delivered',
          timestamp: '2025-08-01T16:45:00Z',
          projectId: 'proj-003',
          projectName: 'Cross-Chain Bridge',
          actionBy: 'Lead Auditor'
        },
        {
          id: 'act-005',
          type: 'review_request',
          description: 'Code fixes submitted for review',
          timestamp: '2025-08-03T11:20:00Z',
          projectId: 'proj-004',
          projectName: 'DAO Governance System',
          actionBy: 'Project Developer'
        }
      ]);

      setNotifications([
        {
          id: 'notif-001',
          type: 'security',
          title: 'Critical Vulnerability',
          description: 'A critical vulnerability was found in your DeFi Staking Protocol project',
          timestamp: '2025-08-05T10:30:00Z',
          read: false,
          priority: 'high'
        },
        {
          id: 'notif-002',
          type: 'audit',
          title: 'Audit Update',
          description: 'Initial findings have been submitted for your review',
          timestamp: '2025-08-05T13:45:00Z',
          read: false,
          priority: 'medium'
        },
        {
          id: 'notif-003',
          type: 'message',
          title: 'New Message from Auditor',
          description: 'You have a new message regarding your NFT Marketplace project',
          timestamp: '2025-08-04T15:20:00Z',
          read: true,
          priority: 'medium'
        },
        {
          id: 'notif-004',
          type: 'platform',
          title: 'Platform Update',
          description: 'Hawkly platform will undergo maintenance on August 10',
          timestamp: '2025-08-03T09:00:00Z',
          read: true,
          priority: 'low'
        }
      ]);

      setSecurityMetrics([
        {
          id: 'metric-001',
          name: 'Overall Security Score',
          value: 79,
          change: 4,
          trend: 'up',
          status: 'good'
        },
        {
          id: 'metric-002',
          name: 'Open Vulnerabilities',
          value: 17,
          change: -3,
          trend: 'down',
          status: 'warning'
        },
        {
          id: 'metric-003',
          name: 'Critical Issues',
          value: 1,
          change: 0,
          trend: 'stable',
          status: 'critical'
        },
        {
          id: 'metric-004',
          name: 'Fix Implementation Rate',
          value: 68,
          change: 12,
          trend: 'up',
          status: 'good'
        }
      ]);

      setIsLoading(false);
    }, 800);
  }, []);

  const filteredProjects = projects.filter(project => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-amber-500';
      case 'in_progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'needs_review': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'in_progress': return <Code className="h-4 w-4" />;
      case 'completed': return <CheckCircle2 className="h-4 w-4" />;
      case 'needs_review': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'pending': return 'Pending';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'needs_review': return 'Needs Review';
      default: return 'Unknown';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-amber-400';
      case 'low': return 'bg-blue-500';
      case 'informational': return 'bg-gray-400';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'audit': return <FileText className="h-4 w-4" />;
      case 'security': return <ShieldCheck className="h-4 w-4" />;
      case 'platform': return <Settings className="h-4 w-4" />;
      case 'message': return <BellRing className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getMetricIcon = (metric: SecurityMetric) => {
    if (metric.name.includes('Score')) return <BarChart3 className="h-5 w-5" />;
    if (metric.name.includes('Vulnerabilities') || metric.name.includes('Issues')) return <Shield className="h-5 w-5" />;
    if (metric.name.includes('Rate')) return <LineChart className="h-5 w-5" />;
    return <PieChart className="h-5 w-5" />;
  };

  const getMetricStatusColor = (status: string) => {
    switch(status) {
      case 'good': return 'text-green-500';
      case 'warning': return 'text-amber-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getMetricTrendIcon = (trend: string) => {
    switch(trend) {
      case 'up': return <ArrowRight className="h-4 w-4 rotate-[-45deg]" />;
      case 'down': return <ArrowRight className="h-4 w-4 rotate-45deg" />;
      case 'stable': return <ArrowRight className="h-4 w-4 rotate-90deg" />;
      default: return null;
    }
  };

  const markNotificationAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <ProductionLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
            <p className="text-muted-foreground">Manage your projects, security audits, and platform activities</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <BellRing className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
              <Badge className="ml-2">{notifications.filter(n => !n.read).length}</Badge>
            </Button>
            <Button size="sm">
              <FileText className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">New Project</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 md:w-[500px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Security Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {securityMetrics.map(metric => (
                <HawklyCard key={metric.id} variant="glass" className="backdrop-blur-sm">
                  <div className="p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">{metric.name}</span>
                      {getMetricIcon(metric)}
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className={`text-2xl font-bold ${getMetricStatusColor(metric.status)}`}>
                          {metric.name.includes('Rate') ? `${metric.value}%` : metric.value}
                        </div>
                        <div className="flex items-center text-xs mt-1">
                          {metric.trend === 'up' ? (
                            <span className={metric.status === 'good' ? 'text-green-500' : 'text-red-500'}>
                              +{metric.change}% {getMetricTrendIcon(metric.trend)}
                            </span>
                          ) : metric.trend === 'down' ? (
                            <span className={metric.status === 'good' ? 'text-green-500' : 'text-red-500'}>
                              -{Math.abs(metric.change)}% {getMetricTrendIcon(metric.trend)}
                            </span>
                          ) : (
                            <span className="text-gray-500">
                              No change {getMetricTrendIcon(metric.trend)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </HawklyCard>
              ))}
            </div>

            {/* Recent Projects */}
            <HawklyCard variant="glass" className="backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <FileCode className="mr-2 h-5 w-5" />
                  Recent Projects
                </CardTitle>
                <CardDescription>
                  Your most recently updated projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.slice(0, 3).map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 rounded-lg bg-card/50">
                      <div className="flex-1">
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[250px] sm:max-w-[450px]">
                          {project.description}
                        </div>
                        <div className="flex items-center mt-2">
                          <Badge 
                            variant="secondary" 
                            className={`mr-2 ${getStatusColor(project.status)} text-white`}
                          >
                            {getStatusIcon(project.status)}
                            <span className="ml-1">{getStatusLabel(project.status)}</span>
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(project.lastUpdate)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">Security Score</div>
                        <div className="flex items-center justify-end">
                          <div 
                            className={`text-lg font-bold ${
                              project.securityScore >= 80 ? 'text-green-500' : 
                              project.securityScore >= 60 ? 'text-amber-500' : 
                              'text-red-500'
                            }`}
                          >
                            {project.securityScore}%
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="ml-4">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <Button variant="link" onClick={() => setActiveTab('projects')}>
                    View all projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </HawklyCard>

            {/* Recent Activity and Notifications - 2-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Recent Activity */}
              <HawklyCard variant="glass" className="backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Recent actions and updates in your projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.slice(0, 4).map((activity) => (
                      <div key={activity.id} className="flex items-start p-3 rounded-lg bg-card/30">
                        <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center mr-3 shrink-0">
                          {activity.type === 'audit_update' ? <FileText className="h-5 w-5" /> :
                           activity.type === 'vulnerability' ? <AlertTriangle className="h-5 w-5" /> :
                           activity.type === 'audit_scheduled' ? <Calendar className="h-5 w-5" /> :
                           activity.type === 'audit_completed' ? <CheckCircle2 className="h-5 w-5" /> :
                           <GitPullRequest className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{activity.description}</div>
                          <div className="text-xs text-muted-foreground">
                            {activity.projectName && `${activity.projectName} • `}
                            {formatTimeAgo(activity.timestamp)}
                          </div>
                          {activity.severity && (
                            <Badge 
                              variant="secondary" 
                              className={`mt-1 ${getSeverityColor(activity.severity)} text-white`}
                            >
                              {activity.severity}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-6">
                    <Button variant="link" onClick={() => setActiveTab('activity')}>
                      View all activity
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </HawklyCard>

              {/* Notifications */}
              <HawklyCard variant="glass" className="backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <BellRing className="mr-2 h-5 w-5" />
                    Notifications
                  </CardTitle>
                  <CardDescription>
                    Your recent platform notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`flex items-start p-3 rounded-lg ${notification.read ? 'bg-card/30' : 'bg-primary/10 border-l-4 border-primary'}`}
                      >
                        <div className={`h-9 w-9 rounded-full ${
                          notification.type === 'security' ? 'bg-red-500/20' :
                          notification.type === 'audit' ? 'bg-blue-500/20' :
                          notification.type === 'platform' ? 'bg-purple-500/20' :
                          'bg-green-500/20'
                        } flex items-center justify-center mr-3 shrink-0`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium flex items-center justify-between">
                            <span>{notification.title}</span>
                            <Badge
                              variant="secondary"
                              className={`${getPriorityColor(notification.priority)} text-white ml-2`}
                            >
                              {notification.priority}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {notification.description}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => markNotificationAsRead(notification.id)}
                                className="h-7 px-2 text-xs"
                              >
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </HawklyCard>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <HawklyCard variant="glass" className="backdrop-blur-sm">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl flex items-center">
                    <FileCode className="mr-2 h-5 w-5" />
                    Your Projects
                  </CardTitle>
                  <CardDescription>
                    Manage and monitor all your security audit projects
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search projects..."
                      className="pl-9 w-full sm:w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="needs_review">Needs Review</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="whitespace-nowrap">
                    <FileText className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="py-10 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
                    <p className="mt-4 text-muted-foreground">Loading projects...</p>
                  </div>
                ) : filteredProjects.length === 0 ? (
                  <div className="py-10 text-center">
                    <p className="text-muted-foreground">No projects matching your filters.</p>
                    <Button variant="link" onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}>
                      Clear filters
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredProjects.map((project) => (
                      <HawklyCard key={project.id} variant="default" className="overflow-hidden">
                        <div className="p-5">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-lg">{project.name}</h3>
                                <Badge 
                                  variant="secondary" 
                                  className={`${getStatusColor(project.status)} text-white`}
                                >
                                  {getStatusIcon(project.status)}
                                  <span className="ml-1">{getStatusLabel(project.status)}</span>
                                </Badge>
                                <Badge 
                                  variant="outline" 
                                  className={`
                                    ${project.priorityLevel === 'high' ? 'border-red-500 text-red-500' : 
                                      project.priorityLevel === 'medium' ? 'border-amber-500 text-amber-500' : 
                                      'border-blue-500 text-blue-500'}
                                  `}
                                >
                                  {project.priorityLevel} priority
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{project.description}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                <span className="flex items-center">
                                  <Shield className="h-3.5 w-3.5 mr-1" />
                                  {project.auditType}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  Updated {formatTimeAgo(project.lastUpdate)}
                                </span>
                                {project.dueDate && (
                                  <span className="flex items-center">
                                    <Calendar className="h-3.5 w-3.5 mr-1" />
                                    Due {formatDate(project.dueDate)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col items-end justify-center">
                              <div className="font-medium">Security Score</div>
                              <div className="flex items-center">
                                <span 
                                  className={`text-lg font-bold ${
                                    project.securityScore >= 80 ? 'text-green-500' : 
                                    project.securityScore >= 60 ? 'text-amber-500' : 
                                    'text-red-500'
                                  }`}
                                >
                                  {project.securityScore}%
                                </span>
                              </div>
                              <div className="w-full mt-1">
                                <Progress 
                                  value={project.securityScore} 
                                  className={`h-1.5 ${
                                    project.securityScore >= 80 ? 'bg-green-500' : 
                                    project.securityScore >= 60 ? 'bg-amber-500' : 
                                    'bg-red-500'
                                  }`}
                                />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Shield className="mr-2 h-4 w-4" />
                                Audit Details
                              </Button>
                              <Button size="sm">
                                <FileText className="mr-2 h-4 w-4" />
                                View Project
                              </Button>
                            </div>
                          </div>

                          {/* Findings Section - Only shown for projects with findings */}
                          {project.findings && (
                            <div className="mt-4 pt-4 border-t border-border">
                              <div className="text-sm font-medium mb-2">Audit Findings</div>
                              <div className="flex flex-wrap gap-2">
                                {project.findings.critical > 0 && (
                                  <Badge variant="secondary" className="bg-red-500 text-white">
                                    <XCircle className="mr-1 h-3.5 w-3.5" />
                                    {project.findings.critical} Critical
                                  </Badge>
                                )}
                                {project.findings.high > 0 && (
                                  <Badge variant="secondary" className="bg-orange-500 text-white">
                                    <AlertTriangle className="mr-1 h-3.5 w-3.5" />
                                    {project.findings.high} High
                                  </Badge>
                                )}
                                {project.findings.medium > 0 && (
                                  <Badge variant="secondary" className="bg-amber-400 text-white">
                                    <AlertCircle className="mr-1 h-3.5 w-3.5" />
                                    {project.findings.medium} Medium
                                  </Badge>
                                )}
                                {project.findings.low > 0 && (
                                  <Badge variant="secondary" className="bg-blue-500 text-white">
                                    <AlertCircle className="mr-1 h-3.5 w-3.5" />
                                    {project.findings.low} Low
                                  </Badge>
                                )}
                                {project.findings.informational > 0 && (
                                  <Badge variant="secondary" className="bg-gray-400 text-white">
                                    <BookOpen className="mr-1 h-3.5 w-3.5" />
                                    {project.findings.informational} Info
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </HawklyCard>
                    ))}
                  </div>
                )}
              </CardContent>
            </HawklyCard>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <HawklyCard variant="glass" className="backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Clock3 className="mr-2 h-5 w-5" />
                  Activity Log
                </CardTitle>
                <CardDescription>
                  Recent activities and events across your projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {activities.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                      <div className="flex items-start p-4 hover:bg-card/20 rounded-md">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-4 shrink-0">
                          {activity.type === 'audit_update' ? <FileText className="h-5 w-5" /> :
                           activity.type === 'vulnerability' ? <AlertTriangle className="h-5 w-5" /> :
                           activity.type === 'audit_scheduled' ? <Calendar className="h-5 w-5" /> :
                           activity.type === 'audit_completed' ? <CheckCircle2 className="h-5 w-5" /> :
                           <GitPullRequest className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{activity.description}</div>
                          <div className="text-xs text-muted-foreground mt-1 flex flex-wrap gap-2">
                            {activity.projectName && (
                              <span className="flex items-center">
                                <FileCode className="h-3.5 w-3.5 mr-1" />
                                {activity.projectName}
                              </span>
                            )}
                            {activity.actionBy && (
                              <span className="flex items-center">
                                <Users className="h-3.5 w-3.5 mr-1" />
                                {activity.actionBy}
                              </span>
                            )}
                            <span className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              {formatDate(activity.timestamp)} at {formatTime(activity.timestamp)}
                            </span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {activity.severity && (
                              <Badge 
                                variant="secondary" 
                                className={`${getSeverityColor(activity.severity)} text-white`}
                              >
                                {activity.severity}
                              </Badge>
                            )}
                            {activity.status && (
                              <Badge 
                                variant="secondary" 
                                className={`${getStatusColor(activity.status)} text-white`}
                              >
                                {activity.status}
                              </Badge>
                            )}
                            {activity.projectId && (
                              <Button variant="ghost" size="sm" className="h-7 px-3 text-xs">
                                View Project
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      {index < activities.length - 1 && <div className="border-b border-border mx-4" />}
                    </React.Fragment>
                  ))}
                </div>
                <div className="mt-6 flex justify-center">
                  <Button variant="outline">
                    Load More Activity
                  </Button>
                </div>
              </CardContent>
            </HawklyCard>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            {/* Security Metrics Dashboard */}
            <HawklyCard variant="glass" className="backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Security Dashboard
                </CardTitle>
                <CardDescription>
                  Overview of your platform security metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {securityMetrics.map(metric => (
                    <div key={metric.id} className="p-5 bg-card/30 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">{metric.name}</span>
                        {getMetricIcon(metric)}
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <div className={`text-3xl font-bold ${getMetricStatusColor(metric.status)}`}>
                            {metric.name.includes('Rate') ? `${metric.value}%` : metric.value}
                          </div>
                          <div className="flex items-center text-sm mt-2">
                            {metric.trend === 'up' ? (
                              <span className={metric.status === 'good' ? 'text-green-500' : 'text-red-500'}>
                                +{metric.change}% from last month {getMetricTrendIcon(metric.trend)}
                              </span>
                            ) : metric.trend === 'down' ? (
                              <span className={metric.status === 'good' ? 'text-green-500' : 'text-red-500'}>
                                -{Math.abs(metric.change)}% from last month {getMetricTrendIcon(metric.trend)}
                              </span>
                            ) : (
                              <span className="text-gray-500">
                                No change from last month {getMetricTrendIcon(metric.trend)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-border pt-8">
                  <h3 className="text-lg font-medium mb-4">Security Recommendations</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <div className="flex items-start">
                        <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center mr-4 shrink-0">
                          <XCircle className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <h4 className="text-md font-medium">Critical Vulnerability Detected</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            A critical vulnerability was found in your DeFi Staking Protocol project that requires immediate attention.
                          </p>
                          <Button size="sm" className="mt-3">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                      <div className="flex items-start">
                        <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-4 shrink-0">
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <h4 className="text-md font-medium">Security Updates Needed</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Several high and medium severity issues need addressing across your NFT Marketplace project.
                          </p>
                          <Button size="sm" className="mt-3">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <div className="flex items-start">
                        <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 shrink-0">
                          <BookOpen className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="text-md font-medium">Best Practice Recommendations</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Improve your security score by implementing these best practices for your blockchain projects.
                          </p>
                          <Button size="sm" className="mt-3">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </HawklyCard>
          </TabsContent>
        </Tabs>
      </div>
    </ProductionLayout>
  );
}
