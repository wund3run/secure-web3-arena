
import { supabase } from '@/integrations/supabase/client';

export interface EmailTemplate {
  to: string;
  subject: string;
  template: 'audit_status' | 'finding_alert' | 'welcome' | 'notification';
  templateData: unknown;
}

export class EmailService {
  static async sendEmail(emailData: EmailTemplate): Promise<boolean> {
    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: emailData
      });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Email service error:', error);
      return false;
    }
  }

  static async sendAuditStatusUpdate(userEmail: string, auditData: {
    projectName: string;
    status: string;
    message: string;
    actionUrl: string;
  }): Promise<boolean> {
    return this.sendEmail({
      to: userEmail,
      subject: `Audit Update: ${auditData.projectName}`,
      template: 'audit_status',
      templateData: auditData
    });
  }

  static async sendFindingAlert(userEmail: string, findingData: {
    severity: string;
    title: string;
    description: string;
    actionUrl: string;
  }): Promise<boolean> {
    return this.sendEmail({
      to: userEmail,
      subject: `Security Alert: ${findingData.severity} Finding Detected`,
      template: 'finding_alert',
      templateData: findingData
    });
  }

  static async sendWelcomeEmail(userEmail: string, dashboardUrl: string): Promise<boolean> {
    return this.sendEmail({
      to: userEmail,
      subject: 'Welcome to Hawkly Security Platform',
      template: 'welcome',
      templateData: { dashboardUrl }
    });
  }

  static async sendAuditorAssignmentNotification(
    clientEmail: string, 
    auditorName: string, 
    projectName: string,
    dashboardUrl: string
  ): Promise<boolean> {
    return this.sendEmail({
      to: clientEmail,
      subject: `Auditor Assigned: ${projectName}`,
      template: 'audit_status',
      templateData: {
        projectName,
        status: 'Auditor Assigned',
        message: `${auditorName} has been assigned to audit your project.`,
        actionUrl: dashboardUrl
      }
    });
  }

  static async sendMilestoneCompletionNotification(
    userEmail: string,
    milestone: string,
    projectName: string,
    dashboardUrl: string
  ): Promise<boolean> {
    return this.sendEmail({
      to: userEmail,
      subject: `Milestone Complete: ${projectName}`,
      template: 'audit_status',
      templateData: {
        projectName,
        status: 'Milestone Complete',
        message: `The milestone "${milestone}" has been completed.`,
        actionUrl: dashboardUrl
      }
    });
  }
}
