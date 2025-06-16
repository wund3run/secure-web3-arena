
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
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'audit_update':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'payment':
        return <DollarSign className="h-4 w-4 text-yellow-500" />;
      case 'milestone':
        return <CheckCircle className="h-4 w-4 text-purple-500" />;
      case 'proposal':
        return <Users className="h-4 w-4 text-orange-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'message':
        return 'bg-blue-50 border-blue-200';
      case 'audit_update':
        return 'bg-green-50 border-green-200';
      case 'payment':
        return 'bg-yellow-50 border-yellow-200';
      case 'milestone':
        return 'bg-purple-50 border-purple-200';
      case 'proposal':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

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
      </div>
    </div>
  );
}
