
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
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
  Search, 
  MoreHorizontal, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Eye,
  Download
} from 'lucide-react';

export function AuditManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock audit data
  const audits = [
    {
      id: '1',
      projectName: 'DeFi Protocol V2',
      client: 'Alice Johnson',
      auditor: 'CyberSec Labs',
      status: 'completed',
      progress: 100,
      severity: 'medium',
      startDate: '2024-01-10',
      deadline: '2024-01-25',
      findings: 12,
      critical: 0,
      high: 2,
      medium: 7,
      low: 3
    },
    {
      id: '2',
      projectName: 'NFT Marketplace',
      client: 'Bob Smith',
      auditor: 'BlockShield Security',
      status: 'in_progress',
      progress: 65,
      severity: 'high',
      startDate: '2024-01-15',
      deadline: '2024-02-01',
      findings: 8,
      critical: 1,
      high: 3,
      medium: 4,
      low: 0
    },
    {
      id: '3',
      projectName: 'Cross-Chain Bridge',
      client: 'Carol Chen',
      auditor: 'ChainGuard Analytics',
      status: 'pending',
      progress: 0,
      severity: 'low',
      startDate: '2024-01-20',
      deadline: '2024-02-15',
      findings: 0,
      critical: 0,
      high: 0,
      medium: 0,
      low: 0
    },
    {
      id: '4',
      projectName: 'Yield Farming Protocol',
      client: 'David Wilson',
      auditor: 'SecureCode Labs',
      status: 'review',
      progress: 95,
      severity: 'critical',
      startDate: '2024-01-05',
      deadline: '2024-01-20',
      findings: 15,
      critical: 2,
      high: 5,
      medium: 6,
      low: 2
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'bg-green-100 text-green-800',
      in_progress: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      review: 'bg-purple-100 text-purple-800',
      disputed: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || variants.pending}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      critical: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    
    return (
      <Badge className={variants[severity as keyof typeof variants] || variants.low}>
        {severity}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'review':
        return <FileText className="h-4 w-4 text-purple-600" />;
      case 'disputed':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const filteredAudits = audits.filter(audit =>
    audit.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    audit.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    audit.auditor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Audit Management</h2>
          <p className="text-muted-foreground">
            Monitor and manage all security audits on the platform
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Audit Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Audits</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+12 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">156 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97.2%</div>
            <p className="text-xs text-muted-foreground">Quality assurance metric</p>
          </CardContent>
        </Card>
      </div>

      {/* Audit Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Audits</CardTitle>
          <CardDescription>
            Complete overview of all security audits and their current status
          </CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search audits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Findings</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAudits.map((audit) => (
                <TableRow key={audit.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{audit.projectName}</div>
                      <div className="text-sm text-muted-foreground">
                        {audit.client} → {audit.auditor}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(audit.status)}
                      {getStatusBadge(audit.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={audit.progress} className="w-16" />
                      <span className="text-sm font-medium">{audit.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getSeverityBadge(audit.severity)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{audit.findings} total</div>
                      <div className="text-muted-foreground">
                        {audit.critical > 0 && <span className="text-red-600">{audit.critical}C </span>}
                        {audit.high > 0 && <span className="text-orange-600">{audit.high}H </span>}
                        {audit.medium > 0 && <span className="text-yellow-600">{audit.medium}M </span>}
                        {audit.low > 0 && <span className="text-green-600">{audit.low}L</span>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{audit.deadline}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download Report
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Flag for Review
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
