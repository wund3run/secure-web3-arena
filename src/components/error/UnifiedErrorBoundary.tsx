import { Component, ErrorInfo, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw, Home, ExternalLink } from 'lucide-react';
import { MonitoringService } from '@/services/monitoringService';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  componentName?: string;
  routeFallback?: boolean;
  retryable?: boolean;
  supportUrl?: string;
  showDetails?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
  errorId: string;
}

export class UnifiedErrorBoundary extends Component<Props, State> {
  private readonly MAX_RETRIES = 3;
  private readonly DEFAULT_SUPPORT_URL = '/support';

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      retryCount: 0,
      errorId: `err-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Report to monitoring service
    MonitoringService.reportError({
      message: error.message,
      stack: error.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      additional: {
        componentName: this.props.componentName,
        errorInfo,
        retryCount: this.state.retryCount,
        errorId: this.state.errorId
      }
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    this.setState({ errorInfo });

    // Show toast notification
    toast.error('Component Error', {
      description: 'An error occurred while rendering this component',
      action: {
        label: 'Retry',
        onClick: () => this.handleRetry()
      }
    });
  }

  handleRetry = (): void => {
    const { retryCount } = this.state;
    
    if (retryCount < this.MAX_RETRIES) {
      this.setState(state => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: state.retryCount + 1
      }));
    } else {
      toast.error('Maximum retries reached', {
        description: 'Please refresh the page or contact support',
        action: {
          label: 'Refresh Page',
          onClick: () => window.location.reload()
        }
      });
    }
  };

  handleNavigateHome = (): void => {
    window.location.href = '/';
  };

  handleContactSupport = (): void => {
    const { supportUrl = this.DEFAULT_SUPPORT_URL } = this.props;
    const { errorId } = this.state;
    
    // Add error ID to support URL
    const supportUrlWithError = `${supportUrl}?errorId=${errorId}`;
    window.open(supportUrlWithError, '_blank');
  };

  renderErrorUI(): ReactNode {
    const { 
      fallback, 
      routeFallback = false, 
      retryable = true,
      showDetails = process.env.NODE_ENV === 'development'
    } = this.props;
    const { error, errorInfo, errorId, retryCount } = this.state;

    // If custom fallback is provided, use it
    if (fallback) {
      return fallback;
    }

    return (
      <div className="p-6 space-y-6 max-w-2xl mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-5 w-5" />
          <AlertDescription className="ml-2">
            {error?.message || 'An unexpected error occurred'}
          </AlertDescription>
        </Alert>

        <div className="text-sm text-gray-500">
          Error ID: {errorId}
          {retryCount > 0 && ` (Retry attempt ${retryCount}/${this.MAX_RETRIES})`}
        </div>

        <div className="flex flex-wrap gap-3">
          {retryable && retryCount < this.MAX_RETRIES && (
            <Button
              variant="outline"
              onClick={this.handleRetry}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          )}

          {routeFallback && (
            <Button
              variant="outline"
              onClick={this.handleNavigateHome}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Return Home
            </Button>
          )}

          <Button
            variant="outline"
            onClick={this.handleContactSupport}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Contact Support
          </Button>
        </div>

        {showDetails && error && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Error Details</h3>
            <pre className="p-4 bg-gray-100 rounded-lg text-sm overflow-auto">
              {error.stack}
            </pre>
            {errorInfo && (
              <pre className="p-4 bg-gray-100 rounded-lg text-sm overflow-auto">
                {errorInfo.componentStack}
              </pre>
            )}
          </div>
        )}
      </div>
    );
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.renderErrorUI();
    }

    return this.props.children;
  }
}