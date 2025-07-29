import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { OptimizedQueries } from '@/utils/database/optimizedQueries';
import { Logger, AuditLogger } from '@/utils/logging/logger';
import { DataSyncManager } from '@/utils/dataSync/syncManager';
import { supabase } from '@/integrations/supabase/client';

export const useOptimizedAuditDetails = (auditId?: string) => {
  const { user } = useAuth();
  const params = useParams();
  const id = auditId || params.id;
  
  const [auditData, setAuditData] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !user) return;

    const fetchOptimizedData = async () => {
      const correlationId = Logger.generateCorrelationId();
      const stopTimer = Logger.startTimer('fetch_audit_details', { 
        correlationId,
        auditId: id, 
        userId: user.id 
      });

      try {
        setIsLoading(true);
        setError(null);

        Logger.info('Fetching optimized audit details', {
          correlationId,
          auditId: id,
          userId: user.id
        });

        const data = await OptimizedQueries.getAuditDetailsOptimized(id);
        
        if (!data.audit) {
          throw new Error('Audit not found');
        }

        const statusData = data.audit.status as { status?: string } || {};
        const isStatusCompleted = statusData.status === 'completed';

        // Get current phase if audit is in progress
        const phaseResult = isStatusCompleted ? null : await supabase
          .from('audit_requests')
          .select('current_phase')
          .eq('id', id)
          .single();

        const phaseData = phaseResult?.data as { current_phase?: string } || {};
        const currentPhase = phaseData.current_phase;

        setAuditData({
          ...data.audit,
          findings: data.findings,
          deliverables: data.deliverables,
          status_updates: data.statusUpdates,
          findings_count: data.findingsCount,
          status: statusData.status || data.audit.status,
          current_phase: currentPhase || data.audit.current_phase
        });

        Logger.info('Audit details loaded successfully', {
          correlationId,
          auditId: id,
          findingsCount: data.findings.length,
          milestonesCount: data.milestones.length
        });

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load audit details';
        setError(errorMessage);
        
        Logger.error('Failed to load audit details', {
          correlationId,
          auditId: id,
          userId: user.id,
          metadata: { error: errorMessage }
        });
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
    const oldStatus = (auditData as any)?.status;

    try {
      Logger.info('Updating audit status', {
        correlationId,
        auditId: id,
        oldStatus,
        newStatus,
        phase
      });

      // Queue local change for sync
      DataSyncManager.queueLocalChange('audit_requests', 'update', {
        id,
        status: newStatus,
        current_phase: phase || (auditData as any)?.current_phase,
        updated_at: new Date().toISOString()
      });

      // Update local state optimistically
      setAuditData((prev: any) => {
        const prevData = prev || {};
        return {
          ...prevData,
          status: newStatus,
          current_phase: phase || prevData.current_phase
        };
      });

      // Invalidate cache
      OptimizedQueries.invalidateAuditCache(id);

      AuditLogger.statusChanged(id, oldStatus, newStatus, user.id);
      return true;

    } catch (error: unknown) {
      Logger.error('Failed to update audit status', {
        correlationId,
        auditId: id,
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' }
      });
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
