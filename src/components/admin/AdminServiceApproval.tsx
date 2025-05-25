import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Eye, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useRealtimeServiceApprovals } from "@/hooks/useRealtimeServiceApprovals";
import { RealtimeNotificationBadge } from "@/components/realtime/RealtimeNotificationBadge";

// Define the service type
interface ServiceSubmission {
  id: string;
  title: string;
  category: string;
  provider_name: string;
  provider_id: string;
  submission_date: string;
  status: "pending" | "approved" | "rejected";
  blockchain_ecosystems: string[];
  description: string;
  delivery_time: number;
  price_range: {
    min: number;
    max: number;
  };
  portfolio_link?: string;
}

// Mock data for pending services
const MOCK_PENDING_SERVICES: ServiceSubmission[] = [
  {
    id: "serv-1",
    title: "Smart Contract Security Audit",
    category: "smart-contract-audit",
    provider_name: "SecureChain Audits",
    provider_id: "prov-123",
    submission_date: "2025-04-01T10:30:00Z",
    status: "pending",
    blockchain_ecosystems: ["ethereum", "polygon"],
    description: "Comprehensive audit of smart contracts to identify vulnerabilities and ensure security best practices.",
    delivery_time: 7,
    price_range: {
      min: 3000,
      max: 8000
    },
    portfolio_link: "https://securechain.example.com/portfolio"
  },
  {
    id: "serv-2",
    title: "Protocol Security Assessment",
    category: "protocol-audit",
    provider_name: "BlockSafe Security",
    provider_id: "prov-456",
    submission_date: "2025-04-02T14:15:00Z",
    status: "pending",
    blockchain_ecosystems: ["ethereum", "arbitrum", "optimism"],
    description: "In-depth assessment of protocol security including architecture review, code audit, and threat modeling.",
    delivery_time: 14,
    price_range: {
      min: 8000,
      max: 25000
    }
  },
  {
    id: "serv-3",
    title: "DApp Penetration Testing",
    category: "penetration-testing",
    provider_name: "CryptoDefense",
    provider_id: "prov-789",
    submission_date: "2025-04-03T09:45:00Z",
    status: "pending",
    blockchain_ecosystems: ["solana", "near"],
    description: "Comprehensive penetration testing for decentralized applications to identify and exploit security weaknesses.",
    delivery_time: 10,
    price_range: {
      min: 5000,
      max: 12000
    },
    portfolio_link: "https://cryptodefense.example.com/projects"
  }
];

// Update AdminServiceApproval to use real-time hook
export function AdminServiceApproval() {
  const {
    pendingServices,
    approvedServices,
    rejectedServices,
    isLoading,
    newSubmissionCount,
    markAsViewed,
    approveService,
    rejectService
  } = useRealtimeServiceApprovals();
  
  const [activeTab, setActiveTab] = useState<string>("pending");
  
  useEffect(() => {
    // Mark new submissions as viewed when admin opens the approvals tab
    if (activeTab === "pending" && newSubmissionCount > 0) {
      markAsViewed();
    }
  }, [activeTab, newSubmissionCount, markAsViewed]);
  
  const handleApprove = async (serviceId: string) => {
    await approveService(serviceId);
  };
  
  const handleReject = async (serviceId: string) => {
    await rejectService(serviceId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center justify-between">
          <span>Service Approval Queue</span>
          <RealtimeNotificationBadge count={newSubmissionCount} />
        </CardTitle>
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
                        <TableCell>{service.provider_name || 'Unknown Provider'}</TableCell>
                        <TableCell>{new Date(service.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {service.category?.replace(/-/g, ' ') || 'General'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => toast.info("Service details", {
                                description: service.description || 'No description available'
                              })}
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
                {/* Approved services table - similar structure to pending */}
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
                    {approvedServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.title}</TableCell>
                        <TableCell>{service.provider_name}</TableCell>
                        <TableCell>{formatDate(service.submission_date)}</TableCell>
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
                {/* Rejected services table - similar structure to pending */}
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
                    {rejectedServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.title}</TableCell>
                        <TableCell>{service.provider_name}</TableCell>
                        <TableCell>{formatDate(service.submission_date)}</TableCell>
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
