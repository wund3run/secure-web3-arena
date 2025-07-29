
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Eye, Plus } from 'lucide-react';
import { useAuditReports } from '@/hooks/useAuditReports';
import { format } from 'date-fns';

interface ReportGeneratorProps {
  auditRequestId: string;
  isAuditor: boolean;
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ auditRequestId, isAuditor }) => {
  const { reports, isLoading, generateReport, createReport } = useAuditReports(auditRequestId);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    title: '',
    report_type: 'preliminary' as 'preliminary' | 'interim' | 'final',
    content: '',
  });

  const handleCreateReport = async () => {
    if (!newReport.title) return;

    try {
      await createReport(newReport);
      setNewReport({ title: '', report_type: 'preliminary', content: '' });
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error('Failed to create report:', error);
    }
  };

  const handleGenerateReport = async (type: 'preliminary' | 'interim' | 'final') => {
    try {
      await generateReport(type);
    } catch (error) {
      console.error('Failed to generate report:', error);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'published':
        return 'default';
      case 'approved':
        return 'secondary';
      case 'review':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getReportTypeLabel = (type: string) => {
    switch (type) {
      case 'preliminary':
        return 'Preliminary';
      case 'interim':
        return 'Interim';
      case 'final':
        return 'Final';
      default:
        return type;
    }
  };

  if (isLoading) {
    return <div className="animate-pulse h-64 bg-muted rounded-lg" />;
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      {isAuditor && (
        <Card>
          <CardHeader>
            <CardTitle>Generate Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => handleGenerateReport('preliminary')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Preliminary Report
              </Button>
              <Button
                variant="outline"
                onClick={() => handleGenerateReport('interim')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Interim Report
              </Button>
              <Button
                variant="outline"
                onClick={() => handleGenerateReport('final')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Final Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reports List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Audit Reports
            </CardTitle>
            {isAuditor && (
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Report
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Report</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newReport.title}
                        onChange={(e) => setNewReport(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Report title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="report_type">Report Type</Label>
                      <Select
                        value={newReport.report_type}
                        onValueChange={(value: 'preliminary' | 'interim' | 'final') => 
                          setNewReport(prev => ({ ...prev, report_type: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="preliminary">Preliminary</SelectItem>
                          <SelectItem value="interim">Interim</SelectItem>
                          <SelectItem value="final">Final</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={newReport.content}
                        onChange={(e) => setNewReport(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Report content"
                        rows={4}
                      />
                    </div>
                    <Button onClick={handleCreateReport} className="w-full">
                      Create Report
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No reports generated yet</p>
            ) : (
              reports.map(report => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{report.title}</h4>
                      <Badge variant="outline">
                        {getReportTypeLabel(report.report_type)}
                      </Badge>
                      <Badge variant={getStatusBadgeVariant(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Created: {format(new Date(report.created_at), 'MMM dd, yyyy')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    {report.file_url && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
