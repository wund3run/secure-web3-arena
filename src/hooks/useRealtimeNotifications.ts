
import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { useNotifications } from '@/contexts/NotificationContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useRealtimeNotifications = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (!user) return;

    console.log('Setting up real-time notifications for user:', user.id);

    // Subscribe to audit request updates
    const auditUpdatesChannel = supabase
      .channel('audit_updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'audit_requests',
          filter: `client_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Audit update received:', payload);
          const oldStatus = payload.old?.status;
          const newStatus = payload.new?.status;
          
          if (oldStatus !== newStatus) {
            addNotification({
              title: 'Audit Status Updated',
              message: `Your audit status changed from ${oldStatus} to ${newStatus}`,
              type: 'info',
              category: 'audit',
              userId: user.id,
              actionUrl: `/audit/${payload.new.id}`,
              actionLabel: 'View Details',
            });
            
            toast.info(`Audit status updated to ${newStatus}`);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_findings',
        },
        (payload) => {
          // Check if this finding belongs to user's audit
          supabase
            .from('audit_requests')
            .select('client_id, project_name')
            .eq('id', payload.new.audit_request_id)
            .single()
            .then(({ data }) => {
              if (data?.client_id === user.id) {
                addNotification({
                  title: 'New Security Finding',
                  message: `A ${payload.new.severity} severity finding was discovered in ${data.project_name}`,
                  type: payload.new.severity === 'critical' || payload.new.severity === 'high' ? 'error' : 'warning',
                  category: 'security',
                  userId: user.id,
                  actionUrl: `/audit/${payload.new.audit_request_id}`,
                  actionLabel: 'View Finding',
                });
                
                toast.error(`New ${payload.new.severity} security finding discovered`);
              }
            });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_status_updates',
        },
        (payload) => {
          // Check if this update belongs to user's audit
          supabase
            .from('audit_requests')
            .select('client_id, project_name')
            .eq('id', payload.new.audit_request_id)
            .single()
            .then(({ data }) => {
              if (data?.client_id === user.id && payload.new.user_id !== user.id) {
                addNotification({
                  title: 'Audit Progress Update',
                  message: payload.new.title,
                  type: 'info',
                  category: 'audit',
                  userId: user.id,
                  actionUrl: `/audit/${payload.new.audit_request_id}`,
                  actionLabel: 'View Update',
                });
              }
            });
        }
      )
      .subscribe();

    // Subscribe to new messages
    const messagesChannel = supabase
      .channel('audit_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_messages',
        },
        (payload) => {
          // Only notify if message is not from current user
          if (payload.new.sender_id !== user.id) {
            supabase
              .from('audit_requests')
              .select('client_id, assigned_auditor_id, project_name')
              .eq('id', payload.new.audit_request_id)
              .single()
              .then(({ data }) => {
                if (data && (data.client_id === user.id || data.assigned_auditor_id === user.id)) {
                  addNotification({
                    title: 'New Message',
                    message: `You received a new message about ${data.project_name}`,
                    type: 'info',
                    category: 'message',
                    userId: user.id,
                    actionUrl: `/audit/${payload.new.audit_request_id}`,
                    actionLabel: 'View Message',
                  });
                  
                  toast.info('New message received');
                }
              });
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up real-time notification channels');
      supabase.removeChannel(auditUpdatesChannel);
      supabase.removeChannel(messagesChannel);
    };
  }, [user, addNotification]);

  return null;
};
