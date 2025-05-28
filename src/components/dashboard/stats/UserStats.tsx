
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/auth';

interface UserStatsProps {
  userType: string;
}

export function UserStats({ userType }: UserStatsProps) {
  const { user } = useAuth();

  const getUserTypeBadge = (type: string) => {
    const variants = {
      auditor: 'bg-blue-100 text-blue-800',
      project_owner: 'bg-purple-100 text-purple-800',
      admin: 'bg-orange-100 text-orange-800',
      general: 'bg-gray-100 text-gray-800'
    };
    
    const labels = {
      auditor: 'Security Auditor',
      project_owner: 'Project Owner', 
      admin: 'Administrator',
      general: 'User'
    };
    
    return (
      <Badge className={variants[type as keyof typeof variants] || variants.general}>
        {labels[type as keyof typeof labels] || 'User'}
      </Badge>
    );
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      {getUserTypeBadge(userType)}
    </div>
  );
}
