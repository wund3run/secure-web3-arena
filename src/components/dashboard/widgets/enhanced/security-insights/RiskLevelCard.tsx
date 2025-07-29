
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface RiskLevelCardProps {
  riskLevel: 'low' | 'medium' | 'high';
}

const getRiskColor = (level: string) => {
  switch (level) {
    case 'low': return 'text-success';
    case 'medium': return 'text-warning';
    case 'high': return 'text-error';
    default: return 'text-muted-foreground';
  }
};

export function RiskLevelCard({ riskLevel }: RiskLevelCardProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
      <span className="text-sm font-medium">Risk Level</span>
      <Badge 
        variant={riskLevel === 'low' ? 'default' : 
                riskLevel === 'medium' ? 'secondary' : 'destructive'}
        className={getRiskColor(riskLevel)}
      >
        {riskLevel.toUpperCase()}
      </Badge>
    </div>
  );
}
