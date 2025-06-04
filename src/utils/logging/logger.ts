
/**
 * Enhanced logging system for performance monitoring
 */
export interface LogContext {
  correlationId?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export class Logger {
  private static correlationId = 0;

  static generateCorrelationId(): string {
    return `req_${Date.now()}_${++this.correlationId}`;
  }

  static info(message: string, context: LogContext = {}, category: string = 'general'): void {
    console.log(`[INFO][${category}] ${message}`, context);
  }

  static debug(message: string, context: LogContext = {}, category: string = 'general'): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG][${category}] ${message}`, context);
    }
  }

  static error(message: string, context: LogContext = {}): void {
    console.error(`[ERROR] ${message}`, context);
  }

  static warn(message: string, context: LogContext = {}): void {
    console.warn(`[WARN] ${message}`, context);
  }

  static startTimer(operation: string): () => void {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      this.info(`${operation} completed`, { duration: Math.round(duration) }, 'performance');
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

export const performanceLogger = PerformanceLogger;
