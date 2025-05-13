
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { XCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || (
        <div className="p-6 max-w-md mx-auto animate-in fade-in duration-300">
          <Alert variant="destructive" className="mb-4 shadow-md">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>
              An unexpected error occurred in this component.
            </AlertDescription>
          </Alert>
          
          <div className="bg-muted/30 p-4 rounded-md mb-4 max-h-32 overflow-auto border border-border/40 shadow-inner">
            <p className="text-sm font-mono text-muted-foreground">
              {this.state.error?.toString()}
            </p>
          </div>
          
          <Button 
            onClick={this.handleReset}
            className="w-full group"
            variant="outline"
          >
            <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
