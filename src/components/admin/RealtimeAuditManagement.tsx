
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { useRealtimeAuditRequests } from "@/hooks/useRealtimeAuditRequests";
import { RealtimeNotificationBadge } from "@/components/realtime/RealtimeNotificationBadge";
import { Skeleton } from "@/components/ui/skeleton";

export function RealtimeAuditManagement() {
  const {
    auditRequests,
    isLoading,
    newRequestCount,
    markAsViewed,
    updateRequestStatus
  } = useRealtimeAuditRequests();

  useEffect(() => {
    // Mark new requests as viewed when component mounts
    if (newRequestCount > 0) {
      markAsViewed();
    }
  }, [newRequestCount, markAsViewed]);

  const handleStatusUpdate = async (id: string, status: string) => {
    await updateRequestStatus(id, status);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "default",
      approved: "default",
      rejected: "destructive",
      in_progress: "secondary"
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Real-time Audit Requests</CardTitle>
          <CardDescription>Loading audit requests...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Real-time Audit Requests</span>
          <RealtimeNotificationBadge count={newRequestCount} onClick={markAsViewed} />
        </CardTitle>
        <CardDescription>
          Monitor and manage audit requests in real-time ({auditRequests.length} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {auditRequests.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No audit requests yet</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Blockchain</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.project_name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{request.blockchain}</Badge>
                    </TableCell>
                    <TableCell>${request.budget?.toLocaleString() || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.status)}
                        {getStatusBadge(request.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(request.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => toast.info("Request details", {
                            description: `${request.project_name} - ${request.blockchain}`
                          })}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        {request.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-green-600 hover:bg-green-50"
                              onClick={() => handleStatusUpdate(request.id, 'approved')}
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span className="sr-only">Approve</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                              onClick={() => handleStatusUpdate(request.id, 'rejected')}
                            >
                              <XCircle className="h-4 w-4" />
                              <span className="sr-only">Reject</span>
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
