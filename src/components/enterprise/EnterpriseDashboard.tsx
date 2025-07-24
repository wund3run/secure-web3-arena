import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Brain,
  Target,
  Clock,
  FileText,
  Download,
  Copy,
  Play,
  Loader2,
  Eye,
  Settings,
  Activity,
  DollarSign,
  Shield,
  BarChart3,
  PieChart,
  Calendar,
  UserCheck,
  Award,
  Zap,
  Globe
} from 'lucide-react';
import { toast } from 'sonner';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  projects: number;
  performance: number;
  status: 'active' | 'busy' | 'available';
  avatar: string;
}

interface Project {
  id: string;
  name: string;
  client: string;
  status: 'in_progress' | 'completed' | 'pending' | 'on_hold';
  progress: number;
  teamSize: number;
  budget: number;
  deadline: string;
  riskLevel: 'low' | 'medium' | 'high';
  revenue: number;
}

interface ComplianceReport {
  id: string;
  type: 'regulatory' | 'internal' | 'client' | 'industry';
  status: 'compliant' | 'pending' | 'violation' | 'review';
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  assignedTo: string;
}

interface Analytics {
  totalRevenue: number;
  monthlyGrowth: number;
  activeProjects: number;
  teamUtilization: number;
  clientSatisfaction: number;
  auditSuccess: number;
  complianceScore: number;
  aiAdoption: number;
}

export function EnterpriseDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [analytics, setAnalytics] = useState<Analytics>({
    totalRevenue: 0,
    monthlyGrowth: 0,
    activeProjects: 0,
    teamUtilization: 0,
    clientSatisfaction: 0,
    auditSuccess: 0,
    complianceScore: 0,
    aiAdoption: 0
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [complianceReports, setComplianceReports] = useState<ComplianceReport[]>([]);

  useEffect(() => {
    generateSampleData();
  }, []);

  const generateSampleData = () => {
    const sampleTeamMembers: TeamMember[] = [
      {
        id: '1',
        name: 'Dr. Sarah Chen',
        role: 'Senior Security Auditor',
        expertise: ['DeFi', 'Smart Contracts', 'Zero-Knowledge'],
        projects: 12,
        performance: 95,
        status: 'active',
        avatar: 'SC'
      },
      {
        id: '2',
        name: 'Marcus Rodriguez',
        role: 'Lead Blockchain Analyst',
        expertise: ['Layer 2', 'Cross-Chain', 'MEV'],
        projects: 8,
        performance: 88,
        status: 'busy',
        avatar: 'MR'
      },
      {
        id: '3',
        name: 'Dr. Emily Watson',
        role: 'AI Research Lead',
        expertise: ['Machine Learning', 'Automation', 'Pattern Recognition'],
        projects: 15,
        performance: 92,
        status: 'active',
        avatar: 'EW'
      },
      {
        id: '4',
        name: 'Alex Thompson',
        role: 'Compliance Specialist',
        expertise: ['Regulatory', 'KYC/AML', 'Governance'],
        projects: 6,
        performance: 85,
        status: 'available',
        avatar: 'AT'
      }
    ];

    const sampleProjects: Project[] = [
      {
        id: '1',
        name: 'DeFi Protocol Security Audit',
        client: 'Uniswap Labs',
        status: 'in_progress',
        progress: 75,
        teamSize: 4,
        budget: 150000,
        deadline: '2024-12-30',
        riskLevel: 'medium',
        revenue: 120000
      },
      {
        id: '2',
        name: 'Cross-Chain Bridge Assessment',
        client: 'Polygon Foundation',
        status: 'completed',
        progress: 100,
        teamSize: 3,
        budget: 200000,
        deadline: '2024-12-15',
        riskLevel: 'high',
        revenue: 180000
      },
      {
        id: '3',
        name: 'Layer 2 Security Review',
        client: 'Arbitrum',
        status: 'pending',
        progress: 0,
        teamSize: 5,
        budget: 300000,
        deadline: '2025-01-15',
        riskLevel: 'low',
        revenue: 0
      }
    ];

    const sampleComplianceReports: ComplianceReport[] = [
      {
        id: '1',
        type: 'regulatory',
        status: 'compliant',
        title: 'SEC Compliance Review',
        description: 'Annual regulatory compliance assessment for blockchain services',
        dueDate: '2024-12-31',
        priority: 'high',
        assignedTo: 'Alex Thompson'
      },
      {
        id: '2',
        type: 'internal',
        status: 'pending',
        title: 'Internal Security Audit',
        description: 'Quarterly internal security and process review',
        dueDate: '2024-12-25',
        priority: 'medium',
        assignedTo: 'Dr. Sarah Chen'
      },
      {
        id: '3',
        type: 'client',
        status: 'review',
        title: 'Client-Specific Requirements',
        description: 'Custom compliance requirements for enterprise client',
        dueDate: '2025-01-10',
        priority: 'high',
        assignedTo: 'Marcus Rodriguez'
      }
    ];

    const sampleAnalytics: Analytics = {
      totalRevenue: 2850000,
      monthlyGrowth: 12.5,
      activeProjects: 8,
      teamUtilization: 87,
      clientSatisfaction: 94,
      auditSuccess: 98,
      complianceScore: 96,
      aiAdoption: 78
    };

    setTeamMembers(sampleTeamMembers);
    setProjects(sampleProjects);
    setComplianceReports(sampleComplianceReports);
    setAnalytics(sampleAnalytics);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
      case 'compliant':
        return 'text-green-600 bg-green-100';
      case 'busy':
      case 'in_progress':
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'on_hold':
      case 'violation':
        return 'text-red-600 bg-red-100';
      case 'available':
      case 'review':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Enterprise Dashboard</h1>
          <p className="text-muted-foreground">
            Advanced analytics and management for enterprise audit firms
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(analytics.totalRevenue)}</p>
                <p className="text-xs text-green-600">+{analytics.monthlyGrowth}% this month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold">{analytics.activeProjects}</p>
                <p className="text-xs text-blue-600">Across {teamMembers.length} team members</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Team Utilization</p>
                <p className="text-2xl font-bold">{analytics.teamUtilization}%</p>
                <p className="text-xs text-yellow-600">Optimal range: 80-90%</p>
              </div>
              <Users className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                <p className="text-2xl font-bold">{analytics.clientSatisfaction}%</p>
                <p className="text-xs text-green-600">Based on 45 reviews</p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team ({teamMembers.length})
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Projects ({projects.length})
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Compliance ({complianceReports.length})
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Audit Success Rate</span>
                      <span>{analytics.auditSuccess}%</span>
                    </div>
                    <Progress value={analytics.auditSuccess} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Compliance Score</span>
                      <span>{analytics.complianceScore}%</span>
                    </div>
                    <Progress value={analytics.complianceScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>AI Adoption</span>
                      <span>{analytics.aiAdoption}%</span>
                    </div>
                    <Progress value={analytics.aiAdoption} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">DeFi Protocol Audit Completed</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">New Compliance Requirement</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Brain className="h-4 w-4 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">AI Model Updated</p>
                      <p className="text-xs text-muted-foreground">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="flex flex-col items-center gap-2 h-auto p-4">
                  <Play className="h-6 w-6" />
                  <span className="text-sm">Start New Audit</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center gap-2 h-auto p-4">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Manage Team</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center gap-2 h-auto p-4">
                  <Shield className="h-6 w-6" />
                  <span className="text-sm">Compliance Check</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center gap-2 h-auto p-4">
                  <BarChart3 className="h-6 w-6" />
                  <span className="text-sm">View Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">{member.avatar}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <h5 className="text-sm font-medium mb-2">Expertise</h5>
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Active Projects</span>
                      <span className="font-medium">{member.projects}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Performance</span>
                      <span className="font-medium">{member.performance}%</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Utilization</span>
                        <span>{Math.round((member.projects / 15) * 100)}%</span>
                      </div>
                      <Progress value={(member.projects / 15) * 100} className="h-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-medium">{project.name}</h4>
                    <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.replace('_', ' ')}
                    </Badge>
                    <p className="text-sm font-medium mt-1">{formatCurrency(project.revenue)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="font-medium">{project.progress}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Team Size</p>
                    <p className="font-medium">{project.teamSize} members</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="font-medium">{formatCurrency(project.budget)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Risk Level</p>
                    <Badge className={getRiskColor(project.riskLevel)}>
                      {project.riskLevel}
                    </Badge>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Project Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Deadline: {project.deadline}</span>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          {complianceReports.map((report) => (
            <Card key={report.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{report.title}</h4>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                    <Badge className={getPriorityColor(report.priority)}>
                      {report.priority}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium capitalize">{report.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned To</p>
                    <p className="font-medium">{report.assignedTo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="font-medium">{report.dueDate}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {report.type} compliance requirement
                  </span>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Q4 Revenue</span>
                    <span className="font-medium">{formatCurrency(analytics.totalRevenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Growth</span>
                    <span className="font-medium text-green-600">+{analytics.monthlyGrowth}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Project Value</span>
                    <span className="font-medium">{formatCurrency(analytics.totalRevenue / analytics.activeProjects)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Average Performance</span>
                    <span className="font-medium">
                      {Math.round(teamMembers.reduce((sum, m) => sum + m.performance, 0) / teamMembers.length)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Team Utilization</span>
                    <span className="font-medium">{analytics.teamUtilization}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Members</span>
                    <span className="font-medium">{teamMembers.filter(m => m.status === 'active').length}/{teamMembers.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Integration Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Brain className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-medium">AI Adoption</h4>
                  <p className="text-2xl font-bold text-blue-500">{analytics.aiAdoption}%</p>
                  <p className="text-sm text-muted-foreground">of processes automated</p>
                </div>
                <div className="text-center">
                  <Zap className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <h4 className="font-medium">Efficiency Gain</h4>
                  <p className="text-2xl font-bold text-green-500">+35%</p>
                  <p className="text-sm text-muted-foreground">faster audit completion</p>
                </div>
                <div className="text-center">
                  <Shield className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                  <h4 className="font-medium">Accuracy</h4>
                  <p className="text-2xl font-bold text-purple-500">98.5%</p>
                  <p className="text-sm text-muted-foreground">vulnerability detection rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default EnterpriseDashboard; 