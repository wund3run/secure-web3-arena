
import { MonitoringService } from '@/services/monitoringService';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4
}

export interface LogContext {
  correlationId?: string;
  userId?: string;
  auditId?: string;
  operation?: string;
  duration?: number;
  metadata?: Record<string, any>;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  context: LogContext;
  timestamp: string;
  component: string;
}

class Logger {
  private static correlationId: string = '';
  private static readonly MAX_LOGS = 1000;
  private static logs: LogEntry[] = [];

  static setCorrelationId(id: string): void {
    this.correlationId = id;
  }

  static generateCorrelationId(): string {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.setCorrelationId(id);
    return id;
  }

  static getCorrelationId(): string {
    return this.correlationId || this.generateCorrelationId();
  }

  private static log(level: LogLevel, message: string, context: LogContext = {}, component: string = 'app'): void {
    const logEntry: LogEntry = {
      level,
      message,
      context: {
        correlationId: this.getCorrelationId(),
        ...context
      },
      timestamp: new Date().toISOString(),
      component
    };

    // Add to internal log store
    this.logs.unshift(logEntry);
    if (this.logs.length > this.MAX_LOGS) {
      this.logs.pop();
    }

    // Console output with formatting
    const logLevelName = LogLevel[level];
    const contextStr = Object.keys(logEntry.context).length > 0 
      ? ` | ${JSON.stringify(logEntry.context)}`
      : '';
    
    const formattedMessage = `[${logEntry.timestamp}] ${logLevelName} [${component}]: ${message}${contextStr}`;

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedMessage);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage);
        break;
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        console.error(formattedMessage);
        if (level === LogLevel.ERROR || level === LogLevel.FATAL) {
          MonitoringService.reportError({
            message,
            stack: context.metadata?.error?.stack,
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: logEntry.timestamp,
            userId: context.userId,
            additional: context
          });
        }
        break;
    }
  }

  static debug(message: string, context?: LogContext, component?: string): void {
    this.log(LogLevel.DEBUG, message, context, component);
  }

  static info(message: string, context?: LogContext, component?: string): void {
    this.log(LogLevel.INFO, message, context, component);
  }

  static warn(message: string, context?: LogContext, component?: string): void {
    this.log(LogLevel.WARN, message, context, component);
  }

  static error(message: string, context?: LogContext, component?: string): void {
    this.log(LogLevel.ERROR, message, context, component);
  }

  static fatal(message: string, context?: LogContext, component?: string): void {
    this.log(LogLevel.FATAL, message, context, component);
  }

  static getLogs(component?: string, level?: LogLevel): LogEntry[] {
    let filteredLogs = this.logs;

    if (component) {
      filteredLogs = filteredLogs.filter(log => log.component === component);
    }

    if (level !== undefined) {
      filteredLogs = filteredLogs.filter(log => log.level >= level);
    }

    return filteredLogs;
  }

  static clearLogs(): void {
    this.logs = [];
  }

  // Performance timing utilities
  static startTimer(operation: string, context?: LogContext): () => void {
    const startTime = performance.now();
    const correlationId = this.getCorrelationId();
    
    this.info(`Starting operation: ${operation}`, {
      ...context,
      correlationId,
      operation
    }, 'performance');

    return () => {
      const duration = performance.now() - startTime;
      this.info(`Completed operation: ${operation}`, {
        ...context,
        correlationId,
        operation,
        duration: Math.round(duration)
      }, 'performance');
    };
  }
}

export { Logger };

// Utility functions for specific logging scenarios
export const auditLogger = {
  requestCreated: (auditId: string, userId: string) => {
    Logger.info('Audit request created', {
      auditId,
      userId,
      operation: 'audit_request_created'
    }, 'audit');
  },

  statusChanged: (auditId: string, oldStatus: string, newStatus: string, userId: string) => {
    Logger.info('Audit status changed', {
      auditId,
      userId,
      operation: 'audit_status_changed',
      metadata: { oldStatus, newStatus }
    }, 'audit');
  },

  findingAdded: (auditId: string, findingId: string, severity: string, userId: string) => {
    Logger.info('Security finding added', {
      auditId,
      userId,
      operation: 'finding_added',
      metadata: { findingId, severity }
    }, 'audit');
  },

  milestoneCompleted: (auditId: string, milestoneId: string, userId: string) => {
    Logger.info('Milestone completed', {
      auditId,
      userId,
      operation: 'milestone_completed',
      metadata: { milestoneId }
    }, 'audit');
  }
};

export const performanceLogger = {
  databaseQuery: (query: string, duration: number, correlationId?: string) => {
    Logger.debug('Database query executed', {
      correlationId,
      operation: 'db_query',
      duration: Math.round(duration),
      metadata: { query }
    }, 'database');
  },

  apiCall: (endpoint: string, method: string, duration: number, status: number) => {
    Logger.info('API call completed', {
      operation: 'api_call',
      duration: Math.round(duration),
      metadata: { endpoint, method, status }
    }, 'api');
  }
};
