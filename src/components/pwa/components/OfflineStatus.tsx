
import React from 'react';
import { Button } from '@/components/ui/button';
import { WifiOff, RefreshCw } from 'lucide-react';

interface OfflineStatusProps {
  onRetry: () => void;
}

export function OfflineStatus({ onRetry }: OfflineStatusProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-yellow-900 px-4 py-2 text-center text-sm z-50">
      <div className="flex items-center justify-center gap-2">
        <WifiOff className="h-4 w-4" />
        You're offline. Some features may be limited.
        <Button variant="ghost" size="sm" onClick={onRetry} className="ml-2">
          <RefreshCw className="h-3 w-3 mr-1" />
          Retry
        </Button>
      </div>
    </div>
  );
}
