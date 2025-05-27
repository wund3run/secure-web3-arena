
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Wifi, WifiOff } from 'lucide-react';
import { PWAState } from '../types';

interface PWAStatusIndicatorProps {
  state: PWAState;
}

export function PWAStatusIndicator({ state }: PWAStatusIndicatorProps) {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-16 right-4 z-40">
      <Card className="w-48">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs">PWA Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span>Online:</span>
            {state.isOnline ? (
              <Wifi className="h-3 w-3 text-green-500" />
            ) : (
              <WifiOff className="h-3 w-3 text-red-500" />
            )}
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Installed:</span>
            <span className={state.isInstalled ? 'text-green-500' : 'text-gray-500'}>
              {state.isInstalled ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Cache:</span>
            <span className={state.cacheStatus === 'cached' ? 'text-green-500' : 'text-gray-500'}>
              {state.cacheStatus}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
