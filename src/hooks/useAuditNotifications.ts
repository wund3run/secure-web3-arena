
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { useNotifications } from '@/contexts/NotificationContext';
import { EmailService } from '@/services/emailService';

export function useAuditNotifications() {
  const { user, userProfile } = useAuth();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('audit-events')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'audit_requests',
        },
        async (payload) => {
          const oldRecord = payload.old;
          const newRecord = payload.new;

          // Status change notifications
          if (oldRecord.status !== newRecord.status) {
            const isUserInvolved = 
              newRecord.client_id === user.id || 
              newRecord.assigned_auditor_id === user.id;

            if (isUserInvolved) {
              addNotification({
                title: 'Audit Status Update',
                message: `Audit "${newRecord.project_name}" status changed to ${newRecord.status}`,
                type: newRecord.status === 'completed' ? 'success' : 'info',
                category: 'audit_status',
                actionUrl: `/audits/${newRecord.id}`,
                actionLabel: 'View Details'
              });

              // Send email notification
              if (user.email) {
                await EmailService.sendAuditStatusUpdate(
                  user.email,
                  {
                    projectName: newRecord.project_name,
                    status: newRecord.status,
                    message: `Your audit status has been updated to ${newRecord.status}`,
                    actionUrl: `${window.location.origin}/audits/${newRecord.id}`
                  }
                );
              }
            }
          }

          // Auditor assignment notifications
          if (!oldRecord.assigned_auditor_id && newRecord.assigned_auditor_id) {
            if (newRecord.client_id === user.id) {
              addNotification({
                title: 'Auditor Assigned',
                message: `An auditor has been assigned to "${newRecord.project_name}"`,
                type: 'success',
                category: 'audit_assignment',
                actionUrl: `/audits/${newRecord.id}`,
                actionLabel: 'Meet Your Auditor'
              });
            }

            if (newRecord.assigned_auditor_id === user.id) {
              addNotification({
                title: 'New Audit Assignment',
                message: `You've been assigned to audit "${newRecord.project_name}"`,
                type: 'info',
                category: 'audit_assignment',
                actionUrl: `/audits/${newRecord.id}`,
                actionLabel: 'Start Audit'
              });
            }
          }

          // Progress updates
          if (oldRecord.completion_percentage !== newRecord.completion_percentage) {
            const isUserInvolved = 
              newRecord.client_id === user.id || 
              newRecord.assigned_auditor_id === user.id;

            if (isUserInvolved && newRecord.completion_percentage > oldRecord.completion_percentage) {
              addNotification({
                title: 'Audit Progress Update',
                message: `"${newRecord.project_name}" is now ${newRecord.completion_percentage}% complete`,
                type: 'info',
                category: 'audit_progress',
                actionUrl: `/audits/${newRecord.id}`,
                actionLabel: 'View Progress'
              });
            }
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
        async (payload) => {
          const finding = payload.new;

          // Get audit details to check if user is involved
          const { data: audit } = await supabase
            .from('audit_requests')
            .select('client_id, assigned_auditor_id, project_name')
            .eq('id', finding.audit_request_id)
            .single();

          if (audit && (audit.client_id === user.id || audit.assigned_auditor_id === user.id)) {
            const isHighSeverity = ['critical', 'high'].includes(finding.severity);
            
            addNotification({
              title: `${finding.severity.toUpperCase()} Finding Detected`,
              message: `New ${finding.severity} security finding in "${audit.project_name}": ${finding.title}`,
              type: isHighSeverity ? 'error' : 'warning',
              category: 'security_finding',
              actionUrl: `/audits/${finding.audit_request_id}/findings/${finding.id}`,
              actionLabel: 'Review Finding'
            });

            // Send email for high-severity findings
            if (isHighSeverity && user.email) {
              await EmailService.sendFindingAlert(
                user.email,
                {
                  severity: finding.severity,
                  title: finding.title,
                  description: finding.description,
                  actionUrl: `${window.location.origin}/audits/${finding.audit_request_id}/findings/${finding.id}`
                }
              );
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, addNotification]);
}
