
import { Logger } from '../logging/logger';
import { CacheManager } from '../database/cacheManager';

export interface HealthCheckResult {
  component: string;
  status: 'healthy' | 'warning' | 'error';
  message: string;
  responseTime?: number;
  metadata?: Record<string, any>;
}

export class HealthChecker {
  static async performComprehensiveCheck(): Promise<{
    overall: 'healthy' | 'warning' | 'error';
    results: HealthCheckResult[];
  }> {
    const results: HealthCheckResult[] = [];

    // Check cache system
    results.push(await this.checkCacheSystem());
    
    // Check memory usage
    results.push(await this.checkMemoryUsage());
    
    // Check performance metrics
    results.push(await this.checkPerformanceMetrics());
    
    // Check local storage
    results.push(await this.checkLocalStorage());

    // Determine overall health
    const hasError = results.some(r => r.status === 'error');
    const hasWarning = results.some(r => r.status === 'warning');
    
    const overall = hasError ? 'error' : hasWarning ? 'warning' : 'healthy';

    Logger.info('Health check completed', {
      overall,
      metadata: { 
        totalChecks: results.length,
        errors: results.filter(r => r.status === 'error').length,
        warnings: results.filter(r => r.status === 'warning').length
      }
    }, 'health');

    return { overall, results };
  }

  private static async checkCacheSystem(): Promise<HealthCheckResult> {
    const startTime = performance.now();
    
    try {
      const stats = CacheManager.getStats();
      const responseTime = performance.now() - startTime;
      
      const status = stats.activeEntries > 100 ? 'warning' : 'healthy';
      
      return {
        component: 'cache_system',
        status,
        message: `Cache system operational with ${stats.activeEntries} active entries`,
        responseTime,
        metadata: stats
      };
    } catch (error) {
      return {
        component: 'cache_system',
        status: 'error',
        message: 'Cache system check failed',
        responseTime: performance.now() - startTime,
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' }
      };
    }
  }

  private static async checkMemoryUsage(): Promise<HealthCheckResult> {
    const startTime = performance.now();
    
    try {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedMB = memory.usedJSHeapSize / 1024 / 1024;
        const totalMB = memory.totalJSHeapSize / 1024 / 1024;
        const limitMB = memory.jsHeapSizeLimit / 1024 / 1024;
        
        const usagePercent = (usedMB / limitMB) * 100;
        const status = usagePercent > 80 ? 'error' : usagePercent > 60 ? 'warning' : 'healthy';
        
        return {
          component: 'memory_usage',
          status,
          message: `Memory usage: ${usedMB.toFixed(1)}MB (${usagePercent.toFixed(1)}%)`,
          responseTime: performance.now() - startTime,
          metadata: { usedMB, totalMB, limitMB, usagePercent }
        };
      } else {
        return {
          component: 'memory_usage',
          status: 'warning',
          message: 'Memory API not available',
          responseTime: performance.now() - startTime
        };
      }
    } catch (error) {
      return {
        component: 'memory_usage',
        status: 'error',
        message: 'Memory check failed',
        responseTime: performance.now() - startTime,
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' }
      };
    }
  }

  private static async checkPerformanceMetrics(): Promise<HealthCheckResult> {
    const startTime = performance.now();
    
    try {
      // Simple performance check
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigationTiming) {
        const loadTime = navigationTiming.loadEventEnd - navigationTiming.fetchStart;
        const status = loadTime > 5000 ? 'error' : loadTime > 3000 ? 'warning' : 'healthy';
        
        return {
          component: 'performance_metrics',
          status,
          message: `Page load time: ${loadTime.toFixed(0)}ms`,
          responseTime: performance.now() - startTime,
          metadata: { loadTime }
        };
      } else {
        return {
          component: 'performance_metrics',
          status: 'healthy',
          message: 'Performance metrics not yet available',
          responseTime: performance.now() - startTime
        };
      }
    } catch (error) {
      return {
        component: 'performance_metrics',
        status: 'error',
        message: 'Performance metrics check failed',
        responseTime: performance.now() - startTime,
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' }
      };
    }
  }

  private static async checkLocalStorage(): Promise<HealthCheckResult> {
    const startTime = performance.now();
    
    try {
      const testKey = 'health_check_test';
      const testValue = 'test_data';
      
      localStorage.setItem(testKey, testValue);
      const retrieved = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);
      
      const status = retrieved === testValue ? 'healthy' : 'error';
      
      return {
        component: 'local_storage',
        status,
        message: status === 'healthy' ? 'Local storage operational' : 'Local storage test failed',
        responseTime: performance.now() - startTime
      };
    } catch (error) {
      return {
        component: 'local_storage',
        status: 'error',
        message: 'Local storage access failed',
        responseTime: performance.now() - startTime,
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' }
      };
    }
  }
}
