export type AuditEventType = 
  | 'user_login'
  | 'user_logout' 
  | 'user_registration'
  | 'password_change'
  | 'mfa_enabled'
  | 'mfa_disabled'
  | 'role_granted'
  | 'role_revoked'
  | 'permission_denied'
  | 'data_access'
  | 'data_modification'
  | 'security_violation'
  | 'admin_action'
  | 'payment_processed'
  | 'audit_created'
  | 'audit_completed'
  | 'system_configuration_changed';

export type AuditSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface AuditEvent {
  id: string;
  timestamp: string;
  event_type: AuditEventType;
  severity: AuditSeverity;
  user_id?: string;
  session_id?: string;
  ip_address?: string;
  user_agent?: string;
  resource?: string;
  action: string;
  details: Record<string, any>;
  risk_score?: number;
  tags: string[];
}

export class AuditLogger {
  private static instance: AuditLogger;
  private eventQueue: AuditEvent[] = [];
  private isProcessing = false;
  private readonly maxQueueSize = 100;
  private readonly batchSize = 10;

  static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger();
    }
    return AuditLogger.instance;
  }

  async log(
    eventType: AuditEventType,
    action: string,
    details: Record<string, any> = {},
    severity: AuditSeverity = 'medium'
  ): Promise<void> {
    const event: AuditEvent = {
      id: this.generateEventId(),
      timestamp: new Date().toISOString(),
      event_type: eventType,
      severity,
      user_id: this.getCurrentUserId(),
      session_id: this.getSessionId(),
      ip_address: await this.getClientIP(),
      user_agent: navigator.userAgent,
      action,
      details,
      risk_score: this.calculateRiskScore(eventType, severity, details),
      tags: this.generateTags(eventType, details)
    };

    this.addToQueue(event);
    await this.processQueue();
  }

  private addToQueue(event: AuditEvent): void {
    this.eventQueue.push(event);
    
    // Prevent queue overflow
    if (this.eventQueue.length > this.maxQueueSize) {
      this.eventQueue.shift(); // Remove oldest event
    }

    // Log to console for development
    this.logToConsole(event);
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.eventQueue.length === 0) {
      return;
    }

    this.isProcessing = true;
    let batch: AuditEvent[] = [];
    
    try {
      batch = this.eventQueue.splice(0, this.batchSize);
      await this.sendToBackend(batch);
    } catch (error) {
      console.error('Failed to process audit log batch:', error);
      // Re-add failed events to queue for retry
      this.eventQueue.unshift(...batch);
    } finally {
      this.isProcessing = false;
    }
  }

  private async sendToBackend(events: AuditEvent[]): Promise<void> {
    // In production, this would send to your audit logging service
    // For now, we'll store in localStorage as a fallback
    const existingLogs = this.getStoredLogs();
    const updatedLogs = [...existingLogs, ...events];
    
    // Keep only last 1000 events in localStorage
    const trimmedLogs = updatedLogs.slice(-1000);
    
    localStorage.setItem('hawkly_audit_logs', JSON.stringify(trimmedLogs));
    
    // Simulate network call
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  private getStoredLogs(): AuditEvent[] {
    try {
      const stored = localStorage.getItem('hawkly_audit_logs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private logToConsole(event: AuditEvent): void {
    const color = this.getSeverityColor(event.severity);
    console.log(
      `%c🔍 AUDIT: ${event.event_type}`,
      `color: ${color}; font-weight: bold;`,
      {
        action: event.action,
        severity: event.severity,
        timestamp: event.timestamp,
        details: event.details
      }
    );
  }

  private getSeverityColor(severity: AuditSeverity): string {
    switch (severity) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#d97706';
      case 'low': return '#65a30d';
      default: return '#6b7280';
    }
  }

  private generateEventId(): string {
    return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getCurrentUserId(): string | undefined {
    // Get from auth context or localStorage
    try {
      const session = localStorage.getItem('supabase.auth.token');
      if (session) {
        const parsed = JSON.parse(session);
        return parsed.user?.id;
      }
    } catch {
      // Fallback to undefined
    }
    return undefined;
  }

  private getSessionId(): string | undefined {
    return sessionStorage.getItem('hawkly_session_id') || undefined;
  }

  private async getClientIP(): Promise<string | undefined> {
    try {
      // In production, this might be provided by your backend
      return 'client-ip-placeholder';
    } catch {
      return undefined;
    }
  }

  private calculateRiskScore(
    eventType: AuditEventType,
    severity: AuditSeverity,
    details: Record<string, any>
  ): number {
    let baseScore = 0;
    
    // Base score by event type
    const eventTypeScores: Record<AuditEventType, number> = {
      'user_login': 2,
      'user_logout': 1,
      'user_registration': 3,
      'password_change': 4,
      'mfa_enabled': 2,
      'mfa_disabled': 6,
      'role_granted': 7,
      'role_revoked': 7,
      'permission_denied': 5,
      'data_access': 3,
      'data_modification': 6,
      'security_violation': 9,
      'admin_action': 8,
      'payment_processed': 5,
      'audit_created': 3,
      'audit_completed': 2,
      'system_configuration_changed': 8
    };
    
    baseScore = eventTypeScores[eventType] || 3;
    
    // Severity multiplier
    const severityMultipliers: Record<AuditSeverity, number> = {
      'low': 1,
      'medium': 1.5,
      'high': 2,
      'critical': 3
    };
    
    return Math.min(10, baseScore * severityMultipliers[severity]);
  }

  private generateTags(eventType: AuditEventType, details: Record<string, any>): string[] {
    const tags: string[] = [eventType];
    
    // Add contextual tags based on details
    if (details.admin_action) tags.push('admin_related');
    if (details.failed_attempt) tags.push('failed_attempt');
    if (details.suspicious_activity) tags.push('suspicious_activity');
    if (details.automated) tags.push('automated_action');
    
    return tags;
  }

  // Query methods for audit log analysis
  getEvents(filters?: {
    eventType?: AuditEventType;
    severity?: AuditSeverity;
    userId?: string;
    startDate?: Date;
    endDate?: Date;
  }): AuditEvent[] {
    const logs = this.getStoredLogs();
    
    if (!filters) return logs;
    
    return logs.filter(event => {
      if (filters.eventType && event.event_type !== filters.eventType) return false;
      if (filters.severity && event.severity !== filters.severity) return false;
      if (filters.userId && event.user_id !== filters.userId) return false;
      if (filters.startDate && new Date(event.timestamp) < filters.startDate) return false;
      if (filters.endDate && new Date(event.timestamp) > filters.endDate) return false;
      return true;
    });
  }

  exportAuditLog(format: 'json' | 'csv' = 'json'): string {
    const logs = this.getStoredLogs();
    
    if (format === 'csv') {
      const headers = ['Timestamp', 'Event Type', 'Severity', 'User ID', 'Action', 'Details'];
      const rows = logs.map(event => [
        event.timestamp,
        event.event_type,
        event.severity,
        event.user_id || '',
        event.action,
        JSON.stringify(event.details)
      ]);
      
      return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
    
    return JSON.stringify(logs, null, 2);
  }

  clearAuditLogs(): void {
    localStorage.removeItem('hawkly_audit_logs');
    this.eventQueue = [];
  }
}

// Convenience functions
export const auditLogger = AuditLogger.getInstance();

export const logSecurityEvent = (
  eventType: AuditEventType,
  action: string,
  details?: Record<string, any>
) => auditLogger.log(eventType, action, details, 'high');

export const logUserAction = (
  action: string,
  details?: Record<string, any>
) => auditLogger.log('data_access', action, details, 'medium');

export const logAdminAction = (
  action: string,
  details?: Record<string, any>
) => auditLogger.log('admin_action', action, details, 'high');
