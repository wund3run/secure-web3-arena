
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
      case 'critical': return 'error';
      case 'high': return 'error';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
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
                  {auditData.deadline}
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary">{auditData.status}</Badge>
                </div>
              </div>
            </div>
            <Button variant="outline" asChild>
              <a href={auditData.repository} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                View Repo
              </a>
            </Button>
          </div>
          <p className="text-muted-foreground mb-4">{auditData.description}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {auditData.technologies.map((tech) => (
              <Badge key={tech} variant="outline">{tech}</Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {auditData.scope.map((item, idx) => (
              <Badge key={idx} variant="secondary">{item}</Badge>
            ))}
          </div>
        </div>
        {/* Phases */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Audit Phases</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {auditPhases.map((phase) => (
              <Card key={phase.id} className="flex-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{phase.name}</CardTitle>
                  <Badge variant={phase.status === 'completed' ? 'success' : phase.status === 'active' ? 'secondary' : 'outline'}>
                    {phase.status.charAt(0).toUpperCase() + phase.status.slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <Progress value={phase.progress} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* Findings */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Key Findings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {findings.map((finding) => (
              <Card key={finding.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{finding.title}</CardTitle>
                  <Badge variant={getSeverityColor(finding.severity)}>{finding.severity}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{finding.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span>Status: {finding.status}</span>
                    <span>Line: {finding.line}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* Report Submission */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Submit Audit Report</h2>
          <Textarea
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            placeholder="Paste your audit report here..."
            rows={6}
            className="mb-4"
          />
          <Button onClick={handleSubmitReport}>Submit Report</Button>
        </div>
      </div>
    </StandardLayout>
  );
};

export default AuditDetails;
