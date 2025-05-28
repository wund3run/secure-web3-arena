
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon, 
  BarChart3, 
  Users, 
  Shield,
  TrendingUp,
  Clock
} from 'lucide-react';
import { format } from "date-fns";

export function PlatformReports() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const reportTypes = [
    {
      id: 'user-activity',
      name: 'User Activity Report',
      description: 'Detailed analysis of user engagement and platform usage',
      icon: <Users className="h-8 w-8 text-blue-600" />,
      lastGenerated: '2024-01-20',
      format: 'PDF, CSV',
      status: 'ready'
    },
    {
      id: 'audit-performance',
      name: 'Audit Performance Report',
      description: 'Comprehensive audit metrics and quality analysis',
      icon: <Shield className="h-8 w-8 text-green-600" />,
      lastGenerated: '2024-01-19',
      format: 'PDF, Excel',
      status: 'ready'
    },
    {
      id: 'financial-summary',
      name: 'Financial Summary',
      description: 'Revenue, transactions, and financial performance overview',
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      lastGenerated: '2024-01-18',
      format: 'PDF, CSV',
      status: 'generating'
    },
    {
      id: 'security-metrics',
      name: 'Security Metrics Report',
      description: 'Platform security status and vulnerability analysis',
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      lastGenerated: '2024-01-17',
      format: 'PDF',
      status: 'ready'
    }
  ];

  const recentReports = [
    {
      id: '1',
      name: 'Monthly Platform Report - January 2024',
      type: 'Comprehensive',
      generatedBy: 'System',
      generatedAt: '2024-01-20 09:00',
      size: '2.4 MB',
      downloads: 12,
      status: 'ready'
    },
    {
      id: '2',
      name: 'Audit Quality Analysis - Q4 2023',
      type: 'Audit Performance',
      generatedBy: 'Admin',
      generatedAt: '2024-01-15 14:30',
      size: '1.8 MB',
      downloads: 8,
      status: 'ready'
    },
    {
      id: '3',
      name: 'User Growth Metrics - December 2023',
      type: 'User Activity',
      generatedBy: 'System',
      generatedAt: '2024-01-10 10:15',
      size: '890 KB',
      downloads: 15,
      status: 'ready'
    },
    {
      id: '4',
      name: 'Financial Report - December 2023',
      type: 'Financial',
      generatedBy: 'Admin',
      generatedAt: '2024-01-08 16:45',
      size: '1.2 MB',
      downloads: 22,
      status: 'ready'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      ready: 'bg-green-100 text-green-800',
      generating: 'bg-blue-100 text-blue-800',
      failed: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || variants.ready}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Platform Reports</h2>
          <p className="text-muted-foreground">
            Generate and manage comprehensive platform analytics reports
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Report Generation Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {reportTypes.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {report.icon}
                  <div>
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </div>
                </div>
                {getStatusBadge(report.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Last Generated:</span>
                    <div className="font-medium">{report.lastGenerated}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Formats:</span>
                    <div className="font-medium">{report.format}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    disabled={report.status === 'generating'}
                    className="flex-1"
                  >
                    {report.status === 'generating' ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate
                      </>
                    )}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>
            Previously generated reports available for download
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <div className="text-sm text-muted-foreground">
                      {report.type} • Generated by {report.generatedBy} • {report.generatedAt}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {report.size} • {report.downloads} downloads
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(report.status)}
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Report Builder</CardTitle>
          <CardDescription>
            Create custom reports with specific metrics and date ranges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Report Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User Analytics</SelectItem>
                  <SelectItem value="audit">Audit Performance</SelectItem>
                  <SelectItem value="financial">Financial Summary</SelectItem>
                  <SelectItem value="security">Security Metrics</SelectItem>
                  <SelectItem value="comprehensive">Comprehensive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7">Last 7 days</SelectItem>
                  <SelectItem value="last30">Last 30 days</SelectItem>
                  <SelectItem value="last90">Last 90 days</SelectItem>
                  <SelectItem value="current_month">Current month</SelectItem>
                  <SelectItem value="last_month">Last month</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Format</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6">
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Generate Custom Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
