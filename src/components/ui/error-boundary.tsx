import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './button';
import { Alert, AlertDescription } from './alert';
import { MonitoringService } from '@/services/monitoringService';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: ''
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: error.message
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Report error to monitoring service in production
    if (import.meta.env.MODE === 'production') {
      MonitoringService.reportError({
        message: error.message,
        stack: error.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        additional: { errorInfo }
      });
    }
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo: errorInfo.componentStack || error.message
    });
  }

  handleRetry = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: ''
    });
    window.location.reload();
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Check if a custom fallback is provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Determine if the error is related to Select.Item values
      const isSelectError = this.state.errorInfo.includes('Select.Item') && 
                            this.state.errorInfo.includes('empty string');

      // Format error message for display
      let errorMessage = this.state.errorInfo;
      if (isSelectError) {
        errorMessage = 'A dropdown menu item requires a valid value. This usually happens when a form is loading or when default values are missing.';
      }

      return (
        <div className="p-4 rounded-lg border border-muted">
          <Alert variant="error" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Something went wrong
            </AlertDescription>
          </Alert>
          
          <div className="bg-muted/50 p-4 rounded text-xs overflow-auto max-h-[200px] mb-4">
            <pre>{errorMessage}</pre>
          </div>
          
          <Button 
            onClick={this.handleRetry} 
            variant="outline" 
            className="w-full"
            type="button"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
          <a href="/support" className="block text-center text-sm text-blue-600 mt-2 underline">Contact Support</a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
