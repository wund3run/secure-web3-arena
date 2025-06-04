
/**
 * Enhanced logging system for performance monitoring
 */
export interface LogContext {
  correlationId?: string;
  userId?: string;
  metadata?: Record<string, any>;
  [key: string]: any; // Allow additional properties
}

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4
}

interface LogEntry {
  level: LogLevel;
  message: string;
  context: LogContext;
  category: string;
  timestamp: string;
  correlationId?: string;
}

export class Logger {
  private static correlationId = 0;
  private static logs: LogEntry[] = [];
  private static readonly MAX_LOGS = 1000;

  static generateCorrelationId(): string {
    return `req_${Date.now()}_${++this.correlationId}`;
  }

  static info(message: string, context: LogContext = {}, category: string = 'general'): void {
    const entry: LogEntry = {
      level: LogLevel.INFO,
      message,
      context,
      category,
      timestamp: new Date().toISOString(),
      correlationId: context.correlationId
    };
    
    this.addLog(entry);
    console.log(`[INFO][${category}] ${message}`, context);
  }

  static debug(message: string, context: LogContext = {}, category: string = 'general'): void {
    const entry: LogEntry = {
      level: LogLevel.DEBUG,
      message,
      context,
      category,
      timestamp: new Date().toISOString(),
      correlationId: context.correlationId
    };
    
    this.addLog(entry);
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG][${category}] ${message}`, context);
    }
  }

  static error(message: string, context: LogContext = {}): void {
    const entry: LogEntry = {
      level: LogLevel.ERROR,
      message,
      context,
      category: 'error',
      timestamp: new Date().toISOString(),
      correlationId: context.correlationId
    };
    
    this.addLog(entry);
    console.error(`[ERROR] ${message}`, context);
  }

  static warn(message: string, context: LogContext = {}): void {
    const entry: LogEntry = {
      level: LogLevel.WARN,
      message,
      context,
      category: 'warning',
      timestamp: new Date().toISOString(),
      correlationId: context.correlationId
    };
    
    this.addLog(entry);
    console.warn(`[WARN] ${message}`, context);
  }

  static fatal(message: string, context: LogContext = {}): void {
    const entry: LogEntry = {
      level: LogLevel.FATAL,
      message,
      context,
      category: 'fatal',
      timestamp: new Date().toISOString(),
      correlationId: context.correlationId
    };
    
    this.addLog(entry);
    console.error(`[FATAL] ${message}`, context);
  }

  private static addLog(entry: LogEntry): void {
    this.logs.unshift(entry);
    if (this.logs.length > this.MAX_LOGS) {
      this.logs = this.logs.slice(0, this.MAX_LOGS);
    }
  }

  static getLogs(): LogEntry[] {
    return [...this.logs];
  }

  static clearLogs(): void {
    this.logs = [];
  }

  static startTimer(operation: string, context: LogContext = {}): () => void {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      this.info(`${operation} completed`, { 
        ...context, 
        duration: Math.round(duration) 
      }, 'performance');
    };
  }
}

export class PerformanceLogger {
  static databaseQuery(queryName: string, duration: number, context: LogContext = {}): void {
    Logger.info(`DB Query: ${queryName}`, { 
      ...context, 
      duration: Math.round(duration),
      category: 'database'
    }, 'database');
  }

  static apiRequest(endpoint: string, duration: number, status: number): void {
    Logger.info(`API Request: ${endpoint}`, { 
      duration: Math.round(duration),
      status
    }, 'api');
  }

  static componentRender(componentName: string, duration: number): void {
    if (duration > 16) { // Only log if longer than one frame
      Logger.debug(`Component render: ${componentName}`, { 
        duration: Math.round(duration)
      }, 'render');
    }
  }
}

// Audit logger for specific audit operations
export class AuditLogger {
  static statusChanged(auditId: string, oldStatus: string, newStatus: string, userId: string): void {
    Logger.info('Audit status changed', {
      auditId,
      oldStatus,
      newStatus,
      userId
    }, 'audit');
  }

  static findingAdded(auditId: string, findingId: string, severity: string, userId: string): void {
    Logger.info('Audit finding added', {
      auditId,
      findingId,
      severity,
      userId
    }, 'audit');
  }

  static reportGenerated(auditId: string, reportType: string, userId: string): void {
    Logger.info('Audit report generated', {
      auditId,
      reportType,
      userId
    }, 'audit');
  }
}

export const performanceLogger = PerformanceLogger;
export const auditLogger = new AuditLogger();
