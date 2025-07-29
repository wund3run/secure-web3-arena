
import React from 'react';
import { Activity } from 'lucide-react';

export function RecentActivityEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Activity className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No recent activity</h3>
      <p className="text-muted-foreground text-center">
        Your recent activity will appear here once you start using the platform.
      </p>
    </div>
  );
}
