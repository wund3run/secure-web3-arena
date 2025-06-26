
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, Circle, AlertCircle } from 'lucide-react';

interface ProjectTimelineProps {
  project: any;
}

export function ProjectTimeline({ project }: ProjectTimelineProps) {
  const timelineEvents = [
    {
      date: '2024-01-15',
      title: 'Project Posted',
      description: 'Security audit request submitted to marketplace',
      status: 'completed',
      icon: CheckCircle
    },
    {
      date: '2024-01-16',
      title: 'Applications Open',
      description: 'Auditors can now submit their proposals',
      status: 'completed',
      icon: CheckCircle
    },
    {
      date: '2024-01-20',
      title: 'Application Deadline',
      description: 'Last day to submit audit proposals',
      status: 'current',
      icon: AlertCircle
    },
    {
      date: '2024-01-22',
      title: 'Auditor Selection',
      description: 'Project owner reviews and selects auditor',
      status: 'pending',
      icon: Circle
    },
    {
      date: '2024-01-25',
      title: 'Audit Begins',
      description: 'Security audit work commences',
      status: 'pending',
      icon: Circle
    },
    {
      date: '2024-02-15',
      title: 'Initial Report',
      description: 'First draft of audit findings delivered',
      status: 'pending',
      icon: Circle
    },
    {
      date: '2024-02-25',
      title: 'Final Delivery',
      description: 'Complete audit report and recommendations',
      status: 'pending',
      icon: Circle
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'current': return 'text-blue-600';
      case 'pending': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'current': return <Badge variant="default">Current</Badge>;
      case 'pending': return <Badge variant="outline">Pending</Badge>;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Project Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`p-1 rounded-full ${getStatusColor(event.status)}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold">{event.title}</h4>
                      {getStatusBadge(event.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{event.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Key Dates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Applications Close:</span>
            <span className="font-semibold">Jan 20, 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Expected Start:</span>
            <span className="font-semibold">Jan 25, 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Expected Completion:</span>
            <span className="font-semibold">Feb 25, 2024</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
