
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  ChevronRight, 
  AlertCircle, 
  Clock, 
  Calendar,
  CheckCircle2, 
  User, 
  FileText, 
  MessageCircle,
  Eye,
  Download
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { EnhancedTooltip } from "@/components/ui/enhanced-tooltip";

// Create mock data for our dashboard
const mockAuditData = {
  id: "audit-2023-05-789",
  name: "DeFi Lending Protocol",
  provider: {
    id: "provider-123",
    name: "Elite Security Team",
    avatar: "https://i.pravatar.cc/100?img=33"
  },
  status: "in-progress", // pending, in-progress, reviewing, completed
  progress: 68,
  startDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
  estimatedCompletionDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  phases: [
    {
      id: "phase-1",
      name: "Setup & Preparation",
      status: "completed",
      completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      items: [
        { name: "Repository access granted", completed: true },
        { name: "Initial documentation review", completed: true },
        { name: "Environment setup", completed: true },
        { name: "Audit scope finalized", completed: true }
      ]
    },
    {
      id: "phase-2",
      name: "Initial Analysis",
      status: "completed",
      completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      items: [
        { name: "Static code analysis", completed: true },
        { name: "Architecture review", completed: true },
        { name: "Control flow analysis", completed: true },
        { name: "Dependency review", completed: true }
      ]
    },
    {
      id: "phase-3",
      name: "Deep Dive Analysis",
      status: "in-progress",
      completedAt: null,
      items: [
        { name: "Manual code review", completed: true },
        { name: "Business logic analysis", completed: true },
        { name: "Access control testing", completed: true },
        { name: "Economic model testing", completed: false }
      ]
    },
    {
      id: "phase-4",
      name: "Verification & Reporting",
      status: "pending",
      completedAt: null,
      items: [
        { name: "Vulnerability verification", completed: false },
        { name: "Draft report creation", completed: false },
        { name: "Team review", completed: false },
        { name: "Final report delivery", completed: false }
      ]
    }
  ],
  findings: [
    {
      id: "finding-1",
      severity: "high",
      title: "Reentrancy vulnerability in withdraw function",
      status: "confirmed",
      description: "The withdraw function does not follow the checks-effects-interactions pattern, allowing for a potential reentrancy attack.",
      location: "contracts/LendingPool.sol:156-172",
      discoveredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: "finding-2",
      severity: "medium",
      title: "Lack of input validation in setInterestRate",
      status: "confirmed",
      description: "The function accepts any value without validating against maximum allowed rates, potentially allowing extreme settings.",
      location: "contracts/InterestModel.sol:45-51",
      discoveredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: "finding-3",
      severity: "low",
      title: "Inconsistent decimal handling",
      status: "pending-review",
      description: "Different parts of the system handle decimals differently, which could lead to calculation errors.",
      location: "Multiple contracts",
      discoveredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ],
  communications: [
    {
      id: "comm-1",
      sender: "auditor",
      message: "Initial review completed. We've identified a few potential issues and would like to discuss them in our next meeting.",
      timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
    },
    {
      id: "comm-2",
      sender: "client",
      message: "Thank you for the update. We're available for a meeting tomorrow at 2 PM UTC. Will that work for you?",
      timestamp: new Date(Date.now() - 7.5 * 24 * 60 * 60 * 1000)
    },
    {
      id: "comm-3",
      sender: "auditor",
      message: "We've identified a high severity issue in the withdraw function. Please see the findings section for more details. We recommend addressing this as soon as possible.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: "comm-4",
      sender: "client",
      message: "We're looking into the finding now. Will provide an update by tomorrow.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  ]
};

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'reviewing':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusProgress = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 0;
    case 'in-progress':
      return 50;
    case 'completed':
      return 100;
    default:
      return 25;
  }
};

export function AuditProgressDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{mockAuditData.name}</h1>
            <Badge className={getStatusColor(mockAuditData.status)}>
              {mockAuditData.status === 'in-progress' ? 'In Progress' : 
               mockAuditData.status === 'completed' ? 'Completed' :
               mockAuditData.status === 'reviewing' ? 'Under Review' : 'Pending'}
            </Badge>
          </div>
          <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {mockAuditData.provider.name}
            </span>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Started {formatDistanceToNow(mockAuditData.startDate)} ago
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {mockAuditData.status !== 'completed' ? 
                `Estimated completion in ${formatDistanceToNow(mockAuditData.estimatedCompletionDate)}` : 
                `Completed on ${mockAuditData.estimatedCompletionDate.toLocaleDateString()}`}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            Message Auditor
          </Button>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            <Eye className="h-4 w-4 mr-1" />
            Live Updates
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Audit Progress</CardTitle>
          <CardDescription>
            Overall completion: {mockAuditData.progress}%
          </CardDescription>
          <Progress value={mockAuditData.progress} className="h-2 mt-2" />
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="findings">Findings</TabsTrigger>
              <TabsTrigger value="communications">Communications</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              {mockAuditData.phases.map((phase, index) => (
                <Card key={phase.id} className={`border ${phase.status === 'completed' ? 'bg-muted/30' : ''}`}>
                  <CardHeader className="py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          phase.status === 'completed' ? 'bg-green-100 text-green-700' : 
                          phase.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {phase.status === 'completed' ? 
                            <CheckCircle2 className="h-4 w-4" /> : 
                            phase.status === 'in-progress' ? 
                              index + 1 : 
                              index + 1
                          }
                        </div>
                        <h3 className="font-medium">{phase.name}</h3>
                      </div>
                      <Badge variant="outline" className={
                        phase.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : 
                        phase.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                        'bg-gray-50 text-gray-500 border-gray-200'
                      }>
                        {phase.status === 'completed' ? 'Completed' : 
                         phase.status === 'in-progress' ? 'In Progress' : 
                         'Pending'}
                      </Badge>
                    </div>
                    
                    {phase.completedAt && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Completed {formatDistanceToNow(phase.completedAt)} ago
                      </p>
                    )}
                  </CardHeader>
                  
                  <CardContent className="py-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {phase.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            item.completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {item.completed ? <CheckCircle2 className="h-3 w-3" /> : i + 1}
                          </div>
                          <span className={item.completed ? "text-muted-foreground" : ""}>
                            {item.name}
                          </span>
                          {item.completed && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500 ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="findings" className="space-y-4">
              {mockAuditData.findings.length === 0 ? (
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>All Clear!</AlertTitle>
                  <AlertDescription>
                    No security issues have been identified yet. The audit is still in progress.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <div className="flex justify-end mb-2">
                    <Button variant="outline" size="sm" className="h-8">
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Export Findings
                    </Button>
                  </div>
                  
                  {mockAuditData.findings.map(finding => (
                    <Card key={finding.id}>
                      <CardHeader className="py-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className={getSeverityColor(finding.severity)}>
                              {finding.severity.charAt(0).toUpperCase() + finding.severity.slice(1)}
                            </Badge>
                            <h3 className="font-medium">{finding.title}</h3>
                          </div>
                          <Badge variant="outline" className={
                            finding.status === 'confirmed' ? 'bg-red-50 text-red-700 border-red-200' : 
                            'bg-amber-50 text-amber-700 border-amber-200'
                          }>
                            {finding.status === 'confirmed' ? 'Confirmed' : 'Under Review'}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Discovered {formatDistanceToNow(finding.discoveredAt)} ago
                        </p>
                      </CardHeader>
                      
                      <CardContent className="py-2">
                        <p className="text-sm text-muted-foreground mb-2">
                          {finding.description}
                        </p>
                        <div className="bg-muted/50 text-xs p-2 rounded border font-mono">
                          {finding.location}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </TabsContent>
            
            <TabsContent value="communications" className="space-y-4">
              <div className="flex justify-end mb-2 gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  Schedule Meeting
                </Button>
                <Button size="sm" className="h-8">
                  New Message
                </Button>
              </div>
              
              <div className="space-y-4">
                {mockAuditData.communications.map(comm => (
                  <Card key={comm.id}>
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          comm.sender === 'auditor' ? 'bg-primary/10' : 'bg-secondary/10'
                        }`}>
                          {comm.sender === 'auditor' ? 'A' : 'C'}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">
                              {comm.sender === 'auditor' ? 'Auditor' : 'Your Team'}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(comm.timestamp)} ago
                            </span>
                          </div>
                          <p className="text-sm">
                            {comm.message}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-4">
              <div className="flex justify-end mb-2">
                <Button size="sm" className="h-8">
                  Upload Document
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded mr-3">
                        <FileText className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Initial Assessment</h4>
                        <p className="text-xs text-muted-foreground">Added 10 days ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded mr-3">
                        <FileText className="h-5 w-5 text-green-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Architecture Review</h4>
                        <p className="text-xs text-muted-foreground">Added 5 days ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-amber-100 p-2 rounded mr-3">
                        <FileText className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium">Intermediate Report</h4>
                          <Badge className="ml-2 text-xs h-5 bg-amber-100 text-amber-800 border-amber-200">
                            Draft
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Added 2 days ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Next steps section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Action Required</AlertTitle>
              <AlertDescription>
                Please review the latest finding and provide feedback within 48 hours to maintain the audit timeline.
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 border rounded-md">
              <div className="flex items-center">
                <div className="bg-blue-100 p-1.5 rounded-full mr-3">
                  <Calendar className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-medium">Progress Review Meeting</h4>
                  <p className="text-xs text-muted-foreground">Tomorrow, 3:00 PM UTC</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="whitespace-nowrap">
                Join Meeting
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
