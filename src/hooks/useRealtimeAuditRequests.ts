
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuditRequest {
  id: string;
  project_name: string;
  client_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  project_description?: string;
  blockchain: string;
  repository_url?: string;
  contract_count?: number;
  lines_of_code?: number;
  deadline?: string;
  budget?: number;
  audit_scope?: string;
  previous_audits?: boolean;
  specific_concerns?: string;
}

export function useRealtimeAuditRequests() {
  const [auditRequests, setAuditRequests] = useState<AuditRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initial data fetch
  useEffect(() => {
    const fetchAuditRequests = async () => {
      try {
        const { data, error } = await supabase
          .from('audit_requests')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAuditRequests(data || []);
      } catch (error) {
        console.error('Error fetching audit requests:', error);
        toast.error('Failed to load audit requests');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuditRequests();
  }, []);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('audit_requests_realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'audit_requests'
        },
        (payload) => {
          console.log('Real-time audit request update:', payload);
          
          if (payload.eventType === 'INSERT') {
            setAuditRequests(prev => [payload.new as AuditRequest, ...prev]);
            toast.success('New audit request received!');
          } else if (payload.eventType === 'UPDATE') {
            setAuditRequests(prev => 
              prev.map(request => 
                request.id === payload.new.id 
                  ? { ...request, ...payload.new }
                  : request
              )
            );
            
            // Show toast for status changes
            const oldStatus = payload.old?.status;
            const newStatus = payload.new?.status;
            if (oldStatus !== newStatus) {
              toast.info(`Audit request status updated to: ${newStatus}`);
            }
          } else if (payload.eventType === 'DELETE') {
            setAuditRequests(prev => 
              prev.filter(request => request.id !== payload.old.id)
            );
            toast.info('Audit request removed');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateRequestStatus = async (requestId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('audit_requests')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) throw error;
      
      toast.success(`Request status updated to: ${newStatus}`);
    } catch (error) {
      console.error('Error updating request status:', error);
      toast.error('Failed to update request status');
    }
  };

  return {
    auditRequests,
    isLoading,
    updateRequestStatus
  };
}
