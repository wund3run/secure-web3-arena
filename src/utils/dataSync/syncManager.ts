
import { supabase } from '@/integrations/supabase/client';
import { Logger } from '../logging/logger';
import { CacheManager } from '../database/cacheManager';

export interface SyncConfig {
  tableName: string;
  primaryKey: string;
  conflictResolution: 'client_wins' | 'server_wins' | 'merge' | 'ask_user';
  syncInterval?: number; // in milliseconds
}

export interface SyncState {
  lastSyncTimestamp: string;
  pendingChanges: any[];
  conflicts: any[];
  status: 'syncing' | 'idle' | 'error' | 'offline';
}

export class DataSyncManager {
  private static syncStates = new Map<string, SyncState>();
  private static syncIntervals = new Map<string, NodeJS.Timeout>();

  // Initialize sync for a table
  static initSync(config: SyncConfig): void {
    const { tableName, syncInterval = 30000 } = config; // Default 30 seconds

    this.syncStates.set(tableName, {
      lastSyncTimestamp: new Date().toISOString(),
      pendingChanges: [],
      conflicts: [],
      status: 'idle'
    });

    // Set up periodic sync
    if (syncInterval > 0) {
      const interval = setInterval(() => {
        this.performSync(config).catch(error => {
          Logger.error(`Sync failed for table ${tableName}`, {
            operation: 'data_sync',
            metadata: { error: error.message, tableName }
          });
        });
      }, syncInterval);

      this.syncIntervals.set(tableName, interval);
    }

    Logger.info(`Data sync initialized for table: ${tableName}`, {
      operation: 'sync_init',
      metadata: { tableName, syncInterval }
    });
  }

  // Perform sync for a specific table
  static async performSync(config: SyncConfig): Promise<void> {
    const { tableName } = config;
    const syncState = this.syncStates.get(tableName);

    if (!syncState || syncState.status === 'syncing') {
      return; // Already syncing or not initialized
    }

    syncState.status = 'syncing';
    this.syncStates.set(tableName, syncState);

    const stopTimer = Logger.startTimer(`sync_${tableName}`);

    try {
      // Check for server changes since last sync
      const serverChanges = await this.getServerChanges(tableName, syncState.lastSyncTimestamp);
      
      // Check for local changes
      const localChanges = syncState.pendingChanges;

      // Detect conflicts
      const conflicts = this.detectConflicts(serverChanges, localChanges, config.primaryKey);

      if (conflicts.length > 0) {
        await this.resolveConflicts(conflicts, config);
      }

      // Apply server changes to local cache
      await this.applyServerChanges(serverChanges, tableName);

      // Push local changes to server
      await this.pushLocalChanges(localChanges, tableName);

      // Update sync state
      syncState.lastSyncTimestamp = new Date().toISOString();
      syncState.pendingChanges = [];
      syncState.conflicts = conflicts;
      syncState.status = 'idle';

      this.syncStates.set(tableName, syncState);

      Logger.info(`Sync completed for table: ${tableName}`, {
        operation: 'sync_complete',
        metadata: {
          tableName,
          serverChanges: serverChanges.length,
          localChanges: localChanges.length,
          conflicts: conflicts.length
        }
      });

    } catch (error) {
      syncState.status = 'error';
      this.syncStates.set(tableName, syncState);
      throw error;
    } finally {
      stopTimer();
    }
  }

  // Get changes from server since last sync
  private static async getServerChanges(tableName: string, lastSync: string): Promise<any[]> {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .gte('updated_at', lastSync)
      .order('updated_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Detect conflicts between server and local changes
  private static detectConflicts(serverChanges: any[], localChanges: any[], primaryKey: string): any[] {
    const conflicts: any[] = [];

    for (const localChange of localChanges) {
      const serverChange = serverChanges.find(sc => sc[primaryKey] === localChange[primaryKey]);
      
      if (serverChange && serverChange.updated_at > localChange.client_updated_at) {
        conflicts.push({
          id: localChange[primaryKey],
          localData: localChange,
          serverData: serverChange,
          type: 'update_conflict'
        });
      }
    }

    return conflicts;
  }

  // Resolve conflicts based on strategy
  private static async resolveConflicts(conflicts: any[], config: SyncConfig): Promise<void> {
    for (const conflict of conflicts) {
      let resolvedData: any;

      switch (config.conflictResolution) {
        case 'server_wins':
          resolvedData = conflict.serverData;
          break;
        case 'client_wins':
          resolvedData = conflict.localData;
          break;
        case 'merge':
          resolvedData = { ...conflict.serverData, ...conflict.localData };
          break;
        case 'ask_user':
          // In a real app, this would show a UI for user to resolve
          resolvedData = conflict.serverData; // Default to server
          break;
        default:
          resolvedData = conflict.serverData;
      }

      // Update local cache with resolved data
      CacheManager.set(`${config.tableName}_${conflict.id}`, resolvedData);

      Logger.warn(`Conflict resolved for ${config.tableName}`, {
        operation: 'conflict_resolution',
        metadata: {
          conflictId: conflict.id,
          strategy: config.conflictResolution,
          tableName: config.tableName
        }
      });
    }
  }

  // Apply server changes to local cache
  private static async applyServerChanges(changes: any[], tableName: string): Promise<void> {
    for (const change of changes) {
      const cacheKey = `${tableName}_${change.id}`;
      CacheManager.set(cacheKey, change, { ttl: 3600 }); // Cache for 1 hour
    }

    // Invalidate related caches
    CacheManager.invalidateByTag(tableName);
  }

  // Push local changes to server
  private static async pushLocalChanges(changes: any[], tableName: string): Promise<void> {
    for (const change of changes) {
      try {
        if (change.operation === 'insert') {
          await supabase.from(tableName).insert(change.data);
        } else if (change.operation === 'update') {
          await supabase.from(tableName).update(change.data).eq('id', change.id);
        } else if (change.operation === 'delete') {
          await supabase.from(tableName).delete().eq('id', change.id);
        }
      } catch (error) {
        Logger.error(`Failed to push change to server`, {
          operation: 'sync_push_failed',
          metadata: { tableName, changeId: change.id, error: error instanceof Error ? error.message : 'Unknown' }
        });
      }
    }
  }

  // Queue local change for sync
  static queueLocalChange(tableName: string, operation: 'insert' | 'update' | 'delete', data: any): void {
    const syncState = this.syncStates.get(tableName);
    if (!syncState) return;

    const change = {
      id: data.id,
      operation,
      data,
      client_updated_at: new Date().toISOString()
    };

    syncState.pendingChanges.push(change);
    this.syncStates.set(tableName, syncState);

    Logger.debug(`Local change queued for sync`, {
      operation: 'queue_local_change',
      metadata: { tableName, operation, id: data.id }
    });
  }

  // Get sync status for a table
  static getSyncStatus(tableName: string): SyncState | null {
    return this.syncStates.get(tableName) || null;
  }

  // Stop sync for a table
  static stopSync(tableName: string): void {
    const interval = this.syncIntervals.get(tableName);
    if (interval) {
      clearInterval(interval);
      this.syncIntervals.delete(tableName);
    }

    this.syncStates.delete(tableName);

    Logger.info(`Data sync stopped for table: ${tableName}`, {
      operation: 'sync_stop',
      metadata: { tableName }
    });
  }

  // Check data consistency
  static async performConsistencyCheck(tableName: string, sampleSize: number = 100): Promise<{
    consistent: boolean;
    inconsistencies: any[];
  }> {
    const stopTimer = Logger.startTimer(`consistency_check_${tableName}`);

    try {
      // Get sample data from server
      const { data: serverData, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(sampleSize)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const inconsistencies: any[] = [];

      // Check each item against local cache
      for (const serverItem of serverData || []) {
        const cachedItem = await CacheManager.get(`${tableName}_${serverItem.id}`);
        
        if (cachedItem && JSON.stringify(cachedItem) !== JSON.stringify(serverItem)) {
          inconsistencies.push({
            id: serverItem.id,
            serverData: serverItem,
            cachedData: cachedItem,
            type: 'data_mismatch'
          });
        }
      }

      const consistent = inconsistencies.length === 0;

      Logger.info(`Consistency check completed for ${tableName}`, {
        operation: 'consistency_check',
        metadata: {
          tableName,
          sampleSize,
          consistent,
          inconsistencyCount: inconsistencies.length
        }
      });

      return { consistent, inconsistencies };

    } finally {
      stopTimer();
    }
  }
}

// Initialize sync for critical tables
export const initializeCriticalSyncs = () => {
  // Audit requests sync
  DataSyncManager.initSync({
    tableName: 'audit_requests',
    primaryKey: 'id',
    conflictResolution: 'server_wins',
    syncInterval: 30000 // 30 seconds
  });

  // Audit findings sync
  DataSyncManager.initSync({
    tableName: 'audit_findings',
    primaryKey: 'id',
    conflictResolution: 'merge',
    syncInterval: 60000 // 1 minute
  });

  // Milestones sync
  DataSyncManager.initSync({
    tableName: 'audit_milestones',
    primaryKey: 'id',
    conflictResolution: 'client_wins',
    syncInterval: 45000 // 45 seconds
  });

  Logger.info('Critical data syncs initialized', {
    operation: 'sync_initialization'
  });
};
