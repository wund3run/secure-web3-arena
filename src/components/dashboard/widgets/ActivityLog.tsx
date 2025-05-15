
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, FilePlus, FileWarning, ShieldCheck } from "lucide-react";

interface ActivityLogProps {
  userType: string;
}

export function ActivityLog({ userType }: ActivityLogProps) {
  const isAuditor = userType === 'auditor';

  // Sample data to demonstrate different activities
  const auditorActivities = [
    {
      id: 1,
      title: 'Completed audit review',
      project: 'DeFi Protocol XYZ',
      time: '2 hours ago',
      icon: <CircleCheck className="h-4 w-4 text-green-500" />,
      type: 'completion'
    },
    {
      id: 2,
      title: 'Found critical vulnerability',
      project: 'NFT Marketplace',
      time: '1 day ago',
      icon: <FileWarning className="h-4 w-4 text-red-500" />,
      type: 'vulnerability'
    },
    {
      id: 3,
      title: 'Started new audit',
      project: 'Cross-chain Bridge',
      time: '3 days ago',
      icon: <FilePlus className="h-4 w-4 text-blue-500" />,
      type: 'new'
    },
    {
      id: 4,
      title: 'Published verification report',
      project: 'DAO Governance',
      time: '1 week ago',
      icon: <ShieldCheck className="h-4 w-4 text-purple-500" />,
      type: 'report'
    }
  ];

  const projectOwnerActivities = [
    {
      id: 1,
      title: 'Received audit report',
      project: 'Token Contract',
      time: '3 hours ago',
      icon: <FilePlus className="h-4 w-4 text-blue-500" />,
      type: 'report'
    },
    {
      id: 2,
      title: 'Fixed critical vulnerability',
      project: 'DEX Protocol',
      time: '2 days ago',
      icon: <CircleCheck className="h-4 w-4 text-green-500" />,
      type: 'fix'
    },
    {
      id: 3,
      title: 'New security alert',
      project: 'Lending Platform',
      time: '4 days ago',
      icon: <FileWarning className="h-4 w-4 text-red-500" />,
      type: 'alert'
    },
    {
      id: 4,
      title: 'Submitted audit request',
      project: 'Staking Contract',
      time: '1 week ago',
      icon: <ShieldCheck className="h-4 w-4 text-purple-500" />,
      type: 'request'
    }
  ];

  const activities = isAuditor ? auditorActivities : projectOwnerActivities;

  return (
    <ScrollArea className="h-[320px] w-full pr-4">
      <div className="space-y-4 pr-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 rounded-lg border p-3">
            <div className="mt-1">{activity.icon}</div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <Badge variant="outline" className="text-xs">
                  {activity.time}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{activity.project}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
