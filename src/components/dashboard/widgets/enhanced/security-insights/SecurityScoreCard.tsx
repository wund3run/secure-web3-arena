
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface SecurityScoreCardProps {
  averageScore: number;
  securityTrend: 'up' | 'down' | 'stable';
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return <TrendingUp className="h-4 w-4 text-success" />;
    case 'down': return <AlertTriangle className="h-4 w-4 text-error" />;
    default: return <CheckCircle className="h-4 w-4 text-muted-foreground" />;
  }
};

export function SecurityScoreCard({ averageScore, securityTrend }: SecurityScoreCardProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Overall Security Score</span>
        <div className="flex items-center gap-1">
          {getTrendIcon(securityTrend)}
          <span className="font-bold text-lg">
            {Math.round(averageScore)}/100
          </span>
        </div>
      </div>
      <Progress value={averageScore} className="h-2" />
    </div>
  );
}
