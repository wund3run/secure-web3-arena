
import { useEffect } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';

export const useAuditNotifications = () => {
  const { addNotification } = useNotifications();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Enhanced audit request status notifications
    const auditStatusChannel = supabase
      .channel('audit_status_updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'audit_requests',
          filter: `client_id=eq.${user.id}`,
        },
        (payload) => {
          const oldStatus = payload.old?.status;
          const newStatus = payload.new?.status;
          
          if (oldStatus !== newStatus) {
            const statusMessages = {
              'pending': { type: 'info' as const, message: 'Your audit request is pending review' },
              'in_review': { type: 'info' as const, message: 'Your audit request is being reviewed' },
              'approved': { type: 'success' as const, message: 'Your audit request has been approved!' },
              'assigned': { type: 'success' as const, message: 'An auditor has been assigned to your project' },
              'in_progress': { type: 'info' as const, message: 'Your audit is now in progress' },
              'completed': { type: 'success' as const, message: 'Your audit has been completed!' },
              'rejected': { type: 'error' as const, message: 'Your audit request was rejected' },
            };

            const statusConfig = statusMessages[newStatus as keyof typeof statusMessages];
            
            if (statusConfig) {
              addNotification({
                title: `Audit Status: ${newStatus.replace('_', ' ').toUpperCase()}`,
                message: statusConfig.message,
                type: statusConfig.type,
                category: 'audit',
                actionUrl: `/audit/${payload.new.id}`,
                actionLabel: 'View Details',
              });
            }
          }
        }
      )
      .subscribe();

    // Milestone completion notifications
    const milestoneChannel = supabase
      .channel('milestone_updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'audit_milestones',
        },
        (payload) => {
          if (payload.new?.completed && !payload.old?.completed) {
            addNotification({
              title: 'Milestone Completed',
              message: `Milestone "${payload.new.title}" has been completed`,
              type: 'success',
              category: 'audit',
              actionUrl: `/audit/${payload.new.audit_request_id}`,
              actionLabel: 'View Progress',
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(auditStatusChannel);
      supabase.removeChannel(milestoneChannel);
    };
  }, [user, addNotification]);
};
