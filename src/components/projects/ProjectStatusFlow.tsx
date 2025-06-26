
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertCircle, Users, MessageSquare } from 'lucide-react';

interface ProjectStatusFlowProps {
  project: {
    id: string;
    name: string;
    status: 'pending' | 'matching' | 'proposal_review' | 'in_progress' | 'review' | 'completed';
    progress: number;
    currentPhase: string;
    nextAction: string;
    proposalCount?: number;
    auditorAssigned?: string;
    estimatedCompletion?: string;
  };
  userRole: 'client' | 'auditor';
  onTakeAction: (action: string, projectId: string) => void;
}

export function ProjectStatusFlow({ project, userRole, onTakeAction }: ProjectStatusFlowProps) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: Clock,
          title: 'Project Submitted',
          description: 'Your project is being reviewed and will be listed soon'
        };
      case 'matching':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: Users,
          title: 'Finding Auditors',
          description: 'AI is matching your project with suitable auditors'
        };
      case 'proposal_review':
        return {
          color: 'bg-purple-100 text-purple-800',
          icon: MessageSquare,
          title: 'Review Proposals',
          description: `${project.proposalCount || 0} auditors have submitted proposals`
        };
      case 'in_progress':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: Clock,
          title: 'Audit in Progress',
          description: `Auditor: ${project.auditorAssigned || 'Assigned'}`
        };
      case 'review':
        return {
          color: 'bg-orange-100 text-orange-800',
          icon: AlertCircle,
          title: 'Under Review',
          description: 'Audit completed, reviewing findings'
        };
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle,
          title: 'Completed',
          description: 'Audit successfully completed'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: Clock,
          title: 'Unknown',
          description: 'Status unknown'
        };
    }
  };

  const getNextActions = () => {
    if (userRole === 'client') {
      switch (project.status) {
        case 'proposal_review':
          return [
            { label: 'Review Proposals', action: 'review_proposals', primary: true },
            { label: 'View Matches', action: 'view_matches', primary: false }
          ];
        case 'in_progress':
          return [
            { label: 'Open Chat', action: 'open_chat', primary: true },
            { label: 'View Progress', action: 'view_progress', primary: false }
          ];
        case 'review':
          return [
            { label: 'Review Report', action: 'review_report', primary: true },
            { label: 'Leave Feedback', action: 'leave_feedback', primary: false }
          ];
        default:
          return [];
      }
    } else {
      // Auditor actions
      switch (project.status) {
        case 'matching':
          return [
            { label: 'Submit Proposal', action: 'submit_proposal', primary: true },
            { label: 'View Details', action: 'view_details', primary: false }
          ];
        case 'in_progress':
          return [
            { label: 'Open Chat', action: 'open_chat', primary: true },
            { label: 'Update Progress', action: 'update_progress', primary: false },
            { label: 'Submit Finding', action: 'submit_finding', primary: false }
          ];
        default:
          return [];
      }
    }
  };

  const statusInfo = getStatusInfo(project.status);
  const StatusIcon = statusInfo.icon;
  const nextActions = getNextActions();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{project.name}</CardTitle>
          <Badge className={statusInfo.color} variant="secondary">
            <StatusIcon className="h-3 w-3 mr-1" />
            {statusInfo.title}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{statusInfo.description}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-muted/50 rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground">Current Phase</p>
            <p className="text-sm font-medium">{project.currentPhase}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Next Step</p>
            <p className="text-sm font-medium">{project.nextAction}</p>
          </div>
        </div>

        {project.estimatedCompletion && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Estimated completion: {project.estimatedCompletion}</span>
          </div>
        )}

        {nextActions.length > 0 && (
          <div className="flex gap-2 pt-4 border-t">
            {nextActions.map((action, index) => (
              <Button
                key={index}
                variant={action.primary ? 'default' : 'outline'}
                onClick={() => onTakeAction(action.action, project.id)}
                className={action.primary ? 'flex-1' : ''}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
