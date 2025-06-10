
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Activity, Clock, User, MessageSquare, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RecentActivityProps {
  userId: string;
}

interface ActivityItem {
  id: string;
  type: 'audit_created' | 'audit_updated' | 'message_received' | 'report_generated';
  title: string;
  description: string;
  timestamp: string;
  metadata?: any;
}

async function fetchRecentActivity(userId: string): Promise<ActivityItem[]> {
  try {
    // Fetch recent audit activities
    const { data: auditData, error: auditError } = await supabase
      .from('audit_requests')
      .select('id, title, status, created_at, updated_at')
      .eq('client_id', userId)
      .order('updated_at', { ascending: false })
      .limit(10);

    if (auditError) throw auditError;

    const activities: ActivityItem[] = [];

    // Convert audit data to activities
    auditData?.forEach(audit => {
      activities.push({
        id: `audit-${audit.id}`,
        type: 'audit_created',
        title: 'Audit Request Created',
        description: audit.title || 'New audit request',
        timestamp: audit.created_at,
        metadata: { auditId: audit.id, status: audit.status }
      });

      if (audit.updated_at !== audit.created_at) {
        activities.push({
          id: `audit-updated-${audit.id}`,
          type: 'audit_updated',
          title: 'Audit Updated',
          description: `Status changed for "${audit.title}"`,
          timestamp: audit.updated_at,
          metadata: { auditId: audit.id, status: audit.status }
        });
      }
    });

    // Sort by timestamp and limit to recent activities
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 8);

  } catch (error) {
    console.error('Error fetching recent activity:', error);
    throw error;
  }
}

export function EnhancedRecentActivity({ userId }: RecentActivityProps) {
  const { data: activities, isLoading, error } = useQuery({
    queryKey: ['recent-activity', userId],
    queryFn: () => fetchRecentActivity(userId),
    staleTime: 2 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-3/4 mb-1" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
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
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Failed to load recent activity.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'audit_created':
      case 'audit_updated':
        return <FileText className="h-4 w-4" />;
      case 'message_received':
        return <MessageSquare className="h-4 w-4" />;
      case 'report_generated':
        return <FileText className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'audit_created':
        return 'bg-primary/10 text-primary';
      case 'audit_updated':
        return 'bg-secondary/10 text-secondary';
      case 'message_received':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities?.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm truncate">
                      {activity.title}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground truncate">
                    {activity.description}
                  </p>
                  
                  {activity.metadata?.status && (
                    <Badge variant="outline" size="sm" className="mt-1">
                      {activity.metadata.status.replace('_', ' ')}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
