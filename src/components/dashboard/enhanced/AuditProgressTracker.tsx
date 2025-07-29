
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  MessageSquare, 
  Calendar,
  TrendingUp,
  Shield,
  Users
} from 'lucide-react';

interface AuditMilestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending' | 'blocked';
  completedAt?: string;
  estimatedCompletion: string;
  assignee: {
    name: string;
    avatar?: string;
  };
}

interface AuditProgress {
  id: string;
  projectName: string;
  auditorName: string;
  auditorAvatar?: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  overallProgress: number;
  startDate: string;
  estimatedCompletion: string;
  milestones: AuditMilestone[];
  criticalIssues: number;
  highIssues: number;
  mediumIssues: number;
  lastUpdate: string;
}

export const AuditProgressTracker = () => {
  const [selectedAudit, setSelectedAudit] = useState<string | null>(null);

  // Mock data - replace with real data
  const audits: AuditProgress[] = [
    {
      id: '1',
      projectName: 'DeFi Lending Protocol',
      auditorName: 'Alex Chen',
      auditorAvatar: '/api/placeholder/32/32',
      status: 'in-progress',
      overallProgress: 65,
      startDate: '2025-01-10',
      estimatedCompletion: '2025-01-24',
      lastUpdate: '2 hours ago',
      criticalIssues: 1,
      highIssues: 3,
      mediumIssues: 5,
      milestones: [
        {
          id: 'm1',
          title: 'Code Review & Architecture Analysis',
          description: 'Initial code review and architecture assessment',
          status: 'completed',
          completedAt: '2025-01-12',
          estimatedCompletion: '2025-01-12',
          assignee: { name: 'Alex Chen' }
        },
        {
          id: 'm2',
          title: 'Security Vulnerability Assessment',
          description: 'Comprehensive security testing and vulnerability identification',
          status: 'in-progress',
          estimatedCompletion: '2025-01-18',
          assignee: { name: 'Alex Chen' }
        },
        {
          id: 'm3',
          title: 'Report Generation & Review',
          description: 'Detailed audit report with findings and recommendations',
          status: 'pending',
          estimatedCompletion: '2025-01-22',
          assignee: { name: 'Alex Chen' }
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'blocked':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'blocked': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Audit Progress Tracker</h2>
          <p className="text-muted-foreground">Real-time tracking of your security audits</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Review
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Auditor
          </Button>
        </div>
      </div>

      {/* Active Audits Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Active Audits</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Avg. Progress</p>
                <p className="text-2xl font-bold">68%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">Issues Found</p>
                <p className="text-2xl font-bold">9</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Auditors</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Progress Cards */}
      <div className="space-y-4">
        {audits.map((audit) => (
          <Card key={audit.id} className="transition-all hover:shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={audit.auditorAvatar} />
                    <AvatarFallback>{audit.auditorName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{audit.projectName}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Audited by {audit.auditorName} • Last updated {audit.lastUpdate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={audit.status === 'completed' ? 'default' : 'secondary'}>
                    {audit.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    Due: {new Date(audit.estimatedCompletion).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Overall Progress */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">{audit.overallProgress}%</span>
                </div>
                <Progress value={audit.overallProgress} className="h-2" />
              </div>

              {/* Issues Summary */}
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Critical: {audit.criticalIssues}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm">High: {audit.highIssues}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Medium: {audit.mediumIssues}</span>
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-3">
                <h4 className="font-medium">Milestones</h4>
                {audit.milestones.map((milestone, index) => (
                  <div key={milestone.id} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      {getStatusIcon(milestone.status)}
                      {index < audit.milestones.length - 1 && (
                        <div className={`w-0.5 h-8 mt-2 ${getStatusColor(milestone.status)}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-sm">{milestone.title}</h5>
                        <Badge variant="outline" className="text-xs">
                          {milestone.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {milestone.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {milestone.completedAt 
                          ? `Completed: ${new Date(milestone.completedAt).toLocaleDateString()}`
                          : `Expected: ${new Date(milestone.estimatedCompletion).toLocaleDateString()}`
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Report
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Auditor
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
