
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface NotificationData {
  title: string;
  message: string;
  type: 'audit_assigned' | 'proposal_received' | 'payment_released' | 'audit_completed' | 'message_received';
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export class NotificationService {
  static async sendNotification(
    userId: string,
    notification: NotificationData
  ): Promise<boolean> {
    try {
      // For now, save to localStorage until database schema is ready
      const notificationData = {
        id: Date.now().toString(),
        user_id: userId,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        priority: notification.priority,
        action_url: notification.actionUrl,
        metadata: notification.metadata,
        is_read: false,
        created_at: new Date().toISOString()
      };

      // Store in localStorage temporarily
      const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      existingNotifications.push(notificationData);
      localStorage.setItem('notifications', JSON.stringify(existingNotifications));

      // Send browser notification if permission granted
      if (Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico',
          tag: notification.type
        });
      }

      return true;
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  }

  static async sendAuditAssignedNotification(
    clientId: string,
    auditorName: string,
    projectName: string
  ) {
    return this.sendNotification(clientId, {
      title: 'Auditor Assigned',
      message: `${auditorName} has been assigned to audit ${projectName}`,
      type: 'audit_assigned',
      priority: 'high',
      actionUrl: '/dashboard',
      metadata: { auditorName, projectName }
    });
  }

  static async sendProposalReceivedNotification(
    clientId: string,
    auditorName: string,
    projectName: string
  ) {
    return this.sendNotification(clientId, {
      title: 'New Proposal Received',
      message: `${auditorName} submitted a proposal for ${projectName}`,
      type: 'proposal_received',
      priority: 'medium',
      actionUrl: '/dashboard',
      metadata: { auditorName, projectName }
    });
  }

  static async sendPaymentReleasedNotification(
    auditorId: string,
    amount: number,
    projectName: string
  ) {
    return this.sendNotification(auditorId, {
      title: 'Payment Released',
      message: `$${amount} has been released for ${projectName}`,
      type: 'payment_released',
      priority: 'high',
      actionUrl: '/dashboard',
      metadata: { amount, projectName }
    });
  }

  static async sendAuditCompletedNotification(
    clientId: string,
    projectName: string
  ) {
    return this.sendNotification(clientId, {
      title: 'Audit Completed',
      message: `The security audit for ${projectName} has been completed`,
      type: 'audit_completed',
      priority: 'high',
      actionUrl: '/dashboard',
      metadata: { projectName }
    });
  }

  static async markAsRead(notificationId: string): Promise<boolean> {
    try {
      // For localStorage implementation
      const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      const updatedNotifications = existingNotifications.map((notification: any) => 
        notification.id === notificationId ? { ...notification, is_read: true } : notification
      );
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
      return true;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
  }

  static async getUnreadCount(userId: string): Promise<number> {
    try {
      // For localStorage implementation
      const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      const userNotifications = existingNotifications.filter((notification: any) => 
        notification.user_id === userId && !notification.is_read
      );
      return userNotifications.length;
    } catch (error) {
      console.error('Error getting unread count:', error);
      return 0;
    }
  }
}
