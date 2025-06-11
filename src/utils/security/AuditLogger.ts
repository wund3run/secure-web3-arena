export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  userId?: string;
  sessionId: string;
  action: string;
  description: string;
  metadata: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  ipAddress?: string;
  userAgent: string;
}

class AuditLogger {
  private logs: AuditLogEntry[] = [];
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  async log(
    action: string,
    description: string,
    metadata: Record<string, any> = {},
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

  private persistLog(entry: AuditLogEntry): void {
    const existingLogs = JSON.parse(localStorage.getItem('hawkly_audit_logs') || '[]');
    existingLogs.push(entry);
    
    // Keep only last 1000 entries
    if (existingLogs.length > 1000) {
      existingLogs.splice(0, existingLogs.length - 1000);
    }
    
    localStorage.setItem('hawkly_audit_logs', JSON.stringify(existingLogs));
  }

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

  private groupBy(array: any[], key: string): Record<string, number> {
    return array.reduce((acc, item) => {
      const value = item[key];
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateId(): string {
    return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  clearLogs(): void {
    this.logs = [];
    localStorage.removeItem('hawkly_audit_logs');
  }
}

export const auditLogger = new AuditLogger();
