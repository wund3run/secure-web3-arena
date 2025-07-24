import { Component, ErrorInfo, ReactNode } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { MonitoringService } from '@/services/monitoringService';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

export class ComprehensiveErrorBoundary extends Component<Props, State> {
  private retryTimeouts: NodeJS.Timeout[] = [];
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAYS = [1000, 2000, 4000]; // Exponential backoff

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
      retryCount: 0
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { componentName } = this.props;
    // Report error to monitoring service in production
    if (import.meta.env.MODE === 'production') {
      MonitoringService.reportError({
        message: error.message,
        stack: error.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        additional: { errorInfo, componentName }
      });
    }
    // Enhanced error logging
    console.error('React Error Boundary caught error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      componentName,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      retryCount: this.state.retryCount
    });
    this.setState({
      error,
      errorInfo
    });
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    // Auto-retry for certain types of errors
    if (this.shouldAutoRetry(error) && this.state.retryCount < this.MAX_RETRIES) {
      const timeout = setTimeout(() => {
        this.handleRetry();
      }, this.RETRY_DELAYS[this.state.retryCount]);
      this.retryTimeouts.push(timeout);
    }
  }

  componentWillUnmount() {
    // Clear any pending retry timeouts
    this.retryTimeouts.forEach(clearTimeout);
  }

  shouldAutoRetry(error: Error): boolean {
    const errorMessage = error.message.toLowerCase();
    return errorMessage.includes('loading chunk') || 
           errorMessage.includes('network') ||
           errorMessage.includes('fetch') ||
           errorMessage.includes('timeout') ||
           errorMessage.includes('failed to load');
  }

  handleRetry = (): void => {
    const newRetryCount = this.state.retryCount + 1;
    if (newRetryCount > this.MAX_RETRIES) {
      return;
    }
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: newRetryCount
    });
  }

  getErrorMessage(): { message: string; isKnown: boolean } {
    const error = this.state.error;
    let message = 'An unexpected error occurred';
    let isKnown = false;
    if (error) {
      const errorMessage = error.message.toLowerCase();
      if (errorMessage.includes('loading chunk') || errorMessage.includes('failed to load')) {
        message = 'Failed to load application module. This might be due to a network issue or outdated cache.';
        isKnown = true;
      } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        message = 'Network connection issue. Please check your internet connection.';
        isKnown = true;
      } else if (errorMessage.includes('timeout')) {
        message = 'The operation timed out. Please try again.';
        isKnown = true;
      } else if (errorMessage.includes('permission') || errorMessage.includes('unauthorized')) {
        message = 'You do not have permission to access this feature.';
        isKnown = true;
      }
    }
    return { message, isKnown };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      const { message, isKnown } = this.getErrorMessage();
      return (
        <div className="p-6 rounded-lg border border-muted bg-background shadow-sm">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {message}
            </AlertDescription>
          </Alert>
          {!isKnown && this.state.errorInfo && (
            <div className="bg-muted/50 p-4 rounded text-xs overflow-auto max-h-[200px] mb-4">
              <pre>{this.state.errorInfo.componentStack}</pre>
            </div>
          )}
          <div className="flex gap-2">
            <Button 
              onClick={this.handleRetry} 
              variant="default"
              className="flex-1"
              type="button"
              disabled={this.state.retryCount >= this.MAX_RETRIES}
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </Button>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              className="flex-1"
              type="button"
            >
              Refresh Page
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              variant="ghost"
              className="flex-1"
              type="button"
            >
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
            <a href="/support" className="block text-center text-sm text-blue-600 mt-2 underline">Contact Support</a>
          </div>
          {this.state.retryCount > 0 && (
            <div className="mt-2 text-xs text-muted-foreground">
              Retry attempt: {this.state.retryCount} / {this.MAX_RETRIES}
            </div>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
