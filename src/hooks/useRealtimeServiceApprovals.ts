
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ServiceSubmission {
  id: string;
  title: string;
  category: string;
  provider_name: string;
  provider_id: string;
  submission_date: string;
  status: 'pending' | 'approved' | 'rejected';
  description: string;
}

interface RealtimeServiceApprovalsHook {
  pendingServices: ServiceSubmission[];
  approvedServices: ServiceSubmission[];
  rejectedServices: ServiceSubmission[];
  isLoading: boolean;
  newSubmissionCount: number;
  markAsViewed: () => void;
  approveService: (serviceId: string) => Promise<void>;
  rejectService: (serviceId: string) => Promise<void>;
}

export function useRealtimeServiceApprovals(): RealtimeServiceApprovalsHook {
  const [pendingServices, setPendingServices] = useState<ServiceSubmission[]>([]);
  const [approvedServices, setApprovedServices] = useState<ServiceSubmission[]>([]);
  const [rejectedServices, setRejectedServices] = useState<ServiceSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newSubmissionCount, setNewSubmissionCount] = useState(0);

  // Initial data fetch
  const fetchServices = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Separate services by status (assuming we add a status column to services table)
      const pending = data?.filter(s => !s.featured) || [];
      const approved = data?.filter(s => s.featured) || [];
      
      setPendingServices(pending);
      setApprovedServices(approved);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load service submissions');
      setIsLoading(false);
    }
  }, []);

  const approveService = useCallback(async (serviceId: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ 
          featured: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', serviceId);
      
      if (error) throw error;
      
      toast.success('Service approved successfully');
    } catch (error) {
      console.error('Error approving service:', error);
      toast.error('Failed to approve service');
    }
  }, []);

  const rejectService = useCallback(async (serviceId: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);
      
      if (error) throw error;
      
      toast.success('Service rejected');
    } catch (error) {
      console.error('Error rejecting service:', error);
      toast.error('Failed to reject service');
    }
  }, []);

  const markAsViewed = useCallback(() => {
    setNewSubmissionCount(0);
  }, []);

  // Set up real-time subscription
  useEffect(() => {
    fetchServices();

    const channel = supabase
      .channel('services_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'services'
        },
        (payload) => {
          console.log('New service submission received:', payload);
          const newService = payload.new as ServiceSubmission;
          
          setPendingServices(prev => [newService, ...prev]);
          setNewSubmissionCount(prev => prev + 1);
          
          toast.success('New service submission received!', {
            description: `${newService.title}`,
            duration: 5000
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'services'
        },
        (payload) => {
          console.log('Service updated:', payload);
          const updatedService = payload.new as ServiceSubmission;
          
          // Move between lists based on featured status
          if (updatedService.featured) {
            setPendingServices(prev => prev.filter(s => s.id !== updatedService.id));
            setApprovedServices(prev => [updatedService, ...prev.filter(s => s.id !== updatedService.id)]);
          } else {
            setApprovedServices(prev => prev.filter(s => s.id !== updatedService.id));
            setPendingServices(prev => [updatedService, ...prev.filter(s => s.id !== updatedService.id)]);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'services'
        },
        (payload) => {
          console.log('Service deleted:', payload);
          const deletedService = payload.old as ServiceSubmission;
          
          setPendingServices(prev => prev.filter(s => s.id !== deletedService.id));
          setApprovedServices(prev => prev.filter(s => s.id !== deletedService.id));
          setRejectedServices(prev => [deletedService, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchServices]);

  return {
    pendingServices,
    approvedServices,
    rejectedServices,
    isLoading,
    newSubmissionCount,
    markAsViewed,
    approveService,
    rejectService
  };
}
