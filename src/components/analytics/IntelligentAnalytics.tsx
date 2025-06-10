
import React from 'react';

export function IntelligentAnalytics() {
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-card border rounded-lg p-3 text-xs text-muted-foreground max-w-xs">
      <div className="font-semibold mb-1">Dev Analytics</div>
      <div>Performance monitoring active</div>
    </div>
  );
}
