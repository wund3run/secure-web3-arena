
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Eye, Plus, Upload } from 'lucide-react';
import { useAuditReports, type AuditReport } from '@/hooks/useAuditReports';
import { format } from 'date-fns';

interface ReportGeneratorProps {
  auditRequestId: string;
  isAuditor: boolean;
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ auditRequestId, isAuditor }) => {
  const { reports, loading, createReport, updateReport, publishReport } = useAuditReports(auditRequestId);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    report_type: '' as AuditReport['report_type'] | '',
    title: '',
    content: {},
    template_used: '',
  });

  const getStatusColor = (status: AuditReport['status']) => {
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

  const getTypeColor = (type: AuditReport['report_type']) => {
    switch (type) {
      case 'final':
        return 'default';
      case 'interim':
        return 'secondary';
      case 'preliminary':
        return 'outline';
      case 'executive_summary':
        return 'outline';
    }
  };

  const handleCreateReport = async () => {
    if (!newReport.report_type || !newReport.title) return;

    try {
      await createReport({
        audit_request_id: auditRequestId,
        report_type: newReport.report_type,
        title: newReport.title,
        version: '1.0',
        status: 'draft',
        content: newReport.content,
        template_used: newReport.template_used,
      });

      setNewReport({
        report_type: '' as AuditReport['report_type'] | '',
        title: '',
        content: {},
        template_used: '',
      });
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error('Failed to create report:', error);
    }
  };

  const handleStatusChange = async (reportId: string, newStatus: AuditReport['status']) => {
    await updateReport(reportId, { status: newStatus });
  };

  const handlePublish = async (reportId: string) => {
    await publishReport(reportId);
  };

  if (loading) {
    return <div className="animate-pulse space-y-4">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="h-24 bg-muted rounded-lg" />
      ))}
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
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
                  <Button>
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
                      <Label htmlFor="report_type">Report Type</Label>
                      <Select value={newReport.report_type} onValueChange={(value) => setNewReport(prev => ({ ...prev, report_type: value as AuditReport['report_type'] }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="preliminary">Preliminary Report</SelectItem>
                          <SelectItem value="interim">Interim Report</SelectItem>
                          <SelectItem value="final">Final Report</SelectItem>
                          <SelectItem value="executive_summary">Executive Summary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
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
                      <Label htmlFor="template">Template (Optional)</Label>
                      <Select value={newReport.template_used} onValueChange={(value) => setNewReport(prev => ({ ...prev, template_used: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard Audit Report</SelectItem>
                          <SelectItem value="executive">Executive Summary</SelectItem>
                          <SelectItem value="technical">Technical Deep Dive</SelectItem>
                          <SelectItem value="compliance">Compliance Report</SelectItem>
                        </SelectContent>
                      </Select>
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
          <p className="text-sm text-muted-foreground">
            Generate and manage audit reports throughout the audit lifecycle
          </p>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No reports generated yet</p>
            </CardContent>
          </Card>
        ) : (
          reports.map(report => (
            <Card key={report.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{report.title}</h3>
                      <Badge variant={getTypeColor(report.report_type)}>
                        {report.report_type.replace('_', ' ')}
                      </Badge>
                      <Badge variant={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span>Version {report.version}</span>
                      <span>Created {format(new Date(report.created_at), 'MMM dd, yyyy')}</span>
                      {report.published_at && (
                        <span>Published {format(new Date(report.published_at), 'MMM dd, yyyy')}</span>
                      )}
                    </div>
                    
                    {report.template_used && (
                      <p className="text-sm text-muted-foreground">
                        Template: {report.template_used}
                      </p>
                    )}
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
                    
                    {isAuditor && (
                      <>
                        {report.status !== 'published' && (
                          <Select
                            value={report.status}
                            onValueChange={(value) => handleStatusChange(report.id, value as AuditReport['status'])}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="review">Review</SelectItem>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                        
                        {report.status === 'approved' && (
                          <Button onClick={() => handlePublish(report.id)}>
                            <Upload className="h-4 w-4 mr-2" />
                            Publish
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
