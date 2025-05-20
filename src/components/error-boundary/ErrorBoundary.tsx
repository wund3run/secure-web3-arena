
import React, { Component, ErrorInfo } from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // You can log the error to an error reporting service here
    console.error("Uncaught error:", error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="p-4 max-w-md mx-auto my-8">
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription className="mt-2">
              {this.state.error?.message || "An unexpected error occurred."}
            </AlertDescription>
          </Alert>
          
          <div className="mt-4 space-y-4">
            <Button onClick={this.resetErrorBoundary} variant="outline" className="mr-2">
              Try Again
            </Button>
            <Button onClick={() => window.location.href = "/"} variant="default">
              Go Home
            </Button>
          </div>
          
          {process.env.NODE_ENV !== 'production' && this.state.errorInfo && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md overflow-auto max-h-96 text-xs">
              <details>
                <summary className="cursor-pointer font-medium mb-2">Error Details (Developers Only)</summary>
                <pre>{this.state.error?.toString()}</pre>
                <pre>{this.state.errorInfo.componentStack}</pre>
              </details>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
