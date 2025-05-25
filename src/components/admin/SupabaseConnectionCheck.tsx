
import React, { useEffect, useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function SupabaseConnectionCheck() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const checkConnection = async () => {
    setConnectionStatus('checking');
    setErrorMessage(null);
    
    try {
      // Simple query to test the connection
      const { data, error } = await supabase
        .from('profiles')
        .select('count(*)', { count: 'exact', head: true });
      
      if (error) {
        console.error("Supabase connection error:", error);
        setConnectionStatus('error');
        setErrorMessage(error.message);
        toast.error("Failed to connect to database");
      } else {
        setConnectionStatus('connected');
        toast.success("Connected to Supabase successfully");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setConnectionStatus('error');
      setErrorMessage(err instanceof Error ? err.message : "Unknown error occurred");
      toast.error("Unexpected error checking connection");
    }
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
            Verifying database connectivity for admin functions
          </AlertDescription>
        </Alert>
      ) : connectionStatus === 'connected' ? (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>Supabase connection established</AlertTitle>
          <AlertDescription>
            Database connection is active and ready for admin operations
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Database connection error</AlertTitle>
          <AlertDescription>
            <p>Could not connect to Supabase: {errorMessage}</p>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={checkConnection}
              className="mt-2 bg-background text-foreground"
            >
              <RefreshCw className="h-3 w-3 mr-1" /> Retry Connection
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default SupabaseConnectionCheck;
