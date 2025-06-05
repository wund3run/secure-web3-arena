
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Activity, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

interface RecentActivityProps {
  activities: any[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'milestone_update': return CheckCircle;
      case 'status_change': return Activity;
      case 'report_generated': return FileText;
      default: return AlertTriangle;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'milestone_update': return 'text-green-500';
      case 'status_change': return 'text-blue-500';
      case 'report_generated': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8 text-muted-foreground">
          No recent activity to display
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.status_type);
          return (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Icon className={`h-5 w-5 mt-0.5 ${getActivityColor(activity.status_type)}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{activity.title}</span>
                  <Badge variant="outline" className="text-xs">
                    {activity.audit_requests?.project_name}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
