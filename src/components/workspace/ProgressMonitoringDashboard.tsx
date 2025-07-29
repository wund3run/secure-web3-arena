
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertTriangle, Calendar, Target, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending' | 'overdue';
  dueDate: Date;
  completedAt?: Date;
  progress: number;
}

interface ProgressMonitoringDashboardProps {
  auditId: string;
}

export function ProgressMonitoringDashboard({ auditId }: ProgressMonitoringDashboardProps) {
  const [milestones] = useState<Milestone[]>([
    {
      id: '1',
      title: 'Initial Code Review',
      description: 'Complete first pass review of all smart contracts',
      status: 'completed',
      dueDate: new Date(Date.now() - 86400000),
      completedAt: new Date(Date.now() - 172800000),
      progress: 100
    },
    {
      id: '2',
      title: 'Vulnerability Assessment',
      description: 'Identify and document security vulnerabilities',
      status: 'in_progress',
      dueDate: new Date(Date.now() + 86400000),
      progress: 75
    },
    {
      id: '3',
      title: 'Gas Optimization Review',
      description: 'Analyze and suggest gas optimization improvements',
      status: 'pending',
      dueDate: new Date(Date.now() + 172800000),
      progress: 0
    },
    {
      id: '4',
      title: 'Final Report Generation',
      description: 'Compile comprehensive audit report with findings',
      status: 'pending',
      dueDate: new Date(Date.now() + 345600000),
      progress: 0
    }
  ]);

  const overallProgress = Math.round(
    milestones.reduce((acc, milestone) => acc + milestone.progress, 0) / milestones.length
  );

  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const totalMilestones = milestones.length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <p className="text-3xl font-bold">{overallProgress}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
            <Progress value={overallProgress} className="w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Milestones</p>
                <p className="text-3xl font-bold">{completedMilestones}/{totalMilestones}</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-sm text-muted-foreground">
              {totalMilestones - completedMilestones} remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Next Deadline</p>
                <p className="text-lg font-semibold">
                  {formatDistanceToNow(
                    milestones.find(m => m.status !== 'completed')?.dueDate || new Date(),
                    { addSuffix: true }
                  )}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
            <p className="text-sm text-muted-foreground">Vulnerability Assessment</p>
          </CardContent>
        </Card>
      </div>

      {/* Milestones Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Audit Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative">
                {index < milestones.length - 1 && (
                  <div className="absolute left-4 top-8 w-0.5 h-16 bg-border" />
                )}
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-background border-2 border-border rounded-full flex items-center justify-center">
                    {getStatusIcon(milestone.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(milestone.status)}>
                          {milestone.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {milestone.status === 'completed' && milestone.completedAt
                            ? formatDistanceToNow(milestone.completedAt, { addSuffix: true })
                            : formatDistanceToNow(milestone.dueDate, { addSuffix: true })
                          }
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{milestone.progress}%</span>
                      </div>
                      <Progress value={milestone.progress} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Milestone Complete
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Update Timeline
            </Button>
            <Button variant="outline" className="justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              Generate Progress Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
