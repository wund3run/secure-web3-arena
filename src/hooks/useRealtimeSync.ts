
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

  useEffect(() => {
    console.log('Setting up real-time synchronization...');
    
    // Create channels for different table subscriptions
    const auditRequestsChannel = supabase
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
              message: `New audit request submitted: ${payload.new.project_name}`,
              type: 'info'
            });
          } else if (payload.eventType === 'UPDATE') {
            const statusChanged = payload.old.status !== payload.new.status;
            if (statusChanged) {
              addNotification({
                message: `Audit request "${payload.new.project_name}" status updated to: ${payload.new.status}`,
                type: payload.new.status === 'approved' ? 'success' : 'info'
              });
            }
          }
        }
      )
      .subscribe();

    const servicesChannel = supabase
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
              message: `New service submitted: ${payload.new.title}`,
              type: 'info'
            });
          } else if (payload.eventType === 'UPDATE') {
            // Check if this is a status update (assuming we'll add a status field)
            addNotification({
              message: `Service "${payload.new.title}" has been updated`,
              type: 'info'
            });
          }
        }
      )
      .subscribe();

    // Monitor connection status
    const checkConnection = () => {
      setIsConnected(supabase.realtime.isConnected());
    };

    checkConnection();
    const interval = setInterval(checkConnection, 5000);

    return () => {
      console.log('Cleaning up real-time subscriptions...');
      supabase.removeChannel(auditRequestsChannel);
      supabase.removeChannel(servicesChannel);
      clearInterval(interval);
    };
  }, [addNotification]);

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
