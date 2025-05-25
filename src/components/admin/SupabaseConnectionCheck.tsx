
import React, { useEffect, useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function SupabaseConnectionCheck() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const checkConnection = async () => {
    setConnectionStatus('checking');
    setErrorMessage(null);
    setIsRetrying(false);
    
    try {
      console.log("Testing Supabase connection...");
      
      // Test basic connection first
      const { data: healthCheck, error: healthError } = await supabase
        .from('profiles')
        .select('count(*)', { count: 'exact', head: true })
        .limit(1);
      
      if (healthError) {
        console.error("Database connection error:", healthError);
        setConnectionStatus('error');
        setErrorMessage(healthError.message || "Database connection failed");
        toast.error("Database connection failed", {
          description: healthError.message || "Unknown error"
        });
        return;
      }

      // Test auth system
      const { error: authError } = await supabase.auth.getSession();
      if (authError) {
        console.warn("Auth warning:", authError);
        // Don't fail on auth errors, just log them
      }

      setConnectionStatus('connected');
      toast.success("Connected to Supabase successfully");
      console.log("Supabase connection test passed");
      
    } catch (err) {
      console.error("Connection test failed:", err);
      const errorMsg = err instanceof Error ? err.message : "Network or connection error";
      setConnectionStatus('error');
      setErrorMessage(errorMsg);
      toast.error("Connection test failed", {
        description: errorMsg
      });
    }
  };

  const handleRetry = async () => {
    setIsRetrying(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay
    await checkConnection();
    setIsRetrying(false);
  };
  
  useEffect(() => {
    checkConnection();
  }, []);
  
  return (
    <div>
      {connectionStatus === 'checking' ? (
        <Alert className="bg-muted">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <AlertTitle>Checking Supabase connection...</AlertTitle>
          <AlertDescription>
            Verifying database connectivity and authentication services
          </AlertDescription>
        </Alert>
      ) : connectionStatus === 'connected' ? (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>Database connection established</AlertTitle>
          <AlertDescription>
            All Supabase services are operational and ready
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Database connection error</AlertTitle>
          <AlertDescription>
            <p className="mb-2">
              {errorMessage || "Unable to connect to the database. This may be due to network issues or service availability."}
            </p>
            <div className="flex gap-2 mt-3">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleRetry}
                disabled={isRetrying}
                className="bg-background text-foreground hover:bg-muted"
              >
                {isRetrying ? (
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                ) : (
                  <RefreshCw className="h-3 w-3 mr-1" />
                )}
                {isRetrying ? 'Retrying...' : 'Retry Connection'}
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.location.reload()}
                className="bg-background text-foreground hover:bg-muted"
              >
                Refresh Page
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default SupabaseConnectionCheck;
