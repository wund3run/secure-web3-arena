
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FileText, Download, Calendar, Search, Filter, ArrowUpDown, ChevronDown } from "lucide-react";

// Define report types
interface SecurityReport {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'in-progress' | 'scheduled';
  type: 'vulnerability' | 'threat' | 'audit' | 'compliance';
  score: number;
  size: string;
}

export function SecurityReports() {
  // Sample reports data
  const reports: SecurityReport[] = [
    {
      id: "REP-001",
      title: "Comprehensive Smart Contract Audit",
      date: "2025-05-10T14:30:00Z",
      status: "completed",
      type: "audit",
      score: 82,
      size: "8.2 MB"
    },
    {
      id: "REP-002",
      title: "Weekly Vulnerability Scan",
      date: "2025-05-08T09:15:00Z",
      status: "completed",
      type: "vulnerability",
      score: 88,
      size: "3.4 MB"
    },
    {
      id: "REP-003",
      title: "Monthly Threat Assessment",
      date: "2025-05-01T16:45:00Z",
      status: "completed",
      type: "threat",
      score: 76,
      size: "5.1 MB"
    },
    {
      id: "REP-004",
      title: "Quarterly Compliance Review",
      date: "2025-04-15T11:00:00Z",
      status: "completed",
      type: "compliance",
      score: 91,
      size: "10.6 MB"
    },
    {
      id: "REP-005",
      title: "Scheduled Gas Optimization Analysis",
      date: "2025-05-20T10:00:00Z",
      status: "scheduled",
      type: "audit",
      score: 0,
      size: "N/A"
    }
  ];

  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredReports = reports.filter(report => {
    const matchesSearch = searchQuery === "" || 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === "all" || report.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'vulnerability': return 'Vulnerability';
      case 'threat': return 'Threat Assessment';
      case 'audit': return 'Audit';
      case 'compliance': return 'Compliance';
      default: return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case 'scheduled':
        return <Badge variant="outline">Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 text-primary mr-2" />
                Security Reports
              </CardTitle>
              <CardDescription>
                View and download security reports and assessments
              </CardDescription>
            </div>
            <Button className="w-full sm:w-auto">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule New Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <span>{filterType === "all" ? "All Types" : `Filter: ${getTypeLabel(filterType)}`}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="vulnerability">Vulnerability</SelectItem>
                  <SelectItem value="threat">Threat Assessment</SelectItem>
                  <SelectItem value="audit">Audit</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Score</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No reports found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-xs text-muted-foreground">{report.id}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(report.date)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {getTypeLabel(report.type)}
                      </TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {report.status === "completed" ? (
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              report.score >= 80 ? "bg-green-500" : 
                              report.score >= 60 ? "bg-yellow-500" : "bg-red-500"
                            }`}></div>
                            <span>{report.score}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant={report.status === "completed" ? "default" : "outline"}
                          size="sm"
                          disabled={report.status !== "completed"}
                          className="w-full sm:w-auto"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground border-t p-4">
          <div>Displaying {filteredReports.length} of {reports.length} reports</div>
          {reports.length > filteredReports.length && (
            <Button variant="link" className="p-0 h-auto" onClick={() => {
              setFilterType("all");
              setSearchQuery("");
            }}>
              Clear filters
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
