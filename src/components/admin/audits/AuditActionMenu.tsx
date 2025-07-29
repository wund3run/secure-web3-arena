
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Download, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Audit } from "@/hooks/useAuditManagement";

interface AuditActionMenuProps {
  audit: Audit;
  onView: (audit: Audit) => void;
  onDownload: (audit: Audit) => void;
  onViewExplorer: (audit: Audit) => void;
}

export function AuditActionMenu({ 
  audit, 
  onView, 
  onDownload, 
  onViewExplorer 
}: AuditActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onView(audit)}>
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDownload(audit)}>
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onViewExplorer(audit)}>
          <ExternalLink className="h-4 w-4 mr-2" />
          View on Explorer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
