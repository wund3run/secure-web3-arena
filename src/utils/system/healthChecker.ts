
import { supabase } from '@/integrations/supabase/client';
import { Logger } from '../logging/logger';

interface HealthCheckResult {
  service: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime: number;
  details?: string;
}

export class HealthChecker {
  static async performComprehensiveCheck(): Promise<{
    overall: 'healthy' | 'degraded' | 'unhealthy';
    results: HealthCheckResult[];
  }> {
    const checks = [
      this.checkDatabase(),
      this.checkAuth(),
      this.checkAPI(),
      this.checkStorage(),
      this.checkRealtime()
    ];

    const results = await Promise.all(checks);
    const overall = this.calculateOverallHealth(results);

    Logger.info('Health check completed', {
      metadata: { overall, unhealthyServices: results.filter(r => r.status !== 'healthy').length }
    }, 'health');

    return { overall, results };
  }

  private static async checkDatabase(): Promise<HealthCheckResult> {
    const startTime = performance.now();
    
    try {
      const { error } = await supabase
        .from('extended_profiles')
        .select('id')
        .limit(1);

      const responseTime = performance.now() - startTime;

      if (error) {
        return {
          service: 'database',
          status: 'unhealthy',
          responseTime,
          details: error.message
        };
      }

      return {
        service: 'database',
        status: responseTime < 500 ? 'healthy' : 'degraded',
        responseTime
      };
    } catch (error) {
      return {
        service: 'database',
        status: 'unhealthy',
        responseTime: performance.now() - startTime,
        details: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private static async checkAuth(): Promise<HealthCheckResult> {
    const startTime = performance.now();
    
    try {
      const { data, error } = await supabase.auth.getSession();
      const responseTime = performance.now() - startTime;

      if (error) {
        return {
          service: 'authentication',
          status: 'degraded',
          responseTime,
          details: error.message
        };
      }

      return {
        service: 'authentication',
        status: 'healthy',
        responseTime
      };
    } catch (error) {
      return {
        service: 'authentication',
        status: 'unhealthy',
        responseTime: performance.now() - startTime,
        details: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private static async checkAPI(): Promise<HealthCheckResult> {
    const startTime = performance.now();
    
    try {
      // Test a simple API call
      const response = await fetch('/api/health', { method: 'HEAD' });
      const responseTime = performance.now() - startTime;

      if (!response.ok && response.status !== 404) {
        return {
          service: 'api',
          status: 'degraded',
          responseTime,
          details: `HTTP ${response.status}`
        };
      }

      return {
        service: 'api',
        status: responseTime < 1000 ? 'healthy' : 'degraded',
        responseTime
      };
    } catch (error) {
      return {
        service: 'api',
        status: 'unhealthy',
        responseTime: performance.now() - startTime,
        details: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  private static async checkStorage(): Promise<HealthCheckResult> {
    const startTime = performance.now();
    
    try {
      // Test storage connectivity
      const { data, error } = await supabase.storage.listBuckets();
      const responseTime = performance.now() - startTime;

      if (error) {
        return {
          service: 'storage',
          status: 'degraded',
          responseTime,
          details: error.message
        };
      }

      return {
        service: 'storage',
        status: 'healthy',
        responseTime
      };
    } catch (error) {
      return {
        service: 'storage',
        status: 'unhealthy',
        responseTime: performance.now() - startTime,
        details: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private static async checkRealtime(): Promise<HealthCheckResult> {
    const startTime = performance.now();
    
    try {
      // Test realtime connection
      const channel = supabase.channel('health-check');
      const responseTime = performance.now() - startTime;

      await new Promise<void>((resolve) => {
        channel.subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            resolve();
          }
        });
        
        // Timeout after 5 seconds
        setTimeout(resolve, 5000);
      });

      supabase.removeChannel(channel);

      return {
        service: 'realtime',
        status: responseTime < 2000 ? 'healthy' : 'degraded',
        responseTime
      };
    } catch (error) {
      return {
        service: 'realtime',
        status: 'unhealthy',
        responseTime: performance.now() - startTime,
        details: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private static calculateOverallHealth(results: HealthCheckResult[]): 'healthy' | 'degraded' | 'unhealthy' {
    const unhealthyCount = results.filter(r => r.status === 'unhealthy').length;
    const degradedCount = results.filter(r => r.status === 'degraded').length;

    if (unhealthyCount > 0) return 'unhealthy';
    if (degradedCount > 1) return 'degraded';
    if (degradedCount > 0) return 'degraded';
    return 'healthy';
  }
}
