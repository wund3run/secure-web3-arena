
import { Logger } from '../logging/logger';

interface SyncConfig {
  tableName: string;
  primaryKey: string;
  conflictResolution: 'client_wins' | 'server_wins' | 'manual';
  syncInterval: number;
}

interface SyncStatus {
  status: 'synced' | 'syncing' | 'error' | 'offline';
  lastSync: Date | null;
  pendingChanges: number;
}

class SyncManager {
  private syncConfigs = new Map<string, SyncConfig>();
  private syncStatuses = new Map<string, SyncStatus>();
  private pendingChanges = new Map<string, any[]>();
  private syncIntervals = new Map<string, NodeJS.Timeout>();

  initSync(config: SyncConfig): void {
    Logger.info('Initializing data sync', {
      tableName: config.tableName,
      metadata: { syncInterval: config.syncInterval }
    });

    this.syncConfigs.set(config.tableName, config);
    this.syncStatuses.set(config.tableName, {
      status: 'synced',
      lastSync: null,
      pendingChanges: 0
    });

    // Start periodic sync
    const interval = setInterval(() => {
      this.performSync(config.tableName);
    }, config.syncInterval);

    this.syncIntervals.set(config.tableName, interval);
  }

  queueLocalChange(tableName: string, operation: 'insert' | 'update' | 'delete', data: any): void {
    if (!this.pendingChanges.has(tableName)) {
      this.pendingChanges.set(tableName, []);
    }

    const changes = this.pendingChanges.get(tableName)!;
    changes.push({ operation, data, timestamp: Date.now() });

    // Update status
    const status = this.syncStatuses.get(tableName);
    if (status) {
      status.pendingChanges = changes.length;
      status.status = 'syncing';
    }

    Logger.debug('Local change queued', {
      tableName,
      metadata: { operation, pendingCount: changes.length }
    });
  }

  private async performSync(tableName: string): Promise<void> {
    const config = this.syncConfigs.get(tableName);
    const status = this.syncStatuses.get(tableName);
    
    if (!config || !status) return;

    try {
      Logger.debug('Starting sync', {
        tableName,
        metadata: { pendingChanges: status.pendingChanges }
      });

      // Simulate sync operation
      await new Promise(resolve => setTimeout(resolve, 100));

      // Clear pending changes
      this.pendingChanges.set(tableName, []);
      
      // Update status
      status.status = 'synced';
      status.lastSync = new Date();
      status.pendingChanges = 0;

      Logger.info('Sync completed', {
        tableName,
        metadata: { lastSync: status.lastSync }
      });

    } catch (error) {
      status.status = 'error';
      Logger.error('Sync failed', {
        tableName,
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' }
      });
    }
  }

  stopSync(tableName: string): void {
    const interval = this.syncIntervals.get(tableName);
    if (interval) {
      clearInterval(interval);
      this.syncIntervals.delete(tableName);
    }

    this.syncConfigs.delete(tableName);
    this.syncStatuses.delete(tableName);
    this.pendingChanges.delete(tableName);

    Logger.info('Data sync stopped', {
      tableName
    });
  }

  getSyncStatus(tableName: string): SyncStatus | null {
    return this.syncStatuses.get(tableName) || null;
  }
}

export const DataSyncManager = new SyncManager();

export function initializeCriticalSyncs(): void {
  // Initialize sync for critical data
  DataSyncManager.initSync({
    tableName: 'audit_requests',
    primaryKey: 'id',
    conflictResolution: 'server_wins',
    syncInterval: 30000
  });

  DataSyncManager.initSync({
    tableName: 'audit_findings',
    primaryKey: 'id',
    conflictResolution: 'server_wins',
    syncInterval: 15000
  });

  Logger.info('Critical data syncs initialized', {});
}
