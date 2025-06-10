
import React, { Suspense } from 'react';
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from '@/components/ui/enhanced-card';
import { EnhancedSkeleton } from '@/components/ui/enhanced-skeleton';
import ErrorBoundary from '@/components/ui/error-boundary';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EnhancedDashboardWidgetProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  loading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  variant?: "default" | "security" | "trust";
  className?: string;
}

function WidgetErrorFallback({ error, onRetry }: { error: Error; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
      <AlertCircle className="h-8 w-8 text-destructive" />
      <div>
        <p className="font-medium text-destructive">Failed to load widget</p>
        <p className="text-xs text-muted-foreground mt-1">
          {error.message || 'An unexpected error occurred'}
        </p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="h-3 w-3 mr-1" />
          Retry
        </Button>
      )}
    </div>
  );
}

function WidgetLoadingSkeleton() {
  return (
    <div className="space-y-3">
      <EnhancedSkeleton className="h-4 w-3/4" variant="text" />
      <EnhancedSkeleton className="h-8 w-1/2" variant="text" />
      <div className="space-y-2">
        <EnhancedSkeleton className="h-3 w-full" variant="text" />
        <EnhancedSkeleton className="h-3 w-4/5" variant="text" />
        <EnhancedSkeleton className="h-3 w-3/5" variant="text" />
      </div>
    </div>
  );
}

export function EnhancedDashboardWidget({
  title,
  description,
  icon: Icon,
  children,
  loading = false,
  error = null,
  onRetry,
  variant = "default",
  className,
}: EnhancedDashboardWidgetProps) {
  return (
    <EnhancedCard variant={variant} className={className}>
      <EnhancedCardHeader>
        <EnhancedCardTitle className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-primary" />}
          {title}
          {loading && <StatusIndicator status="loading" size="sm" />}
        </EnhancedCardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </EnhancedCardHeader>
      
      <EnhancedCardContent>
        {error ? (
          <WidgetErrorFallback error={error} onRetry={onRetry} />
        ) : loading ? (
          <WidgetLoadingSkeleton />
        ) : (
          <ErrorBoundary fallback={<WidgetErrorFallback error={new Error('Widget rendering failed')} onRetry={onRetry} />}>
            <Suspense fallback={<WidgetLoadingSkeleton />}>
              {children}
            </Suspense>
          </ErrorBoundary>
        )}
      </EnhancedCardContent>
    </EnhancedCard>
  );
}
