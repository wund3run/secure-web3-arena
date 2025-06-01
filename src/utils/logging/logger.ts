
import { Environment } from '../environment';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  metadata?: Record<string, any>;
  context?: string;
}

class Logger {
  private static logs: LogEntry[] = [];
  private static readonly MAX_LOGS = 500;

  static debug(message: string, metadata?: Record<string, any>, context?: string): void {
    this.log('debug', message, metadata, context);
  }

  static info(message: string, metadata?: Record<string, any>, context?: string): void {
    this.log('info', message, metadata, context);
  }

  static warn(message: string, metadata?: Record<string, any>, context?: string): void {
    this.log('warn', message, metadata, context);
  }

  static error(message: string, metadata?: Record<string, any>, context?: string): void {
    this.log('error', message, metadata, context);
  }

  private static log(level: LogLevel, message: string, metadata?: Record<string, any>, context?: string): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata,
      context
    };

    // Add to internal log store
    this.logs.unshift(entry);
    if (this.logs.length > this.MAX_LOGS) {
      this.logs.pop();
    }

    // Console output based on environment
    const shouldLog = this.shouldLog(level);
    if (shouldLog) {
      const logMethod = level === 'debug' ? console.log : console[level];
      const contextStr = context ? `[${context}]` : '';
      logMethod(`${contextStr} ${message}`, metadata || '');
    }

    // Send to external logging service in production
    if (Environment.isProduction() && (level === 'error' || level === 'warn')) {
      this.sendToExternalLogger(entry);
    }
  }

  private static shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(Environment.logLevel);
    const logLevelIndex = levels.indexOf(level);
    return logLevelIndex >= currentLevelIndex;
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
    if (level) {
      return this.logs.filter(log => log.level === level);
    }
    return [...this.logs];
  }

  static clearLogs(): void {
    this.logs = [];
  }
}

export { Logger };
