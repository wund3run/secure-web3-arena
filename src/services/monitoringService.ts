
import { Environment } from '@/utils/environment';

export interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  userId?: string;
  additional?: Record<string, any>;
}

export class MonitoringService {
  private static errorQueue: ErrorReport[] = [];
  
  static init(): void {
    if (!Environment.monitoringEnabled) return;
    
    // Global error handler
    window.addEventListener('error', (event) => {
      this.reportError({
        message: event.message,
        stack: event.error?.stack,
        url: event.filename || window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        additional: {
          lineno: event.lineno,
          colno: event.colno
        }
      });
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        additional: {
          type: 'unhandledrejection',
          reason: event.reason
        }
      });
    });
    
    console.log('Monitoring service initialized');
  }
  
  static reportError(error: ErrorReport): void {
    if (!Environment.errorReportingEnabled) return;
    
    console.error('Error reported:', error);
    this.errorQueue.push(error);
    
    // In production, send to monitoring service (Sentry, Bugsnag, etc.)
    if (Environment.isProduction) {
      this.sendToMonitoringService(error);
    }
  }
  
  private static async sendToMonitoringService(error: ErrorReport): Promise<void> {
    try {
      // Send to external monitoring service
      // await fetch('/api/errors', { method: 'POST', body: JSON.stringify(error) });
    } catch (e) {
      console.error('Failed to send error to monitoring service:', e);
    }
  }
  
  static getErrorQueue(): ErrorReport[] {
    return [...this.errorQueue];
  }
  
  static clearErrorQueue(): void {
    this.errorQueue = [];
  }
}
