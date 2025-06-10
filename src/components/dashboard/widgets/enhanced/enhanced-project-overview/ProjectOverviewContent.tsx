
import React from 'react';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  name: string;
  status: string;
  created_at: string;
  project_audits?: Array<{
    id: string;
    status: string;
    severity_level: string;
    created_at: string;
  }>;
}

interface ProjectOverviewContentProps {
  projects: Project[];
}

export function ProjectOverviewContent({ projects }: ProjectOverviewContentProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-medium text-foreground mb-2">No projects yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get started by requesting your first security audit
          </p>
        </div>
        <Button asChild size="sm">
          <Link to="/request-audit">
            <Plus className="h-4 w-4 mr-2" />
            Request Audit
          </Link>
        </Button>
      </div>
    );
  }

  const getStatusIndicator = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <StatusIndicator status="success" message="Completed" size="sm" />;
      case 'in_progress':
        return <StatusIndicator status="pending" message="In Progress" size="sm" />;
      case 'pending':
        return <StatusIndicator status="warning" message="Pending" size="sm" />;
      case 'cancelled':
        return <StatusIndicator status="error" message="Cancelled" size="sm" />;
      default:
        return <StatusIndicator status="pending" message={status} size="sm" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Recent Projects</h3>
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard">
            View All
            <ExternalLink className="h-3 w-3 ml-1" />
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {projects.slice(0, 5).map((project) => (
          <div key={project.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <h4 className="font-medium text-sm truncate">{project.name}</h4>
                {getStatusIndicator(project.status)}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  Created {new Date(project.created_at).toLocaleDateString()}
                </span>
                {project.project_audits && project.project_audits.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {project.project_audits.length} audit{project.project_audits.length > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/audit/${project.id}`}>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        ))}
      </div>

      {projects.length > 5 && (
        <div className="text-center pt-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard">
              View {projects.length - 5} more projects
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
