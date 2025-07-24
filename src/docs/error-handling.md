# Error Handling System Documentation

## Overview

This document describes the comprehensive error handling system implemented in our application. The system provides a unified approach to handling errors across the application, with features for error reporting, monitoring, recovery, and user feedback.

## Core Components

### 1. UnifiedErrorBoundary

A React error boundary component that catches and handles React component errors.

```tsx
import { UnifiedErrorBoundary } from '@/components/error/UnifiedErrorBoundary';

// Basic usage
<UnifiedErrorBoundary>
  <YourComponent />
</UnifiedErrorBoundary>

// With custom configuration
<UnifiedErrorBoundary
  componentName="UserDashboard"
  routeFallback={true}
  retryable={true}
  supportUrl="/help"
  showDetails={false}
>
  <YourComponent />
</UnifiedErrorBoundary>
```

### 2. API Error Handler

Handles API and network-related errors with retry logic and error categorization.

```tsx
import { withErrorHandling } from '@/utils/error-handling/apiErrorHandler';

// Basic usage
await withErrorHandling(() => api.getData());

// With configuration
await withErrorHandling(
  () => api.getData(),
  {
    maxRetries: 3,
    silent: false,
    showSupport: true,
    offlineSupport: true
  }
);
```

### 3. Error Hook

A React hook for easy error handling in components.

```tsx
import { useErrorHandler } from '@/hooks/useErrorHandler';

function YourComponent() {
  const {
    handleError,
    isLoading,
    error,
    errorCategory,
    retryCount,
    canRetry,
    reset,
    retry
  } = useErrorHandler({
    persistErrors: true,
    autoRetry: true,
    maxRetryDelay: 5000
  });

  const fetchData = async () => {
    try {
      const data = await handleError(() => api.getData());
      // Handle success
    } catch (error) {
      // Optional: Handle error manually
    }
  };

  // Use error state in your UI
  if (error) {
    return <ErrorDisplay error={error} onRetry={retry} />;
  }
}
```

### 4. Monitoring Service

Tracks and reports errors with analytics and alerting capabilities.

```tsx
import { MonitoringService } from '@/services/monitoringService';

// Report an error
MonitoringService.reportError({
  message: 'Error message',
  stack: error.stack,
  url: window.location.href,
  userAgent: navigator.userAgent,
  timestamp: new Date().toISOString(),
  additional: {
    // Custom data
  }
});

// Get error metrics
const metrics = MonitoringService.getMetrics();
```

## Error Categories

The system categorizes errors into the following types:

- Network: Connection and timeout errors
- Authentication: Login and session errors
- Authorization: Permission errors
- Validation: Input validation errors
- NotFound: Resource not found errors
- Server: Backend server errors
- RateLimit: Rate limiting errors
- Offline: Offline state errors
- Unknown: Uncategorized errors

## Features

1. **Automatic Retry**
   - Configurable retry attempts
   - Exponential backoff
   - Category-based retry decisions

2. **Error Recovery**
   - Component-level retry
   - Route fallback
   - Offline support
   - Error persistence

3. **User Feedback**
   - Toast notifications
   - Error messages
   - Support links
   - Progress indicators

4. **Monitoring**
   - Error tracking
   - Batch processing
   - Analytics
   - Alert thresholds

5. **Developer Experience**
   - Type safety
   - Consistent API
   - Detailed error information
   - Testing utilities

## Best Practices

1. **Component Errors**
   - Always wrap route-level components with UnifiedErrorBoundary
   - Provide meaningful component names
   - Enable retry for recoverable errors

2. **API Calls**
   - Use withErrorHandling for all API calls
   - Configure appropriate retry settings
   - Handle offline scenarios

3. **Error Messages**
   - Use clear, user-friendly messages
   - Provide recovery actions when possible
   - Include support options for critical errors

4. **Monitoring**
   - Include relevant context in error reports
   - Set appropriate alert thresholds
   - Review error metrics regularly

## Testing

The system includes comprehensive test utilities:

```tsx
import { renderHook, act } from '@testing-library/react';
import { withErrorHandling } from '@/utils/error-handling/apiErrorHandler';

describe('Error Handling', () => {
  it('should handle errors', async () => {
    const { result } = renderHook(() => useErrorHandler());
    
    await act(async () => {
      try {
        await result.current.handleError(
          () => Promise.reject(new Error('Test'))
        );
      } catch {}
    });

    expect(result.current.error).toBeTruthy();
  });
});
```

## Migration Guide

When migrating from the old error handling system:

1. Replace existing error boundaries with UnifiedErrorBoundary
2. Update API calls to use withErrorHandling
3. Replace error handling hooks with useErrorHandler
4. Update error monitoring calls to use MonitoringService

## Support

For issues or questions about the error handling system:

1. Check the error documentation
2. Review error metrics
3. Contact the development team
4. Submit bug reports with error details 