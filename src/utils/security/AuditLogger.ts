/**
 * Represents an audit log entry with security event details
 */
export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  userId?: string;
  sessionId: string;
  action: string;
  description: string;
  metadata: Record<string, unknown>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  ipAddress?: string;
  userAgent: string;
}

// Export AuditEvent as an alias for backward compatibility
export type AuditEvent = AuditLogEntry;

/**
 * Comprehensive audit logging system for security events and user actions
 * Provides logging, filtering, export, and reporting capabilities
 */
class AuditLogger {
  private logs: AuditLogEntry[] = [];
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  /**
   * Logs a security event or user action with detailed metadata
   * @param action - The action being performed
   * @param description - Human-readable description of the event
   * @param metadata - Additional contextual data
   * @param severity - Security severity level
   * @param userId - Optional user identifier
   */
  async log(
    action: string,
    description: string,
    metadata: Record<string, unknown> = {},
    severity: 'low' | 'medium' | 'high' | 'critical' = 'low',
    userId?: string
  ): Promise<void> {
    const entry: AuditLogEntry = {
      id: this.generateId(),
      timestamp: new Date(),
      userId,
      sessionId: this.sessionId,
      action,
      description,
      metadata,
      severity,
      userAgent: navigator.userAgent
    };

    this.logs.push(entry);
    this.persistLog(entry);

    // In production, send to secure logging service
    if (severity === 'critical' || severity === 'high') {
      console.warn('🚨 Security Event:', entry);
    }
  }

  /**
   * Persists audit log entry to local storage with size management
   * @param entry - The audit log entry to persist
   */
  private persistLog(entry: AuditLogEntry): void {
    const existingLogs = JSON.parse(localStorage.getItem('hawkly_audit_logs') || '[]');
    existingLogs.push(entry);
    
    // Keep only last 1000 entries
    if (existingLogs.length > 1000) {
      existingLogs.splice(0, existingLogs.length - 1000);
    }
    
    localStorage.setItem('hawkly_audit_logs', JSON.stringify(existingLogs));
  }

  /**
   * Retrieves filtered audit logs based on specified criteria
   * @param filters - Optional filters for severity, action, user, or date range
   * @returns Array of filtered audit log entries sorted by timestamp
   */
  getLogs(filters?: {
    severity?: string[];
    action?: string;
    userId?: string;
    fromDate?: Date;
    toDate?: Date;
  }): AuditLogEntry[] {
    let filteredLogs = [...this.logs];

    if (filters) {
      if (filters.severity?.length) {
        filteredLogs = filteredLogs.filter(log => filters.severity!.includes(log.severity));
      }
      if (filters.action) {
        filteredLogs = filteredLogs.filter(log => 
          log.action.toLowerCase().includes(filters.action!.toLowerCase())
        );
      }
      if (filters.userId) {
        filteredLogs = filteredLogs.filter(log => log.userId === filters.userId);
      }
      if (filters.fromDate) {
        filteredLogs = filteredLogs.filter(log => log.timestamp >= filters.fromDate!);
      }
      if (filters.toDate) {
        filteredLogs = filteredLogs.filter(log => log.timestamp <= filters.toDate!);
      }
    }

    return filteredLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Alias for getLogs for backward compatibility
   * @param filters - Optional filters for log retrieval
   * @returns Array of filtered audit log entries
   */
  getEvents(filters?: unknown): AuditLogEntry[] {
    return this.getLogs(filters);
  }

  /**
   * Exports audit logs in specified format
   * @param format - Export format: 'json' or 'csv'
   * @returns Formatted string representation of audit logs
   */
  exportAuditLog(format: 'json' | 'csv'): string {
    const logs = this.getLogs();
    
    if (format === 'json') {
      return JSON.stringify(logs, null, 2);
    } else {
      // CSV format
      if (logs.length === 0) return '';
      
      const headers = Object.keys(logs[0]).join(',');
      const rows = logs.map(log => 
        Object.values(log).map(value => 
          typeof value === 'object' ? JSON.stringify(value) : String(value)
        ).join(',')
      );
      
      return [headers, ...rows].join('\n');
    }
  }

  /**
   * Generates a comprehensive security report with statistics
   * @returns Object containing summary statistics and breakdowns
   */
  generateSecurityReport(): {
    summary: {
      totalEvents: number;
      criticalEvents: number;
      highSeverityEvents: number;
      recentEvents: number;
    };
    topActions: Record<string, number>;
    severityBreakdown: Record<string, number>;
  } {
    const logs = this.getLogs();
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

    return {
      summary: {
        totalEvents: logs.length,
        criticalEvents: logs.filter(l => l.severity === 'critical').length,
        highSeverityEvents: logs.filter(l => l.severity === 'high').length,
        recentEvents: logs.filter(l => l.timestamp >= last24Hours).length
      },
      topActions: this.groupBy(logs, 'action'),
      severityBreakdown: this.groupBy(logs, 'severity')
    };
  }

  /**
   * Groups array items by a specified key and counts occurrences
   * @param array - Array to group
   * @param key - Property key to group by
   * @returns Object with grouped counts
   */
  private groupBy(array: unknown[], key: string): Record<string, number> {
    return array.reduce((acc: Record<string, number>, item) => {
      const value = (item as Record<string, unknown>)[key];
      acc[String(value)] = (acc[String(value)] || 0) + 1;
      return acc;
    }, {});
  }

  /**
   * Generates a unique session identifier
   * @returns Unique session ID string
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generates a unique audit log entry identifier
   * @returns Unique audit log ID string
   */
  private generateId(): string {
    return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Clears all audit logs from memory and local storage
   */
  clearLogs(): void {
    this.logs = [];
    localStorage.removeItem('hawkly_audit_logs');
  }
}

export const auditLogger = new AuditLogger();
