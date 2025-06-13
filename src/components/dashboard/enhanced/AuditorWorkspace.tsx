
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  Code, 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  Calendar,
  Target,
  Activity
} from 'lucide-react';

interface AuditPhase {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  progress: number;
  estimatedHours: number;
  actualHours: number;
  deliverables: string[];
}

interface ActiveAudit {
  id: string;
  projectName: string;
  clientName: string;
  totalValue: number;
  deadline: string;
  complexity: 'Low' | 'Medium' | 'High' | 'Critical';
  currentPhase: string;
  overallProgress: number;
  phases: AuditPhase[];
  riskScore: number;
  findings: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

// Mock data - this would come from your API
const mockActiveAudits: ActiveAudit[] = [
  {
    id: '1',
    projectName: 'DeFi Yield Aggregator V2',
    clientName: 'YieldMax Protocol',
    totalValue: 15000,
    deadline: '2025-01-30',
    complexity: 'High',
    currentPhase: 'Code Analysis',
    overallProgress: 45,
    riskScore: 7.2,
    findings: { critical: 2, high: 5, medium: 8, low: 12 },
    phases: [
      {
        id: '1',
        name: 'Initial Review',
        status: 'completed',
        progress: 100,
        estimatedHours: 8,
        actualHours: 6,
        deliverables: ['Project scope document', 'Initial risk assessment']
      },
      {
        id: '2',
        name: 'Code Analysis',
        status: 'in_progress',
        progress: 65,
        estimatedHours: 24,
        actualHours: 16,
        deliverables: ['Static analysis report', 'Manual code review']
      },
      {
        id: '3',
        name: 'Vulnerability Assessment',
        status: 'pending',
        progress: 0,
        estimatedHours: 16,
        actualHours: 0,
        deliverables: ['Vulnerability report', 'Attack vector analysis']
      },
      {
        id: '4',
        name: 'Report Generation',
        status: 'pending',
        progress: 0,
        estimatedHours: 12,
        actualHours: 0,
        deliverables: ['Final audit report', 'Executive summary']
      }
    ]
  }
];

export function AuditorWorkspace() {
  const [selectedAudit, setSelectedAudit] = useState<ActiveAudit | null>(mockActiveAudits[0] || null);
  const [activeTab, setActiveTab] = useState('overview');

  const getPhaseStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'blocked': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const getComplexityBadge = (complexity: string) => {
    const variants = {
      'Low': 'secondary',
      'Medium': 'default',
      'High': 'destructive',
      'Critical': 'destructive'
    } as const;
    return variants[complexity as keyof typeof variants] || 'secondary';
  };

  if (!selectedAudit) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No Active Audits</h3>
          <p className="text-muted-foreground">You don't have any active audits at the moment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Audit Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{selectedAudit.projectName}</CardTitle>
              <p className="text-muted-foreground">Client: {selectedAudit.clientName}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={getComplexityBadge(selectedAudit.complexity)}>
                {selectedAudit.complexity}
              </Badge>
              <div className="text-right">
                <p className="text-2xl font-bold">${selectedAudit.totalValue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Progress: {selectedAudit.overallProgress}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Due: {new Date(selectedAudit.deadline).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-red-500" />
              <span className="text-sm">Risk Score: {selectedAudit.riskScore}/10</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm">Phase: {selectedAudit.currentPhase}</span>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={selectedAudit.overallProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Main Workspace */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="phases">Audit Phases</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="tools">Analysis Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Time Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedAudit.phases.map((phase) => (
                    <div key={phase.id} className="flex items-center justify-between">
                      <span className="text-sm">{phase.name}</span>
                      <div className="text-right">
                        <span className="text-sm font-medium">
                          {phase.actualHours}h / {phase.estimatedHours}h
                        </span>
                        <div className="text-xs text-muted-foreground">
                          {phase.actualHours <= phase.estimatedHours ? 'On track' : 'Over estimate'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Findings Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">{selectedAudit.findings.critical}</div>
                    <div className="text-xs text-muted-foreground">Critical</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">{selectedAudit.findings.high}</div>
                    <div className="text-xs text-muted-foreground">High</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">{selectedAudit.findings.medium}</div>
                    <div className="text-xs text-muted-foreground">Medium</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">{selectedAudit.findings.low}</div>
                    <div className="text-xs text-muted-foreground">Low</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="phases" className="space-y-4">
          <div className="space-y-4">
            {selectedAudit.phases.map((phase, index) => (
              <Card key={phase.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getPhaseStatusColor(phase.status)}`} />
                      <CardTitle className="text-lg">{phase.name}</CardTitle>
                      <Badge variant="outline">{phase.status.replace('_', ' ')}</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Phase {index + 1} of {selectedAudit.phases.length}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{phase.progress}%</span>
                      </div>
                      <Progress value={phase.progress} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Estimated: </span>
                        <span>{phase.estimatedHours}h</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Actual: </span>
                        <span>{phase.actualHours}h</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Deliverables</h4>
                      <ul className="space-y-1">
                        {phase.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {phase.status === 'in_progress' && (
                        <Button size="sm">
                          <Clock className="h-4 w-4 mr-2" />
                          Track Time
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="findings">
          <Card>
            <CardHeader>
              <CardTitle>Security Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Detailed findings view would be implemented here with vulnerability details,
                code snippets, and remediation recommendations.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Static Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Run automated security analysis tools
                </p>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline" size="sm">Run Slither</Button>
                  <Button className="w-full" variant="outline" size="sm">Run Mythril</Button>
                  <Button className="w-full" variant="outline" size="sm">Run Securify</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Checks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Specialized security verification tools
                </p>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline" size="sm">Gas Optimization</Button>
                  <Button className="w-full" variant="outline" size="sm">Reentrancy Check</Button>
                  <Button className="w-full" variant="outline" size="sm">Access Control</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate reports and documentation
                </p>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline" size="sm">Generate Report</Button>
                  <Button className="w-full" variant="outline" size="sm">Executive Summary</Button>
                  <Button className="w-full" variant="outline" size="sm">Client Presentation</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
