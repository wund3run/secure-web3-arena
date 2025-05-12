
import { Button } from "@/components/ui/button";

interface AuditPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

export function AuditPagination({ 
  currentPage, 
  totalItems, 
  itemsPerPage 
}: AuditPaginationProps) {
  const from = Math.min(totalItems, 1);
  const to = Math.min(currentPage * itemsPerPage, totalItems);
  
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{from}</span> to{" "}
        <span className="font-medium">{to}</span> of{" "}
        <span className="font-medium">{totalItems}</span> audits
      </div>
      <Button variant="outline" size="sm" disabled={currentPage === 1}>
        Previous
      </Button>
      <Button variant="outline" size="sm" disabled={to === totalItems}>
        Next
      </Button>
    </div>
  );
}
