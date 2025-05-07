
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle, XCircle, AlertTriangle, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ServiceCardProps } from "@/data/marketplace-data";

export function AdminServiceApproval() {
  const [pendingServices, setPendingServices] = useState<ServiceCardProps[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceCardProps | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch pending services
  const fetchPendingServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('status', 'pending');
        
      if (error) throw error;
      
      setPendingServices(data || []);
    } catch (error) {
      console.error('Error fetching pending services:', error);
      toast.error('Failed to load pending services');
    }
  };

  useEffect(() => {
    fetchPendingServices();
  }, []);

  const handleApproveService = async () => {
    if (!selectedService) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('services')
        .update({ status: 'approved' })
        .eq('id', selectedService.id);
        
      if (error) throw error;
      
      toast.success('Service approved successfully', {
        description: `"${selectedService.title}" is now live on the platform`
      });
      
      // Update local state
      setPendingServices(pendingServices.filter(service => service.id !== selectedService.id));
      setApproveDialogOpen(false);
    } catch (error) {
      console.error('Error approving service:', error);
      toast.error('Failed to approve service');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectService = async () => {
    if (!selectedService) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('services')
        .update({ status: 'rejected' })
        .eq('id', selectedService.id);
        
      if (error) throw error;
      
      toast.success('Service rejected', {
        description: `"${selectedService.title}" has been rejected`
      });
      
      // Update local state
      setPendingServices(pendingServices.filter(service => service.id !== selectedService.id));
      setRejectDialogOpen(false);
    } catch (error) {
      console.error('Error rejecting service:', error);
      toast.error('Failed to reject service');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Service Approval Queue</CardTitle>
          <CardDescription>
            Review and approve security services submitted by providers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingServices.length === 0 ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-2">
                <CheckCircle className="h-12 w-12 text-green-500 opacity-80" />
              </div>
              <h3 className="text-lg font-medium mb-1">No pending services</h3>
              <p className="text-muted-foreground">
                All service submissions have been reviewed
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingServices.map((service) => (
                <div 
                  key={service.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{service.title}</h3>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Pending
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Provider: {service.provider.name} · Category: {service.category}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedService(service);
                        setViewDialogOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        setSelectedService(service);
                        setApproveDialogOpen(true);
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setSelectedService(service);
                        setRejectDialogOpen(true);
                      }}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Service Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Service Details</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <div className="space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img 
                  src={selectedService.imageUrl || `https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop`}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-primary/90 text-white">{selectedService.category}</Badge>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold">{selectedService.title}</h2>
              <p className="text-muted-foreground">{selectedService.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm mb-1">Provider</h3>
                  <p>{selectedService.provider.name}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Price</h3>
                  <p>{selectedService.pricing.amount} {selectedService.pricing.currency}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Reputation</h3>
                  <p>{selectedService.provider.reputation}%</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Completed Jobs</h3>
                  <p>{selectedService.completedJobs}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-sm mb-1">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedService.tags.map(tag => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Service Dialog */}
      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Service</DialogTitle>
            <DialogDescription>
              This service will be published and visible to all users on the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <div className="flex items-center p-3 border border-green-200 bg-green-50 rounded-md">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-green-800 text-sm">
                "{selectedService?.title}" will appear in the marketplace immediately after approval.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              className="bg-green-600 hover:bg-green-700" 
              onClick={handleApproveService}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Approve Service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Service Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Service</DialogTitle>
            <DialogDescription>
              This service will be rejected and not published on the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <div className="flex items-center p-3 border border-red-200 bg-red-50 rounded-md">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-800 text-sm">
                The provider will be notified that their service submission was rejected.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleRejectService}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Reject Service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
