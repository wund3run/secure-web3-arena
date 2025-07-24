
import { useState, useEffect } from "react";
import LoadingTrivia from "@/components/ui/loading-trivia";
import { toast } from "sonner";
import { Loader2, AlertCircle } from "lucide-react";
import { handleError } from "@/utils/error-handling/index";

export function DashboardLoader() {
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [loadError, setLoadError] = useState<Error | null>(null);
  
  // Simulate checking for loading issues
  useEffect(() => {
    // Only show an error if we've tried loading multiple times
    if (loadAttempts > 2 && !loadError) {
      const error = new Error("Data loading is taking longer than expected");
      setLoadError(error);
      
      handleError(error, "dashboard-loader");
      
      // Auto-retry after a delay
      const retryTimer = setTimeout(() => {
        setLoadError(null);
        setLoadAttempts(0);
      }, 10000); // 10 seconds
      
      return () => clearTimeout(retryTimer);
    }
    
    // Track loading attempts
    const loadTimer = setTimeout(() => {
      setLoadAttempts(prev => prev + 1);
    }, 5000); // Every 5 seconds
    
    return () => clearTimeout(loadTimer);
  }, [loadAttempts, loadError]);
  
  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 p-4 rounded-md border border-destructive/20 bg-destructive/5">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <div className="text-center">
          <h3 className="font-medium text-destructive">Loading Error</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">
            We're having trouble loading your dashboard data. 
            The system will automatically retry.
          </p>
        </div>
        <button 
          onClick={() => {
            setLoadError(null);
            setLoadAttempts(0);
            toast.success("Retrying data load");
          }}
          className="text-sm text-primary underline underline-offset-4 hover:text-primary/70"
        >
          Retry Now
        </button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <img 
        src="/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
        alt="Hawkly Logo"
        className="h-12 w-12 object-contain bg-transparent animate-pulse mb-4"
        style={{ backgroundColor: 'transparent' }}
      />
      <LoadingTrivia 
        message={loadAttempts > 1 
          ? "Still loading dashboard data... this is taking longer than usual" 
          : "Loading dashboard data..."}
        size="md" 
      />
    </div>
  );
}
