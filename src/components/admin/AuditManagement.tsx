
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Download,
  Eye,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

// Mock audit data
const mockAudits = [
  {
    id: "1",
    projectName: "DefiSwap Protocol",
    client: "DefiSwap Foundation",
    auditor: "BlockSec Audit Team",
    status: "completed",
    auditType: "Smart Contract",
    severity: "critical",
    submissionDate: "2023-10-15",
    completionDate: "2023-10-28",
    vulnerabilitiesFound: 7
  },
  {
    id: "2",
    projectName: "NFTMarket",
    client: "ArtDAO Collective",
    auditor: "SecureChain Audits",
    status: "in_progress",
    auditType: "Smart Contract",
    severity: "medium",
    submissionDate: "2023-11-01",
    completionDate: "",
    vulnerabilitiesFound: 3
  },
  {
    id: "3",
    projectName: "StableCoin Implementation",
    client: "StableFinance Inc.",
    auditor: "Crypto Security Group",
    status: "completed",
    auditType: "Protocol",
    severity: "high",
    submissionDate: "2023-09-22",
    completionDate: "2023-10-10",
    vulnerabilitiesFound: 5
  },
  {
    id: "4",
    projectName: "Bridge Contract",
    client: "CrossChain Solutions",
    auditor: "BlockSec Audit Team",
    status: "scheduled",
    auditType: "Smart Contract",
    severity: "unknown",
    submissionDate: "2023-11-05",
    completionDate: "",
    vulnerabilitiesFound: 0
  },
  {
    id: "5",
    projectName: "DAO Governance",
    client: "Community DAO",
    auditor: "SecureChain Audits",
    status: "completed",
    auditType: "Protocol",
    severity: "low",
    submissionDate: "2023-08-14",
    completionDate: "2023-09-01",
    vulnerabilitiesFound: 2
  }
];

export function AuditManagement() {
  const [audits, setAudits] = useState(mockAudits);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Completed</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">In Progress</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">Scheduled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-500">Critical</Badge>;
      case "high":
        return <Badge className="bg-orange-500">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const viewAudit = (audit: typeof audits[0]) => {
    toast.info("View audit details", {
      description: `Viewing details for ${audit.projectName} audit`,
    });
  };

  const downloadReport = (audit: typeof audits[0]) => {
    if (audit.status === "completed") {
      toast.success("Download started", {
        description: `Downloading report for ${audit.projectName}`,
      });
    } else {
      toast.error("Report unavailable", {
        description: "This audit hasn't been completed yet",
      });
    }
  };

  const viewOnExplorer = (audit: typeof audits[0]) => {
    toast.info("External link", {
      description: `Opening blockchain explorer for ${audit.projectName} contract`,
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
            <div>
              <CardTitle>Security Audits</CardTitle>
              <CardDescription>
                Track and manage security audits across the platform
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search audits..."
                  className="pl-8 w-full md:w-[300px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Audit
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
                    <TableCell>{getStatusBadge(audit.status)}</TableCell>
                    <TableCell className="hidden lg:table-cell">{audit.auditType}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {audit.status !== "completed" ? "-" : getSeverityBadge(audit.severity)}
                    </TableCell>
                    <TableCell className="text-right">
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
                          <DropdownMenuItem onClick={() => viewAudit(audit)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => downloadReport(audit)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download Report
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => viewOnExplorer(audit)}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View on Explorer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{audits.length}</span> of{" "}
              <span className="font-medium">50</span> audits
            </div>
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
