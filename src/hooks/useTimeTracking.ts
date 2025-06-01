
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

export interface TimeEntry {
  id: string;
  audit_request_id: string;
  milestone_id?: string;
  auditor_id: string;
  activity_type: string;
  description?: string;
  start_time: string;
  end_time?: string;
  duration_minutes?: number;
  billable: boolean;
  created_at: string;
}

export const useTimeTracking = (auditRequestId: string) => {
  const { user } = useAuth();
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [activeEntry, setActiveEntry] = useState<TimeEntry | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTimeEntries = useCallback(async () => {
    if (!auditRequestId || !user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('audit_time_tracking')
        .select('*')
        .eq('audit_request_id', auditRequestId)
        .order('start_time', { ascending: false });

      if (error) throw error;
      
      const entries = data || [];
      setTimeEntries(entries);
      
      // Find active entry (no end_time)
      const active = entries.find(entry => !entry.end_time);
      setActiveEntry(active || null);
    } catch (err: any) {
      console.error('Failed to fetch time entries:', err);
    } finally {
      setLoading(false);
    }
  }, [auditRequestId, user]);

  const startTimer = useCallback(async (activityType: string, description?: string, milestoneId?: string) => {
    if (!user || activeEntry) return null;

    try {
      const { data, error } = await supabase
        .from('audit_time_tracking')
        .insert({
          audit_request_id: auditRequestId,
          milestone_id: milestoneId,
          auditor_id: user.id,
          activity_type: activityType,
          description,
          start_time: new Date().toISOString(),
          billable: true,
        })
        .select()
        .single();

      if (error) throw error;
      
      setActiveEntry(data);
      toast.success('Timer started');
      await fetchTimeEntries();
      return data;
    } catch (err: any) {
      toast.error('Failed to start timer');
      throw err;
    }
  }, [user, auditRequestId, activeEntry, fetchTimeEntries]);

  const stopTimer = useCallback(async (entryId?: string) => {
    const targetEntry = entryId ? timeEntries.find(e => e.id === entryId) : activeEntry;
    if (!user || !targetEntry) return;

    try {
      const endTime = new Date();
      const startTime = new Date(targetEntry.start_time);
      const durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));

      const { error } = await supabase
        .from('audit_time_tracking')
        .update({
          end_time: endTime.toISOString(),
          duration_minutes: durationMinutes,
        })
        .eq('id', targetEntry.id);

      if (error) throw error;
      
      setActiveEntry(null);
      toast.success(`Timer stopped - ${durationMinutes} minutes logged`);
      await fetchTimeEntries();
    } catch (err: any) {
      toast.error('Failed to stop timer');
      throw err;
    }
  }, [user, activeEntry, timeEntries, fetchTimeEntries]);

  const updateTimeEntry = useCallback(async (entryId: string, updates: Partial<TimeEntry>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('audit_time_tracking')
        .update(updates)
        .eq('id', entryId);

      if (error) throw error;
      
      toast.success('Time entry updated');
      await fetchTimeEntries();
    } catch (err: any) {
      toast.error('Failed to update time entry');
      throw err;
    }
  }, [user, fetchTimeEntries]);

  const getTotalTime = useCallback(() => {
    return timeEntries.reduce((total, entry) => {
      return total + (entry.duration_minutes || 0);
    }, 0);
  }, [timeEntries]);

  const getBillableTime = useCallback(() => {
    return timeEntries
      .filter(entry => entry.billable)
      .reduce((total, entry) => {
        return total + (entry.duration_minutes || 0);
      }, 0);
  }, [timeEntries]);

  useEffect(() => {
    fetchTimeEntries();
  }, [fetchTimeEntries]);

  return {
    timeEntries,
    activeEntry,
    loading,
    startTimer,
    stopTimer,
    updateTimeEntry,
    getTotalTime,
    getBillableTime,
    refetch: fetchTimeEntries,
  };
};
