
import React from 'react';
import { Toaster } from 'sonner';
import { AccessibilityEnhancer } from '@/components/advanced/AccessibilityEnhancer';
import { ProductionErrorBoundary } from '@/components/error/production-error-boundary';
import { PlatformHealthMonitor } from '@/components/platform/platform-health-monitor';
import { useSupabaseHealth } from '@/hooks/useSupabaseHealth';
import { analyticsTracker } from '@/utils/analytics-tracker';

export function GlobalComponents() {
  const { metrics, isHealthy } = useSupabaseHealth();

  // Track page views and user interactions
  React.useEffect(() => {
    // Track initial page load
    analyticsTracker.trackUserJourney('app_initialized');
    
    // Set up global error tracking
    window.addEventListener('error', (event) => {
      analyticsTracker.trackError(new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      analyticsTracker.trackError(new Error(event.reason), {
        type: 'unhandled_promise_rejection'
      });
    });

    return () => {
      window.removeEventListener('error', () => {});
      window.removeEventListener('unhandledrejection', () => {});
    };
  }, []);

  return (
    <ProductionErrorBoundary>
      {/* Toast notifications */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
      
      {/* Accessibility features */}
      <AccessibilityEnhancer />
      
      {/* Health monitoring in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 z-50">
          <div className="bg-background/95 backdrop-blur border rounded-lg p-3 text-xs">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-green-500' : 'bg-red-500'}`} />
              <span>Platform: {isHealthy ? 'Healthy' : 'Issues'}</span>
            </div>
            <div className="text-muted-foreground mt-1">
              DB: {metrics.connectionStatus} | Auth: {metrics.authStatus}
            </div>
          </div>
        </div>
      )}
    </ProductionErrorBoundary>
  );
}
