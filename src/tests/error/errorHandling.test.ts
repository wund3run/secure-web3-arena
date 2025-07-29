import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { withErrorHandling, ApiError, ErrorCategory } from '@/utils/error-handling/apiErrorHandler';
import { MonitoringService } from '@/services/monitoringService';
import { useErrorHandler } from '@/hooks/useErrorHandler';

// Mock MonitoringService
vi.mock('@/services/monitoringService', () => ({
  MonitoringService: {
    reportError: vi.fn(),
    getMetrics: vi.fn()
  }
}));

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn()
  }
}));

describe('Error Handling System', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('withErrorHandling', () => {
    it('should return successful operation result', async () => {
      const result = await withErrorHandling(
        () => Promise.resolve('success')
      );
      expect(result).toBe('success');
    });

    it('should retry on retryable errors', async () => {
      const operation = vi.fn()
        .mockRejectedValueOnce(new Error('Retry 1'))
        .mockRejectedValueOnce(new Error('Retry 2'))
        .mockResolvedValueOnce('success');

      const result = await withErrorHandling(operation, {
        maxRetries: 2,
        retryDelays: [0, 0],
        silent: true
      });

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(3);
    });

    it('should categorize errors correctly', async () => {
      const networkError = { message: 'Network Error' };
      const authError = { response: { status: 401, data: { message: 'Unauthorized' } } };
      const serverError = { response: { status: 500, data: { message: 'Server Error' } } };

      await expect(
        withErrorHandling(() => Promise.reject(networkError), { silent: true })
      ).rejects.toMatchObject({ category: ErrorCategory.Network });

      await expect(
        withErrorHandling(() => Promise.reject(authError), { silent: true })
      ).rejects.toMatchObject({ category: ErrorCategory.Authentication });

      await expect(
        withErrorHandling(() => Promise.reject(serverError), { silent: true })
      ).rejects.toMatchObject({ category: ErrorCategory.Server });
    });

    it('should handle offline scenarios', async () => {
      const originalOnline = navigator.onLine;
      Object.defineProperty(navigator, 'onLine', { value: false, writable: true });

      await expect(
        withErrorHandling(() => Promise.resolve(), { offlineSupport: true })
      ).rejects.toMatchObject({ category: ErrorCategory.Offline });

      Object.defineProperty(navigator, 'onLine', { value: originalOnline });
    });
  });

  describe('useErrorHandler', () => {
    it('should handle successful operations', async () => {
      const { result } = renderHook(() => useErrorHandler());

      let operationResult;
      await act(async () => {
        operationResult = await result.current.handleError(
          () => Promise.resolve('success')
        );
      });

      expect(operationResult).toBe('success');
      expect(result.current.error).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });

    it('should persist errors when configured', async () => {
      const { result } = renderHook(() => 
        useErrorHandler({ persistErrors: true })
      );

      const error = new Error('Test error');

      await act(async () => {
        try {
          await result.current.handleError(
            () => Promise.reject(error),
            { silent: true }
          );
        } catch {}
      });

      expect(localStorage.getItem('lastError')).toBeTruthy();
      const persisted = JSON.parse(localStorage.getItem('lastError')!);
      expect(persisted.error.message).toBe('Test error');
    });

    it('should auto-retry with exponential backoff', async () => {
      const { result } = renderHook(() => 
        useErrorHandler({ 
          autoRetry: true, 
          maxRetryDelay: 5000
        })
      );

      const operation = vi.fn()
        .mockRejectedValueOnce(new Error('Retry 1'))
        .mockRejectedValueOnce(new Error('Retry 2'))
        .mockResolvedValueOnce('success');

      let finalResult;
      await act(async () => {
        try {
          finalResult = await result.current.handleError(operation);
        } catch {}
      });

      // Fast-forward timers for retries
      await act(async () => {
        vi.runAllTimers();
      });

      expect(operation).toHaveBeenCalledTimes(3);
      expect(finalResult).toBe('success');
    });

    it('should track retry counts', async () => {
      const { result } = renderHook(() => useErrorHandler());

      await act(async () => {
        try {
          await result.current.handleError(
            () => Promise.reject(new Error('Test')),
            { silent: true }
          );
        } catch {}
      });

      expect(result.current.retryCount).toBe(1);
      expect(result.current.canRetry).toBe(true);

      // Simulate max retries
      await act(async () => {
        for (let i = 0; i < 3; i++) {
          result.current.retry();
        }
      });

      expect(result.current.canRetry).toBe(false);
    });

    it('should reset error state', async () => {
      const { result } = renderHook(() => useErrorHandler());

      await act(async () => {
        try {
          await result.current.handleError(
            () => Promise.reject(new Error('Test')),
            { silent: true }
          );
        } catch {}
      });

      expect(result.current.error).toBeTruthy();

      act(() => {
        result.current.reset();
      });

      expect(result.current.error).toBeNull();
      expect(result.current.retryCount).toBe(0);
    });
  });

  describe('MonitoringService integration', () => {
    it('should report errors with correct context', async () => {
      await expect(
        withErrorHandling(
          () => Promise.reject(new Error('Test')),
          { 
            silent: true,
            context: 'TestContext'
          }
        )
      ).rejects.toThrow();

      expect(MonitoringService.reportError).toHaveBeenCalledWith(
        expect.objectContaining({
          additional: expect.objectContaining({
            context: 'TestContext'
          })
        })
      );
    });

    it('should track error metrics', async () => {
      const mockGetMetrics = vi.mocked(MonitoringService.getMetrics);
      mockGetMetrics.mockReturnValue({
        totalErrors: 1,
        uniqueErrors: 1,
        errorsByCategory: { network: 1 },
        errorsByComponent: { TestComponent: 1 },
        retryAttempts: 1,
        recoveryRate: 0
      });

      const metrics = MonitoringService.getMetrics();
      expect(metrics.totalErrors).toBe(1);
      expect(metrics.errorsByCategory.network).toBe(1);
    });
  });
}); 