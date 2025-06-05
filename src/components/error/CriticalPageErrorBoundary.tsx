
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home, Bug, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  pageName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

export class CriticalPageErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: this.generateErrorId()
    };
  }

  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    
    console.group(`🚨 Critical Error in ${this.props.pageName || 'Page'}`);
    console.error("Error ID:", this.state.errorId);
    console.error("Error:", error);
    console.error("Component Stack:", errorInfo.componentStack);
    console.error("Error Info:", errorInfo);
    console.groupEnd();
    
    // Report to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      this.reportError(error, errorInfo);
    }
    
    toast.error("Critical Error Detected", {
      description: `An error occurred on ${this.props.pageName || 'this page'}. Error ID: ${this.state.errorId}`
    });
  }

  private reportError = async (error: Error, errorInfo: ErrorInfo) => {
    try {
      // This would integrate with your error reporting service
      const errorReport = {
        errorId: this.state.errorId,
        pageName: this.props.pageName,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      };
      
      console.log("Error report prepared:", errorReport);
      // await errorReportingService.report(errorReport);
    } catch (reportingError) {
      console.error("Failed to report error:", reportingError);
    }
  };

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: this.generateErrorId()
    });
  };

  handleReportIssue = () => {
    const errorDetails = {
      errorId: this.state.errorId,
      pageName: this.props.pageName,
      message: this.state.error?.message,
      url: window.location.href
    };
    
    const mailtoLink = `mailto:support@hawkly.app?subject=Error Report - ${this.state.errorId}&body=Error Details:%0A${encodeURIComponent(JSON.stringify(errorDetails, null, 2))}`;
    window.open(mailtoLink);
    
    toast.success("Error report prepared", {
      description: "Your email client should open with error details"
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-muted/30">
          <Card className="max-w-2xl w-full">
            <CardHeader className="text-center">
              <div className="rounded-full bg-red-100 p-4 mx-auto mb-4 w-fit">
                <AlertTriangle className="h-12 w-12 text-red-600" />
              </div>
              <CardTitle className="text-2xl">
                Critical Error on {this.props.pageName || 'Page'}
              </CardTitle>
              <CardDescription>
                We encountered an unexpected error. Our team has been automatically notified.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    <div className="font-medium">Error ID: {this.state.errorId}</div>
                    <div>{this.state.error?.message || "An unexpected error occurred"}</div>
                  </div>
                </AlertDescription>
              </Alert>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={this.handleRetry}
                  className="flex items-center gap-2 flex-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={this.handleReportIssue}
                  className="flex items-center gap-2 flex-1"
                >
                  <Bug className="h-4 w-4" />
                  Report Issue
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" asChild className="flex-1">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Go to Dashboard
                  </Link>
                </Button>
                
                <Button variant="outline" asChild className="flex-1">
                  <Link to="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                <details className="mt-6">
                  <summary className="cursor-pointer text-sm font-medium mb-2 text-left">
                    Developer Details (Development Only)
                  </summary>
                  <div className="text-left bg-muted p-4 rounded-md text-xs overflow-auto max-h-96 space-y-4">
                    <div>
                      <strong>Error Stack:</strong>
                      <pre className="mt-1 whitespace-pre-wrap">{this.state.error?.stack}</pre>
                    </div>
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="mt-1 whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                    </div>
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
