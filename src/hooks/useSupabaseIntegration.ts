
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ServiceHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'error';
  lastChecked: Date;
  responseTime?: number;
  errorMessage?: string;
}

export function useSupabaseIntegration() {
  const [services, setServices] = useState<ServiceHealth[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [overallHealth, setOverallHealth] = useState<'healthy' | 'degraded' | 'error'>('healthy');

  const checkService = async (name: string, checkFn: () => Promise<any>): Promise<ServiceHealth> => {
    const startTime = Date.now();
    
    try {
      await checkFn();
      const responseTime = Date.now() - startTime;
      
      return {
        name,
        status: 'healthy',
        lastChecked: new Date(),
        responseTime
      };
    } catch (error: any) {
      return {
        name,
        status: 'error',
        lastChecked: new Date(),
        errorMessage: error.message
      };
    }
  };

  const runHealthCheck = useCallback(async () => {
    setIsChecking(true);
    console.log('Starting comprehensive Supabase health check...');

    const healthChecks = [
      {
        name: 'Database Connection',
        check: () => supabase.from('profiles').select('count(*)', { count: 'exact', head: true })
      },
      {
        name: 'Authentication Service',
        check: () => supabase.auth.getSession()
      },
      {
        name: 'Real-time Subscriptions',
        check: async () => {
          const channel = supabase.channel('health-check');
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => reject(new Error('Timeout')), 3000);
            channel.subscribe((status) => {
              if (status === 'SUBSCRIBED') {
                clearTimeout(timeout);
                resolve(true);
              }
            });
          });
          await supabase.removeChannel(channel);
        }
      },
      {
        name: 'Extended Profiles Table',
        check: () => supabase.from('extended_profiles').select('count(*)', { count: 'exact', head: true })
      },
      {
        name: 'Services Table',
        check: () => supabase.from('services').select('count(*)', { count: 'exact', head: true })
      },
      {
        name: 'Audit Requests Table',
        check: () => supabase.from('audit_requests').select('count(*)', { count: 'exact', head: true })
      }
    ];

    const results = await Promise.all(
      healthChecks.map(({ name, check }) => checkService(name, check))
    );

    setServices(results);

    // Determine overall health
    const errorCount = results.filter(r => r.status === 'error').length;
    const degradedCount = results.filter(r => r.status === 'degraded').length;

    if (errorCount > 0) {
      setOverallHealth('error');
      toast.error(`${errorCount} service(s) experiencing issues`);
    } else if (degradedCount > 0) {
      setOverallHealth('degraded');
      toast.warning(`${degradedCount} service(s) degraded`);
    } else {
      setOverallHealth('healthy');
      toast.success('All Supabase services operational');
    }

    setIsChecking(false);
    console.log('Health check completed:', results);
  }, []);

  // Auto-run health check on mount and every 5 minutes
  useEffect(() => {
    runHealthCheck();
    const interval = setInterval(runHealthCheck, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [runHealthCheck]);

  return {
    services,
    isChecking,
    overallHealth,
    runHealthCheck
  };
}
