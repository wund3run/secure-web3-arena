
import { TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";
import { ServiceTable } from "./ServiceTable";
import { ServiceSubmission } from "./types";

interface ServiceTabsProps {
  pendingServices: ServiceSubmission[];
  approvedServices: ServiceSubmission[];
  rejectedServices: ServiceSubmission[];
  isLoading: boolean;
  onApprove: (serviceId: string) => void;
  onReject: (serviceId: string) => void;
  onViewDetails: (service: ServiceSubmission) => void;
  formatDate: (dateString: string) => string;
}

export function ServiceTabs({
  pendingServices,
  approvedServices,
  rejectedServices,
  isLoading,
  onApprove,
  onReject,
  onViewDetails,
  formatDate
}: ServiceTabsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <>
      <TabsContent value="pending" className="m-0">
        {pendingServices.length === 0 ? (
          <div className="text-center py-8">
            <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <p className="mt-2 text-lg font-medium">No pending services</p>
            <p className="text-sm text-muted-foreground">
              All service submissions have been processed.
            </p>
          </div>
        ) : (
          <ServiceTable
            services={pendingServices}
            onApprove={onApprove}
            onReject={onReject}
            onViewDetails={onViewDetails}
            formatDate={formatDate}
            showActions={true}
          />
        )}
      </TabsContent>
      
      <TabsContent value="approved" className="m-0">
        {approvedServices.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No approved services yet.</p>
          </div>
        ) : (
          <ServiceTable
            services={approvedServices}
            onViewDetails={onViewDetails}
            formatDate={formatDate}
          />
        )}
      </TabsContent>
      
      <TabsContent value="rejected" className="m-0">
        {rejectedServices.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No rejected services.</p>
          </div>
        ) : (
          <ServiceTable
            services={rejectedServices}
            onViewDetails={onViewDetails}
            formatDate={formatDate}
          />
        )}
      </TabsContent>
    </>
  );
}
