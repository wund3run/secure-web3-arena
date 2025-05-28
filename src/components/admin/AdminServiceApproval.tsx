
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useServiceApproval } from "./service-approval/useServiceApproval";
import { ServiceTabs } from "./service-approval/ServiceTabs";

export function AdminServiceApproval() {
  const [activeTab, setActiveTab] = useState<string>("pending");
  const {
    pendingServices,
    approvedServices,
    rejectedServices,
    isLoading,
    isAdmin,
    handleApprove,
    handleReject,
    handleViewDetails,
    formatDate
  } = useServiceApproval();

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
          
          <ServiceTabs
            pendingServices={pendingServices}
            approvedServices={approvedServices}
            rejectedServices={rejectedServices}
            isLoading={isLoading}
            onApprove={handleApprove}
            onReject={handleReject}
            onViewDetails={handleViewDetails}
            formatDate={formatDate}
          />
        </Tabs>
      </CardContent>
    </Card>
  );
}
