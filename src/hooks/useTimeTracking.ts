
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
}

export interface ActiveTimeEntry {
  id: string;
  activity_type: string;
  description?: string;
  start_time: string;
}

export const useTimeTracking = (auditId: string) => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [activeEntry, setActiveEntry] = useState<ActiveTimeEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    if (!auditId) return;

    const fetchTimeEntries = async () => {
      try {
        const { data, error } = await supabase
          .from('audit_time_tracking')
          .select('*')
          .eq('audit_request_id', auditId)
          .order('date', { ascending: false });

        if (error) throw error;
        
        const entries = data || [];
        setTimeEntries(entries);
        setTotalHours(entries.reduce((sum, entry) => sum + (entry.hours || 0), 0));
        
        // Check for active entry
        const active = entries.find(entry => !entry.end_time);
        if (active) {
          setActiveEntry({
            id: active.id,
            activity_type: active.activity_type || 'general',
            description: active.description,
            start_time: active.start_time || active.created_at
          });
        }
      } catch (error) {
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
  }, [auditId]);

  const addTimeEntry = async (hours: number, description?: string, date?: string) => {
    try {
      const { error } = await supabase
        .from('audit_time_tracking')
        .insert({
          audit_request_id: auditId,
          hours,
          description,
          date: date || new Date().toISOString().split('T')[0],
          activity_type: 'manual_entry'
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error adding time entry:', error);
      return false;
    }
  };

  const startTimer = async (activityType: string, description?: string, milestoneId?: string) => {
    try {
      const { data, error } = await supabase
        .from('audit_time_tracking')
        .insert({
          audit_request_id: auditId,
          activity_type: activityType,
          description,
          start_time: new Date().toISOString(),
          billable: true,
          hours: 0
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
    } catch (error) {
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
      const hours = durationMinutes / 60;

      const { error } = await supabase
        .from('audit_time_tracking')
        .update({
          end_time: endTime.toISOString(),
          duration_minutes: durationMinutes,
          hours: hours
        })
        .eq('id', activeEntry.id);

      if (error) throw error;
      
      setActiveEntry(null);
      return true;
    } catch (error) {
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
