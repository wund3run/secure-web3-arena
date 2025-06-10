
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertCircle, FileCheck } from 'lucide-react';
import { useAuditMilestones } from '@/hooks/useAuditMilestones';

interface AuditProgressTrackerProps {
  auditRequestId: string;
}

export function AuditProgressTracker({ auditRequestId }: AuditProgressTrackerProps) {
  const { milestones, loading, updateMilestone } = useAuditMilestones(auditRequestId);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'blocked':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'default',
      in_progress: 'secondary',
      blocked: 'destructive',
      pending: 'outline'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const totalMilestones = milestones.length;
  const progressPercentage = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

  const handleMarkComplete = async (milestoneId: string) => {
    await updateMilestone(milestoneId, {
      status: 'completed',
      completed_at: new Date().toISOString()
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Audit Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Audit Progress
          <Badge variant="outline">
            {completedMilestones}/{totalMilestones} Completed
          </Badge>
        </CardTitle>
        <div className="space-y-2">
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-muted-foreground">
            {Math.round(progressPercentage)}% Complete
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="flex items-start gap-3 p-4 border rounded-lg"
          >
            <div className="mt-1">
              {getStatusIcon(milestone.status)}
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{milestone.title}</h4>
                {getStatusBadge(milestone.status)}
              </div>
              
              {milestone.description && (
                <p className="text-sm text-muted-foreground">
                  {milestone.description}
                </p>
              )}
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {milestone.due_date && (
                  <span>Due: {new Date(milestone.due_date).toLocaleDateString()}</span>
                )}
                {milestone.time_estimate_hours && (
                  <span>Est: {milestone.time_estimate_hours}h</span>
                )}
                {milestone.completed_at && (
                  <span>Completed: {new Date(milestone.completed_at).toLocaleDateString()}</span>
                )}
              </div>
              
              {milestone.deliverables && milestone.deliverables.length > 0 && (
                <div className="flex items-center gap-2">
                  <FileCheck className="h-3 w-3" />
                  <span className="text-xs text-muted-foreground">
                    {milestone.deliverables.length} deliverable(s)
                  </span>
                </div>
              )}
            </div>
            
            {milestone.status === 'in_progress' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleMarkComplete(milestone.id)}
              >
                Mark Complete
              </Button>
            )}
          </div>
        ))}
        
        {milestones.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No milestones defined yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
