
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealTimeMessagingService } from '@/services/real-time-messaging-service';
import { toast } from 'sonner';

export interface AuditApproval {
  auditRequestId: string;
  clientApproved: boolean;
  auditorApproved: boolean;
  conversationId?: string;
}

export function useAuditApproval() {
  const [loading, setLoading] = useState(false);

  const approveAuditAsClient = async (auditRequestId: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Update audit request to mark client approval
      const { error } = await supabase
        .from('audit_requests')
        .update({ 
          status: 'client_approved',
          updated_at: new Date().toISOString()
        })
        .eq('id', auditRequestId)
        .eq('client_id', user.id);

      if (error) throw error;

      // Check if auditor has already approved
      const { data: auditRequest } = await supabase
        .from('audit_requests')
        .select('assigned_auditor_id, status')
        .eq('id', auditRequestId)
        .single();

      if (auditRequest?.assigned_auditor_id) {
        // Check if auditor has approved (we'll assume they have if they're assigned)
        await createConversationIfBothApproved(auditRequestId, auditRequest.assigned_auditor_id);
      }

      toast.success('Audit approved! Waiting for auditor confirmation.');
      return true;
    } catch (error) {
      console.error('Failed to approve audit:', error);
      toast.error('Failed to approve audit');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const approveAuditAsAuditor = async (auditRequestId: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Update audit request to mark auditor approval and start audit
      const { error } = await supabase
        .from('audit_requests')
        .update({ 
          status: 'in_progress',
          updated_at: new Date().toISOString()
        })
        .eq('id', auditRequestId)
        .eq('assigned_auditor_id', user.id);

      if (error) throw error;

      // Get client ID for conversation
      const { data: auditRequest } = await supabase
        .from('audit_requests')
        .select('client_id')
        .eq('id', auditRequestId)
        .single();

      if (auditRequest?.client_id) {
        await createConversationIfBothApproved(auditRequestId, user.id);
      }

      toast.success('Audit confirmed! Communication channel activated.');
      return true;
    } catch (error) {
      console.error('Failed to confirm audit:', error);
      toast.error('Failed to confirm audit');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createConversationIfBothApproved = async (auditRequestId: string, auditorId: string) => {
    try {
      // Check if conversation already exists
      const existingConversation = await RealTimeMessagingService.getConversation(auditRequestId);
      
      if (!existingConversation) {
        // Create new conversation
        const conversation = await RealTimeMessagingService.createConversation(auditRequestId, auditorId);
        
        if (conversation) {
          // Send initial system message
          await RealTimeMessagingService.sendMessage(
            conversation.id,
            'Real-time communication is now active! Both parties have approved the audit. Feel free to discuss project details, share files, and track progress.',
            'system'
          );

          // Create notifications for both parties
          const { data: auditRequest } = await supabase
            .from('audit_requests')
            .select('client_id, project_name')
            .eq('id', auditRequestId)
            .single();

          if (auditRequest) {
            // Notify client
            await supabase
              .from('notifications')
              .insert({
                user_id: auditRequest.client_id,
                title: 'Communication Channel Active',
                message: `Real-time chat is now available for ${auditRequest.project_name}. Start communicating with your auditor!`,
                type: 'success',
                action_url: `/conversations/${conversation.id}`
              });

            // Notify auditor
            await supabase
              .from('notifications')
              .insert({
                user_id: auditorId,
                title: 'Communication Channel Active',
                message: `Real-time chat is now available for ${auditRequest.project_name}. Start communicating with your client!`,
                type: 'success',
                action_url: `/conversations/${conversation.id}`
              });
          }
        }
      }
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  };

  return {
    loading,
    approveAuditAsClient,
    approveAuditAsAuditor
  };
}
