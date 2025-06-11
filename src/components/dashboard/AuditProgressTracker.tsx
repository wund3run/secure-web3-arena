
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle, AlertCircle, FileText, MessageSquare, Calendar } from 'lucide-react';

interface AuditProject {
  id: string;
  projectName: string;
  auditor: string;
  auditorAvatar: string;
  status: 'in_progress' | 'review' | 'completed' | 'pending';
  progress: number;
  startDate: string;
  estimatedCompletion: string;
  currentPhase: string;
  nextMilestone: string;
  totalFindings: number;
  criticalFindings: number;
  lastUpdate: string;
  recentActivity: string[];
}

const mockAuditProjects: AuditProject[] = [
  {
    id: '1',
    projectName: 'DeFi Yield Protocol v2',
    auditor: 'Dr. Alexandra Petrov',
    auditorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b332e234?w=100&h=100&fit=crop&crop=face',
    status: 'in_progress',
    progress: 65,
    startDate: '2025-01-15',
    estimatedCompletion: '2025-01-28',
    currentPhase: 'Dynamic Analysis',
    nextMilestone: 'Security Report Draft',
    totalFindings: 8,
    criticalFindings: 2,
    lastUpdate: '2 hours ago',
    recentActivity: [
      'Completed gas optimization analysis',
      'Found potential reentrancy in withdraw function',
      'Reviewed governance token distribution logic'
    ]
  },
  {
    id: '2',
    projectName: 'NFT Marketplace Smart Contracts',
    auditor: 'Marcus Chen',
    auditorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    status: 'review',
    progress: 90,
    startDate: '2025-01-10',
    estimatedCompletion: '2025-01-25',
    currentPhase: 'Final Report Review',
    nextMilestone: 'Report Delivery',
    totalFindings: 12,
    criticalFindings: 1,
    lastUpdate: '1 day ago',
    recentActivity: [
      'Final report under review',
      'All critical issues documented',
      'Remediation recommendations provided'
    ]
  },
  {
    id: '3',
    projectName: 'Cross-chain Bridge Protocol',
    auditor: 'Sarah Johnson',
    auditorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    status: 'pending',
    progress: 0,
    startDate: '2025-01-30',
    estimatedCompletion: '2025-02-15',
    currentPhase: 'Awaiting Code Access',
    nextMilestone: 'Initial Code Review',
    totalFindings: 0,
    criticalFindings: 0,
    lastUpdate: '3 days ago',
    recentActivity: [
      'Auditor assigned to project',
      'Preliminary scope discussion completed',
      'Waiting for repository access'
    ]
  }
];

export function AuditProgressTracker() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'review': return 'bg-orange-500';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'review': return <FileText className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Audit Progress</h2>
          <p className="text-muted-foreground">Track your security audit projects in real-time</p>
        </div>
        <Button>Request New Audit</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockAuditProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg leading-tight mb-2">
                    {project.projectName}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <img 
                      src={project.auditorAvatar} 
                      alt={project.auditor}
                      className="h-6 w-6 rounded-full"
                    />
                    <span className="text-sm text-muted-foreground">{project.auditor}</span>
                  </div>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`${getStatusColor(project.status)} text-white flex items-center gap-1`}
                >
                  {getStatusIcon(project.status)}
                  {project.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="font-medium text-muted-foreground">Current Phase</div>
                  <div className="font-semibold">{project.currentPhase}</div>
                </div>
                <div>
                  <div className="font-medium text-muted-foreground">Next Milestone</div>
                  <div className="font-semibold">{project.nextMilestone}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-blue-500" />
                  <span className="text-muted-foreground">Started:</span>
                  <span className="font-medium">{formatDate(project.startDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-green-500" />
                  <span className="text-muted-foreground">Due:</span>
                  <span className="font-medium">{formatDate(project.estimatedCompletion)}</span>
                </div>
              </div>

              {project.totalFindings > 0 && (
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm">
                    <span className="font-semibold">{project.totalFindings}</span>
                    <span className="text-muted-foreground"> findings</span>
                  </div>
                  {project.criticalFindings > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {project.criticalFindings} critical
                    </Badge>
                  )}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Recent Activity</span>
                  <span className="text-xs text-muted-foreground">({project.lastUpdate})</span>
                </div>
                <div className="space-y-1">
                  {project.recentActivity.slice(0, 2).map((activity, index) => (
                    <div key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                      <div className="h-1 w-1 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1">
                  Message Auditor
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Active Audits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-muted-foreground">Completed Audits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-muted-foreground">Critical Issues Fixed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">96%</div>
              <div className="text-sm text-muted-foreground">Security Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
