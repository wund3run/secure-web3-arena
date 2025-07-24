import { Logger } from '@/utils/logging/logger';

interface ErrorMetadata {
  componentName?: string;
  userId?: string;
  url?: string;
  timestamp: string;
  additionalInfo?: Record<string, unknown>;
}

class ErrorTracker {
  private static readonly ERROR_THRESHOLD = 5;
  private static errorCounts: Map<string, number> = new Map();
  private static lastErrors: Map<string, Date> = new Map();

  static trackError(error: Error, metadata: Partial<ErrorMetadata> = {}): void {
    const errorKey = this.getErrorKey(error);
    const now = new Date();
    const fullMetadata: ErrorMetadata = {
      ...metadata,
      timestamp: now.toISOString(),
      url: window.location.href,
    };

    // Update error counts
    const currentCount = (this.errorCounts.get(errorKey) || 0) + 1;
    this.errorCounts.set(errorKey, currentCount);
    this.lastErrors.set(errorKey, now);

    // Log the error with enhanced context
    Logger.error(error.message, {
      errorName: error.name,
      stack: error.stack,
      ...fullMetadata,
      occurrenceCount: currentCount,
    });

    // Check if we need to escalate based on frequency
    if (this.shouldEscalate(errorKey, currentCount)) {
      this.escalateError(error, fullMetadata, currentCount);
    }
  }

  static clearErrorCount(errorKey: string): void {
    this.errorCounts.delete(errorKey);
    this.lastErrors.delete(errorKey);
  }

  private static getErrorKey(error: Error): string {
    // Create a unique key based on error name and message
    return `${error.name}:${error.message}`;
  }

  private static shouldEscalate(errorKey: string, count: number): boolean {
    if (count >= this.ERROR_THRESHOLD) {
      const lastError = this.lastErrors.get(errorKey);
      if (lastError) {
        // Escalate if we've seen this error multiple times in the last hour
        const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
        return lastError > hourAgo;
      }
    }
    return false;
  }

  private static escalateError(error: Error, metadata: ErrorMetadata, count: number): void {
    Logger.fatal('Frequent error occurrence detected', {
      error: error.message,
      errorName: error.name,
      occurrenceCount: count,
      ...metadata,
    });

    // Here you could add additional escalation logic like:
    // - Sending alerts to a monitoring service
    // - Triggering incident response
    // - Notifying development team
  }

  // Utility method to track component errors
  static trackComponentError(error: Error, componentName: string, userId?: string): void {
    this.trackError(error, {
      componentName,
      userId,
      additionalInfo: {
        componentType: 'React',
        renderPhase: 'Component',
      },
    });
  }

  // Utility method to track API errors
  static trackApiError(error: Error, endpoint: string, userId?: string): void {
    this.trackError(error, {
      additionalInfo: {
        endpoint,
        type: 'API',
      },
      userId,
    });
  }
}

export default ErrorTracker; 