
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Users,
  FileText,
  MessageSquare,
  DollarSign,
  Shield
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  currentTime: number;
  optimizedTime: number;
  efficiency: number;
  bottlenecks: string[];
  optimizations: string[];
  dependencies: string[];
  stakeholders: string[];
}

interface WorkflowData {
  auditorWorkflow: WorkflowStep[];
  projectOwnerWorkflow: WorkflowStep[];
  sharedWorkflow: WorkflowStep[];
}

export function WorkflowOptimization() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<'auditor' | 'projectOwner' | 'shared'>('auditor');

  const workflowData: WorkflowData = {
    auditorWorkflow: [
      {
        id: 'opportunity-discovery',
        name: 'Opportunity Discovery',
        description: 'Auditor discovers and evaluates new project opportunities',
        currentTime: 45,
        optimizedTime: 25,
        efficiency: 76,
        bottlenecks: ['Manual browsing', 'Limited search filters'],
        optimizations: ['AI-powered matching', 'Smart notifications', 'Enhanced filtering'],
        dependencies: ['Platform access', 'Profile completion'],
        stakeholders: ['Auditor', 'Platform']
      },
      {
        id: 'proposal-creation',
        name: 'Proposal Creation',
        description: 'Creating and submitting proposals for projects',
        currentTime: 120,
        optimizedTime: 80,
        efficiency: 68,
        bottlenecks: ['Template limitations', 'Manual cost calculations'],
        optimizations: ['Smart templates', 'Auto-pricing', 'Reusable components'],
        dependencies: ['Project requirements', 'Auditor expertise'],
        stakeholders: ['Auditor', 'Client']
      },
      {
        id: 'client-communication',
        name: 'Client Communication',
        description: 'Initial discussions and requirement clarification',
        currentTime: 90,
        optimizedTime: 60,
        efficiency: 82,
        bottlenecks: ['Scattered communication', 'Delayed responses'],
        optimizations: ['Unified messaging', 'Real-time chat', 'Status indicators'],
        dependencies: ['Client availability', 'Clear requirements'],
        stakeholders: ['Auditor', 'Client', 'Platform']
      },
      {
        id: 'contract-setup',
        name: 'Contract & Escrow Setup',
        description: 'Finalizing terms and setting up secure payment',
        currentTime: 60,
        optimizedTime: 30,
        efficiency: 89,
        bottlenecks: ['Manual contract review', 'Payment setup complexity'],
        optimizations: ['Smart contracts', 'Automated escrow', 'Quick setup wizard'],
        dependencies: ['Terms agreement', 'Payment method'],
        stakeholders: ['Auditor', 'Client', 'Platform', 'Escrow system']
      },
      {
        id: 'audit-execution',
        name: 'Audit Execution',
        description: 'Performing the actual security audit work',
        currentTime: 2160,
        optimizedTime: 1800,
        efficiency: 91,
        bottlenecks: ['Tool integration', 'Progress tracking'],
        optimizations: ['Integrated tools', 'Milestone tracking', 'Automated reporting'],
        dependencies: ['Code access', 'Client collaboration'],
        stakeholders: ['Auditor', 'Client']
      },
      {
        id: 'deliverable-submission',
        name: 'Deliverable Submission',
        description: 'Preparing and submitting final audit reports',
        currentTime: 180,
        optimizedTime: 120,
        efficiency: 85,
        bottlenecks: ['Report formatting', 'Version control'],
        optimizations: ['Report templates', 'Auto-formatting', 'Version management'],
        dependencies: ['Audit completion', 'Report review'],
        stakeholders: ['Auditor', 'Client']
      }
    ],
    projectOwnerWorkflow: [
      {
        id: 'need-identification',
        name: 'Security Need Identification',
        description: 'Recognizing and defining security audit requirements',
        currentTime: 240,
        optimizedTime: 120,
        efficiency: 71,
        bottlenecks: ['Unclear requirements', 'Limited guidance'],
        optimizations: ['Assessment wizard', 'Requirements checklist', 'Expert consultation'],
        dependencies: ['Project scope', 'Team input'],
        stakeholders: ['Project Owner', 'Development Team']
      },
      {
        id: 'platform-research',
        name: 'Platform Research',
        description: 'Researching and evaluating audit service providers',
        currentTime: 180,
        optimizedTime: 90,
        efficiency: 78,
        bottlenecks: ['Information overload', 'Comparison difficulty'],
        optimizations: ['Curated recommendations', 'Comparison tools', 'Expert reviews'],
        dependencies: ['Budget clarity', 'Timeline requirements'],
        stakeholders: ['Project Owner', 'Stakeholders']
      },
      {
        id: 'auditor-selection',
        name: 'Auditor Selection',
        description: 'Reviewing and selecting qualified auditors',
        currentTime: 300,
        optimizedTime: 180,
        efficiency: 74,
        bottlenecks: ['Limited auditor information', 'Complex evaluation'],
        optimizations: ['Enhanced profiles', 'Rating system', 'Interview scheduling'],
        dependencies: ['Auditor availability', 'Proposal quality'],
        stakeholders: ['Project Owner', 'Auditors', 'Team']
      },
      {
        id: 'project-setup',
        name: 'Project Setup & Initiation',
        description: 'Setting up project parameters and starting the audit',
        currentTime: 120,
        optimizedTime: 60,
        efficiency: 83,
        bottlenecks: ['Access management', 'Documentation preparation'],
        optimizations: ['Quick setup wizard', 'Auto-documentation', 'Access templates'],
        dependencies: ['Team coordination', 'Technical setup'],
        stakeholders: ['Project Owner', 'Auditor', 'Dev Team']
      },
      {
        id: 'progress-monitoring',
        name: 'Progress Monitoring',
        description: 'Tracking audit progress and maintaining communication',
        currentTime: 480,
        optimizedTime: 300,
        efficiency: 87,
        bottlenecks: ['Manual status updates', 'Communication gaps'],
        optimizations: ['Real-time dashboards', 'Automated updates', 'Milestone alerts'],
        dependencies: ['Auditor updates', 'Milestone completion'],
        stakeholders: ['Project Owner', 'Auditor', 'Stakeholders']
      },
      {
        id: 'review-feedback',
        name: 'Review & Feedback',
        description: 'Reviewing deliverables and providing feedback',
        currentTime: 240,
        optimizedTime: 150,
        efficiency: 79,
        bottlenecks: ['Complex reports', 'Technical jargon'],
        optimizations: ['Executive summaries', 'Visual reports', 'Q&A sessions'],
        dependencies: ['Report delivery', 'Technical understanding'],
        stakeholders: ['Project Owner', 'Auditor', 'Technical Team']
      }
    ],
    sharedWorkflow: [
      {
        id: 'onboarding',
        name: 'Platform Onboarding',
        description: 'Initial platform setup and profile creation',
        currentTime: 45,
        optimizedTime: 20,
        efficiency: 82,
        bottlenecks: ['Complex forms', 'Manual verification'],
        optimizations: ['Progressive onboarding', 'Auto-verification', 'Smart defaults'],
        dependencies: ['User motivation', 'Document availability'],
        stakeholders: ['New Users', 'Platform']
      },
      {
        id: 'matching-algorithm',
        name: 'AI Matching Process',
        description: 'Intelligent matching of projects with auditors',
        currentTime: 30,
        optimizedTime: 5,
        efficiency: 89,
        bottlenecks: ['Algorithm complexity', 'Data quality'],
        optimizations: ['ML improvements', 'Real-time processing', 'Feedback loops'],
        dependencies: ['Profile completeness', 'Preference data'],
        stakeholders: ['All Users', 'AI System']
      },
      {
        id: 'communication',
        name: 'Platform Communication',
        description: 'In-platform messaging and collaboration',
        currentTime: 15,
        optimizedTime: 8,
        efficiency: 91,
        bottlenecks: ['Feature discovery', 'Mobile limitations'],
        optimizations: ['Better UX', 'Mobile app', 'Feature tours'],
        dependencies: ['User engagement', 'Platform stability'],
        stakeholders: ['All Users', 'Platform']
      },
      {
        id: 'payment-processing',
        name: 'Payment & Escrow',
        description: 'Secure payment processing and fund management',
        currentTime: 25,
        optimizedTime: 10,
        efficiency: 94,
        bottlenecks: ['Payment method setup', 'Verification delays'],
        optimizations: ['Instant verification', 'More payment options', 'Auto-release'],
        dependencies: ['Payment methods', 'Verification status'],
        stakeholders: ['All Users', 'Payment Providers']
      }
    ]
  };

  const currentWorkflow = workflowData[`${selectedWorkflow}Workflow` as keyof WorkflowData];

  const calculateTotalTime = (steps: WorkflowStep[], type: 'current' | 'optimized') => {
    return steps.reduce((total, step) => total + (type === 'current' ? step.currentTime : step.optimizedTime), 0);
  };

  const calculateTimeSavings = (steps: WorkflowStep[]) => {
    const currentTotal = calculateTotalTime(steps, 'current');
    const optimizedTotal = calculateTotalTime(steps, 'optimized');
    return ((currentTotal - optimizedTotal) / currentTotal) * 100;
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    if (minutes < 1440) return `${Math.round(minutes / 60)}h`;
    return `${Math.round(minutes / 1440)}d`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Workflow Optimization</h2>
          <p className="text-muted-foreground">
            Analyzing and optimizing user workflows for maximum efficiency
          </p>
        </div>
      </div>

      {/* Workflow Selection */}
      <Tabs value={selectedWorkflow} onValueChange={(value) => setSelectedWorkflow(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="auditor">Auditor Workflow</TabsTrigger>
          <TabsTrigger value="projectOwner">Project Owner Workflow</TabsTrigger>
          <TabsTrigger value="shared">Shared Processes</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedWorkflow} className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Current Total Time</p>
                    <p className="text-2xl font-bold">
                      {formatTime(calculateTotalTime(currentWorkflow, 'current'))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Optimized Time</p>
                    <p className="text-2xl font-bold">
                      {formatTime(calculateTotalTime(currentWorkflow, 'optimized'))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time Savings</p>
                    <p className="text-2xl font-bold">
                      {calculateTimeSavings(currentWorkflow).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Efficiency</p>
                    <p className="text-2xl font-bold">
                      {(currentWorkflow.reduce((acc, step) => acc + step.efficiency, 0) / currentWorkflow.length).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Workflow Steps */}
          <div className="space-y-4">
            {currentWorkflow.map((step, index) => (
              <Card key={step.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold">{step.name}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className={`text-right ${getEfficiencyColor(step.efficiency)}`}>
                      <div className="text-2xl font-bold">{step.efficiency}%</div>
                      <div className="text-xs text-muted-foreground">Efficiency</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-medium mb-3">Time Analysis</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Current:</span>
                          <span className="font-medium">{formatTime(step.currentTime)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Optimized:</span>
                          <span className="font-medium text-green-600">{formatTime(step.optimizedTime)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Savings:</span>
                          <span className="font-medium text-green-600">
                            {(((step.currentTime - step.optimizedTime) / step.currentTime) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-3">Current Bottlenecks</h4>
                      <div className="space-y-1">
                        {step.bottlenecks.map((bottleneck, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3 text-red-500" />
                            <span className="text-xs text-muted-foreground">{bottleneck}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-3">Proposed Optimizations</h4>
                      <div className="space-y-1">
                        {step.optimizations.map((optimization, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span className="text-xs text-muted-foreground">{optimization}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Dependencies</h4>
                      <div className="flex flex-wrap gap-1">
                        {step.dependencies.map((dep, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {dep}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Stakeholders</h4>
                      <div className="flex flex-wrap gap-1">
                        {step.stakeholders.map((stakeholder, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {stakeholder}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm font-medium mb-2">Efficiency Score</div>
                    <Progress value={step.efficiency} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
