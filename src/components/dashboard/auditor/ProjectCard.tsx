
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  client: string;
  progress: number;
  deadline: string;
  priority: string;
  earnings: string;
  status: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return <Badge variant="error">Critical</Badge>;
      case 'High':
        return <Badge variant="default" className="bg-orange-100 text-orange-800">High</Badge>;
      case 'Medium':
        return <Badge variant="secondary">Medium</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'review':
        return <FileText className="h-4 w-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-4 border rounded-lg space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon(project.status)}
          <div>
            <h4 className="font-medium">{project.name}</h4>
            <p className="text-sm text-muted-foreground">{project.client}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getPriorityBadge(project.priority)}
          <span className="text-sm font-medium">{project.earnings}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-2" />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Deadline: {project.deadline}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            View Details
          </Button>
          <Button size="sm">
            Continue Work
          </Button>
        </div>
      </div>
    </div>
  );
}
