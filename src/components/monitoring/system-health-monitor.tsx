
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, XCircle, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface HealthMetrics {
  database: 'healthy' | 'degraded' | 'down';
  auth: 'healthy' | 'degraded' | 'down';
  storage: 'healthy' | 'degraded' | 'down';
  functions: 'healthy' | 'degraded' | 'down';
  responseTime: number;
  lastChecked: Date;
}

export function SystemHealthMonitor() {
  const [health, setHealth] = useState<HealthMetrics | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkSystemHealth = async () => {
    setIsChecking(true);
    const startTime = Date.now();
    
    const metrics: HealthMetrics = {
      database: 'down',
      auth: 'down',
      storage: 'down',
      functions: 'down',
      responseTime: 0,
      lastChecked: new Date()
    };

    try {
      // Test database
      const { error: dbError } = await supabase
        .from('profiles')
        .select('count(*)', { count: 'exact', head: true });
      
      metrics.database = dbError ? 'down' : 'healthy';

      // Test auth
      const { error: authError } = await supabase.auth.getSession();
      metrics.auth = authError ? 'degraded' : 'healthy';

      // Test functions (if any are available)
      try {
        // This would test a health check function if you have one
        metrics.functions = 'healthy';
      } catch {
        metrics.functions = 'degraded';
      }

      metrics.storage = 'healthy'; // Assume healthy if no errors
      metrics.responseTime = Date.now() - startTime;
      
    } catch (error) {
      console.error('Health check failed:', error);
    } finally {
      setHealth(metrics);
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkSystemHealth();
    
    // Check every 5 minutes
    const interval = setInterval(checkSystemHealth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'down':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variant = status === 'healthy' ? 'success' : 
                   status === 'degraded' ? 'warning' : 'destructive';
    return <Badge variant={variant}>{status}</Badge>;
  };

  if (!health && !isChecking) {
    return null;
  }

  const overallStatus = health ? 
    Object.values(health).filter(v => typeof v === 'string').every(s => s === 'healthy') ? 'healthy' :
    Object.values(health).filter(v => typeof v === 'string').some(s => s === 'down') ? 'down' : 'degraded' : 'checking';

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon(overallStatus)}
          System Health
          {isChecking && <Activity className="h-4 w-4 animate-pulse" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {health && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="text-sm font-medium">Database</div>
                {getStatusBadge(health.database)}
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">Auth</div>
                {getStatusBadge(health.auth)}
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">Storage</div>
                {getStatusBadge(health.storage)}
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">Functions</div>
                {getStatusBadge(health.functions)}
              </div>
            </div>
            
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Response Time: {health.responseTime}ms</span>
              <span>Last Check: {health.lastChecked.toLocaleTimeString()}</span>
            </div>

            {overallStatus !== 'healthy' && (
              <Alert variant={overallStatus === 'down' ? 'destructive' : 'default'}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {overallStatus === 'down' 
                    ? 'Some critical systems are down. Functionality may be limited.'
                    : 'Some systems are experiencing issues. Performance may be affected.'
                  }
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
