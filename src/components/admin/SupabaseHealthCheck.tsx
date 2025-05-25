
import React, { useEffect, useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, AlertCircle, RefreshCw, Database, Users, Shield } from "lucide-react";
import { toast } from "sonner";

interface HealthCheckResult {
  name: string;
  status: 'success' | 'warning' | 'error';
  message: string;
  details?: string;
}

type TableName = 'profiles' | 'extended_profiles' | 'services' | 'audit_requests' | 'escrow_contracts';

export function SupabaseHealthCheck() {
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState<HealthCheckResult[]>([]);

  const performHealthCheck = async () => {
    setChecking(true);
    const checkResults: HealthCheckResult[] = [];
    
    try {
      // Test 1: Basic connection
      console.log("Testing basic Supabase connection...");
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('count(*)', { count: 'exact', head: true });
        
        if (error) throw error;
        
        checkResults.push({
          name: "Database Connection",
          status: 'success',
          message: "Successfully connected to Supabase",
          details: `Profiles table accessible`
        });
      } catch (err: any) {
        checkResults.push({
          name: "Database Connection",
          status: 'error',
          message: "Failed to connect to database",
          details: err.message
        });
      }

      // Test 2: Authentication system
      console.log("Testing authentication system...");
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        checkResults.push({
          name: "Authentication System",
          status: 'success',
          message: session ? "User session active" : "Authentication system functional",
          details: session ? `User: ${session.user.email}` : "No active session"
        });
      } catch (err: any) {
        checkResults.push({
          name: "Authentication System",
          status: 'error',
          message: "Authentication system error",
          details: err.message
        });
      }

      // Test 3: Table accessibility
      console.log("Testing table accessibility...");
      const tables: TableName[] = ['profiles', 'extended_profiles', 'services', 'audit_requests', 'escrow_contracts'];
      let accessibleTables = 0;
      
      for (const tableName of tables) {
        try {
          const { error } = await supabase
            .from(tableName)
            .select('count(*)', { count: 'exact', head: true });
          
          if (!error) accessibleTables++;
        } catch (err) {
          console.warn(`Table ${tableName} not accessible:`, err);
        }
      }
      
      checkResults.push({
        name: "Table Accessibility",
        status: accessibleTables === tables.length ? 'success' : 'warning',
        message: `${accessibleTables}/${tables.length} tables accessible`,
        details: `Tables: ${tables.join(', ')}`
      });

      // Test 4: Real-time capabilities
      console.log("Testing real-time capabilities...");
      try {
        const channel = supabase.channel('health-check-test');
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error('Timeout')), 5000);
          
          channel
            .on('presence', { event: 'sync' }, () => {
              clearTimeout(timeout);
              resolve(true);
            })
            .subscribe((status) => {
              if (status === 'SUBSCRIBED') {
                clearTimeout(timeout);
                resolve(true);
              }
            });
        });
        
        await supabase.removeChannel(channel);
        
        checkResults.push({
          name: "Real-time System",
          status: 'success',
          message: "Real-time subscriptions working",
          details: "Channel subscription successful"
        });
      } catch (err: any) {
        checkResults.push({
          name: "Real-time System",
          status: 'warning',
          message: "Real-time system may have issues",
          details: err.message
        });
      }

      setResults(checkResults);
      
      const hasErrors = checkResults.some(r => r.status === 'error');
      const hasWarnings = checkResults.some(r => r.status === 'warning');
      
      if (hasErrors) {
        toast.error("Health check completed with errors");
      } else if (hasWarnings) {
        toast.warning("Health check completed with warnings");
      } else {
        toast.success("All systems operational");
      }
      
    } catch (err: any) {
      console.error("Health check failed:", err);
      toast.error("Health check failed", { description: err.message });
    } finally {
      setChecking(false);
    }
  };
  
  useEffect(() => {
    performHealthCheck();
  }, []);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <RefreshCw className="h-5 w-5 animate-spin" />;
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <CardTitle>Supabase Health Check</CardTitle>
        </div>
        <Button 
          onClick={performHealthCheck}
          disabled={checking}
          size="sm"
          variant="outline"
        >
          {checking ? (
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Run Check
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {checking && (
          <Alert>
            <RefreshCw className="h-4 w-4 animate-spin" />
            <AlertTitle>Running comprehensive health check...</AlertTitle>
            <AlertDescription>
              Testing database connection, authentication, tables, and real-time features
            </AlertDescription>
          </Alert>
        )}
        
        {results.map((result, index) => (
          <Alert 
            key={index}
            className={
              result.status === 'success' ? 'border-green-200 bg-green-50' :
              result.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
              'border-red-200 bg-red-50'
            }
          >
            {getStatusIcon(result.status)}
            <AlertTitle className="flex items-center justify-between">
              {result.name}
              <span className={`text-xs px-2 py-1 rounded ${
                result.status === 'success' ? 'bg-green-100 text-green-800' :
                result.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {result.status.toUpperCase()}
              </span>
            </AlertTitle>
            <AlertDescription>
              <p>{result.message}</p>
              {result.details && (
                <p className="text-xs mt-1 opacity-70">{result.details}</p>
              )}
            </AlertDescription>
          </Alert>
        ))}
        
        {results.length === 0 && !checking && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No health check results</AlertTitle>
            <AlertDescription>
              Click "Run Check" to test all Supabase integrations
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default SupabaseHealthCheck;
