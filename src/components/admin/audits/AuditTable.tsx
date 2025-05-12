
import { Audit } from "@/hooks/useAuditManagement";
import { AuditStatusBadge } from "./AuditStatusBadge";
import { AuditSeverityBadge } from "./AuditSeverityBadge";
import { AuditActionMenu } from "./AuditActionMenu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AuditTableProps {
  audits: Audit[];
  onView: (audit: Audit) => void;
  onDownload: (audit: Audit) => void;
  onViewExplorer: (audit: Audit) => void;
}

export function AuditTable({ audits, onView, onDownload, onViewExplorer }: AuditTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead className="hidden md:table-cell">Auditor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden lg:table-cell">Audit Type</TableHead>
            <TableHead className="hidden md:table-cell">Severity</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {audits.map((audit) => (
            <TableRow key={audit.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{audit.projectName}</div>
                  <div className="text-xs text-muted-foreground">{audit.client}</div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{audit.auditor}</TableCell>
              <TableCell>
                <AuditStatusBadge status={audit.status} />
              </TableCell>
              <TableCell className="hidden lg:table-cell">{audit.auditType}</TableCell>
              <TableCell className="hidden md:table-cell">
                {audit.status !== "completed" ? "-" : <AuditSeverityBadge severity={audit.severity} />}
              </TableCell>
              <TableCell className="text-right">
                <AuditActionMenu 
                  audit={audit}
                  onView={onView}
                  onDownload={onDownload}
                  onViewExplorer={onViewExplorer}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
