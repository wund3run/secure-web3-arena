
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText, Shield, User, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecentActivityProps {
  userType: string;
}

export function RecentActivity({ userType }: RecentActivityProps) {
  // Mock data - in real app, this would come from API
  const auditorActivities = [
    {
      id: 1,
      type: 'audit_completed',
      title: 'DeFi Protocol V2 Audit',
      description: 'Smart contract security review completed',
      status: 'completed',
      timestamp: '2 hours ago',
      severity: 'success'
    },
    {
      id: 2,
      type: 'audit_started',
      title: 'NFT Marketplace Security Review',
      description: 'Started comprehensive security audit',
      status: 'in_progress',
      timestamp: '1 day ago',
      severity: 'info'
    },
    {
      id: 3,
      type: 'report_submitted',
      title: 'Cross-Chain Bridge Report',
      description: 'Final security report submitted to client',
      status: 'completed',
      timestamp: '3 days ago',
      severity: 'success'
    }
  ];

  const projectOwnerActivities = [
    {
      id: 1,
      type: 'audit_received',
      title: 'Smart Contract Audit Completed',
      description: 'Security audit report received from CyberSec Labs',
      status: 'completed',
      timestamp: '1 hour ago',
      severity: 'success'
    },
    {
      id: 2,
      type: 'vulnerability_found',
      title: 'Critical Vulnerability Identified',
      description: 'High-priority security issue found in contract logic',
      status: 'attention_needed',
      timestamp: '6 hours ago',
      severity: 'warning'
    },
    {
      id: 3,
      type: 'audit_requested',
      title: 'New Audit Request Submitted',
      description: 'Requested security review for DeFi protocol upgrade',
      status: 'pending',
      timestamp: '2 days ago',
      severity: 'info'
    }
  ];

  const activities = userType === 'auditor' ? auditorActivities : projectOwnerActivities;

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'audit_completed':
      case 'audit_received':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'vulnerability_found':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'audit_started':
      case 'audit_requested':
        return <Shield className="h-4 w-4 text-blue-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in_progress':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'attention_needed':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Attention Needed</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Activity
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/analytics">
              View All
            </Link>
          </Button>
        </CardTitle>
        <CardDescription>
          {userType === 'auditor' ? 'Your latest audit activities' : 'Recent project updates and security activities'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
              <div className="mt-1">
                {getStatusIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">{activity.title}</p>
                  {getStatusBadge(activity.status)}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {activity.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
