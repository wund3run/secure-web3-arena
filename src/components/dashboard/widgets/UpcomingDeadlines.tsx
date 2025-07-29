import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { formatDistanceToNow, isAfter, isBefore, addDays } from 'date-fns';

interface ProjectDeadline {
  id: string;
  project_name: string;
  deadline: string;
  [key: string]: unknown;
}

interface UpcomingDeadlinesProps {
  deadlines: unknown[];
}

export const UpcomingDeadlines = ({ deadlines }: UpcomingDeadlinesProps) => {
  // Type guard for project deadline
  const isProjectDeadline = (project: unknown): project is ProjectDeadline => {
    return typeof project === 'object' && 
           project !== null && 
           'id' in project && 
           'project_name' in project && 
           'deadline' in project;
  };

  const validDeadlines = deadlines.filter(isProjectDeadline);

  const getUrgencyBadge = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const threeDaysFromNow = addDays(now, 3);
    const weekFromNow = addDays(now, 7);

    if (isBefore(deadlineDate, now)) {
      return { text: 'Overdue', variant: 'error' as const };
    } else if (isBefore(deadlineDate, threeDaysFromNow)) {
      return { text: 'Urgent', variant: 'error' as const };
    } else if (isBefore(deadlineDate, weekFromNow)) {
      return { text: 'Soon', variant: 'secondary' as const };
    }
    return { text: 'Upcoming', variant: 'outline' as const };
  };

  if (validDeadlines.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8 text-muted-foreground">
          No upcoming deadlines
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {validDeadlines.map((project) => {
          const urgency = getUrgencyBadge(project.deadline);
          return (
            <div key={project.id} className="p-3 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm">{project.project_name}</h4>
                <Badge variant={urgency.variant} className="text-xs">
                  {urgency.text}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <Clock className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(new Date(project.deadline), { addSuffix: true })}
                </span>
              </div>
              
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to={`/audit/${project.id}`}>
                  View Project
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
