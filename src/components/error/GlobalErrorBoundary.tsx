
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Link } from 'react-router-dom';
import { logErrorToAnalytics } from '@/utils/error-handling';
import { toast } from 'sonner';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    
    // Log error to analytics
    logErrorToAnalytics(error, 'GlobalErrorBoundary');
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Show toast notification
    toast.error("Application Error", {
      description: "An unexpected error occurred. Please try refreshing the page."
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by GlobalErrorBoundary:', error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    });
  };

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isNetworkError = this.state.error?.message?.includes('fetch') || 
                            this.state.error?.message?.includes('network');
      
      const isChunkError = this.state.error?.message?.includes('ChunkLoadError') ||
                          this.state.error?.message?.includes('Loading chunk');

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <Card className="max-w-lg w-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-destructive/10 rounded-full w-fit">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-xl">
                {isChunkError ? 'Update Required' : 
                 isNetworkError ? 'Connection Error' : 
                 'Something went wrong'}
              </CardTitle>
              <CardDescription>
                {isChunkError ? 
                  'The application has been updated. Please refresh to get the latest version.' :
                 isNetworkError ? 
                  'Unable to connect to our servers. Please check your internet connection.' :
                  'An unexpected error occurred. Our team has been notified.'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {this.state.errorId && (
                <div className="p-3 bg-muted rounded-md">
                  <div className="flex items-center gap-2 text-sm">
                    <Bug className="h-4 w-4" />
                    <span className="font-medium">Error ID:</span>
                    <code className="text-xs">{this.state.errorId}</code>
                  </div>
                </div>
              )}

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="p-3 bg-muted rounded-md">
                  <summary className="cursor-pointer text-sm font-medium mb-2">
                    Error Details (Development)
                  </summary>
                  <pre className="text-xs overflow-auto max-h-32 whitespace-pre-wrap">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}

              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={isChunkError ? this.handleReload : this.handleReset}
                  className="flex-1"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {isChunkError ? 'Refresh Page' : 'Try Again'}
                </Button>
                
                <Button variant="outline" asChild className="flex-1">
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
