
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, Calendar, TrendingUp } from 'lucide-react';

interface AuditProgressTabProps {
  auditData: any;
}

export const AuditProgressTab = ({ auditData }: AuditProgressTabProps) => {
  const milestones = [
    { id: 1, name: 'Initial Code Review', status: 'completed', dueDate: '2023-05-20', completedDate: '2023-05-18' },
    { id: 2, name: 'Vulnerability Assessment', status: 'in-progress', dueDate: '2023-05-28', progress: 75 },
    { id: 3, name: 'Security Testing', status: 'pending', dueDate: '2023-06-05' },
    { id: 4, name: 'Final Report', status: 'pending', dueDate: '2023-06-10' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Audit Completion</span>
              <span className="text-2xl font-bold">{auditData.progress}%</span>
            </div>
            <Progress value={auditData.progress} className="h-3" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">2</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">1</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-600">1</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Project Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  {getStatusIcon(milestone.status)}
                  {index < milestones.length - 1 && (
                    <div className="w-px h-12 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{milestone.name}</h4>
                    <Badge className={getStatusColor(milestone.status)}>
                      {milestone.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Due: {new Date(milestone.dueDate).toLocaleDateString()}
                    {milestone.completedDate && (
                      <span className="ml-2 text-green-600">
                        (Completed: {new Date(milestone.completedDate).toLocaleDateString()})
                      </span>
                    )}
                  </div>
                  {milestone.status === 'in-progress' && milestone.progress && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{milestone.progress}%</span>
                      </div>
                      <Progress value={milestone.progress} className="h-2" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
              <div>
                <div className="font-medium">Vulnerability Assessment Updated</div>
                <div className="text-sm text-muted-foreground">Found 3 new medium-severity issues in smart contract logic</div>
                <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-4 w-4 text-blue-500 mt-1" />
              <div>
                <div className="font-medium">Code Review Completed</div>
                <div className="text-sm text-muted-foreground">Initial review of all smart contracts finished ahead of schedule</div>
                <div className="text-xs text-muted-foreground mt-1">1 day ago</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="h-4 w-4 text-orange-500 mt-1" />
              <div>
                <div className="font-medium">Critical Issue Identified</div>
                <div className="text-sm text-muted-foreground">Reentrancy vulnerability found in withdrawal function</div>
                <div className="text-xs text-muted-foreground mt-1">2 days ago</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
