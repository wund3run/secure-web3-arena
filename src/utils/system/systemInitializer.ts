
import { Logger } from '../logging/logger';
import { PerformanceMonitor } from '../monitoring/performanceMonitor';
import { MonitoringService } from '@/services/monitoringService';
import { initializeCriticalSyncs } from '../dataSync/syncManager';
import { HealthChecker } from './healthChecker';
import { MaintenanceManager } from './maintenanceManager';

export class SystemInitializer {
  private static initialized = false;

  static async initialize(): Promise<void> {
    if (this.initialized) {
      Logger.warn('System already initialized', { category: 'system' });
      return;
    }

    const stopTimer = Logger.startTimer('system_initialization');

    try {
      Logger.info('Starting system initialization', { category: 'system' });

      // Initialize core monitoring systems
      await this.initializeMonitoring();

      // Initialize data synchronization
      await this.initializeDataSync();

      // Set up system maintenance
      this.setupMaintenance();

      // Perform initial health check
      await this.performInitialHealthCheck();

      this.initialized = true;
      Logger.info('System initialization completed successfully', { category: 'system' });

    } catch (error) {
      Logger.fatal('System initialization failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        category: 'system'
      });
      throw error;
    } finally {
      stopTimer();
    }
  }

  private static async initializeMonitoring(): Promise<void> {
    MonitoringService.init();
    PerformanceMonitor.init();
    Logger.info('Monitoring systems initialized', { category: 'system' });
  }

  private static async initializeDataSync(): Promise<void> {
    initializeCriticalSyncs();
    Logger.info('Data synchronization initialized', { category: 'system' });
  }

  private static setupMaintenance(): void {
    // Set up cleanup handlers
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });

    // Start periodic maintenance (every 30 minutes)
    MaintenanceManager.startPeriodicMaintenance();

    // Maintenance on visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        MaintenanceManager.performMaintenance();
      }
    });

    Logger.info('Maintenance systems set up', { category: 'system' });
  }

  private static async performInitialHealthCheck(): Promise<void> {
    const { overall, results } = await HealthChecker.performComprehensiveCheck();
    
    if (overall !== 'healthy') {
      Logger.warn('System health check shows issues', {
        overall, 
        issues: results.filter(r => r.status !== 'healthy'),
        category: 'system'
      });
    }
  }

  static cleanup(): void {
    if (!this.initialized) return;

    Logger.info('Starting system cleanup', { category: 'system' });

    try {
      // Stop maintenance
      MaintenanceManager.stopPeriodicMaintenance();

      // Cleanup monitoring
      PerformanceMonitor.cleanup();

      // Generate final reports
      const performanceReport = PerformanceMonitor.generatePerformanceReport();
      Logger.info('Final performance report', {
        ...performanceReport,
        category: 'system'
      });

      this.initialized = false;
      Logger.info('System cleanup completed', { category: 'system' });

    } catch (error) {
      Logger.error('System cleanup failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        category: 'system'
      });
    }
  }

  static isInitialized(): boolean {
    return this.initialized;
  }

  static async getSystemStatus(): Promise<{
    initialized: boolean;
    uptime: number;
    health: any;
  }> {
    const health = this.initialized 
      ? await HealthChecker.performComprehensiveCheck()
      : { overall: 'not_initialized', results: [] };

    return {
      initialized: this.initialized,
      uptime: performance.now(),
      health
    };
  }
}

// Auto-initialize on module load
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      SystemInitializer.initialize().catch(console.error);
    });
  } else {
    SystemInitializer.initialize().catch(console.error);
  }
}
