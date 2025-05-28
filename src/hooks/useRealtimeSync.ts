
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';

interface RealtimeNotification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
}

export const useRealtimeSync = () => {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState<RealtimeNotification[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');

  const addRealtimeNotification = useCallback((message: string, type: RealtimeNotification['type'] = 'info') => {
    const notification: RealtimeNotification = {
      id: crypto.randomUUID(),
      message,
      type,
      timestamp: new Date(),
    };
    setNotifications(prev => [notification, ...prev.slice(0, 19)]); // Keep last 20
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  useEffect(() => {
    if (!user) {
      setIsConnected(false);
      setConnectionStatus('disconnected');
      return;
    }

    setConnectionStatus('connecting');
    addRealtimeNotification('Establishing real-time connection...', 'info');

    // Monitor audit requests for real-time updates
    const auditChannel = supabase
      .channel('audit_requests_realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'audit_requests',
          filter: `client_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Audit request change:', payload);
          
          if (payload.eventType === 'UPDATE') {
            const oldStatus = payload.old?.status;
            const newStatus = payload.new?.status;
            
            if (oldStatus !== newStatus) {
              addRealtimeNotification(
                `Audit "${payload.new.project_name}" status: ${oldStatus} → ${newStatus}`,
                newStatus === 'approved' ? 'success' : newStatus === 'rejected' ? 'error' : 'info'
              );
            }
          } else if (payload.eventType === 'INSERT') {
            addRealtimeNotification(
              `New audit request created: "${payload.new.project_name}"`,
              'success'
            );
          }
        }
      )
      .subscribe((status) => {
        console.log('Audit channel status:', status);
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          setConnectionStatus('connected');
          addRealtimeNotification('Real-time connection established', 'success');
        } else if (status === 'CHANNEL_ERROR') {
          setIsConnected(false);
          setConnectionStatus('disconnected');
          addRealtimeNotification('Connection error occurred', 'error');
        }
      });

    // Monitor messages for real-time updates
    const messagesChannel = supabase
      .channel('messages_realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_messages',
        },
        (payload) => {
          console.log('New message:', payload);
          
          // Only show notification if message is not from current user
          if (payload.new.sender_id !== user.id) {
            addRealtimeNotification(
              'New message received in audit chat',
              'info'
            );
          }
        }
      )
      .subscribe();

    // Cleanup function
    return () => {
      console.log('Cleaning up real-time subscriptions');
      supabase.removeChannel(auditChannel);
      supabase.removeChannel(messagesChannel);
      setIsConnected(false);
      setConnectionStatus('disconnected');
    };
  }, [user, addRealtimeNotification]);

  return {
    isConnected,
    connectionStatus,
    notifications,
    clearNotifications,
    addRealtimeNotification,
  };
};
