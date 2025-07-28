import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { MonitoringService } from '@/services/monitoringService';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ProductionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
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
    console.error("Production Error Boundary caught an error:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    toast.error("An unexpected error occurred", {
      description: "We've been notified and are working to fix this issue.",
      action: {
        label: "Contact Support",
        onClick: () => window.open('/support', '_blank')
      }
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null
    });
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center">
          <div className="rounded-full bg-red-100 p-4 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <Alert variant="error" className="max-w-md mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              We encountered an unexpected error. Our team has been notified.
            </AlertDescription>
          </Alert>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={this.handleReset} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" asChild>
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <a href="/support" className="block text-center text-sm text-blue-600 mt-2 underline">Contact Support</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
