
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';

export interface TimeEntry {
  id: string;
  audit_request_id: string;
  user_id: string;
  description?: string;
  hours: number;
  date: string;
  created_at: string;
  activity_type?: string;
  start_time?: string;
  end_time?: string;
  duration_minutes?: number;
  billable?: boolean;
  auditor_id: string;
  milestone_id?: string;
}

export interface ActiveTimeEntry {
  id: string;
  activity_type: string;
  description?: string;
  start_time: string;
}

export const useTimeTracking = (auditId: string) => {
  const { user } = useAuth();
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [activeEntry, setActiveEntry] = useState<ActiveTimeEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    if (!auditId || !user) return;

    const fetchTimeEntries = async () => {
      try {
        const { data, error } = await supabase
          .from('audit_time_tracking')
          .select('*')
          .eq('audit_request_id', auditId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Map database entries to our interface
        const entries = (data || []).map(entry => ({
          ...entry,
          user_id: entry.auditor_id,
          hours: entry.duration_minutes ? entry.duration_minutes / 60 : 0,
          date: entry.created_at.split('T')[0],
        })) as TimeEntry[];
        
        setTimeEntries(entries);
        setTotalHours(entries.reduce((sum, entry) => sum + (entry.hours || 0), 0));
        
        // Check for active entry
        const active = entries.find(entry => !entry.end_time && entry.start_time);
        if (active) {
          setActiveEntry({
            id: active.id,
            activity_type: active.activity_type || 'general',
            description: active.description,
            start_time: active.start_time || active.created_at
          });
        }
      } catch (error: unknown) {
        console.error('Error fetching time entries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeEntries();

    // Set up real-time subscription
    const channel = supabase
      .channel(`time-tracking-${auditId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'audit_time_tracking',
          filter: `audit_request_id=eq.${auditId}`,
        },
        () => {
          fetchTimeEntries();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [auditId, user]);

  const addTimeEntry = async (hours: number, description?: string, date?: string) => {
    if (!user) return false;
    
    try {
      const { error } = await supabase
        .from('audit_time_tracking')
        .insert({
          audit_request_id: auditId,
          auditor_id: user.id,
          duration_minutes: Math.round(hours * 60),
          description,
          start_time: new Date().toISOString(),
          activity_type: 'manual_entry',
          billable: true,
        });

      if (error) throw error;
      return true;
    } catch (error: unknown) {
      console.error('Error adding time entry:', error);
      return false;
    }
  };

  const startTimer = async (activityType: string, description?: string) => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase
        .from('audit_time_tracking')
        .insert({
          audit_request_id: auditId,
          auditor_id: user.id,
          activity_type: activityType,
          description,
          start_time: new Date().toISOString(),
          billable: true,
        })
        .select()
        .single();

      if (error) throw error;
      
      if (data) {
        setActiveEntry({
          id: data.id,
          activity_type: activityType,
          description,
          start_time: data.start_time || new Date().toISOString()
        });
      }
      
      return true;
    } catch (error: unknown) {
      console.error('Error starting timer:', error);
      return false;
    }
  };

  const stopTimer = async () => {
    if (!activeEntry) return false;
    
    try {
      const endTime = new Date();
      const startTime = new Date(activeEntry.start_time);
      const durationMinutes = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));

      const { error } = await supabase
        .from('audit_time_tracking')
        .update({
          end_time: endTime.toISOString(),
          duration_minutes: durationMinutes,
        })
        .eq('id', activeEntry.id);

      if (error) throw error;
      
      setActiveEntry(null);
      return true;
    } catch (error: unknown) {
      console.error('Error stopping timer:', error);
      return false;
    }
  };

  const getTotalTime = () => {
    return timeEntries.reduce((total, entry) => total + (entry.duration_minutes || 0), 0);
  };

  const getBillableTime = () => {
    return timeEntries
      .filter(entry => entry.billable !== false)
      .reduce((total, entry) => total + (entry.duration_minutes || 0), 0);
  };

  return {
    timeEntries,
    activeEntry,
    totalHours,
    isLoading,
    loading: isLoading, // Alias for backward compatibility
    addTimeEntry,
    startTimer,
    stopTimer,
    getTotalTime,
    getBillableTime
  };
};
