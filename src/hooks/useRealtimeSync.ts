
import { useState, useEffect } from 'react';

interface RealtimeSyncState {
  isConnected: boolean;
  lastSync: Date | null;
  syncStatus: 'idle' | 'syncing' | 'error';
}

export function useRealtimeSync() {
  const [state, setState] = useState<RealtimeSyncState>({
    isConnected: true, // Simulate connected state for demo
    lastSync: new Date(),
    syncStatus: 'idle'
  });

  useEffect(() => {
    // Simulate real-time connection monitoring
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        lastSync: new Date(),
        isConnected: Math.random() > 0.1 // 90% uptime simulation
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const forceSync = () => {
    setState(prev => ({ ...prev, syncStatus: 'syncing' }));
    
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        syncStatus: 'idle',
        lastSync: new Date(),
        isConnected: true
      }));
    }, 1000);
  };

  return {
    ...state,
    forceSync
  };
}
