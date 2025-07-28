import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { useContext } from 'react';
// import { useNotification } from '@/contexts/NotificationContext';
import { EmailService } from '@/services/emailService';

export function useAuditNotifications() {
  const { user } = useAuth();
  const { notify } = useNotification();

  useEffect(() => {
    if (!user) return;

    // Subscribe to audit request updates
    const auditRequestChannel = supabase
      .channel('audit_request_updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'audit_requests',
          filter: `client_id=eq.${user.id}`,
        },
        (payload) => {
          const oldRecord = payload.old;
          const newRecord = payload.new;
          
          if (oldRecord.status !== newRecord.status) {
            notify({
              title: 'Audit Status Updated',
              message: `Your audit request status changed to ${newRecord.status}`,
              type: 'info',
              category: 'audit',
              actionUrl: `/audit/${newRecord.id}`,
              actionLabel: 'View Audit',
            });
          }
        }
      )
      .subscribe();

    // Subscribe to audit proposals
    const proposalChannel = supabase
      .channel('audit_proposals')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_proposals',
        },
        async (payload) => {
          const proposal = payload.new;
          
          // Check if this proposal is for the current user's audit request
          const { data: auditRequest } = await supabase
            .from('audit_requests')
            .select('client_id')
            .eq('id', proposal.audit_request_id)
            .single();

          if (auditRequest?.client_id === user.id) {
            notify({
              title: 'New Audit Proposal',
              message: 'You have received a new audit proposal',
              type: 'info',
              category: 'proposal',
              actionUrl: `/audit/${proposal.audit_request_id}`,
              actionLabel: 'View Proposal',
            });
          }
        }
      )
      .subscribe();

    // Subscribe to milestone completions
    const milestoneChannel = supabase
      .channel('milestone_updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'audit_milestones',
        },
        async (payload) => {
          const oldMilestone = payload.old;
          const newMilestone = payload.new;
          
          if (oldMilestone.status !== newMilestone.status && newMilestone.status === 'completed') {
            // Check if this milestone belongs to current user's audit
            const { data: auditRequest } = await supabase
              .from('audit_requests')
              .select('client_id')
              .eq('id', newMilestone.audit_request_id)
              .single();

            if (auditRequest?.client_id === user.id) {
              notify({
                title: 'Milestone Completed',
                message: `Milestone "${newMilestone.title}" has been completed`,
                type: 'success',
                category: 'milestone',
                actionUrl: `/audit/${newMilestone.audit_request_id}`,
                actionLabel: 'View Progress',
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(auditRequestChannel);
      supabase.removeChannel(proposalChannel);
      supabase.removeChannel(milestoneChannel);
    };
  }, [user, notify]);
}
