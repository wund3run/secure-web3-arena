
import React, { useEffect, useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, AlertCircle, RefreshCw, Database } from "lucide-react";
import { toast } from "sonner";

interface ConnectionHealth {
  database: boolean;
  realtime: boolean;
  auth: boolean;
}

export function SupabaseConnectionCheck() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [healthDetails, setHealthDetails] = useState<ConnectionHealth>({
    database: false,
    realtime: false,
    auth: false
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const checkConnection = async () => {
    setConnectionStatus('checking');
    setErrorMessage(null);
    setIsRetrying(true);
    
    const health: ConnectionHealth = {
      database: false,
      realtime: false,
      auth: false
    };
    
    try {
      // Test database connection with a simple query
      console.log("Testing database connection...");
      const { data: dbTest, error: dbError } = await supabase
        .from('profiles')
        .select('count(*)', { count: 'exact', head: true });
      
      if (!dbError) {
        health.database = true;
        console.log("Database connection successful");
      } else {
        console.error("Database connection failed:", dbError);
        throw new Error(`Database: ${dbError.message}`);
      }

      // Test auth system
      console.log("Testing auth system...");
      const { data: authTest, error: authError } = await supabase.auth.getSession();
      if (!authError) {
        health.auth = true;
        console.log("Auth system operational");
      } else {
        console.warn("Auth system issue:", authError);
      }

      // Test realtime connection
      console.log("Testing realtime connection...");
      const realtimeStatus = supabase.realtime.isConnected();
      health.realtime = realtimeStatus;
      
      setHealthDetails(health);
      
      if (health.database && health.auth) {
        setConnectionStatus('connected');
        toast.success("Supabase connection established successfully");
      } else {
        setConnectionStatus('error');
        setErrorMessage("Some services are not responding properly");
      }
      
    } catch (err) {
      console.error("Connection check failed:", err);
      setConnectionStatus('error');
      setHealthDetails(health);
      const message = err instanceof Error ? err.message : "Unknown connection error";
      setErrorMessage(message);
      toast.error("Connection check failed", { description: message });
    } finally {
      setIsRetrying(false);
    }
  };
  
  useEffect(() => {
    checkConnection();
    
    // Set up periodic health checks every 30 seconds
    const interval = setInterval(() => {
      if (!isRetrying) {
        checkConnection();
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getStatusDisplay = () => {
    if (connectionStatus === 'checking') {
      return (
        <Alert className="bg-muted border-muted-foreground/20">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <AlertTitle>Checking Supabase connection...</AlertTitle>
          <AlertDescription>
            Verifying database, authentication, and real-time services
          </AlertDescription>
        </Alert>
      );
    }
    
    if (connectionStatus === 'connected') {
      return (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>All systems operational</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>Supabase services are running normally</p>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1">
                <Database className="h-3 w-3" />
                Database: {healthDetails.database ? '✓' : '✗'}
              </span>
              <span>Auth: {healthDetails.auth ? '✓' : '✗'}</span>
              <span>Realtime: {healthDetails.realtime ? '✓' : '✗'}</span>
            </div>
          </AlertDescription>
        </Alert>
      );
    }
    
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Connection issues detected</AlertTitle>
        <AlertDescription className="space-y-3">
          <p>Error: {errorMessage}</p>
          <div className="flex gap-4 text-xs">
            <span>Database: {healthDetails.database ? '✓' : '✗'}</span>
            <span>Auth: {healthDetails.auth ? '✓' : '✗'}</span>
            <span>Realtime: {healthDetails.realtime ? '✓' : '✗'}</span>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={checkConnection}
            disabled={isRetrying}
            className="mt-2 bg-background text-foreground"
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Retrying...' : 'Retry Connection'}
          </Button>
        </AlertDescription>
      </Alert>
    );
  };
  
  return <div>{getStatusDisplay()}</div>;
}

export default SupabaseConnectionCheck;
