
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  FileText, 
  Clock, 
  DollarSign, 
  User, 
  Github, 
  MessageSquare, 
  Upload,
  CheckCircle,
  AlertTriangle,
  Shield
} from 'lucide-react';

const AuditDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reportContent, setReportContent] = useState('');
  const [currentPhase, setCurrentPhase] = useState('preparation');

  // Mock audit data
  const auditData = {
    id: id || '101',
    title: 'GameFi Token Contract Audit',
    client: 'PlayToken',
    clientAvatar: '',
    budget: '$4,500',
    deadline: '2024-02-08',
    status: 'In Progress',
    progress: 75,
    description: 'Comprehensive security audit for a GameFi token contract including staking mechanisms, reward distribution, and governance features.',
    repository: 'https://github.com/playtoken/contracts',
    technologies: ['Solidity', 'OpenZeppelin', 'Hardhat', 'Chainlink'],
    scope: [
      'Smart contract security review',
      'Gas optimization analysis',
      'Access control validation',
      'Economic model assessment',
      'Integration testing review'
    ]
  };

  const auditPhases = [
    { id: 'preparation', name: 'Preparation', progress: 100, status: 'completed' },
    { id: 'review', name: 'Code Review', progress: 85, status: 'active' },
    { id: 'testing', name: 'Testing', progress: 45, status: 'active' },
    { id: 'reporting', name: 'Reporting', progress: 20, status: 'pending' },
    { id: 'completion', name: 'Completion', progress: 0, status: 'pending' }
  ];

  const findings = [
    {
      id: 1,
      severity: 'High',
      title: 'Reentrancy vulnerability in reward claim function',
      description: 'The claimReward function is susceptible to reentrancy attacks due to external call before state update.',
      status: 'Open',
      line: 145
    },
    {
      id: 2,
      severity: 'Medium',
      title: 'Gas optimization opportunity in batch operations',
      description: 'Loop operations can be optimized to reduce gas costs by up to 30%.',
      status: 'Fixed',
      line: 78
    },
    {
      id: 3,
      severity: 'Low',
      title: 'Missing event emission in admin functions',
      description: 'Administrative functions should emit events for better transparency.',
      status: 'Open',
      line: 234
    }
  ];

  const handlePhaseUpdate = (phase: string) => {
    setCurrentPhase(phase);
    toast.success(`Moved to ${phase} phase`);
  };

  const handleSubmitReport = () => {
    if (!reportContent.trim()) {
      toast.error('Please provide report content');
      return;
    }
    
    toast.success('Audit report submitted successfully!');
    navigate('/auditor/dashboard');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <>
      <Helmet>
        <title>{auditData.title} | Hawkly</title>
        <meta name="description" content={`Audit details for ${auditData.title}`} />
      </Helmet>

      <StandardLayout title="Audit Details" description="Comprehensive audit management and reporting">
        <div className="container py-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{auditData.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {auditData.client}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {auditData.budget}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Due {auditData.deadline}
                  </div>
                </div>
              </div>
              <Badge variant="outline">{auditData.status}</Badge>
            </div>

            {/* Progress Overview */}
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">{auditData.progress}%</span>
                </div>
                <Progress value={auditData.progress} className="h-2" />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="phases">Phases</TabsTrigger>
              <TabsTrigger value="findings">Findings</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="reporting">Reporting</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{auditData.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Repository</h4>
                      <Button variant="outline" size="sm" asChild>
                        <a href={auditData.repository} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          View Repository
                        </a>
                      </Button>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {auditData.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Audit Scope</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {auditData.scope.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="phases" className="space-y-4">
              <div className="grid gap-4">
                {auditPhases.map((phase) => (
                  <Card key={phase.id} className={`${currentPhase === phase.id ? 'ring-2 ring-primary' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{phase.name}</h3>
                        <div className="flex items-center gap-2">
                          {phase.status === 'completed' && <CheckCircle className="h-5 w-5 text-green-600" />}
                          {phase.status === 'active' && <Clock className="h-5 w-5 text-blue-600" />}
                          <Badge variant={phase.status === 'completed' ? 'default' : 
                                        phase.status === 'active' ? 'outline' : 'secondary'}>
                            {phase.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{phase.progress}%</span>
                        </div>
                        <Progress value={phase.progress} className="h-1" />
                      </div>
                      
                      {phase.status === 'pending' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="mt-3"
                          onClick={() => handlePhaseUpdate(phase.id)}
                        >
                          Start Phase
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="findings" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Security Findings</h2>
                <Badge variant="outline">{findings.length} findings</Badge>
              </div>
              
              <div className="grid gap-4">
                {findings.map((finding) => (
                  <Card key={finding.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{finding.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">Line {finding.line}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getSeverityColor(finding.severity)}>
                            {finding.severity}
                          </Badge>
                          <Badge variant={finding.status === 'Fixed' ? 'default' : 'destructive'}>
                            {finding.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{finding.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="communication" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Client Communication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm"><strong>PlayToken:</strong> Hi! Looking forward to the audit results. Any preliminary findings?</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                    
                    <div className="bg-primary/10 p-3 rounded-lg ml-8">
                      <p className="text-sm"><strong>You:</strong> Hello! I've identified a few issues including a critical reentrancy vulnerability. I'll have the detailed report ready by tomorrow.</p>
                      <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                    </div>
                    
                    <Textarea 
                      placeholder="Type your message..."
                      className="mt-4"
                    />
                    <Button size="sm">Send Message</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reporting" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Audit Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Report Template</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Use our structured template to ensure comprehensive coverage of all audit aspects.
                    </p>
                    
                    <Textarea
                      placeholder="Enter your audit findings, recommendations, and conclusions..."
                      value={reportContent}
                      onChange={(e) => setReportContent(e.target.value)}
                      rows={12}
                      className="font-mono text-sm"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button onClick={handleSubmitReport}>
                      Submit Final Report
                    </Button>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Files
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </StandardLayout>
    </>
  );
};

export default AuditDetails;
