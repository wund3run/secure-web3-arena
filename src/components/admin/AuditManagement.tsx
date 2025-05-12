
import { Card, CardContent } from "@/components/ui/card";
import { useAuditManagement } from "@/hooks/useAuditManagement";
import { AuditSearchHeader } from "./audits/AuditSearchHeader";
import { AuditTable } from "./audits/AuditTable";
import { AuditPagination } from "./audits/AuditPagination";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

export function AuditManagement() {
  const { audits, viewAudit, downloadReport, viewOnExplorer } = useAuditManagement();

  return (
    <div className="space-y-4" role="region" aria-label="Audit Management">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Audit Management</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center cursor-help">
                <InfoIcon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <span className="sr-only">Information about audit management</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
              <p className="text-xs">
                Track and manage all security audits. Use the filters to find specific audits,
                and the action menu to view details, download reports, or view on blockchain explorer.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Card>
        <AuditSearchHeader />
        <CardContent>
          <AuditTable
            audits={audits}
            onView={viewAudit}
            onDownload={downloadReport}
            onViewExplorer={viewOnExplorer}
          />
          
          <AuditPagination 
            currentPage={1}
            totalItems={50}
            itemsPerPage={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
