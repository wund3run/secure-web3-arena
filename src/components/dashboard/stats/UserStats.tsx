
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent } from "@/components/ui/card";
import { CircleCheck, Clock, FileText, Shield } from "lucide-react";

interface UserStatsProps {
  userType: string;
}

export function UserStats({ userType }: UserStatsProps) {
  const { userProfile } = useAuth();
  const isAuditor = userType === 'auditor';

  // Default stats for demonstration
  const auditorStats = [
    { 
      label: "Completed Audits", 
      value: userProfile?.projects_completed || 0, 
      icon: <CircleCheck className="h-4 w-4 text-green-500" /> 
    },
    { 
      label: "Active Audits", 
      value: "2", 
      icon: <Clock className="h-4 w-4 text-blue-500" /> 
    },
    { 
      label: "Reputation Score", 
      value: "93%", 
      icon: <Shield className="h-4 w-4 text-purple-500" /> 
    }
  ];

  const projectOwnerStats = [
    { 
      label: "Projects", 
      value: "4", 
      icon: <FileText className="h-4 w-4 text-blue-500" /> 
    },
    { 
      label: "Audit Requests", 
      value: "2", 
      icon: <Clock className="h-4 w-4 text-amber-500" /> 
    },
    { 
      label: "Security Score", 
      value: "85%", 
      icon: <Shield className="h-4 w-4 text-green-500" /> 
    }
  ];

  const stats = isAuditor ? auditorStats : projectOwnerStats;

  return (
    <Card className="bg-muted/50">
      <CardContent className="p-4">
        <div className="flex gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              {stat.icon}
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                <span className="font-medium">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
