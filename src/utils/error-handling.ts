
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
