
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckSquare, AlertCircle } from 'lucide-react';

export function AuditLifecycleManager() {
  const milestones = [
    { id: 1, title: 'Initial Review', status: 'completed', dueDate: '2024-01-15' },
    { id: 2, title: 'Code Analysis', status: 'in-progress', dueDate: '2024-01-20' },
    { id: 3, title: 'Vulnerability Testing', status: 'pending', dueDate: '2024-01-25' },
    { id: 4, title: 'Final Report', status: 'pending', dueDate: '2024-01-30' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckSquare className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Audit Lifecycle
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(milestone.status)}
                <div>
                  <p className="font-medium">{milestone.title}</p>
                  <p className="text-sm text-muted-foreground">Due: {milestone.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(milestone.status)}
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">25%</span>
          </div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full">
            <div className="h-full w-1/4 bg-primary rounded-full"></div>
          </div>
        </div>

        <Button className="w-full">
          Update Milestone
        </Button>
      </CardContent>
    </Card>
  );
}
