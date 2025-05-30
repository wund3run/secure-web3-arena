
import React from 'react';

export const logErrorToAnalytics = (error: Error, context?: string) => {
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context || 'Error'}]:`, error);
    console.error('Stack trace:', error.stack);
  }
  
  // In production, you would send to your analytics service
  // Example: analytics.track('error', { message: error.message, context });
};

export const formatError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unknown error occurred';
};

export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof Error) {
    return error.message.toLowerCase().includes('network') ||
           error.message.toLowerCase().includes('fetch') ||
           error.message.toLowerCase().includes('timeout');
  }
  return false;
};

export enum ErrorCategory {
  NETWORK = 'network',
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  SERVER = 'server',
  CLIENT = 'client',
  UNKNOWN = 'unknown',
  DATABASE = 'database'
}

export const handleError = (error: unknown, context?: string) => {
  const formattedError = formatError(error);
  logErrorToAnalytics(error instanceof Error ? error : new Error(formattedError), context);
  
  // You can add additional error handling logic here
  console.error(`Error in ${context || 'unknown context'}:`, formattedError);
};

export const createBoundary = (Component: React.ComponentType<any>) => {
  return class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
    constructor(props: any) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      handleError(error, 'React Error Boundary');
    }

    render() {
      if (this.state.hasError) {
        return React.createElement('div', null, 'Something went wrong.');
      }

      return React.createElement(Component, this.props);
    }
  };
};

export const withErrorHandling = <P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> => {
  return (props: P) => {
    try {
      return React.createElement(Component, props);
    } catch (error) {
      handleError(error, Component.name);
      return React.createElement('div', null, 'Error loading component');
    }
  };
};

// Error Boundary Component
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    handleError(error, 'ErrorBoundary');
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || React.createElement(
        'div',
        { className: 'p-4 border border-red-200 rounded-lg bg-red-50' },
        React.createElement('h3', { className: 'text-red-800 font-medium' }, 'Something went wrong'),
        React.createElement(
          'p',
          { className: 'text-red-600 text-sm mt-1' },
          this.state.error?.message || 'An unexpected error occurred'
        )
      );
    }

    return this.props.children;
  }
}

// Marketplace specific error boundary
export class MarketplaceErrorBoundary extends ErrorBoundary {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    handleError(error, 'MarketplaceErrorBoundary');
  }
}
