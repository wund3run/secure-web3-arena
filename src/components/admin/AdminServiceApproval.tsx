import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Eye, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/auth/useAdminAuth";

interface ServiceSubmission {
  id: string;
  title: string;
  category: string;
  provider_id: string;
  provider_name?: string;
  created_at: string;
  verification_status: "pending" | "approved" | "rejected";
  blockchain_ecosystems: string[];
  description: string;
  delivery_time: number;
  price_range: {
    min: number;
    max: number;
  };
  portfolio_link?: string;
}

export function AdminServiceApproval() {
  const { isAdmin, logAdminAction } = useAdminAuth();
  const [pendingServices, setPendingServices] = useState<ServiceSubmission[]>([]);
  const [approvedServices, setApprovedServices] = useState<ServiceSubmission[]>([]);
  const [rejectedServices, setRejectedServices] = useState<ServiceSubmission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("pending");
  
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
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewDetails = (service: ServiceSubmission) => {
    toast.info(`${service.title}`, {
      description: service.description.length > 100 
        ? service.description.substring(0, 100) + '...'
        : service.description
    });
  };

  if (!isAdmin) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            Admin access required to manage service approvals.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Service Approval Queue</CardTitle>
        <CardDescription>
          Review and approve service submissions from security providers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="pending" className="relative">
              Pending
              {pendingServices.length > 0 && (
                <Badge variant="destructive" className="ml-2">{pendingServices.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved
              {approvedServices.length > 0 && (
                <Badge variant="outline" className="ml-2">{approvedServices.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected
              {rejectedServices.length > 0 && (
                <Badge variant="outline" className="ml-2">{rejectedServices.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="m-0">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : pendingServices.length === 0 ? (
              <div className="text-center py-8">
                <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <p className="mt-2 text-lg font-medium">No pending services</p>
                <p className="text-sm text-muted-foreground">
                  All service submissions have been processed.
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Submission Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.title}</TableCell>
                        <TableCell>{service.provider_name}</TableCell>
                        <TableCell>{formatDate(service.created_at)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {service.category.replace(/-/g, ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => handleViewDetails(service)}
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-destructive hover:bg-destructive/20"
                              onClick={() => handleReject(service.id)}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Reject</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-primary hover:bg-primary/20"
                              onClick={() => handleApprove(service.id)}
                            >
                              <Check className="h-4 w-4" />
                              <span className="sr-only">Approve</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="approved" className="m-0">
            {approvedServices.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No approved services yet.</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Approved Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.title}</TableCell>
                        <TableCell>{service.provider_name}</TableCell>
                        <TableCell>{formatDate(service.created_at)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {service.category.replace(/-/g, ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewDetails(service)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="rejected" className="m-0">
            {rejectedServices.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No rejected services.</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Rejected Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rejectedServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.title}</TableCell>
                        <TableCell>{service.provider_name}</TableCell>
                        <TableCell>{formatDate(service.created_at)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {service.category.replace(/-/g, ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewDetails(service)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
