
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ActivityIcon } from './ActivityIcon';
import type { ActivityItem as ActivityItemType } from './RecentActivityService';

interface ActivityItemProps {
  activity: ActivityItemType;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <ActivityIcon type={activity.type} />
      
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
          <Badge variant="outline" className="mt-1">
            {activity.metadata.status.replace('_', ' ')}
          </Badge>
        )}
      </div>
    </div>
  );
}
