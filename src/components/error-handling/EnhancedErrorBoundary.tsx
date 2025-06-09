
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from '@/components/ui/enhanced-card';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  isolate?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

export class EnhancedErrorBoundary extends Component<Props, State> {
  private retryTimeouts: NodeJS.Timeout[] = [];

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Enhanced Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Auto-retry for certain types of errors
    if (this.shouldAutoRetry(error) && this.state.retryCount < 3) {
      const timeout = setTimeout(() => {
        this.handleRetry();
      }, Math.pow(2, this.state.retryCount) * 1000); // Exponential backoff

      this.retryTimeouts.push(timeout);
    }
  }

  componentWillUnmount() {
    // Clear any pending retry timeouts
    this.retryTimeouts.forEach(timeout => clearTimeout(timeout));
  }

  shouldAutoRetry(error: Error): boolean {
    // Auto-retry for network errors or chunk loading failures
    const errorMessage = error.message.toLowerCase();
    return errorMessage.includes('loading chunk') || 
           errorMessage.includes('network') ||
           errorMessage.includes('fetch');
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  handleReportError = () => {
    const errorReport = {
      error: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    console.log('Error Report:', errorReport);
    // In a real app, you would send this to your error reporting service
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <EnhancedCard variant="outlined" className="max-w-lg w-full">
            <EnhancedCardHeader centered>
              <div className="w-16 h-16 mx-auto mb-4 bg-error/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-error" />
              </div>
              <EnhancedCardTitle size="lg" className="text-center">
                Something went wrong
              </EnhancedCardTitle>
            </EnhancedCardHeader>
            
            <EnhancedCardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                We encountered an unexpected error. This has been logged and our team will investigate.
              </p>
              
              {this.state.retryCount < 3 && (
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={this.handleRetry}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                  </Button>
                  
                  <Button variant="outline" asChild>
                    <Link to="/" className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Go Home
                    </Link>
                  </Button>
                </div>
              )}
              
              <details className="text-left mt-4">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  Technical Details
                </summary>
                <div className="mt-2 p-3 bg-muted rounded text-xs font-mono">
                  <p><strong>Error:</strong> {this.state.error?.message}</p>
                  {process.env.NODE_ENV === 'development' && (
                    <pre className="mt-2 whitespace-pre-wrap break-all">
                      {this.state.error?.stack}
                    </pre>
                  )}
                </div>
              </details>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={this.handleReportError}
                className="text-xs"
              >
                <Bug className="h-3 w-3 mr-1" />
                Report This Issue
              </Button>
            </EnhancedCardContent>
          </EnhancedCard>
        </div>
      );
    }

    return this.props.children;
  }
}
