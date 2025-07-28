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

// Define activity color mapping
const getActivityColor = (type: string): string => {
  const colors: Record<string, string> = {
    audit: 'bg-blue-50 border-blue-200',
    project: 'bg-purple-50 border-purple-200',
    security: 'bg-green-50 border-green-200',
    payment: 'bg-amber-50 border-amber-200',
    system: 'bg-gray-50 border-gray-200',
    message: 'bg-indigo-50 border-indigo-200'
  };
  return colors[type] || colors.system;
};

// Get initials from name
const getInitials = (name: string): string => {
  if (!name) return '??';
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Get icon based on activity type
const getActivityIcon = (type: string): React.ReactNode => {
  switch (type) {
    case 'message': return <MessageSquare className="h-4 w-4" />;
    case 'audit': return <FileText className="h-4 w-4" />;
    case 'payment': return <DollarSign className="h-4 w-4" />;
    case 'security': return <CheckCircle className="h-4 w-4" />;
    case 'project': return <Users className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
};

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
