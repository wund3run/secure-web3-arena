
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from '@/components/ui/enhanced-card';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  routeFallback?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class EnhancedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      errorInfo
    });
    
    console.error('Enhanced Error Boundary caught an error:', error, errorInfo);
  }
  
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render(): ReactNode {
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
