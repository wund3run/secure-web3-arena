
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
}

export const useTimeTracking = (auditId: string) => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
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
        setTotalHours(entries.reduce((sum, entry) => sum + entry.hours, 0));
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
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error adding time entry:', error);
      return false;
    }
  };

  return {
    timeEntries,
    totalHours,
    isLoading,
    addTimeEntry
  };
};
