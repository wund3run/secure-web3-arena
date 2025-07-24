import { render, screen, fireEvent, act } from '@testing-library/react';
import { ComprehensiveErrorBoundary } from '@/components/error/comprehensive-error-boundary';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Logger } from '@/utils/logging/logger';

// Mock Logger
vi.mock('@/utils/logging/logger', () => ({
  Logger: {
    error: vi.fn()
  }
}));

// Mock component that throws an error
const ThrowError = ({ shouldThrow = true, message = 'Test error' }) => {
  if (shouldThrow) {
    throw new Error(message);
  }
  return <div>No error</div>;
};

describe('ComprehensiveErrorBoundary', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Suppress console.error for expected errors
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ComprehensiveErrorBoundary>
        <div>Test content</div>
      </ComprehensiveErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders error UI when there is an error', () => {
    render(
      <ComprehensiveErrorBoundary>
        <ThrowError />
      </ComprehensiveErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('logs errors with enhanced context', () => {
    const componentName = 'TestComponent';
    
    render(
      <ComprehensiveErrorBoundary componentName={componentName}>
        <ThrowError />
      </ComprehensiveErrorBoundary>
    );

    expect(Logger.error).toHaveBeenCalledWith(
      'React Error Boundary caught error',
      expect.objectContaining({
        error: 'Test error',
        componentName,
        url: window.location.href,
        retryCount: 0
      })
    );
  });

  it('calls custom error handler when provided', () => {
    const onError = vi.fn();
    
    render(
      <ComprehensiveErrorBoundary onError={onError}>
        <ThrowError />
      </ComprehensiveErrorBoundary>
    );

    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String)
      })
    );
  });

  it('auto-retries for network errors', () => {
    render(
      <ComprehensiveErrorBoundary>
        <ThrowError message="Failed to load chunk" />
      </ComprehensiveErrorBoundary>
    );

    // Should start retry sequence
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // Fast-forward through retry attempts
    act(() => {
      vi.advanceTimersByTime(1000); // First retry
    });
    expect(Logger.error).toHaveBeenCalledTimes(2);

    act(() => {
      vi.advanceTimersByTime(2000); // Second retry
    });
    expect(Logger.error).toHaveBeenCalledTimes(3);

    act(() => {
      vi.advanceTimersByTime(4000); // Third retry
    });
    expect(Logger.error).toHaveBeenCalledTimes(4);

    // No more retries after max attempts
    act(() => {
      vi.advanceTimersByTime(8000);
    });
    expect(Logger.error).toHaveBeenCalledTimes(4);
  });

  it('allows manual retry after auto-retries are exhausted', () => {
    const { rerender } = render(
      <ComprehensiveErrorBoundary>
        <ThrowError />
      </ComprehensiveErrorBoundary>
    );

    // Fast-forward through all auto-retries
    act(() => {
      vi.advanceTimersByTime(7000);
    });

    // Manual retry with fixed component
    const retryButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(retryButton);

    rerender(
      <ComprehensiveErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ComprehensiveErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('cleans up retry timeouts on unmount', () => {
    const { unmount } = render(
      <ComprehensiveErrorBoundary>
        <ThrowError message="Failed to load chunk" />
      </ComprehensiveErrorBoundary>
    );

    // Start retry sequence
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Unmount before retries complete
    unmount();

    // Advance time - no more retries should occur
    act(() => {
      vi.advanceTimersByTime(10000);
    });

    // Only initial error should be logged
    expect(Logger.error).toHaveBeenCalledTimes(1);
  });
}); 