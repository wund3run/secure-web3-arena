
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuditRequest {
  id: string;
  project_name: string;
  client_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  blockchain: string;
  budget: number;
  deadline: string;
}

interface RealtimeAuditRequestsHook {
  auditRequests: AuditRequest[];
  isLoading: boolean;
  newRequestCount: number;
  markAsViewed: () => void;
  updateRequestStatus: (id: string, status: string) => Promise<void>;
}

export function useRealtimeAuditRequests(): RealtimeAuditRequestsHook {
  const [auditRequests, setAuditRequests] = useState<AuditRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newRequestCount, setNewRequestCount] = useState(0);

  // Initial data fetch
  const fetchAuditRequests = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('audit_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setAuditRequests(data || []);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching audit requests:', error);
      toast.error('Failed to load audit requests');
      setIsLoading(false);
    }
  }, []);

  // Update request status
  const updateRequestStatus = useCallback(async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('audit_requests')
        .update({ 
          status, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success(`Request ${status} successfully`);
    } catch (error) {
      console.error('Error updating request status:', error);
      toast.error('Failed to update request status');
    }
  }, []);

  // Mark new requests as viewed
  const markAsViewed = useCallback(() => {
    setNewRequestCount(0);
  }, []);

  // Set up real-time subscription
  useEffect(() => {
    fetchAuditRequests();

    const channel = supabase
      .channel('audit_requests_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_requests'
        },
        (payload) => {
          console.log('New audit request received:', payload);
          const newRequest = payload.new as AuditRequest;
          
          setAuditRequests(prev => [newRequest, ...prev]);
          setNewRequestCount(prev => prev + 1);
          
          toast.success('New audit request received!', {
            description: `${newRequest.project_name} - ${newRequest.blockchain}`,
            duration: 5000
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'audit_requests'
        },
        (payload) => {
          console.log('Audit request updated:', payload);
          const updatedRequest = payload.new as AuditRequest;
          
          setAuditRequests(prev => 
            prev.map(req => 
              req.id === updatedRequest.id ? updatedRequest : req
            )
          );
          
          toast.info('Request status updated', {
            description: `${updatedRequest.project_name} - ${updatedRequest.status}`,
            duration: 3000
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'audit_requests'
        },
        (payload) => {
          console.log('Audit request deleted:', payload);
          const deletedRequest = payload.old as AuditRequest;
          
          setAuditRequests(prev => 
            prev.filter(req => req.id !== deletedRequest.id)
          );
          
          toast.info('Request removed', {
            description: `${deletedRequest.project_name}`,
            duration: 3000
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchAuditRequests]);

  return {
    auditRequests,
    isLoading,
    newRequestCount,
    markAsViewed,
    updateRequestStatus
  };
}
