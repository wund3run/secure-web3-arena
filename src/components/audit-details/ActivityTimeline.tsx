
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import type { AuditStatusUpdate } from '@/hooks/useAuditDetails';

interface ActivityTimelineProps {
  updates: AuditStatusUpdate[];
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'progress': return <Clock className="h-4 w-4" />;
    case 'milestone': return <CheckCircle className="h-4 w-4" />;
    case 'finding': return <AlertTriangle className="h-4 w-4" />;
    case 'communication': return <MessageCircle className="h-4 w-4" />;
    case 'deliverable': return <FileText className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'progress': return 'bg-blue-500';
    case 'milestone': return 'bg-green-500';
    case 'finding': return 'bg-red-500';
    case 'communication': return 'bg-purple-500';
    case 'deliverable': return 'bg-orange-500';
    default: return 'bg-gray-500';
  }
};

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ updates }) => {
  if (updates.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Activity Yet</h3>
          <p className="text-muted-foreground">
            Activity updates will appear here as the audit progresses.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {updates.map((update, index) => (
            <div key={update.id} className="flex gap-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full ${getActivityColor(update.status_type)} flex items-center justify-center text-white`}>
                  {getActivityIcon(update.status_type)}
                </div>
                {index < updates.length - 1 && (
                  <div className="w-0.5 h-6 bg-border mt-2"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{update.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {update.status_type.replace('_', ' ')}
                  </Badge>
                </div>
                
                {update.message && (
                  <p className="text-sm text-muted-foreground mb-2">{update.message}</p>
                )}

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{new Date(update.created_at).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{new Date(update.created_at).toLocaleTimeString()}</span>
                </div>

                {/* Metadata display */}
                {update.metadata && Object.keys(update.metadata).length > 0 && (
                  <div className="mt-2 p-2 bg-muted rounded text-xs">
                    {Object.entries(update.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="font-medium">{key}:</span>
                        <span>{String(value)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
