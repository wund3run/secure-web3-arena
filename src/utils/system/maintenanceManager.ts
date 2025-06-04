
import { Logger } from '../logging/logger';
import { CacheManager } from '../database/cacheManager';
import { PerformanceMonitor } from '../monitoring/performanceMonitor';

export class MaintenanceManager {
  private static maintenanceInterval: NodeJS.Timeout | null = null;

  static startPeriodicMaintenance(intervalMs: number = 30 * 60 * 1000): void {
    if (this.maintenanceInterval) {
      clearInterval(this.maintenanceInterval);
    }

    this.maintenanceInterval = setInterval(() => {
      this.performMaintenance();
    }, intervalMs);

    Logger.info('Periodic maintenance started', {
      intervalMs,
      category: 'system'
    });
  }

  static stopPeriodicMaintenance(): void {
    if (this.maintenanceInterval) {
      clearInterval(this.maintenanceInterval);
      this.maintenanceInterval = null;
      Logger.info('Periodic maintenance stopped', { category: 'system' });
    }
  }

  static performMaintenance(): void {
    Logger.debug('Starting maintenance tasks', { category: 'system' });

    try {
      // Clean old logs
      this.cleanOldLogs();

      // Generate cache statistics
      this.logCacheStatistics();

      // Generate performance report
      this.generatePerformanceReport();

      Logger.info('Maintenance tasks completed', { category: 'system' });
    } catch (error) {
      Logger.error('Maintenance tasks failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        category: 'system'
      });
    }
  }

  private static cleanOldLogs(): void {
    const oneDayAgo = 24 * 60 * 60 * 1000;
    const oldLogs = Logger.getLogs().filter(log => 
      Date.now() - new Date(log.timestamp).getTime() > oneDayAgo
    );
    
    if (oldLogs.length > 100) { // Only clean if there are many old logs
      Logger.clearLogs();
      Logger.info(`Cleaned up ${oldLogs.length} old log entries`, { category: 'system' });
    }
  }

  private static logCacheStatistics(): void {
    const cacheStats = CacheManager.getStats();
    Logger.debug('Cache statistics', { 
      ...cacheStats,
      category: 'system'
    });
  }

  private static generatePerformanceReport(): void {
    const performanceReport = PerformanceMonitor.generatePerformanceReport();
    
    if (performanceReport.summary.significantIssues > 0) {
      Logger.warn('Performance issues detected', {
        ...performanceReport,
        category: 'system'
      });
    } else {
      Logger.debug('Performance report generated', {
        totalMetrics: performanceReport.summary.totalMetrics,
        recommendations: performanceReport.recommendations.length,
        category: 'system'
      });
    }
  }
}
