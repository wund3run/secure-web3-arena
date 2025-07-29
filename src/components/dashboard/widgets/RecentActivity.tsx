import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Activity, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

interface ActivityItem {
  id: string | number;
  status_type: string;
  title: string;
  message: string;
  created_at: string;
  audit_requests?: {
    project_name: string;
  };
  [key: string]: unknown;
}

interface RecentActivityProps {
  activities: unknown[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  // Type guard function for activity items
  const isValidActivityItem = (activity: unknown): activity is ActivityItem => {
    return (
      typeof activity === 'object' && 
      activity !== null && 
      'id' in activity &&
      'status_type' in activity &&
      'title' in activity &&
      'message' in activity &&
      'created_at' in activity
    );
  };

  const validActivities = activities.filter(isValidActivityItem);

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

  if (validActivities.length === 0) {
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
        {validActivities.map((activity) => {
          const Icon = getActivityIcon(String(activity.status_type));
          return (
            <div key={String(activity.id)} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Icon className={`h-5 w-5 mt-0.5 ${getActivityColor(String(activity.status_type))}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{String(activity.title)}</span>
                  <Badge variant="outline" className="text-xs">
                    {String(activity.audit_requests?.project_name || '')}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{String(activity.message)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(String(activity.created_at)), { addSuffix: true })}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
