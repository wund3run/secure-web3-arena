
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, FileText, Eye, AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Audit {
  id: string;
  projectName: string;
  client: string;
  auditor: string;
  status: "in_progress" | "review" | "completed" | "disputed";
  priority: "low" | "medium" | "high" | "critical";
  startDate: string;
  deadline: string;
  budget: number;
  vulnerabilities: number;
  progress: number;
}

export function AuditManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [audits] = useState<Audit[]>([
    {
      id: "AUD-001",
      projectName: "DeFi Protocol v2",
      client: "Sarah Chen",
      auditor: "Alex Thompson",
      status: "in_progress",
      priority: "high",
      startDate: "2024-01-15",
      deadline: "2024-02-15",
      budget: 25000,
      vulnerabilities: 0,
      progress: 65
    },
    {
      id: "AUD-002", 
      projectName: "NFT Marketplace",
      client: "Marcus Rodriguez",
      auditor: "Elena Kovač",
      status: "review",
      priority: "medium",
      startDate: "2024-01-10",
      deadline: "2024-02-10",
      budget: 18000,
      vulnerabilities: 3,
      progress: 85
    },
    {
      id: "AUD-003",
      projectName: "Cross-Chain Bridge",
      client: "David Kim",
      auditor: "Maria Santos",
      status: "completed",
      priority: "critical",
      startDate: "2023-12-15",
      deadline: "2024-01-15",
      budget: 45000,
      vulnerabilities: 5,
      progress: 100
    },
    {
      id: "AUD-004",
      projectName: "Gaming DAO Token",
      client: "Lisa Wang",
      auditor: "James Wilson",
      status: "disputed",
      priority: "medium",
      startDate: "2024-01-05",
      deadline: "2024-02-05",
      budget: 12000,
      vulnerabilities: 2,
      progress: 75
    }
  ]);

  const filteredAudits = audits.filter(audit =>
    audit.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    audit.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    audit.auditor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "review":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "disputed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "review":
        return <Eye className="h-4 w-4 text-yellow-500" />;
      case "disputed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const handleAuditAction = (action: string, auditId: string, projectName: string) => {
    toast.success(`${action} action performed for "${projectName}"`);
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Audit Management</h2>
        <p className="text-muted-foreground">
          Monitor active audits, track progress, and manage disputes
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Audits</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search audits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Issues</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAudits.map((audit) => {
                const daysLeft = getDaysUntilDeadline(audit.deadline);
                return (
                  <TableRow key={audit.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{audit.projectName}</div>
                        <div className="text-sm text-muted-foreground">{audit.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div><strong>Client:</strong> {audit.client}</div>
                        <div><strong>Auditor:</strong> {audit.auditor}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(audit.status)}
                        <Badge className={getStatusColor(audit.status)}>
                          {audit.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(audit.priority)}>
                        {audit.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${audit.progress}%` }}
                          />
                        </div>
                        <span className="text-sm">{audit.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {audit.vulnerabilities > 0 && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                        <span>{audit.vulnerabilities} found</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className={daysLeft < 0 ? "text-red-600" : daysLeft < 7 ? "text-yellow-600" : ""}>
                          {daysLeft < 0 
                            ? `${Math.abs(daysLeft)} days overdue`
                            : daysLeft === 0 
                            ? "Due today"
                            : `${daysLeft} days left`
                          }
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${audit.budget.toLocaleString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => handleAuditAction("View", audit.id, audit.projectName)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleAuditAction("Message", audit.id, audit.projectName)}
                          >
                            Send Message
                          </DropdownMenuItem>
                          {audit.status === "disputed" && (
                            <DropdownMenuItem 
                              onClick={() => handleAuditAction("Mediate", audit.id, audit.projectName)}
                              className="text-blue-600"
                            >
                              Mediate Dispute
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleAuditAction("Escalate", audit.id, audit.projectName)}
                            className="text-red-600"
                          >
                            Escalate Issue
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
