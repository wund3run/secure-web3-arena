
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Calendar, 
  Target,
  Users,
  DollarSign,
  Briefcase
} from 'lucide-react';

interface AuditProject {
  id: string;
  name: string;
  client: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  progress: number;
  dueDate: string;
  budget: number;
  teamSize: number;
  priority: 'high' | 'medium' | 'low';
  scope: string[];
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignee: string;
}

export const AuditLifecycleManager: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>('1');

  const projects: AuditProject[] = [
    {
      id: '1',
      name: 'DeFi Protocol Audit',
      client: 'Yield Farm DAO',
      status: 'in-progress',
      progress: 65,
      dueDate: '2024-01-15',
      budget: 25000,
      teamSize: 3,
      priority: 'high',
      scope: ['Smart Contracts', 'Access Control', 'Economic Model']
    },
    {
      id: '2',
      name: 'NFT Marketplace Security Review',
      client: 'ArtChain Labs',
      status: 'planning',
      progress: 15,
      dueDate: '2024-02-01',
      budget: 15000,
      teamSize: 2,
      priority: 'medium',
      scope: ['Smart Contracts', 'Frontend Security', 'API Security']
    },
    {
      id: '3',
      name: 'Cross-chain Bridge Audit',
      client: 'Bridge Protocol',
      status: 'review',
      progress: 90,
      dueDate: '2023-12-20',
      budget: 40000,
      teamSize: 4,
      priority: 'high',
      scope: ['Bridge Contracts', 'Validator Logic', 'Economic Security']
    }
  ];

  const milestones: Milestone[] = [
    {
      id: '1',
      title: 'Initial Code Review',
      description: 'Complete preliminary analysis of smart contracts',
      dueDate: '2024-01-10',
      status: 'completed',
      assignee: 'Alice Chen'
    },
    {
      id: '2',
      title: 'Vulnerability Assessment',
      description: 'Identify and document security vulnerabilities',
      dueDate: '2024-01-12',
      status: 'in-progress',
      assignee: 'Bob Kumar'
    },
    {
      id: '3',
      title: 'Gas Optimization Review',
      description: 'Analyze and suggest gas optimizations',
      dueDate: '2024-01-14',
      status: 'pending',
      assignee: 'Carol Smith'
    },
    {
      id: '4',
      title: 'Final Report',
      description: 'Compile comprehensive audit report',
      dueDate: '2024-01-15',
      status: 'pending',
      assignee: 'Alice Chen'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'review': return 'bg-yellow-500';
      case 'planning': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'review': return <AlertTriangle className="h-4 w-4" />;
      case 'planning': return <FileText className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const currentProject = projects.find(p => p.id === selectedProject);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Audit Lifecycle Manager</h2>
          <p className="text-muted-foreground">Manage your audit projects from start to finish</p>
        </div>
        <Button>
          <Briefcase className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold">
                  {projects.filter(p => p.status === 'in-progress').length}
                </p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">
                  ${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Team Members</p>
                <p className="text-2xl font-bold">
                  {Math.max(...projects.map(p => p.teamSize))}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Progress</p>
                <p className="text-2xl font-bold">
                  {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">Project Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedProject === project.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{project.name}</h3>
                          <Badge 
                            variant="outline" 
                            className={`${getStatusColor(project.status)} text-white`}
                          >
                            {getStatusIcon(project.status)}
                            <span className="ml-1">{project.status}</span>
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(project.priority)}>
                            {project.priority} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Due: {project.dueDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            ${project.budget.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {project.teamSize} members
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {project.scope.map((item) => (
                            <Badge key={item} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-2xl font-bold">{project.progress}%</div>
                        <Progress value={project.progress} className="w-24" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                Project Milestones - {currentProject?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className={`p-2 rounded-full ${getStatusColor(milestone.status)}`}>
                      {getStatusIcon(milestone.status)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {milestone.dueDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {milestone.assignee}
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(milestone.status)}>
                      {milestone.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">Interactive timeline coming soon</p>
                <p className="text-sm text-muted-foreground">
                  View project deadlines, milestones, and team availability
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
