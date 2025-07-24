import { toast } from 'sonner';
import { MonitoringService } from '@/services/monitoringService';

export enum ErrorCategory {
  Network = 'network',
  Authentication = 'authentication',
  Authorization = 'authorization',
  Validation = 'validation',
  NotFound = 'not_found',
  Server = 'server',
  RateLimit = 'rate_limit',
  Offline = 'offline',
  Unknown = 'unknown'
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: string,
    public readonly category?: ErrorCategory,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RetryConfig {
  maxRetries?: number;
  retryDelays?: number[];
  shouldRetry?: (error: any) => boolean;
}

export interface ErrorHandlerConfig extends RetryConfig {
  silent?: boolean;
  toastMessage?: string;
  toastDescription?: string;
  showSupport?: boolean;
  onError?: (error: any) => void;
  context?: string;
  offlineSupport?: boolean;
}

const defaultRetryConfig: Required<RetryConfig> = {
  maxRetries: 3,
  retryDelays: [1000, 3000, 5000],
  shouldRetry: (error: any) => {
    const status = error?.response?.status;
    return (
      !status || // Network error
      status === 408 || // Request timeout
      status === 429 || // Too many requests
      (status >= 500 && status <= 599) // Server errors
    );
  }
};

function categorizeError(error: any): ErrorCategory {
  const status = error?.response?.status;
  
  if (!navigator.onLine) {
    return ErrorCategory.Offline;
  }

  if (!status) {
    return ErrorCategory.Network;
  }

  switch (status) {
    case 401:
      return ErrorCategory.Authentication;
    case 403:
      return ErrorCategory.Authorization;
    case 404:
      return ErrorCategory.NotFound;
    case 422:
      return ErrorCategory.Validation;
    case 429:
      return ErrorCategory.RateLimit;
    case 500:
    case 502:
    case 503:
    case 504:
      return ErrorCategory.Server;
    default:
      return ErrorCategory.Unknown;
  }
}

function getErrorMessage(error: any, category: ErrorCategory): string {
  const defaultMessages: Record<ErrorCategory, string> = {
    [ErrorCategory.Network]: 'Network connection error',
    [ErrorCategory.Authentication]: 'Please sign in to continue',
    [ErrorCategory.Authorization]: 'You do not have permission to perform this action',
    [ErrorCategory.Validation]: 'Please check your input and try again',
    [ErrorCategory.NotFound]: 'The requested resource was not found',
    [ErrorCategory.Server]: 'Server error, please try again later',
    [ErrorCategory.RateLimit]: 'Too many requests, please wait a moment',
    [ErrorCategory.Offline]: 'You are currently offline',
    [ErrorCategory.Unknown]: 'An unexpected error occurred'
  };

  return error?.response?.data?.message || defaultMessages[category];
}

export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  config: ErrorHandlerConfig = {}
): Promise<T> {
  const {
    maxRetries = defaultRetryConfig.maxRetries,
    retryDelays = defaultRetryConfig.retryDelays,
    shouldRetry = defaultRetryConfig.shouldRetry,
    silent = false,
    toastMessage,
    toastDescription,
    showSupport = true,
    onError,
    context = 'API',
    offlineSupport = false
  } = config;

  let lastError: any;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      // Check for offline status if offline support is enabled
      if (!navigator.onLine && offlineSupport) {
        throw new ApiError(
          'You are currently offline',
          0,
          'OFFLINE',
          ErrorCategory.Offline
        );
      }

      return await operation();
    } catch (error: any) {
      lastError = error;
      const category = categorizeError(error);
      
      // Report error to monitoring service
      MonitoringService.reportError({
        message: error.message,
        stack: error.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        additional: {
          attempt,
          maxRetries,
          category,
          status: error?.response?.status,
          endpoint: error?.config?.url,
          method: error?.config?.method,
          context
        }
      });

      // Call custom error handler if provided
      if (onError) {
        onError(error);
      }

      // Check if we should retry
      if (attempt < maxRetries && shouldRetry(error)) {
        const delay = retryDelays[attempt] || retryDelays[retryDelays.length - 1];
        await new Promise(resolve => setTimeout(resolve, delay));
        attempt++;
        continue;
      }

      // If we're not retrying or have exhausted retries, show error UI
      if (!silent) {
        const errorMessage = getErrorMessage(error, category);
        
        toast.error(toastMessage || errorMessage, {
          description: toastDescription,
          action: showSupport ? {
            label: 'Contact Support',
            onClick: () => window.location.href = '/support'
          } : undefined
        });
      }

      // Transform error into ApiError instance
      throw new ApiError(
        lastError.message,
        lastError?.response?.status,
        lastError?.response?.data?.code,
        category,
        lastError?.response?.data
      );
    }
  }

  throw lastError;
}

// Helper to create pre-configured error handlers
export function createErrorHandler(defaultConfig: ErrorHandlerConfig = {}) {
  return <T>(operation: () => Promise<T>, config: ErrorHandlerConfig = {}) =>
    withErrorHandling(operation, { ...defaultConfig, ...config });
}

// Export a simple error handler for backward compatibility
export const handleError = (error: unknown, context?: string) => {
  console.error(`Error in ${context || 'application'}:`, error);
  
  // Report to monitoring service if it's an actual error
  if (error instanceof Error) {
    MonitoringService.reportError({
      message: error.message,
      stack: error.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      additional: { context }
    });
  }
};

// Export a specific API error handler for the marketplace
export const handleApiError = handleError;

// Example usage:
// const handleApiError = createErrorHandler({ maxRetries: 2 });
// await handleApiError(() => api.getData(), { silent: true }); 