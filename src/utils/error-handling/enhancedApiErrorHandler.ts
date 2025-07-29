import { toast } from 'sonner';
import { MonitoringService } from '@/services/monitoringService';

interface RetryConfig {
  maxRetries?: number;
  retryDelays?: number[];
  shouldRetry?: (error: any) => boolean;
}

interface ErrorHandlerConfig extends RetryConfig {
  silent?: boolean;
  toastMessage?: string;
  toastDescription?: string;
  showSupport?: boolean;
  onError?: (error: any) => void;
}

const defaultRetryConfig: Required<RetryConfig> = {
  maxRetries: 3,
  retryDelays: [1000, 3000, 5000],
  shouldRetry: (error: any) => {
    const status = error?.response?.status;
    return (
      !status || 
      status === 408 || 
      status === 429 || 
      (status >= 500 && status <= 599)
    );
  }
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: string,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
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
    toastMessage = 'An error occurred',
    toastDescription = 'Please try again later',
    showSupport = true,
    onError
  } = config;

  let lastError: any;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      if (import.meta.env.MODE === 'production') {
        MonitoringService.reportError({
          message: error.message,
          stack: error.stack,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          additional: {
            attempt,
            maxRetries,
            status: error?.response?.status,
            endpoint: error?.config?.url,
            method: error?.config?.method
          }
        });
      }

      if (onError) {
        onError(error);
      }

      if (attempt < maxRetries && shouldRetry(error)) {
        const delay = retryDelays[attempt] || retryDelays[retryDelays.length - 1];
        await new Promise(resolve => setTimeout(resolve, delay));
        attempt++;
        continue;
      }

      if (!silent) {
        const status = error?.response?.status;
        let message = toastMessage;
        let description = toastDescription;

        if (status === 401 || status === 403) {
          message = 'Access Denied';
          description = 'You do not have permission to perform this action';
        } else if (status === 404) {
          message = 'Not Found';
          description = 'The requested resource could not be found';
        } else if (status === 429) {
          message = 'Too Many Requests';
          description = 'Please wait a moment before trying again';
        } else if (status >= 500) {
          message = 'Server Error';
          description = 'Our team has been notified and is working on the issue';
        }

        toast.error(message, {
          description,
          ...(showSupport && {
            action: {
              label: 'Contact Support',
              onClick: () => window.open('/support', '_blank')
            }
          })
        });
      }

      throw new ApiError(
        lastError.message,
        lastError?.response?.status,
        lastError?.response?.data?.code,
        lastError?.response?.data
      );
    }
  }

  throw lastError;
}

export function createErrorHandler(defaultConfig: ErrorHandlerConfig = {}) {
  return <T>(operation: () => Promise<T>, config: ErrorHandlerConfig = {}) =>
    withErrorHandling(operation, { ...defaultConfig, ...config });
}

// Example usage:
// const handleApiError = createErrorHandler({ maxRetries: 2 });
// await handleApiError(() => api.getData(), { silent: true });