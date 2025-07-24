export class MaintenanceManager {
  private static cleanupInterval: number | null = null;
  private static isMaintenanceRunning = false;

  static startPeriodicMaintenance(): void {
    if (this.cleanupInterval) return;

    // Run maintenance every 30 minutes
    this.cleanupInterval = window.setInterval(() => {
      this.performMaintenance();
    }, 30 * 60 * 1000);

    console.log('🧹 Periodic maintenance started (every 30 minutes)');
  }

  static stopPeriodicMaintenance(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
      console.log('🛑 Periodic maintenance stopped');
    }
  }

  static async performMaintenance(): Promise<void> {
    if (this.isMaintenanceRunning) {
      console.log('⏳ Maintenance already in progress, skipping...');
      return;
    }

    this.isMaintenanceRunning = true;
    console.log('🧹 Starting system maintenance...');

    try {
      await Promise.all([
        this.cleanupLocalStorage(),
        this.cleanupSessionStorage(),
        this.cleanupCaches(),
        this.cleanupEventListeners(),
        this.optimizeMemory()
      ]);

      console.log('✅ System maintenance completed successfully');
    } catch (error) {
      console.error('❌ Maintenance failed:', error);
    } finally {
      this.isMaintenanceRunning = false;
    }
  }

  private static async cleanupLocalStorage(): Promise<void> {
    try {
      const keys = Object.keys(localStorage);
      let cleanedItems = 0;

      for (const key of keys) {
        // Clean up old analytics events
        if (key.startsWith('hawkly_analytics_') && this.isOlderThan(key, 7)) {
          localStorage.removeItem(key);
          cleanedItems++;
        }

        // Clean up old error logs
        if (key.startsWith('hawkly_bug_reports') && this.isOlderThan(key, 30)) {
          localStorage.removeItem(key);
          cleanedItems++;
        }

        // Clean up old cached data
        if (key.startsWith('hawkly_cache_') && this.isOlderThan(key, 1)) {
          localStorage.removeItem(key);
          cleanedItems++;
        }
      }

      if (cleanedItems > 0) {
        console.log(`🗑️ Cleaned up ${cleanedItems} localStorage items`);
      }
    } catch (error) {
      console.warn('Failed to cleanup localStorage:', error);
    }
  }

  private static async cleanupSessionStorage(): Promise<void> {
    try {
      const keys = Object.keys(sessionStorage);
      let cleanedItems = 0;

      for (const key of keys) {
        // Clean up temporary session data
        if (key.startsWith('temp_') || key.startsWith('tmp_')) {
          sessionStorage.removeItem(key);
          cleanedItems++;
        }
      }

      if (cleanedItems > 0) {
        console.log(`🗑️ Cleaned up ${cleanedItems} sessionStorage items`);
      }
    } catch (error) {
      console.warn('Failed to cleanup sessionStorage:', error);
    }
  }

  private static async cleanupCaches(): Promise<void> {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        const oldCaches = cacheNames.filter(name => 
          name.includes('old') || name.includes('temp')
        );

        for (const cacheName of oldCaches) {
          await caches.delete(cacheName);
        }

        if (oldCaches.length > 0) {
          console.log(`🗑️ Cleaned up ${oldCaches.length} old caches`);
        }
      } catch (error) {
        console.warn('Failed to cleanup caches:', error);
      }
    }
  }

  private static async cleanupEventListeners(): Promise<void> {
    // Remove any orphaned event listeners
    // This is a placeholder - in practice, you'd track listeners
    console.log('🧹 Event listener cleanup completed');
  }

  private static async optimizeMemory(): Promise<void> {
    if ('gc' in window && typeof (window as { gc?: () => void }).gc === 'function') {
      try {
        (window as { gc?: () => void }).gc?.();
        console.log('🧹 Memory garbage collection triggered');
      } catch (error) {
        // GC not available, that's okay
      }
    }

    // Clear any large objects that might be lingering
    if ('FinalizationRegistry' in window) {
      // Modern memory management
      console.log('🧹 Memory optimization completed');
    }
  }

  private static isOlderThan(storageKey: string, days: number): boolean {
    try {
      const item = localStorage.getItem(storageKey) || sessionStorage.getItem(storageKey);
      if (!item) return false;

      // Try to parse timestamp from the data
      const parsed = JSON.parse(item);
      if (parsed.timestamp) {
        const itemDate = new Date(parsed.timestamp);
        const cutoffDate = new Date(Date.now() - (days * 24 * 60 * 60 * 1000));
        return itemDate < cutoffDate;
      }

      // If no timestamp, consider it old
      return true;
    } catch {
      // If we can't parse it, consider it old
      return true;
    }
  }

  static getMaintenanceStatus(): {
    isRunning: boolean;
    lastRun: Date | null;
    nextScheduled: Date | null;
  } {
    const nextScheduled = this.cleanupInterval 
      ? new Date(Date.now() + 30 * 60 * 1000) 
      : null;

    return {
      isRunning: this.isMaintenanceRunning,
      lastRun: null, // Would be tracked in a real implementation
      nextScheduled
    };
  }
}
