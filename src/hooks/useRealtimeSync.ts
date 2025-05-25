
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RealtimeEvent {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  new?: any;
  old?: any;
}

interface NotificationData {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: Date;
}

export function useRealtimeSync() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);

  const addNotification = useCallback((notification: Omit<NotificationData, 'id' | 'timestamp'>) => {
    const newNotification: NotificationData = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date()
    };
    
    setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Keep last 10
    
    // Show toast notification
    toast[notification.type](notification.message, {
      duration: 5000
    });
  }, []);

  const checkConnectionHealth = useCallback(async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .select('count(*)', { count: 'exact', head: true });
      
      if (error) {
        console.error('Database health check failed:', error);
        setIsConnected(false);
        return false;
      }
      
      const realtimeConnected = supabase.realtime.isConnected();
      setIsConnected(realtimeConnected);
      return realtimeConnected;
    } catch (error) {
      console.error('Connection health check failed:', error);
      setIsConnected(false);
      return false;
    }
  }, []);

  useEffect(() => {
    console.log('Setting up real-time synchronization...');
    
    let auditRequestsChannel: any;
    let servicesChannel: any;
    let reconnectTimer: NodeJS.Timeout;

    const setupChannels = async () => {
      try {
        // Check if we can establish a basic connection first
        const isHealthy = await checkConnectionHealth();
        
        if (!isHealthy && connectionAttempts > 3) {
          console.warn('Multiple connection attempts failed, reducing retry frequency');
          addNotification({
            message: 'Real-time connection unstable. Some features may be delayed.',
            type: 'warning'
          });
          return;
        }

        // Create channels for different table subscriptions
        auditRequestsChannel = supabase
          .channel('audit_requests_changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'audit_requests'
            },
            (payload) => {
              console.log('Audit request change:', payload);
              
              if (payload.eventType === 'INSERT') {
                addNotification({
                  message: `New audit request: ${payload.new?.project_name || 'Unknown project'}`,
                  type: 'info'
                });
              } else if (payload.eventType === 'UPDATE') {
                const statusChanged = payload.old?.status !== payload.new?.status;
                if (statusChanged) {
                  addNotification({
                    message: `Audit "${payload.new?.project_name || 'Unknown'}" status: ${payload.new?.status}`,
                    type: payload.new?.status === 'approved' ? 'success' : 'info'
                  });
                }
              }
            }
          )
          .subscribe((status) => {
            console.log('Audit requests channel status:', status);
            if (status === 'SUBSCRIBED') {
              setIsConnected(true);
              setConnectionAttempts(0);
            } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
              setIsConnected(false);
              setConnectionAttempts(prev => prev + 1);
            }
          });

        servicesChannel = supabase
          .channel('services_changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'services'
            },
            (payload) => {
              console.log('Service change:', payload);
              
              if (payload.eventType === 'INSERT') {
                addNotification({
                  message: `New service: ${payload.new?.title || 'Unknown service'}`,
                  type: 'info'
                });
              } else if (payload.eventType === 'UPDATE') {
                addNotification({
                  message: `Service "${payload.new?.title || 'Unknown'}" updated`,
                  type: 'info'
                });
              }
            }
          )
          .subscribe((status) => {
            console.log('Services channel status:', status);
          });

      } catch (error) {
        console.error('Failed to setup real-time channels:', error);
        setIsConnected(false);
        setConnectionAttempts(prev => prev + 1);
        
        // Schedule reconnection attempt
        reconnectTimer = setTimeout(() => {
          if (connectionAttempts < 5) {
            setupChannels();
          }
        }, Math.min(5000 * connectionAttempts, 30000)); // Exponential backoff, max 30s
      }
    };

    // Initial setup
    setupChannels();

    // Monitor connection status periodically
    const statusInterval = setInterval(() => {
      checkConnectionHealth();
    }, 10000); // Check every 10 seconds

    return () => {
      console.log('Cleaning up real-time subscriptions...');
      if (auditRequestsChannel) supabase.removeChannel(auditRequestsChannel);
      if (servicesChannel) supabase.removeChannel(servicesChannel);
      if (reconnectTimer) clearTimeout(reconnectTimer);
      clearInterval(statusInterval);
    };
  }, [addNotification, checkConnectionHealth, connectionAttempts]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    isConnected,
    clearNotifications,
    addNotification
  };
}
