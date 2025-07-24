import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { ExternalLink, Calendar, DollarSign } from 'lucide-react';

interface AuditRequest {
  id: string | number;
  project_name: string;
  project_description: string;
  status: string;
  created_at: string;
  budget?: number;
  blockchain: string;
  completion_percentage?: number;
  deadline?: string;
  [key: string]: unknown;
}

interface ProjectsOverviewProps {
  auditRequests: unknown[];
  onRefresh: () => void;
}

export const ProjectsOverview = ({ auditRequests, onRefresh }: ProjectsOverviewProps) => {
  // Type guard function
  const isValidAuditRequest = (request: unknown): request is AuditRequest => {
    return (
      typeof request === 'object' && 
      request !== null && 
      'id' in request &&
      'project_name' in request &&
      'status' in request
    );
  };

  const validRequests = auditRequests.filter(isValidAuditRequest);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'in_progress': return 'secondary';
      case 'pending': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (validRequests.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="text-muted-foreground mb-4">
            You haven't submitted any audit requests yet.
          </div>
          <Button asChild>
            <Link to="/request-audit">
              Submit Your First Audit Request
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Projects</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link to="/audits">
            View All
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {validRequests.slice(0, 5).map((request) => (
          <div key={String(request.id)} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold">{String(request.project_name)}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {String(request.project_description || '')}
                </p>
              </div>
              <Badge variant={getStatusColor(String(request.status))}>
                {String(request.status).replace('_', ' ')}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{formatDate(String(request.created_at))}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>{formatCurrency(Number(request.budget) || 0)}</span>
              </div>
              <div className="text-muted-foreground">
                {String(request.blockchain || '')}
              </div>
              <div className="text-muted-foreground">
                {Number(request.completion_percentage) || 0}% complete
              </div>
            </div>

            {String(request.status) === 'in_progress' && (
              <Progress value={Number(request.completion_percentage) || 0} className="mb-3" />
            )}

            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                {request.deadline && `Deadline: ${formatDate(String(request.deadline))}`}
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to={`/audit/${String(request.id)}`}>
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
