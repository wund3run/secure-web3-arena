
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/auth/useAdminAuth";
import { ServiceSubmission } from "./types";

export function useServiceApproval() {
  const { isAdmin, logAdminAction } = useAdminAuth();
  const [pendingServices, setPendingServices] = useState<ServiceSubmission[]>([]);
  const [approvedServices, setApprovedServices] = useState<ServiceSubmission[]>([]);
  const [rejectedServices, setRejectedServices] = useState<ServiceSubmission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    if (isAdmin) {
      fetchServices();
    }
  }, [isAdmin]);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      
      // Fetch services first
      const { data: services, error: servicesError } = await supabase
        .from('services')
        .select('*');

      if (servicesError) throw servicesError;

      if (!services || services.length === 0) {
        setPendingServices([]);
        setApprovedServices([]);
        setRejectedServices([]);
        return;
      }

      // Get unique provider IDs
      const providerIds = [...new Set(services.map(service => service.provider_id))];
      
      // Fetch provider profiles separately
      const { data: profiles, error: profilesError } = await supabase
        .from('extended_profiles')
        .select('id, full_name')
        .in('id', providerIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
      }

      // Transform the data to match our interface
      const transformedServices: ServiceSubmission[] = services.map(service => {
        const profile = profiles?.find(p => p.id === service.provider_id);
        
        // Handle price_range type conversion
        let priceRange = { min: 0, max: 0 };
        if (service.price_range && typeof service.price_range === 'object') {
          const range = service.price_range as any;
          priceRange = {
            min: typeof range.min === 'number' ? range.min : 0,
            max: typeof range.max === 'number' ? range.max : 0
          };
        }

        return {
          id: service.id,
          title: service.title,
          category: service.category,
          provider_id: service.provider_id,
          provider_name: profile?.full_name || 'Unknown Provider',
          created_at: service.created_at,
          verification_status: (service as any).verification_status || 'pending',
          blockchain_ecosystems: service.blockchain_ecosystems || [],
          description: service.description,
          delivery_time: service.delivery_time || 0,
          price_range: priceRange,
          portfolio_link: (service as any).portfolio_link
        };
      });

      // Filter services by status
      setPendingServices(transformedServices.filter(s => s.verification_status === 'pending'));
      setApprovedServices(transformedServices.filter(s => s.verification_status === 'approved'));
      setRejectedServices(transformedServices.filter(s => s.verification_status === 'rejected'));
      
    } catch (error: any) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleApprove = async (serviceId: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ 
          verification_status: 'approved',
          updated_at: new Date().toISOString()
        })
        .eq('id', serviceId);

      if (error) throw error;

      // Log admin action
      await logAdminAction('approve_service', 'service', serviceId, { 
        action: 'approved',
        timestamp: new Date().toISOString()
      });

      // Refresh the services list
      await fetchServices();
      
      const service = pendingServices.find(s => s.id === serviceId);
      toast.success(`Service "${service?.title}" approved`, {
        description: "The service is now live on the marketplace."
      });
    } catch (error: any) {
      console.error('Error approving service:', error);
      toast.error('Failed to approve service');
    }
  };
  
  const handleReject = async (serviceId: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ 
          verification_status: 'rejected',
          updated_at: new Date().toISOString()
        })
        .eq('id', serviceId);

      if (error) throw error;

      // Log admin action
      await logAdminAction('reject_service', 'service', serviceId, { 
        action: 'rejected',
        timestamp: new Date().toISOString()
      });

      // Refresh the services list
      await fetchServices();
      
      const service = pendingServices.find(s => s.id === serviceId);
      toast.success(`Service "${service?.title}" rejected`, {
        description: "The provider has been notified."
      });
    } catch (error: any) {
      console.error('Error rejecting service:', error);
      toast.error('Failed to reject service');
    }
  };

  const handleViewDetails = (service: ServiceSubmission) => {
    toast.info(`${service.title}`, {
      description: service.description.length > 100 
        ? service.description.substring(0, 100) + '...'
        : service.description
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return {
    pendingServices,
    approvedServices,
    rejectedServices,
    isLoading,
    isAdmin,
    handleApprove,
    handleReject,
    handleViewDetails,
    formatDate
  };
}
