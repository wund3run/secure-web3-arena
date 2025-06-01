
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { OptimizedQueries } from '@/utils/database/optimizedQueries';
import { Logger, auditLogger } from '@/utils/logging/logger';
import { DataSyncManager } from '@/utils/dataSync/syncManager';

export const useOptimizedAuditDetails = (auditId?: string) => {
  const { user } = useAuth();
  const params = useParams();
  const id = auditId || params.id;
  
  const [auditData, setAuditData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !user) return;

    const fetchOptimizedData = async () => {
      const correlationId = Logger.generateCorrelationId();
      const stopTimer = Logger.startTimer('fetch_audit_details', { auditId: id, userId: user.id });

      try {
        setIsLoading(true);
        setError(null);

        Logger.info('Fetching optimized audit details', {
          correlationId,
          auditId: id,
          userId: user.id
        }, 'audit');

        const data = await OptimizedQueries.getAuditDetailsOptimized(id);
        
        if (!data.audit) {
          throw new Error('Audit not found');
        }

        setAuditData({
          ...data.audit,
          findings: data.findings,
          deliverables: data.deliverables,
          status_updates: data.statusUpdates,
          findings_count: data.findingsCount
        });

        Logger.info('Audit details loaded successfully', {
          correlationId,
          auditId: id,
          findingsCount: data.findings.length,
          milestonesCount: data.milestones.length
        }, 'audit');

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load audit details';
        setError(errorMessage);
        
        Logger.error('Failed to load audit details', {
          correlationId,
          auditId: id,
          userId: user.id,
          metadata: { error: errorMessage }
        }, 'audit');
      } finally {
        setIsLoading(false);
        stopTimer();
      }
    };

    fetchOptimizedData();

    // Set up real-time sync for this audit
    DataSyncManager.initSync({
      tableName: `audit_${id}`,
      primaryKey: 'id',
      conflictResolution: 'server_wins',
      syncInterval: 30000
    });

    return () => {
      DataSyncManager.stopSync(`audit_${id}`);
    };
  }, [id, user]);

  const updateAuditStatus = async (newStatus: string, phase?: string) => {
    if (!id || !user) return false;

    const correlationId = Logger.generateCorrelationId();
    const oldStatus = auditData?.status;

    try {
      Logger.info('Updating audit status', {
        correlationId,
        auditId: id,
        oldStatus,
        newStatus,
        phase
      }, 'audit');

      // Queue local change for sync
      DataSyncManager.queueLocalChange('audit_requests', 'update', {
        id,
        status: newStatus,
        current_phase: phase || auditData?.current_phase,
        updated_at: new Date().toISOString()
      });

      // Update local state optimistically
      setAuditData((prev: any) => ({
        ...prev,
        status: newStatus,
        current_phase: phase || prev?.current_phase
      }));

      // Invalidate cache
      OptimizedQueries.invalidateAuditCache(id);

      auditLogger.statusChanged(id, oldStatus, newStatus, user.id);
      return true;

    } catch (error) {
      Logger.error('Failed to update audit status', {
        correlationId,
        auditId: id,
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' }
      }, 'audit');
      return false;
    }
  };

  return {
    auditData,
    isLoading,
    error,
    updateAuditStatus,
    syncStatus: DataSyncManager.getSyncStatus(`audit_${id}`)
  };
};
