
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Users,
  Clock,
  Target,
  BookOpen
} from 'lucide-react';

const AuditGuidelines = () => {
  const guidelineCategories = [
    {
      id: 'process',
      title: 'Audit Process',
      icon: <Clock className="h-5 w-5" />,
      description: 'Step-by-step audit methodology and procedures'
    },
    {
      id: 'standards',
      title: 'Security Standards',
      icon: <Shield className="h-5 w-5" />,
      description: 'Industry security standards and best practices'
    },
    {
      id: 'tools',
      title: 'Tools & Methods',
      icon: <Target className="h-5 w-5" />,
      description: 'Recommended tools and testing methodologies'
    },
    {
      id: 'reporting',
      title: 'Reporting Guidelines',
      icon: <FileText className="h-5 w-5" />,
      description: 'Standards for audit reporting and documentation'
    }
  ];

  const processSteps = [
    {
      phase: 'Initial Assessment',
      description: 'Conduct preliminary review to understand project scope and architecture',
      duration: '1-2 days',
      deliverables: ['Project assessment', 'Scope definition', 'Timeline agreement']
    },
    {
      phase: 'Code Review',
      description: 'Perform manual and automated code analysis',
      duration: '3-7 days',
      deliverables: ['Static analysis results', 'Manual review findings', 'Code quality assessment']
    },
    {
      phase: 'Security Testing',
      description: 'Execute functional and security tests',
      duration: '2-5 days',
      deliverables: ['Test results', 'Vulnerability assessment', 'Attack simulations']
    },
    {
      phase: 'Reporting',
      description: 'Compile findings and create comprehensive report',
      duration: '1-3 days',
      deliverables: ['Final audit report', 'Remediation recommendations', 'Executive summary']
    },
    {
      phase: 'Remediation Support',
      description: 'Provide guidance on fixing identified issues',
      duration: '1-2 weeks',
      deliverables: ['Fix verification', 'Retest results', 'Clearance certification']
    }
  ];

  const severityLevels = [
    {
      level: 'Critical',
      color: 'destructive',
      description: 'Issues that can result in loss of funds or system compromise',
      examples: ['Reentrancy vulnerabilities', 'Access control bypass', 'Fund drainage exploits']
    },
    {
      level: 'High',
      color: 'secondary',
      description: 'Issues affecting data integrity that are not immediately exploitable',
      examples: ['Logic errors', 'State manipulation', 'Unauthorized state changes']
    },
    {
      level: 'Medium',
      color: 'outline',
      description: 'Risks that arise under specific conditions',
      examples: ['Input validation issues', 'Gas optimization problems', 'Race conditions']
    },
    {
      level: 'Low',
      color: 'outline',
      description: 'Minor issues or best practice recommendations',
      examples: ['Code style improvements', 'Documentation gaps', 'Optimization suggestions']
    }
  ];

  const recommendedTools = [
    {
      category: 'Static Analysis',
      tools: [
        { name: 'MythX', description: 'Comprehensive smart contract security analysis' },
        { name: 'Slither', description: 'Static analysis framework for Solidity' },
        { name: 'Securify', description: 'Security scanner for Ethereum smart contracts' }
      ]
    },
    {
      category: 'Dynamic Testing',
      tools: [
        { name: 'Echidna', description: 'Property-based fuzz testing for smart contracts' },
        { name: 'Manticore', description: 'Symbolic execution tool for smart contracts' },
        { name: 'Foundry', description: 'Fast, portable toolkit for Ethereum development' }
      ]
    },
    {
      category: 'Manual Review',
      tools: [
        { name: 'VS Code', description: 'Code editor with Solidity extensions' },
        { name: 'Remix IDE', description: 'Web-based Solidity development environment' },
        { name: 'Hardhat', description: 'Ethereum development environment' }
      ]
    }
  ];

  return (
    <StandardLayout
      title="Audit Guidelines | Hawkly"
      description="Professional audit standards, procedures, and best practices for security auditors"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Security Audit Guidelines
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional standards and methodologies for conducting comprehensive 
            security audits on the Hawkly platform.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {guidelineCategories.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {category.icon}
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="process" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="process">Audit Process</TabsTrigger>
            <TabsTrigger value="standards">Standards</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="reporting">Reporting</TabsTrigger>
          </TabsList>

          <TabsContent value="process" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Audit Methodology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {processSteps.map((step, index) => (
                    <div key={index} className="border-l-4 border-primary pl-6 relative">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{step.phase}</h3>
                          <Badge variant="outline">{step.duration}</Badge>
                        </div>
                        <p className="text-muted-foreground">{step.description}</p>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Deliverables:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {step.deliverables.map((deliverable, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="standards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vulnerability Classification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {severityLevels.map((severity, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant={severity.color as any}>{severity.level}</Badge>
                        <h3 className="font-semibold">{severity.level} Severity</h3>
                      </div>
                      <p className="text-muted-foreground mb-3">{severity.description}</p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Examples:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {severity.examples.map((example, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <AlertTriangle className="h-3 w-3" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            {recommendedTools.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.tools.map((tool, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">{tool.name}</h4>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reporting" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Executive Summary</h3>
                    <p className="text-muted-foreground text-sm">
                      High-level overview of findings, risk assessment, and recommendations
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Methodology</h3>
                    <p className="text-muted-foreground text-sm">
                      Description of audit approach, tools used, and testing procedures
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Detailed Findings</h3>
                    <p className="text-muted-foreground text-sm">
                      Comprehensive list of vulnerabilities with severity, impact, and remediation
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Recommendations</h3>
                    <p className="text-muted-foreground text-sm">
                      Security improvements and best practices for ongoing development
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StandardLayout>
  );
};

export default AuditGuidelines;
