
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  MessageSquare, 
  Download,
  Eye,
  User,
  Calendar,
  DollarSign
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface AuditRequest {
  id: string;
  projectName: string;
  status: 'pending' | 'matched' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  progress: number;
  auditor?: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  timeline: {
    phase: string;
    status: 'completed' | 'current' | 'upcoming';
    date?: Date;
    description: string;
  }[];
  createdAt: Date;
  deadline?: Date;
  budget: number;
  blockchain: string;
  lastUpdate: Date;
}

interface RequestStatusTrackerProps {
  request: AuditRequest;
  onViewDetails: () => void;
  onContactAuditor?: () => void;
  onDownloadReport?: () => void;
}

export function RequestStatusTracker({ 
  request, 
  onViewDetails, 
  onContactAuditor,
  onDownloadReport 
}: RequestStatusTrackerProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'review':
        return 'bg-yellow-500';
      case 'matched':
        return 'bg-purple-500';
      case 'pending':
        return 'bg-gray-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'in_progress':
      case 'review':
        return <Clock className="h-4 w-4" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const canContactAuditor = request.auditor && ['matched', 'in_progress', 'review'].includes(request.status);
  const canDownloadReport = request.status === 'completed';

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{request.projectName}</CardTitle>
            <CardDescription>
              Submitted {formatDistanceToNow(request.createdAt, { addSuffix: true })}
            </CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={`${getStatusColor(request.status)} text-white border-none`}
          >
            <div className="flex items-center gap-1">
              {getStatusIcon(request.status)}
              {request.status.replace('_', ' ').toUpperCase()}
            </div>
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{request.progress}% Complete</span>
          </div>
          <Progress value={request.progress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Project Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>${request.budget.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{request.deadline ? request.deadline.toLocaleDateString() : 'No deadline'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{request.blockchain}</Badge>
          </div>
          <div className="text-muted-foreground">
            ID: {request.id.slice(0, 8)}...
          </div>
        </div>

        <Separator />

        {/* Auditor Info (if assigned) */}
        {request.auditor && (
          <>
            <div>
              <h4 className="font-medium mb-3">Assigned Auditor</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    {request.auditor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{request.auditor.name}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground">Rating:</span>
                      <span className="text-sm font-medium">{request.auditor.rating}/5</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                  </div>
                </div>
                {canContactAuditor && onContactAuditor && (
                  <Button variant="outline" size="sm" onClick={onContactAuditor}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                )}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Timeline */}
        <div>
          <h4 className="font-medium mb-4">Audit Timeline</h4>
          <div className="space-y-3">
            {request.timeline.map((phase, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                  phase.status === 'completed' 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : phase.status === 'current'
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-gray-300 bg-white'
                }`}>
                  {phase.status === 'completed' ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : phase.status === 'current' ? (
                    <Clock className="h-3 w-3" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`font-medium ${
                        phase.status === 'current' ? 'text-blue-600' : ''
                      }`}>
                        {phase.phase}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {phase.description}
                      </p>
                    </div>
                    {phase.date && (
                      <span className="text-xs text-muted-foreground">
                        {phase.date.toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Last updated: {formatDistanceToNow(request.lastUpdate, { addSuffix: true })}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onViewDetails}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
            
            {canDownloadReport && onDownloadReport && (
              <Button variant="outline" size="sm" onClick={onDownloadReport}>
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
