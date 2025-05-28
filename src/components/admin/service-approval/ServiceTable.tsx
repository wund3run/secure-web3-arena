
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Eye } from "lucide-react";
import { ServiceSubmission } from "./types";

interface ServiceTableProps {
  services: ServiceSubmission[];
  onApprove?: (serviceId: string) => void;
  onReject?: (serviceId: string) => void;
  onViewDetails: (service: ServiceSubmission) => void;
  formatDate: (dateString: string) => string;
  showActions?: boolean;
}

export function ServiceTable({ 
  services, 
  onApprove, 
  onReject, 
  onViewDetails, 
  formatDate,
  showActions = false 
}: ServiceTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
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
                    onClick={() => onViewDetails(service)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  {showActions && onReject && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 text-destructive hover:bg-destructive/20"
                      onClick={() => onReject(service.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Reject</span>
                    </Button>
                  )}
                  {showActions && onApprove && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 text-primary hover:bg-primary/20"
                      onClick={() => onApprove(service.id)}
                    >
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Approve</span>
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
