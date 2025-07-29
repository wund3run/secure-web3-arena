
import { Audit } from "@/hooks/useAuditManagement";
import { AuditStatusBadge } from "./AuditStatusBadge";
import { AuditSeverityBadge } from "./AuditSeverityBadge";
import { AuditActionMenu } from "./AuditActionMenu";
import { InfoIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface AuditTableProps {
  audits: Audit[];
  onView: (audit: Audit) => void;
  onDownload: (audit: Audit) => void;
  onViewExplorer: (audit: Audit) => void;
}

export function AuditTable({ audits, onView, onDownload, onViewExplorer }: AuditTableProps) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table aria-label="Audit results table">
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Project</TableHead>
            <TableHead scope="col" className="hidden md:table-cell">Auditor</TableHead>
            <TableHead scope="col">Status</TableHead>
            <TableHead scope="col" className="hidden lg:table-cell">Audit Type</TableHead>
            <TableHead scope="col" className="hidden md:table-cell">
              <div className="flex items-center space-x-1">
                <span>Severity</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-flex">
                        <InfoIcon className="h-3.5 w-3.5 text-muted-foreground cursor-help" aria-hidden="true" />
                        <span className="sr-only">Severity information</span>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-xs max-w-xs">
                        Security severity level indicates the highest risk vulnerability 
                        found during the audit. Critical issues need immediate attention.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableHead>
            <TableHead scope="col" className="text-right">Actions</TableHead>
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
          {audits.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No audits found. Try adjusting your search filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
