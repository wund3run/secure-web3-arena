import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BarChart3, 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  FileText,
  Activity,
  Zap,
  Eye,
  MessageSquare
} from 'lucide-react';
import { Chart, VulnerabilityChart, AuditProgressChart, SecurityScoreChart } from '@/components/ui/chart';
import { FormBuilder } from '@/components/ui/form-builder';
import { cn } from '@/lib/utils';

interface AuditProject {
  id: string;
  name: string;
  client: string;
  status: 'pending' | 'in-progress' | 'review' | 'completed';
  progress: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  deadline: string;
  auditors: Array<{
    id: string;
    name: string;
    avatar?: string;
    role: string;
    online: boolean;
  }>;
  lastActivity: string;
}

interface DashboardMetrics {
  totalProjects: number;
  activeAudits: number;
  completedThisMonth: number;
  averageScore: number;
  totalVulnerabilities: number;
  criticalIssues: number;
}

interface EnhancedAuditDashboardProps {
  projects: AuditProject[];
  metrics: DashboardMetrics;
  onProjectSelect: (project: AuditProject) => void;
  className?: string;
}

export function EnhancedAuditDashboard({
  projects,
  metrics,
  onProjectSelect,
  className
}: EnhancedAuditDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  // Real-time data simulation
  useEffect(() => {
    if (!realTimeUpdates) return;

    const interval = setInterval(() => {
      // Simulate real-time updates
      console.log('Real-time update tick');
    }, 5000);

    return () => clearInterval(interval);
  }, [realTimeUpdates]);

  // Computed metrics
  const computedMetrics = useMemo(() => {
    const activeProjects = projects.filter(p => p.status === 'in-progress');
    const criticalProjects = projects.filter(p => p.priority === 'critical');
    const overallProgress = projects.reduce((acc, p) => acc + p.progress, 0) / projects.length;

    return {
      activeProjects: activeProjects.length,
      criticalProjects: criticalProjects.length,
      overallProgress: Math.round(overallProgress),
      totalVulnerabilities: projects.reduce((acc, p) => 
        acc + p.vulnerabilities.critical + p.vulnerabilities.high + 
        p.vulnerabilities.medium + p.vulnerabilities.low, 0
      )
    };
  }, [projects]);

  // Chart data preparation
  const vulnerabilityData = projects.map(project => ({
    name: project.name.substring(0, 10) + '...',
    critical: project.vulnerabilities.critical,
    high: project.vulnerabilities.high,
    medium: project.vulnerabilities.medium,
    low: project.vulnerabilities.low
  }));

  const progressData = projects.map(project => ({
    name: project.name.substring(0, 8) + '...',
    progress: project.progress,
    status: project.status
  }));

  const getStatusColor = (status: AuditProject['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'review': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: AuditProject['priority']) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with Real-time Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Audit Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive overview of your security audit projects
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Real-time Status */}
          <div className="flex items-center space-x-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              realTimeUpdates ? "bg-green-500 animate-pulse" : "bg-gray-400"
            )} />
            <span className="text-sm text-muted-foreground">
              {realTimeUpdates ? 'Live' : 'Offline'}
            </span>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            {['24h', '7d', '30d'].map((range) => (
              <Button
                key={range}
                variant={selectedTimeRange === range ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedTimeRange(range)}
                className="text-xs"
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Audits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{computedMetrics.activeProjects}</div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {computedMetrics.criticalProjects} critical priority
            </p>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{computedMetrics.overallProgress}%</div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <Progress value={computedMetrics.overallProgress} className="mt-2" />
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-600" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Vulnerabilities Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{computedMetrics.totalVulnerabilities}</div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all active projects
            </p>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Security Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{metrics.averageScore}</div>
              <Shield className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Average across projects
            </p>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-600" />
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="collaboration">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vulnerability Distribution Chart */}
            <Chart
              data={vulnerabilityData}
              type="bar"
              title="Vulnerability Distribution"
              description="Breakdown of vulnerabilities by severity across projects"
              height={300}
              colors={['#ef4444', '#f97316', '#eab308', '#22c55e']}
            />

            {/* Project Progress Chart */}
            <Chart
              data={progressData}
              type="line"
              title="Project Progress"
              description="Progress tracking across all active audits"
              height={300}
              colors={['#3b82f6']}
            />
          </div>

          {/* Recent Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.slice(0, 5).map((project) => (
                  <div key={project.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex -space-x-2">
                      {project.auditors.slice(0, 2).map((auditor) => (
                        <Avatar key={auditor.id} className="w-8 h-8 border-2 border-white">
                          <AvatarImage src={auditor.avatar} />
                          <AvatarFallback>{auditor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{project.name}</p>
                      <p className="text-xs text-muted-foreground">{project.lastActivity}</p>
                    </div>
                    <Badge className={cn("text-xs", getStatusColor(project.status))}>
                      {project.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid gap-6">
            {projects.map((project) => (
              <Card 
                key={project.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onProjectSelect(project)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={cn("text-xs", getPriorityColor(project.priority))}>
                        {project.priority}
                      </Badge>
                      <Badge className={cn("text-xs", getStatusColor(project.status))}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>

                    {/* Vulnerability Summary */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-red-600">{project.vulnerabilities.critical}</div>
                        <div className="text-xs text-muted-foreground">Critical</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">{project.vulnerabilities.high}</div>
                        <div className="text-xs text-muted-foreground">High</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-600">{project.vulnerabilities.medium}</div>
                        <div className="text-xs text-muted-foreground">Medium</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{project.vulnerabilities.low}</div>
                        <div className="text-xs text-muted-foreground">Low</div>
                      </div>
                    </div>

                    {/* Team and Deadline */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div className="flex -space-x-1">
                          {project.auditors.map((auditor) => (
                            <Avatar key={auditor.id} className="w-6 h-6 border border-white">
                              <AvatarImage src={auditor.avatar} />
                              <AvatarFallback className="text-xs">{auditor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {project.auditors.length} auditor{project.auditors.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{project.deadline}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Security Score Trend */}
            <Chart
              data={[
                { name: 'Week 1', score: 85 },
                { name: 'Week 2', score: 87 },
                { name: 'Week 3', score: 89 },
                { name: 'Week 4', score: 92 }
              ]}
              type="area"
              title="Security Score Trend"
              description="Average security score over time"
              height={300}
              gradient={true}
              colors={['#8b5cf6']}
            />

            {/* Audit Completion Rate */}
            <Chart
              data={[
                { name: 'Completed', value: 12 },
                { name: 'In Progress', value: 8 },
                { name: 'Pending', value: 3 }
              ]}
              type="donut"
              title="Audit Status Distribution"
              description="Current status of all audits"
              height={300}
              colors={['#22c55e', '#3b82f6', '#f59e0b']}
            />
          </div>

          {/* Detailed Metrics Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Metric</th>
                      <th className="text-left p-2">Current</th>
                      <th className="text-left p-2">Previous</th>
                      <th className="text-left p-2">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Average Audit Time</td>
                      <td className="p-2">5.2 days</td>
                      <td className="p-2">6.1 days</td>
                      <td className="p-2 text-green-600">-14.8%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Vulnerabilities per Project</td>
                      <td className="p-2">12.3</td>
                      <td className="p-2">15.7</td>
                      <td className="p-2 text-green-600">-21.7%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Client Satisfaction</td>
                      <td className="p-2">4.8/5</td>
                      <td className="p-2">4.6/5</td>
                      <td className="p-2 text-green-600">+4.3%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-6">
          {/* Team Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Active Team Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.flatMap(p => p.auditors).slice(0, 6).map((auditor) => (
                    <div key={auditor.id} className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={auditor.avatar} />
                          <AvatarFallback>{auditor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className={cn(
                          "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white",
                          auditor.online ? "bg-green-500" : "bg-gray-400"
                        )} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{auditor.name}</p>
                        <p className="text-sm text-muted-foreground">{auditor.role}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {auditor.online ? 'Online' : 'Offline'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Recent Communications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium">Project Update</p>
                    <p className="text-xs text-muted-foreground">
                      Security review completed for smart contract module
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm font-medium">Critical Finding</p>
                    <p className="text-xs text-muted-foreground">
                      Reentrancy vulnerability discovered in payment function
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">4 hours ago</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium">Audit Completed</p>
                    <p className="text-xs text-muted-foreground">
                      DeFi protocol audit successfully completed
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 