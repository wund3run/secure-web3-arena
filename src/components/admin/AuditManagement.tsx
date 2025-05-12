
import { Card, CardContent } from "@/components/ui/card";
import { useAuditManagement } from "@/hooks/useAuditManagement";
import { AuditSearchHeader } from "./audits/AuditSearchHeader";
import { AuditTable } from "./audits/AuditTable";
import { AuditPagination } from "./audits/AuditPagination";

export function AuditManagement() {
  const { audits, viewAudit, downloadReport, viewOnExplorer } = useAuditManagement();

  return (
    <div className="space-y-4">
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
