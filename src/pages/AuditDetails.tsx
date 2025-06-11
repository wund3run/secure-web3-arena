
import React from 'react';
import { useParams } from 'react-router-dom';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Settings
} from 'lucide-react';

const AuditDetails = () => {
  const { id } = useParams<{ id: string }>();

  // Mock audit data - in real app this would come from API
  const audit = {
    id: id || '1',
    title: 'DeFi Protocol Security Audit',
    status: 'In Progress',
    priority: 'High',
    auditor: 'Alex Thompson',
    client: 'DeFi Innovations Ltd',
    startDate: '2024-01-15',
    deadline: '2024-02-15',
    progress: 65,
    findings: 8,
    criticalFindings: 2,
    description: 'Comprehensive security audit of the DeFi lending protocol smart contracts.',
    scope: [
      'Smart Contract Review',
      'Access Control Analysis',
      'Economic Model Validation',
      'Integration Testing'
    ],
    timeline: [
      { phase: 'Initial Review', status: 'completed', date: '2024-01-15' },
      { phase: 'Code Analysis', status: 'completed', date: '2024-01-22' },
      { phase: 'Testing Phase', status: 'in-progress', date: '2024-01-29' },
      { phase: 'Final Report', status: 'pending', date: '2024-02-10' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'default';
      case 'in progress': return 'secondary';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <StandardLayout
      title={`${audit.title} | Hawkly`}
      description="Detailed view of security audit progress and findings"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{audit.title}</h1>
            <div className="flex gap-2">
              <Badge variant={getStatusColor(audit.status)}>{audit.status}</Badge>
              <Badge variant={getPriorityColor(audit.priority)}>{audit.priority} Priority</Badge>
            </div>
          </div>
          <p className="text-muted-foreground">{audit.description}</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Auditor</p>
                  <p className="font-semibold">{audit.auditor}</p>
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
                  <p className="font-semibold">{audit.deadline}</p>
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
                  <p className="font-semibold">{audit.progress}%</p>
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
                  <p className="font-semibold">{audit.findings} ({audit.criticalFindings} critical)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="findings">Findings</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Audit Scope</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {audit.scope.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
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
                  <Button variant="outline" className="w-full justify-start">
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

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Audit Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {audit.timeline.map((phase, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${
                        phase.status === 'completed' ? 'bg-green-500' :
                        phase.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300'
                      }`} />
                      <div className="flex-1">
                        <h4 className="font-medium">{phase.phase}</h4>
                        <p className="text-sm text-muted-foreground">{phase.date}</p>
                      </div>
                      <Badge variant={getStatusColor(phase.status)}>{phase.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="findings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Findings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Findings Report</h3>
                  <p className="text-muted-foreground">
                    Detailed findings will appear here as the audit progresses.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Communication Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Communication History</h3>
                  <p className="text-muted-foreground">
                    All communications with the auditor will appear here.
                  </p>
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
