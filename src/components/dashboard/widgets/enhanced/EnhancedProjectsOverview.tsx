
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { FolderOpen, Clock, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectsOverviewProps {
  userId: string;
}

interface Project {
  id: string;
  project_name: string;
  status: string;
  created_at: string;
  completion_percentage: number;
  security_score?: number;
  budget?: number;
}

async function fetchUserProjects(userId: string): Promise<Project[]> {
  const { data, error } = await supabase
    .from('audit_requests')
    .select('id, project_name, status, created_at, completion_percentage, security_score, budget')
    .eq('client_id', userId)
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) throw error;
  return data || [];
}

export function EnhancedProjectsOverview({ userId }: ProjectsOverviewProps) {
  const navigate = useNavigate();
  
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['user-projects', userId],
    queryFn: () => fetchUserProjects(userId),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Projects Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse h-16 bg-muted rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Projects Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Failed to load projects. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'success',
      in_progress: 'warning',
      pending: 'secondary',
      review: 'default'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-primary" />
          Projects Overview
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/audits')}
        >
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {projects?.length === 0 ? (
          <div className="text-center py-8">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-4">
              Start your first security audit to see projects here
            </p>
            <Button onClick={() => navigate('/request-audit')}>
              Request Audit
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {projects?.map((project) => (
              <div 
                key={project.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/audits/${project.id}`)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(project.status)}
                    <h4 className="font-medium truncate">{project.project_name}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(project.status)}
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    Created {new Date(project.created_at).toLocaleDateString()}
                  </span>
                  {project.budget && (
                    <span>${project.budget.toLocaleString()}</span>
                  )}
                </div>
                
                {project.completion_percentage > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{project.completion_percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${project.completion_percentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
