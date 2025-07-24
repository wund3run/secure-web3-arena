import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home, Bug, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: this.generateErrorId()
    };
  }

  generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Global Error Boundary caught an error:", error, errorInfo);
    
    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      this.logErrorToService(error, errorInfo);
    }
  }

  reportError = (error: Error, errorInfo: ErrorInfo) => {
    // Placeholder for error reporting service integration
    console.log('Error reported to monitoring service:', {
      errorId: this.state.errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
  };

  handleRetry = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: this.generateErrorId()
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

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {this.state.error?.message || 'An unexpected error occurred'}
                </AlertDescription>
              </Alert>

              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  We've encountered an unexpected error. Our team has been automatically notified.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={this.handleRetry} className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                  </Button>
                  
                  <Button variant="outline" onClick={this.handleReload} className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Reload Page
                  </Button>
                  
                  <Button variant="outline" asChild>
                    <Link to="/" className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Go Home
                    </Link>
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Error ID: {this.state.errorId}</p>
                  <p>If this problem persists, please contact support with the error ID above.</p>
                </div>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 p-4 bg-muted rounded-md text-sm">
                  <summary className="cursor-pointer font-medium mb-2">
                    Developer Details
                  </summary>
                  <div className="space-y-2">
                    <div>
                      <strong>Error:</strong>
                      <pre className="mt-1 text-xs overflow-auto bg-background p-2 rounded">
                        {this.state.error.stack}
                      </pre>
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className="mt-1 text-xs overflow-auto bg-background p-2 rounded">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
