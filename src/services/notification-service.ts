
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface NotificationData {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  actionUrl?: string;
  userId: string;
}

export class NotificationService {
  static async createNotification(notification: NotificationData): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('notifications')
        .insert({
          user_id: notification.userId,
          title: notification.title,
          message: notification.message,
          type: notification.type,
          action_url: notification.actionUrl
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Failed to create notification:', error);
      return false;
    }
  }

  static async notifyAuditMatch(auditRequestId: string, auditorId: string, clientId: string): Promise<void> {
    // Get audit request details
    const { data: auditRequest } = await supabase
      .from('audit_requests')
      .select('project_name')
      .eq('id', auditRequestId)
      .single();

    // Notify client
    await this.createNotification({
      userId: clientId,
      title: 'Perfect Auditor Found! 🎉',
      message: `We've found an excellent auditor for ${auditRequest?.project_name}. Review their profile and approve to start the audit.`,
      type: 'success',
      actionUrl: `/audit-requests/${auditRequestId}`
    });

    // Notify auditor
    await this.createNotification({
      userId: auditorId,
      title: 'New Project Opportunity! 💼',
      message: `You've been selected for ${auditRequest?.project_name}. Review the project details and confirm your availability.`,
      type: 'info',
      actionUrl: `/audit-requests/${auditRequestId}`
    });
  }

  static async notifyAuditApproval(auditRequestId: string, auditorId: string, clientId: string): Promise<void> {
    const { data: auditRequest } = await supabase
      .from('audit_requests')
      .select('project_name')
      .eq('id', auditRequestId)
      .single();

    // Notify both parties
    const participants = [
      { id: clientId, role: 'client' },
      { id: auditorId, role: 'auditor' }
    ];

    for (const participant of participants) {
      await this.createNotification({
        userId: participant.id,
        title: 'Audit Approved - Communication Active! 🚀',
        message: `Both parties have approved the audit for ${auditRequest?.project_name}. Real-time chat is now available!`,
        type: 'success',
        actionUrl: `/conversations/${auditRequestId}`
      });
    }
  }

  static async notifyAuditProgress(auditRequestId: string, clientId: string, milestone: string): Promise<void> {
    const { data: auditRequest } = await supabase
      .from('audit_requests')
      .select('project_name')
      .eq('id', auditRequestId)
      .single();

    await this.createNotification({
      userId: clientId,
      title: 'Audit Progress Update 📊',
      message: `Your audit for ${auditRequest?.project_name} has reached: ${milestone}`,
      type: 'info',
      actionUrl: `/audit-requests/${auditRequestId}`
    });
  }

  static async sendWelcomeNotifications(userId: string, userType: 'client' | 'auditor'): Promise<void> {
    if (userType === 'client') {
      await this.createNotification({
        userId,
        title: 'Welcome to Hawkly! 🎉',
        message: 'Ready to secure your Web3 project? Create your first audit request and get matched with expert auditors in under 2 hours.',
        type: 'success',
        actionUrl: '/audit-request'
      });
    } else {
      await this.createNotification({
        userId,
        title: 'Welcome to the Hawkly Network! 🛡️',
        message: 'Complete your profile to start receiving high-quality audit opportunities from top Web3 projects.',
        type: 'success',
        actionUrl: '/auditor-onboarding'
      });
    }
  }
}
