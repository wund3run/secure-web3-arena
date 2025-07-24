import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FilePlus, FileWarning, ShieldCheck, AlertTriangle, XCircle, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
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
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
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
    <Card className="bg-card rounded-[1.15rem] shadow-[0_8px_40px_0_rgba(50,60,130,0.23)] p-6">
      <CardContent>
        <h3 className="font-black uppercase tracking-tight text-accent-primary mb-3" style={{ fontFamily: "'Space Grotesk', Arial, sans-serif", letterSpacing: '0.08em' }}>
          Recent Activity
        </h3>
        <ul className="space-y-3">
          {activities.map((item, idx) => (
            <li key={idx} className="flex items-center gap-3">
              {item.type === 'success' && <CheckCircle className="h-4 w-4 text-success" />}
              {item.type === 'warning' && <AlertTriangle className="h-4 w-4 text-warning" />}
              {item.type === 'error' && <XCircle className="h-4 w-4 text-error" />}
              {item.type === 'info' && <Info className="h-4 w-4 text-info" />}
              <span className="text-sm text-primary" style={{ fontFamily: "'Space Grotesk', Arial, sans-serif" }}>{item.title}</span>
              <span className="text-xs text-secondary ml-auto" style={{ fontFamily: "'Space Grotesk', Arial, sans-serif" }}>{item.time}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
