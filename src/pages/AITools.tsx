
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  Zap, 
  Shield, 
  Target, 
  Brain, 
  Sparkles,
  Code,
  Search,
  AlertTriangle,
  TrendingUp,
  FileText,
  Settings
} from 'lucide-react';
import { AICodeAnalysisWidget } from '@/components/integrations/AICodeAnalysisWidget';
import { TensorFlowMatchingDashboard } from '@/components/ai-matching/TensorFlowMatchingDashboard';

const AITools = () => {
  const aiTools = [
    {
      id: 'code-analysis',
      title: 'AI Code Analyzer',
      icon: <Code className="h-6 w-6" />,
      description: 'Advanced AI-powered static code analysis for vulnerability detection',
      features: ['Pattern Recognition', 'Vulnerability Scoring', 'Fix Recommendations'],
      status: 'Available',
      category: 'analysis'
    },
    {
      id: 'threat-intelligence',
      title: 'Threat Intelligence AI',
      icon: <Target className="h-6 w-6" />,
      description: 'Real-time threat detection and intelligence gathering using machine learning',
      features: ['IOC Analysis', 'Attack Pattern Detection', 'Risk Assessment'],
      status: 'Available',
      category: 'intelligence'
    },
    {
      id: 'vulnerability-predictor',
      title: 'Vulnerability Predictor',
      icon: <AlertTriangle className="h-6 w-6" />,
      description: 'Predict potential security vulnerabilities before they become exploitable',
      features: ['Predictive Analysis', 'Risk Scoring', 'Trend Analysis'],
      status: 'Beta',
      category: 'prediction'
    },
    {
      id: 'security-assistant',
      title: 'Security Assistant',
      icon: <Brain className="h-6 w-6" />,
      description: 'AI-powered security recommendations and best practices guidance',
      features: ['Natural Language Queries', 'Interactive Guidance', 'Learning Path'],
      status: 'Available',
      category: 'assistant'
    },
    {
      id: 'automated-pentesting',
      title: 'Automated Pen Testing',
      icon: <Zap className="h-6 w-6" />,
      description: 'AI-driven automated penetration testing and vulnerability assessment',
      features: ['Smart Scanning', 'Exploit Automation', 'Report Generation'],
      status: 'Coming Soon',
      category: 'testing'
    },
    {
      id: 'compliance-checker',
      title: 'Compliance Checker',
      icon: <Shield className="h-6 w-6" />,
      description: 'Automated compliance checking against security frameworks',
      features: ['Framework Mapping', 'Gap Analysis', 'Remediation Plans'],
      status: 'Available',
      category: 'compliance'
    }
  ];

  const quickActions = [
    {
      title: 'Scan Smart Contract',
      description: 'Upload and analyze smart contracts for vulnerabilities',
      icon: <Search className="h-5 w-5" />,
      action: 'Start Scan'
    },
    {
      title: 'Security Health Check',
      description: 'Quick AI-powered security assessment',
      icon: <TrendingUp className="h-5 w-5" />,
      action: 'Run Check'
    },
    {
      title: 'Generate Security Report',
      description: 'Create comprehensive security reports with AI',
      icon: <FileText className="h-5 w-5" />,
      action: 'Generate'
    },
    {
      title: 'Configure AI Settings',
      description: 'Customize AI tools and preferences',
      icon: <Settings className="h-5 w-5" />,
      action: 'Configure'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'default';
      case 'Beta': return 'secondary';
      case 'Coming Soon': return 'outline';
      default: return 'outline';
    }
  };

  const filteredTools = (category: string) => {
    return aiTools.filter(tool => category === 'all' || tool.category === category);
  };

  return (
    <StandardLayout
      title="AI Security Tools | Hawkly"
      description="Advanced AI-powered security analysis and automation tools"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="px-4 py-2 mb-4">
            <Bot className="h-4 w-4 mr-2" />
            AI-Powered Security
          </Badge>
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            AI Security Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leverage artificial intelligence for advanced security analysis, threat detection, 
            and automated vulnerability assessment. Stay ahead of emerging threats with machine learning.
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-7 max-w-4xl mx-auto">
            <TabsTrigger value="all">All Tools</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
            <TabsTrigger value="prediction">Prediction</TabsTrigger>
            <TabsTrigger value="assistant">Assistant</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          {['all', 'analysis', 'intelligence', 'prediction', 'assistant', 'testing', 'compliance'].map((category) => (
            <TabsContent key={category} value={category} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools(category).map((tool) => (
                  <Card key={tool.id} className="hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {tool.icon}
                          </div>
                          <CardTitle className="text-lg">{tool.title}</CardTitle>
                        </div>
                        <Badge variant={getStatusColor(tool.status)}>
                          {tool.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{tool.description}</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Key Features:</h4>
                        <ul className="space-y-1">
                          {tool.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <Sparkles className="h-3 w-3 text-yellow-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button 
                        className="w-full" 
                        disabled={tool.status === 'Coming Soon'}
                      >
                        {tool.status === 'Coming Soon' ? 'Coming Soon' : 'Launch Tool'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Actions Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                    <Button size="sm" className="w-full">
                      {action.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interactive Demo Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Try Our AI Tools</h2>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  AI Code Analysis Demo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AICodeAnalysisWidget />
              </CardContent>
            </Card>

            <TensorFlowMatchingDashboard />
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default AITools;
