
import React from 'react';
import { FileText, MessageSquare, Activity } from 'lucide-react';

interface ActivityIconProps {
  type: string;
}

export function ActivityIcon({ type }: ActivityIconProps) {
  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
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

  const getActivityColor = (activityType: string) => {
    switch (activityType) {
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
    <div className={`p-2 rounded-full ${getActivityColor(type)}`}>
      {getActivityIcon(type)}
    </div>
  );
}
