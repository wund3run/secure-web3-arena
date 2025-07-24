export interface ErrorReport {
  message: string;
  stack?: string;
  timestamp: string;
  additional?: Record<string, any>;
}

export interface RetryConfig {
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
} 