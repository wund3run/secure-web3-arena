
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';
import { fetchRecentActivity } from './recent-activity/RecentActivityService';
import { ActivityItem } from './recent-activity/ActivityItem';
import { RecentActivityLoading } from './recent-activity/RecentActivityLoading';
import { RecentActivityError } from './recent-activity/RecentActivityError';
import { RecentActivityEmpty } from './recent-activity/RecentActivityEmpty';

interface RecentActivityProps {
  userId: string;
}

export function EnhancedRecentActivity({ userId }: RecentActivityProps) {
  const { data: activities, isLoading, error } = useQuery({
    queryKey: ['recent-activity', userId],
    queryFn: () => fetchRecentActivity(userId),
    staleTime: 2 * 60 * 1000,
  });

  if (isLoading) {
    return <RecentActivityLoading />;
  }

  if (error) {
    return <RecentActivityError />;
  }

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
          <RecentActivityEmpty />
        ) : (
          <div className="space-y-4">
            {activities?.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
