
import React from 'react';
import { Activity } from 'lucide-react';

export function RecentActivityEmpty() {
  return (
    <div className="text-center py-8">
      <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground">No recent activity</p>
    </div>
  );
}
