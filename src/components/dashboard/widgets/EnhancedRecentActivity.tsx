import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  AlertCircle, 
  CheckCircle, 
  ShieldCheck, 
  MessageSquare, 
  FileText, 
  User, 
  Clock,
  Calendar
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'issue' | 'review' | 'message' | 'report' | 'user' | 'project';
  title: string;
  description: string;
  timestamp: string;
  date: string;
  status?: 'success' | 'warning' | 'error' | 'info';
  projectId?: string;
  projectName?: string;
}

interface EnhancedRecentActivityProps {
  userId: string;
  className?: string;
  limit?: number;
}

export function EnhancedRecentActivity({ 
  userId, 
  className,
  limit = 5
}: EnhancedRecentActivityProps) {
  // Mock data - in real implementation this would fetch from API
  const activities: Activity[] = [
    {
      id: 'act-1',
      type: 'issue',
      title: 'Critical vulnerability detected',
      description: 'A reentrancy vulnerability was found in contract DeFiProtocol.sol',
      timestamp: '2 hours ago',
      date: '2023-06-12',
      status: 'error',
      projectId: 'proj-1',
      projectName: 'DeFi Lending Protocol'
    },
    {
      id: 'act-2',
      type: 'review',
      title: 'Audit review completed',
      description: 'Auditor Alex has completed their review of your NFT marketplace',
      timestamp: '1 day ago',
      date: '2023-06-11',
      status: 'success',
      projectId: 'proj-2',
      projectName: 'NFT Marketplace'
    },
    {
      id: 'act-3',
      type: 'message',
      title: 'New message from auditor',
      description: 'Sophia sent you a message regarding your DAO project',
      timestamp: '2 days ago',
      date: '2023-06-10',
      projectId: 'proj-3',
      projectName: 'DAO Governance'
    },
    {
      id: 'act-4',
      type: 'report',
      title: 'Final audit report available',
      description: 'The final report for your NFT marketplace audit is ready',
      timestamp: '1 week ago',
      date: '2023-06-05',
      status: 'info',
      projectId: 'proj-2',
      projectName: 'NFT Marketplace'
    }
  ];

  const getActivityIcon = (type: Activity['type'], status?: Activity['status']) => {
    switch (type) {
      case 'issue':
        return status === 'error' 
          ? <AlertCircle className="h-4 w-4 text-red-500" />
          : status === 'warning'
            ? <AlertCircle className="h-4 w-4 text-amber-500" />
            : <AlertCircle className="h-4 w-4 text-muted-foreground" />;
      case 'review':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'report':
        return <FileText className="h-4 w-4 text-purple-500" />;
      case 'user':
        return <User className="h-4 w-4 text-teal-500" />;
      case 'project':
        return <ShieldCheck className="h-4 w-4 text-primary" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between py-5">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.slice(0, limit).map(activity => (
            <div key={activity.id} className="flex gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getActivityIcon(activity.type, activity.status)}
              </div>
              <div>
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{activity.description}</p>
                <div className="flex gap-2 items-center mt-2">
                  <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  {activity.projectName && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs font-medium">{activity.projectName}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {activities.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-8 w-8 mx-auto mb-3 opacity-40" />
              <p>No recent activity</p>
              <p className="text-xs mt-1">Your recent actions will appear here</p>
            </div>
          )}
        </div>
        
        {activities.length > limit && (
          <div className="mt-6 border-t pt-4">
            <button className="w-full text-sm text-center text-primary font-medium hover:underline">
              View all activity
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
