import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  FileText, 
  DollarSign, 
  CheckCircle, 
  Users 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { RecentActivity } from './RecentActivityService';

interface ActivityItemProps {
  activity: RecentActivity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className={`p-3 rounded-lg border ${getActivityColor(activity.type)} transition-colors hover:shadow-sm`}>
      <div className="flex items-start gap-3">
        {activity.user_name ? (
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.avatar_url} />
            <AvatarFallback className="text-xs">
              {getInitials(activity.user_name)}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            {getActivityIcon(activity.type)}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h4 className="font-medium text-sm leading-tight">
                {activity.title}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {activity.description}
              </p>
              {activity.user_name && (
                <p className="text-xs text-muted-foreground">
                  by {activity.user_name}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 ml-2">
              <Badge variant="outline" className="text-xs">
                {activity.type.replace('_', ' ')}
              </Badge>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </span>
            </div>
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
