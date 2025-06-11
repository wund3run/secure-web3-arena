import React from 'react';
import { useParams } from 'react-router-dom';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Calendar, 
  User, 
  Shield, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Download,
  MessageSquare,
  Settings,
  TrendingUp
} from 'lucide-react';
import { useAuditDetails } from '@/hooks/useAuditDetails';
import { Input } from '@/components/ui/input';

const AuditDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    auditData, 
    isLoading, 
    activeTab, 
    setActiveTab,
    handleSendMessage,
    updateFindingStatus,
    milestones,
    reports,
    timeTracking
  } = useAuditDetails(id);

  if (isLoading) {
    return (
      <StandardLayout title="Loading... | Hawkly" description="Loading audit details">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </StandardLayout>
    );
  }

  if (!auditData) {
    return (
      <StandardLayout title="Audit Not Found | Hawkly" description="Audit not found">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Audit Not Found</h1>
          <p className="text-muted-foreground">The audit you're looking for doesn't exist.</p>
        </div>
      </StandardLayout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'default';
      case 'in_progress': return 'secondary';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <StandardLayout
      title={`${auditData.project_name} | Hawkly`}
      description="Detailed view of security audit progress and findings"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{auditData.project_name}</h1>
            <div className="flex gap-2">
              <Badge variant={getStatusColor(auditData.status || '')}>{auditData.status || 'Unknown'}</Badge>
              <Badge variant={getPriorityColor(auditData.priority_level || '')}>{auditData.priority_level || 'Normal'} Priority</Badge>
            </div>
          </div>
          <p className="text-muted-foreground">{auditData.project_description}</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Auditor</p>
                  <p className="font-semibold">{auditData.auditor?.full_name || 'Not assigned'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Deadline</p>
                  <p className="font-semibold">{auditData.deadline || 'TBD'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="font-semibold">{auditData.completion_percentage}%</p>
                  <Progress value={auditData.completion_percentage} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Findings</p>
                  <p className="font-semibold">
                    {auditData.findings.length} ({auditData.findings_count.critical} critical)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="findings">Findings</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="time">Time Tracking</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Blockchain:</span>
                    <span className="font-medium">{auditData.blockchain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contract Count:</span>
                    <span className="font-medium">{auditData.contract_count || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lines of Code:</span>
                    <span className="font-medium">{auditData.lines_of_code || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security Score:</span>
                    <span className="font-medium">{auditData.security_score}/100</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    View Latest Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download Documents
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleSendMessage('Hello, I have a question about this audit.')}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message Auditor
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Audit Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                {milestones.isLoading ? (
                  <div className="text-center py-8">Loading milestones...</div>
                ) : milestones.milestones.length > 0 ? (
                  <div className="space-y-4">
                    {milestones.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className={`w-3 h-3 rounded-full ${
                          milestone.status === 'completed' ? 'bg-green-500' :
                          milestone.status === 'in_progress' ? 'bg-yellow-500' : 'bg-gray-300'
                        }`} />
                        <div className="flex-1">
                          <h4 className="font-medium">{milestone.title}</h4>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                          {milestone.due_date && (
                            <p className="text-xs text-muted-foreground">Due: {milestone.due_date}</p>
                          )}
                        </div>
                        <Badge variant={getStatusColor(milestone.status)}>{milestone.status}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No Milestones Yet</h3>
                    <p className="text-muted-foreground">
                      Milestones will appear here as the audit progresses.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="findings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Findings</CardTitle>
              </CardHeader>
              <CardContent>
                {auditData.findings.length > 0 ? (
                  <div className="space-y-4">
                    {auditData.findings.map((finding) => (
                      <div key={finding.id} className="p-4 border rounded-lg">
                        <h4 className="font-medium">{finding.title}</h4>
                        <p className="text-sm text-muted-foreground">{finding.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant={getStatusColor(finding.status)}>{finding.status}</Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No Findings Yet</h3>
                    <p className="text-muted-foreground">
                      Detailed findings will appear here as the audit progresses.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Audit Reports</CardTitle>
              </CardHeader>
              <CardContent>
                {reports.isLoading ? (
                  <div className="text-center py-8">Loading reports...</div>
                ) : reports.reports.length > 0 ? (
                  <div className="space-y-4">
                    {reports.reports.map((report) => (
                      <div key={report.id} className="p-4 border rounded-lg">
                        <h4 className="font-medium">{report.title}</h4>
                        <p className="text-sm text-muted-foreground">Type: {report.report_type}</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant={getStatusColor(report.status)}>{report.status}</Badge>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No Reports Available</h3>
                    <p className="text-muted-foreground">
                      Reports will be generated and available here as the audit progresses.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Time Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                {timeTracking.isLoading ? (
                  <div className="text-center py-8">Loading time entries...</div>
                ) : timeTracking.timeEntries.length > 0 ? (
                  <div className="space-y-4">
                    {timeTracking.timeEntries.map((entry) => (
                      <div key={entry.id} className="p-4 border rounded-lg">
                        <h4 className="font-medium">{entry.description || 'No Description'}</h4>
                        <p className="text-sm text-muted-foreground">Date: {entry.date}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span>Hours: {entry.hours}</span>
                        </div>
                      </div>
                    ))}
                    <div className="text-right font-semibold">
                      Total Hours: {timeTracking.totalHours}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No Time Entries Yet</h3>
                    <p className="text-muted-foreground">
                      Time entries will appear here as the audit progresses.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Communication Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditData.status_updates.map((update) => (
                    <div key={update.id} className="p-4 border rounded-lg">
                      <h4 className="font-medium">{update.title}</h4>
                      <p className="text-sm text-muted-foreground">{update.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(update.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Input type="text" placeholder="Type your message here..." />
                  <Button className="mt-2">Send Message</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StandardLayout>
  );
};

export default AuditDetails;
