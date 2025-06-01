
import { Environment } from '../environment';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  metadata?: Record<string, any>;
  context?: string;
  correlationId?: string;
}

interface TimerEntry {
  name: string;
  startTime: number;
  metadata?: Record<string, any>;
}

class Logger {
  private static logs: LogEntry[] = [];
  private static readonly MAX_LOGS = 500;
  private static timers: Map<string, TimerEntry> = new Map();

  static generateCorrelationId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  static startTimer(name: string, metadata?: Record<string, any>): () => void {
    const timerId = `${name}-${this.generateCorrelationId()}`;
    this.timers.set(timerId, {
      name,
      startTime: performance.now(),
      metadata
    });

    return () => {
      const timer = this.timers.get(timerId);
      if (timer) {
        const duration = performance.now() - timer.startTime;
        this.info(`Timer ${name} completed`, {
          duration: `${duration.toFixed(2)}ms`,
          ...timer.metadata
        }, 'performance');
        this.timers.delete(timerId);
      }
    };
  }

  static debug(message: string, metadata?: Record<string, any>, context?: string): void {
    this.log(LogLevel.DEBUG, message, metadata, context);
  }

  static info(message: string, metadata?: Record<string, any>, context?: string): void {
    this.log(LogLevel.INFO, message, metadata, context);
  }

  static warn(message: string, metadata?: Record<string, any>, context?: string): void {
    this.log(LogLevel.WARN, message, metadata, context);
  }

  static error(message: string, metadata?: Record<string, any>, context?: string): void {
    this.log(LogLevel.ERROR, message, metadata, context);
  }

  static fatal(message: string, metadata?: Record<string, any>, context?: string): void {
    this.log(LogLevel.FATAL, message, metadata, context);
  }

  private static log(level: LogLevel, message: string, metadata?: Record<string, any>, context?: string): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata,
      context,
      correlationId: this.generateCorrelationId()
    };

    // Add to internal log store
    this.logs.unshift(entry);
    if (this.logs.length > this.MAX_LOGS) {
      this.logs.pop();
    }

    // Console output based on environment
    const shouldLog = this.shouldLog(level);
    if (shouldLog) {
      const logMethod = level === LogLevel.DEBUG ? console.log : console[LogLevel[level].toLowerCase() as keyof Console] as Function;
      const contextStr = context ? `[${context}]` : '';
      logMethod(`${contextStr} ${message}`, metadata || '');
    }

    // Send to external logging service in production
    if (Environment.isProduction && (level === LogLevel.ERROR || level === LogLevel.FATAL)) {
      this.sendToExternalLogger(entry);
    }
  }

  private static shouldLog(level: LogLevel): boolean {
    const currentLevelIndex = this.getEnvironmentLogLevel();
    return level >= currentLevelIndex;
  }

  private static getEnvironmentLogLevel(): LogLevel {
    if (Environment.isDevelopment) return LogLevel.DEBUG;
    if (Environment.isTest) return LogLevel.WARN;
    return LogLevel.ERROR;
  }

  private static async sendToExternalLogger(entry: LogEntry): Promise<void> {
    try {
      // In production, send to logging service (Datadog, Splunk, etc.)
      // await fetch('/api/logs', { method: 'POST', body: JSON.stringify(entry) });
    } catch (error) {
      console.error('Failed to send log to external service:', error);
    }
  }

  static getLogs(level?: LogLevel): LogEntry[] {
    if (level !== undefined) {
      return this.logs.filter(log => log.level === level);
    }
    return [...this.logs];
  }

  static clearLogs(): void {
    this.logs = [];
  }
}

// Specialized loggers
export const auditLogger = {
  statusChanged: (auditId: string, oldStatus: string, newStatus: string, userId: string) => {
    Logger.info('Audit status changed', {
      auditId,
      oldStatus,
      newStatus,
      userId
    }, 'audit');
  }
};

export const performanceLogger = {
  recordMetric: (name: string, value: number, metadata?: Record<string, any>) => {
    Logger.debug('Performance metric recorded', {
      name,
      value,
      ...metadata
    }, 'performance');
  },

  databaseQuery: (queryName: string, duration: number, metadata?: Record<string, any>) => {
    Logger.debug('Database query performance', {
      queryName,
      duration,
      ...metadata
    }, 'database');
  }
};

export { Logger, LogLevel as LogLevelType };
