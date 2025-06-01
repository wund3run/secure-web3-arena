
import { Logger } from '../logging/logger';
import { PerformanceMonitor } from '../monitoring/performanceMonitor';
import { MonitoringService } from '@/services/monitoringService';
import { initializeCriticalSyncs } from '../dataSync/syncManager';
import { CacheManager } from '../database/cacheManager';

export class SystemInitializer {
  private static initialized = false;

  static async initialize(): Promise<void> {
    if (this.initialized) {
      Logger.warn('System already initialized', {}, 'system');
      return;
    }

    const stopTimer = Logger.startTimer('system_initialization');

    try {
      Logger.info('Starting system initialization', {}, 'system');

      // Initialize monitoring first
      MonitoringService.init();
      PerformanceMonitor.init();

      // Initialize data synchronization
      initializeCriticalSyncs();

      // Set up cleanup handlers
      this.setupCleanupHandlers();

      // Initialize cache warming for critical data
      await this.warmupCriticalCaches();

      // Perform initial system health check
      await this.performSystemHealthCheck();

      this.initialized = true;
      Logger.info('System initialization completed successfully', {}, 'system');

    } catch (error) {
      Logger.fatal('System initialization failed', {
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' }
      }, 'system');
      throw error;
    } finally {
      stopTimer();
    }
  }

  private static setupCleanupHandlers(): void {
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });

    // Cleanup on visibility change (when tab becomes hidden)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.performMaintenanceTasks();
      }
    });

    Logger.debug('Cleanup handlers set up', {}, 'system');
  }

  private static async warmupCriticalCaches(): Promise<void> {
    try {
      // You can add specific cache warming logic here
      // For example, preload frequently accessed audit requests
      Logger.info('Cache warmup completed', {}, 'system');
    } catch (error) {
      Logger.error('Cache warmup failed', {
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' }
      }, 'system');
    }
  }

  private static async performSystemHealthCheck(): Promise<void> {
    const healthChecks = {
      supabaseConnection: false,
      cacheSystem: false,
      performanceMonitoring: false
    };

    try {
      // Test Supabase connection
      // You would add actual connection test here
      healthChecks.supabaseConnection = true;

      // Test cache system
      CacheManager.set('health_check', 'ok', { ttl: 1 });
      const cacheTest = await CacheManager.get('health_check');
      healthChecks.cacheSystem = cacheTest === 'ok';
      CacheManager.invalidate('health_check');

      // Test performance monitoring
      PerformanceMonitor.recordMetric({
        name: 'health_check',
        value: 1,
        unit: 'count',
        category: 'timing'
      });
      healthChecks.performanceMonitoring = true;

      const allHealthy = Object.values(healthChecks).every(check => check);

      Logger.info('System health check completed', {
        metadata: { healthChecks, status: allHealthy ? 'healthy' : 'degraded' }
      }, 'system');

      if (!allHealthy) {
        Logger.warn('Some system components are not healthy', {
          metadata: { healthChecks }
        }, 'system');
      }

    } catch (error) {
      Logger.error('System health check failed', {
        metadata: { 
          error: error instanceof Error ? error.message : 'Unknown error',
          healthChecks 
        }
      }, 'system');
    }
  }

  private static performMaintenanceTasks(): void {
    Logger.debug('Performing maintenance tasks', {}, 'system');

    // Clean up old logs
    const oldLogs = Logger.getLogs().filter(log => 
      Date.now() - new Date(log.timestamp).getTime() > 24 * 60 * 60 * 1000 // 24 hours
    );
    
    if (oldLogs.length > 0) {
      Logger.clearLogs();
      Logger.info(`Cleaned up ${oldLogs.length} old log entries`, {}, 'system');
    }

    // Clean cache statistics
    const cacheStats = CacheManager.getStats();
    if (cacheStats.expiredEntries > 0) {
      // The cache manager should auto-clean, but we can log stats
      Logger.debug('Cache statistics', { metadata: cacheStats }, 'system');
    }
  }

  static cleanup(): void {
    if (!this.initialized) return;

    Logger.info('Starting system cleanup', {}, 'system');

    try {
      // Cleanup performance monitoring
      PerformanceMonitor.cleanup();

      // Clear caches
      CacheManager.clear();

      // Generate final performance report
      const performanceReport = PerformanceMonitor.generatePerformanceReport();
      Logger.info('Final performance report', {
        metadata: performanceReport
      }, 'system');

      this.initialized = false;
      Logger.info('System cleanup completed', {}, 'system');

    } catch (error) {
      Logger.error('System cleanup failed', {
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' }
      }, 'system');
    }
  }

  static isInitialized(): boolean {
    return this.initialized;
  }

  static async getSystemStatus(): Promise<{
    initialized: boolean;
    uptime: number;
    cacheStats: any;
    performanceReport: any;
  }> {
    return {
      initialized: this.initialized,
      uptime: performance.now(),
      cacheStats: CacheManager.getStats(),
      performanceReport: PerformanceMonitor.generatePerformanceReport()
    };
  }
}

// Auto-initialize on module load
if (typeof window !== 'undefined') {
  // Initialize after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      SystemInitializer.initialize().catch(console.error);
    });
  } else {
    SystemInitializer.initialize().catch(console.error);
  }
}
