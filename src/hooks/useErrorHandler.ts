import { useCallback, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { withErrorHandling, ErrorHandlerConfig, ErrorCategory } from '@/utils/error-handling/apiErrorHandler';
import { MonitoringService } from '@/services/monitoringService';

interface ErrorState {
  error: Error | null;
  category: ErrorCategory | null;
  retryCount: number;
  timestamp: string;
}

interface ErrorHandlerHookConfig extends ErrorHandlerConfig {
  persistErrors?: boolean;
  autoRetry?: boolean;
  maxRetryDelay?: number;
  maxRetries?: number;
}

export function useErrorHandler(defaultConfig: ErrorHandlerHookConfig = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    category: null,
    retryCount: 0,
    timestamp: ''
  });

  // Load persisted errors on mount
  useEffect(() => {
    if (defaultConfig.persistErrors) {
      const persisted = localStorage.getItem('lastError');
      if (persisted) {
        try {
          const parsed = JSON.parse(persisted);
          setErrorState(parsed);
        } catch (e) {
          console.warn('Failed to load persisted error:', e);
        }
      }
    }
  }, [defaultConfig.persistErrors]);

  // Save errors to localStorage if persistence is enabled
  useEffect(() => {
    if (defaultConfig.persistErrors && errorState.error) {
      try {
        localStorage.setItem('lastError', JSON.stringify(errorState));
      } catch (e) {
        console.warn('Failed to persist error:', e);
      }
    }
  }, [errorState, defaultConfig.persistErrors]);

  const handleError = useCallback(
    async <T>(operation: () => Promise<T>, config: ErrorHandlerConfig = {}) => {
      setIsLoading(true);
      setErrorState(prev => ({ ...prev, error: null }));

      try {
        const result = await withErrorHandling(operation, {
          ...defaultConfig,
          ...config,
          onError: (err) => {
            const category = err.category || ErrorCategory.Unknown;
            setErrorState({
              error: err,
              category,
              retryCount: errorState.retryCount + 1,
              timestamp: new Date().toISOString()
            });

            // Auto-retry if enabled and within limits
            if (
              defaultConfig.autoRetry &&
              errorState.retryCount < (config.maxRetries || 3) &&
              category !== ErrorCategory.Authentication &&
              category !== ErrorCategory.Authorization
            ) {
              const delay = Math.min(
                1000 * Math.pow(2, errorState.retryCount),
                defaultConfig.maxRetryDelay || 30000
              );
              
              toast.error('Operation failed', {
                description: `Retrying in ${delay / 1000} seconds...`,
                action: {
                  label: 'Retry Now',
                  onClick: () => handleError(operation, config)
                }
              });

              setTimeout(() => {
                handleError(operation, config);
              }, delay);
            }

            config.onError?.(err);
          }
        });
        return result;
      } finally {
        setIsLoading(false);
      }
    },
    [defaultConfig, errorState.retryCount]
  );

  const reset = useCallback(() => {
    setErrorState({
      error: null,
      category: null,
      retryCount: 0,
      timestamp: ''
    });
    if (defaultConfig.persistErrors) {
      localStorage.removeItem('lastError');
    }
  }, [defaultConfig.persistErrors]);

  const retry = useCallback(() => {
    if (errorState.error && errorState.retryCount < (defaultConfig.maxRetries || 3)) {
      setErrorState(prev => ({
        ...prev,
        retryCount: prev.retryCount + 1
      }));
      return true;
    }
    return false;
  }, [errorState, defaultConfig.maxRetries]);

  return {
    handleError,
    isLoading,
    error: errorState.error,
    errorCategory: errorState.category,
    retryCount: errorState.retryCount,
    canRetry: errorState.retryCount < (defaultConfig.maxRetries || 3),
    reset,
    retry
  };
}

// Example usage:
// const { handleError, isLoading, error, reset } = useErrorHandler({ maxRetries: 2 });
// try {
//   await handleError(() => api.getData());
// } catch (err) {
//   // Handle error if needed
// } 