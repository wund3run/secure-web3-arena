
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface RecentFindingsCardProps {
  recentFindings: Array<{
    severity: string;
    count: number;
  }>;
}

export function RecentFindingsCard({ recentFindings }: RecentFindingsCardProps) {
  return (
    <div>
      <h4 className="font-medium mb-3">Recent Findings</h4>
      <div className="space-y-2">
        {recentFindings.map((finding, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="capitalize">{finding.severity}</span>
            <Badge variant="outline">
              {finding.count}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
