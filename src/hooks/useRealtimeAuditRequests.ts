
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

export interface AuditRequest {
  id: string;
  project_name: string;
  blockchain: string;
  status: string;
  created_at: string;
  client_id: string;
  budget?: number;
  deadline?: string;
}

export const useRealtimeAuditRequests = () => {
  const { user, getUserType } = useAuth();
  const [auditRequests, setAuditRequests] = useState<AuditRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

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

    // Set up real-time subscription
    const channel = supabase
      .channel('audit-requests-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'audit_requests'
        },
        (payload) => {
          console.log('Real-time update:', payload);
          
          if (payload.eventType === 'INSERT') {
            setAuditRequests(prev => [payload.new as AuditRequest, ...prev]);
            toast.info('New audit request received');
          } else if (payload.eventType === 'UPDATE') {
            setAuditRequests(prev => 
              prev.map(request => 
                request.id === payload.new.id ? payload.new as AuditRequest : request
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setAuditRequests(prev => 
              prev.filter(request => request.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const updateRequestStatus = async (requestId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('audit_requests')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', requestId);

      if (error) throw error;
      
      toast.success(`Request ${status} successfully`);
    } catch (error) {
      console.error('Error updating request status:', error);
      toast.error('Failed to update request status');
    }
  };

  return {
    auditRequests,
    isLoading,
    updateRequestStatus,
  };
};
