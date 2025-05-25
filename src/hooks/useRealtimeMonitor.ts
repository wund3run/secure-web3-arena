
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RealtimeStatus {
  isConnected: boolean;
  latency: number | null;
  lastHeartbeat: Date | null;
  connectionCount: number;
  errors: string[];
}

export function useRealtimeMonitor() {
  const [status, setStatus] = useState<RealtimeStatus>({
    isConnected: false,
    latency: null,
    lastHeartbeat: null,
    connectionCount: 0,
    errors: []
  });

  const [isMonitoring, setIsMonitoring] = useState(false);

  const testConnection = useCallback(async () => {
    const startTime = Date.now();
    
    try {
      const channel = supabase.channel('connection-test');
      
      return new Promise<number>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Connection timeout'));
        }, 5000);

        channel.subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            const latency = Date.now() - startTime;
            clearTimeout(timeout);
            supabase.removeChannel(channel);
            resolve(latency);
          }
        });
      });
    } catch (error: any) {
      throw error;
    }
  }, []);

  const startMonitoring = useCallback(async () => {
    setIsMonitoring(true);
    console.log('Starting real-time connection monitoring...');

    const monitorChannel = supabase.channel('monitor');
    let heartbeatInterval: NodeJS.Timeout;

    monitorChannel
      .on('presence', { event: 'sync' }, () => {
        setStatus(prev => ({
          ...prev,
          isConnected: true,
          lastHeartbeat: new Date(),
          connectionCount: prev.connectionCount + 1
        }));
      })
      .on('presence', { event: 'join' }, () => {
        console.log('Real-time presence joined');
      })
      .on('presence', { event: 'leave' }, () => {
        console.log('Real-time presence left');
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Real-time monitoring channel subscribed');
          
          // Start heartbeat
          heartbeatInterval = setInterval(async () => {
            try {
              const latency = await testConnection();
              setStatus(prev => ({
                ...prev,
                isConnected: true,
                latency,
                lastHeartbeat: new Date()
              }));
            } catch (error: any) {
              setStatus(prev => ({
                ...prev,
                isConnected: false,
                errors: [...prev.errors.slice(-4), error.message]
              }));
              toast.error('Real-time connection issue detected');
            }
          }, 30000); // Test every 30 seconds

          // Initial connection test
          try {
            const latency = await testConnection();
            setStatus(prev => ({
              ...prev,
              isConnected: true,
              latency,
              lastHeartbeat: new Date()
            }));
            toast.success('Real-time monitoring started');
          } catch (error: any) {
            setStatus(prev => ({
              ...prev,
              errors: [...prev.errors, error.message]
            }));
          }
        } else if (status === 'CHANNEL_ERROR') {
          setStatus(prev => ({
            ...prev,
            isConnected: false,
            errors: [...prev.errors.slice(-4), 'Channel connection error']
          }));
          toast.error('Real-time channel error');
        }
      });

    return () => {
      clearInterval(heartbeatInterval);
      supabase.removeChannel(monitorChannel);
      setIsMonitoring(false);
    };
  }, [testConnection]);

  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
    setStatus({
      isConnected: false,
      latency: null,
      lastHeartbeat: null,
      connectionCount: 0,
      errors: []
    });
  }, []);

  useEffect(() => {
    const cleanup = startMonitoring();
    
    return () => {
      cleanup.then(cleanupFn => cleanupFn?.());
    };
  }, [startMonitoring]);

  return {
    status,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    testConnection
  };
}
