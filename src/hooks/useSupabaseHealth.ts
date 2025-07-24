
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface HealthMetrics {
  connectionStatus: 'connected' | 'disconnected' | 'checking';
  authStatus: 'authenticated' | 'unauthenticated' | 'checking';
  lastChecked: Date | null;
  errorCount: number;
  responseTime: number | null;
}

export function useSupabaseHealth() {
  const [metrics, setMetrics] = useState<HealthMetrics>({
    connectionStatus: 'checking',
    authStatus: 'checking',
    lastChecked: null,
    errorCount: 0,
    responseTime: null
  });

  const checkHealth = useCallback(async () => {
    const startTime = Date.now();
    
    try {
      console.log("Performing Supabase health check...");
      
      // Test database connection
      const { error: dbError } = await supabase
        .from('profiles')
        .select('count(*)', { count: 'exact', head: true });
      
      const responseTime = Date.now() - startTime;
      
      // Test auth status
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      setMetrics({
        connectionStatus: dbError ? 'disconnected' : 'connected',
        authStatus: authError ? 'unauthenticated' : (session ? 'authenticated' : 'unauthenticated'),
        lastChecked: new Date(),
        errorCount: (dbError ? 1 : 0) + (authError ? 1 : 0),
        responseTime
      });
      
      if (dbError || authError) {
        console.error("Health check errors:", { dbError, authError });
      } else {
        console.log("Health check passed", { responseTime });
      }
      
    } catch (error: unknown) {
      console.error("Health check failed:", error);
      setMetrics({
        connectionStatus: 'disconnected',
        authStatus: 'unauthenticated',
        lastChecked: new Date(),
        errorCount: 1,
        responseTime: null
      });
    }
  }, []);

  // Auto health check on mount and periodically
  useEffect(() => {
    checkHealth();
    
    // Check health every 5 minutes
    const interval = setInterval(checkHealth, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [checkHealth]);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        setMetrics(prev => ({
          ...prev,
          authStatus: session ? 'authenticated' : 'unauthenticated'
        }));
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return {
    metrics,
    checkHealth,
    isHealthy: metrics.connectionStatus === 'connected' && metrics.errorCount === 0
  };
}
