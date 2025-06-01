
import { toast } from 'sonner';

export interface ErrorLog {
  id: string;
  timestamp: Date;
  error: Error;
  context: string;
  userId?: string;
  url: string;
  userAgent: string;
}

export enum ErrorCategory {
  Network = 'network',
  Authentication = 'authentication',
  Validation = 'validation',
  Database = 'database',
  Unknown = 'unknown'
}

class ErrorLogger {
  private logs: ErrorLog[] = [];
  private maxLogs = 100;

  log(error: Error, context: string, userId?: string): void {
    const errorLog: ErrorLog = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      error,
      context,
      userId,
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.logs.unshift(errorLog);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    console.error(`[ERROR-${context}]`, error, errorLog);
    
    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoring(errorLog);
    }
  }

  private async sendToMonitoring(errorLog: ErrorLog): Promise<void> {
    try {
      // Integration point for Sentry, LogRocket, etc.
      // await monitoringService.captureException(errorLog);
    } catch (err) {
      console.warn('Failed to send error to monitoring service:', err);
    }
  }

  getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}

export const errorLogger = new ErrorLogger();

export function logErrorToAnalytics(error: Error, context: string, userId?: string): void {
  errorLogger.log(error, context, userId);
}

export function handleError(error: unknown, context: string = 'application'): void {
  console.error(`Error in ${context}:`, error);
  
  let errorMessage = "An unexpected error occurred";
  let errorInstance: Error;
  
  if (error instanceof Error) {
    errorInstance = error;
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorInstance = new Error(error);
    errorMessage = error;
  } else {
    errorInstance = new Error('An unknown error occurred');
  }
  
  logErrorToAnalytics(errorInstance, context);
  
  // Show toast notification
  toast.error("Error", {
    description: errorMessage.substring(0, 100) // Truncate long messages
  });
}

export function handleAsyncError(
  asyncFn: () => Promise<void>,
  context: string,
  showToast = true
): void {
  asyncFn().catch((error) => {
    logErrorToAnalytics(error, context);
    if (showToast) {
      toast.error('An error occurred', {
        description: error.message || 'Please try again later'
      });
    }
  });
}

export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context: string
): T {
  return ((...args: Parameters<T>) => {
    return fn(...args).catch((error) => {
      logErrorToAnalytics(error, context);
      throw error;
    });
  }) as T;
}

export function createBoundary(component: React.ComponentType<any>) {
  // This is a placeholder for creating error boundaries
  return component;
}
