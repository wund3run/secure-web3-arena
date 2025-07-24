import { Environment } from '@/utils/environment';

export interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  additional?: Record<string, any>;
}

interface ErrorMetrics {
  totalErrors: number;
  uniqueErrors: number;
  errorsByCategory: Record<string, number>;
  errorsByComponent: Record<string, number>;
  retryAttempts: number;
  recoveryRate: number;
}

class MonitoringServiceImpl {
  private readonly MONITORING_ENDPOINT = import.meta.env.VITE_MONITORING_ENDPOINT || '';
  private readonly APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';
  private readonly ENV = import.meta.env.MODE;
  private readonly SESSION_ID = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  private errorQueue: ErrorReport[] = [];
  private errorMetrics: ErrorMetrics = {
    totalErrors: 0,
    uniqueErrors: 0,
    errorsByCategory: {},
    errorsByComponent: {},
    retryAttempts: 0,
    recoveryRate: 0
  };
  
  private isProcessing = false;
  private readonly BATCH_SIZE = 10;
  private readonly BATCH_INTERVAL = 5000; // 5 seconds
  private readonly ERROR_THRESHOLD = 10; // Number of errors before alerting
  private readonly ERROR_WINDOW = 60000; // 1 minute window for error threshold
  private errorCount = 0;
  private lastErrorTime = Date.now();

  constructor() {
    // Start processing queued errors periodically
    setInterval(() => this.processErrorQueue(), this.BATCH_INTERVAL);
    
    // Reset error count periodically
    setInterval(() => this.resetErrorCount(), this.ERROR_WINDOW);

    // Set up offline support
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleOnline());
      window.addEventListener('offline', () => this.handleOffline());
    }
  }

  private handleOnline(): void {
    // Process any queued errors when we come back online
    this.processErrorQueue();
  }

  private handleOffline(): void {
    // Store errors locally when offline
    this.persistErrorsLocally();
  }

  private persistErrorsLocally(): void {
    try {
      localStorage.setItem('errorQueue', JSON.stringify(this.errorQueue));
    } catch (e) {
      console.warn('Failed to persist errors locally:', e);
    }
  }

  private loadPersistedErrors(): void {
    try {
      const persisted = localStorage.getItem('errorQueue');
      if (persisted) {
        this.errorQueue.push(...JSON.parse(persisted));
        localStorage.removeItem('errorQueue');
      }
    } catch (e) {
      console.warn('Failed to load persisted errors:', e);
    }
  }

  async reportError(error: Error | ErrorReport): Promise<void> {
    const errorReport = this.normalizeError(error);
    this.errorQueue.push(errorReport);
    
    // Update metrics
    this.updateMetrics(errorReport);

    // Check error threshold
    this.checkErrorThreshold();

    // Process immediately if we have enough errors
    if (this.errorQueue.length >= this.BATCH_SIZE) {
      await this.processErrorQueue();
    }
  }

  private normalizeError(error: Error | ErrorReport): ErrorReport {
    if (this.isErrorReport(error)) {
      return error;
    }

    return {
      message: error.message,
      stack: error.stack,
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      timestamp: new Date().toISOString()
    };
  }

  private isErrorReport(error: any): error is ErrorReport {
    return 'url' in error && 'userAgent' in error && 'timestamp' in error;
  }

  private updateMetrics(error: ErrorReport): void {
    this.errorMetrics.totalErrors++;
    
    // Update category counts
    const category = error.additional?.category || 'unknown';
    this.errorMetrics.errorsByCategory[category] = 
      (this.errorMetrics.errorsByCategory[category] || 0) + 1;

    // Update component counts
    const component = error.additional?.componentName || 'unknown';
    this.errorMetrics.errorsByComponent[component] = 
      (this.errorMetrics.errorsByComponent[component] || 0) + 1;

    // Update retry attempts
    if (error.additional?.attempt > 0) {
      this.errorMetrics.retryAttempts++;
    }

    // Update recovery rate
    const totalRetries = this.errorMetrics.retryAttempts;
    const successfulRetries = this.errorMetrics.retryAttempts - this.errorMetrics.totalErrors;
    this.errorMetrics.recoveryRate = totalRetries > 0 ? successfulRetries / totalRetries : 0;
  }

  private checkErrorThreshold(): void {
    const now = Date.now();
    
    // Reset count if we're outside the window
    if (now - this.lastErrorTime > this.ERROR_WINDOW) {
      this.errorCount = 0;
    }

    this.errorCount++;
    this.lastErrorTime = now;

    if (this.errorCount >= this.ERROR_THRESHOLD) {
      this.alertHighErrorRate();
    }
  }

  private alertHighErrorRate(): void {
    const alert = {
      type: 'high_error_rate',
      message: `High error rate detected: ${this.errorCount} errors in the last minute`,
      timestamp: new Date().toISOString(),
      metrics: this.errorMetrics
    };

    // Send alert to monitoring service
    if (this.MONITORING_ENDPOINT) {
      fetch(`${this.MONITORING_ENDPOINT}/alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alert)
      }).catch(console.error);
    }
  }

  private async processErrorQueue(): Promise<void> {
    if (this.isProcessing || this.errorQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    try {
      // Load any persisted errors from offline state
      this.loadPersistedErrors();

      const batch = this.errorQueue.splice(0, this.BATCH_SIZE);

      if (this.MONITORING_ENDPOINT) {
        await fetch(this.MONITORING_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            errors: batch,
            appVersion: this.APP_VERSION,
            environment: this.ENV,
            sessionId: this.SESSION_ID,
            timestamp: new Date().toISOString(),
            metrics: this.errorMetrics
          })
        });
      } else {
        console.group('Error Batch Report');
        batch.forEach(error => console.error(error));
        console.groupEnd();
      }
    } catch (error) {
      console.error('Failed to process error batch:', error);
      // Re-queue failed items
      this.errorQueue.unshift(...this.errorQueue.splice(0, this.BATCH_SIZE));
      // Persist errors if we're offline
      if (!navigator.onLine) {
        this.persistErrorsLocally();
      }
    } finally {
      this.isProcessing = false;
    }
  }

  private resetErrorCount(): void {
    this.errorCount = 0;
    this.lastErrorTime = Date.now();
  }

  getMetrics(): ErrorMetrics {
    return { ...this.errorMetrics };
  }

  async flushErrors(): Promise<void> {
    await this.processErrorQueue();
  }

  // Additional monitoring methods can be added here
  logWarning(message: string, data?: Record<string, any>): void {
    console.warn('Warning:', message, data);
    // Could also send to monitoring service if needed
  }

  logInfo(message: string, data?: Record<string, any>): void {
    if (this.ENV === 'development') {
      console.info('Info:', message, data);
    }
  }

  getQueueSize(): number {
    return this.errorQueue.length;
  }
}

// Export as singleton
export const MonitoringService = new MonitoringServiceImpl();
