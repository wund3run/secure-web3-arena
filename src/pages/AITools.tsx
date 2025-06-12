
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bot, 
  Shield, 
  Zap, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Download,
  Copy,
  Play,
  Loader2
} from 'lucide-react';

const AITools = () => {
  const [selectedTool, setSelectedTool] = useState('security');
  const [code, setCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const tools = [
    {
      id: 'security',
      name: 'Security Analysis',
      description: 'Comprehensive security vulnerability detection',
      icon: Shield,
      color: 'text-red-500',
      features: ['Vulnerability Detection', 'Risk Assessment', 'Security Recommendations']
    },
    {
      id: 'gas',
      name: 'Gas Optimization',
      description: 'Optimize smart contract gas usage',
      icon: Zap,
      color: 'text-yellow-500',
      features: ['Gas Usage Analysis', 'Optimization Suggestions', 'Cost Estimation']
    },
    {
      id: 'compliance',
      name: 'Compliance Check',
      description: 'Verify compliance with security standards',
      icon: FileText,
      color: 'text-blue-500',
      features: ['Standards Compliance', 'Best Practices', 'Audit Preparation']
    }
  ];

  const exampleCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableContract {
    mapping(address => uint256) public balances;
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    
    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        // Vulnerable to reentrancy attack
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        balances[msg.sender] -= amount;
    }
}`;

  const mockAnalysisResults = {
    security: {
      score: 65,
      vulnerabilities: [
        {
          severity: 'high',
          type: 'Reentrancy',
          location: 'Line 12-16',
          description: 'The withdraw function is vulnerable to reentrancy attacks.',
          recommendation: 'Use the checks-effects-interactions pattern or implement a reentrancy guard.'
        },
        {
          severity: 'medium',
          type: 'Unchecked External Call',
          location: 'Line 14',
          description: 'External call return value should be properly handled.',
          recommendation: 'Implement proper error handling for external calls.'
        }
      ],
      gasEstimate: '~2,100 gas per transaction'
    },
    gas: {
      score: 78,
      optimizations: [
        {
          type: 'Storage Optimization',
          location: 'Line 5',
          currentCost: '20,000 gas',
          optimizedCost: '5,000 gas',
          savings: '75%',
          suggestion: 'Pack struct variables to reduce storage slots'
        },
        {
          type: 'Loop Optimization',
          location: 'Line 20-25',
          currentCost: '50,000 gas',
          optimizedCost: '35,000 gas',
          savings: '30%',
          suggestion: 'Cache array length outside loop'
        }
      ],
      totalSavings: '15,000 gas (~$3.50 at current prices)'
    },
    compliance: {
      score: 82,
      standards: [
        {
          name: 'EIP-165',
          status: 'compliant',
          description: 'Standard Interface Detection'
        },
        {
          name: 'EIP-721',
          status: 'partial',
          description: 'Non-Fungible Token Standard',
          issues: ['Missing metadata extension']
        },
        {
          name: 'Security Best Practices',
          status: 'non-compliant',
          description: 'General security guidelines',
          issues: ['Reentrancy vulnerability', 'Missing access controls']
        }
      ]
    }
  };

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setAnalysisResults(mockAnalysisResults[selectedTool]);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return 'text-green-500';
      case 'partial': return 'text-yellow-500';
      case 'non-compliant': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant': return CheckCircle;
      case 'partial': return Clock;
      case 'non-compliant': return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <StandardLayout
      title="AI Security Tools"
      description="Automated security analysis powered by artificial intelligence"
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            AI Security Tools
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Leverage advanced AI to automatically analyze your smart contracts for security vulnerabilities, 
            gas optimization opportunities, and compliance with industry standards.
          </p>
        </div>

        {/* Tool Selection */}
        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card 
                key={tool.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTool === tool.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedTool(tool.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className={`h-6 w-6 ${tool.color}`} />
                    {tool.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{tool.description}</p>
                  <div className="space-y-2">
                    {tool.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Analysis Interface */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Code Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Smart Contract Code
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCode(exampleCode)}
                  >
                    Load Example
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(code)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your Solidity code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-muted-foreground">
                  {code.length} characters
                </span>
                <Button 
                  onClick={handleAnalyze}
                  disabled={!code.trim() || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Analyze Code
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analyzing Your Code</h3>
                  <p className="text-muted-foreground text-center">
                    Our AI is examining your smart contract for {tools.find(t => t.id === selectedTool)?.name.toLowerCase()}...
                  </p>
                  <div className="w-full max-w-xs mt-4">
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
              ) : analysisResults ? (
                <div className="space-y-6">
                  {/* Security Analysis Results */}
                  {selectedTool === 'security' && (
                    <>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Security Score</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-yellow-600">
                            {analysisResults.score}/100
                          </div>
                          <div className="text-sm text-muted-foreground">Needs Improvement</div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold">Vulnerabilities Found</h4>
                        {analysisResults.vulnerabilities.map((vuln, index) => (
                          <Alert key={index} className="border-l-4 border-l-red-500">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              <div className="flex items-start justify-between mb-2">
                                <div className="font-medium">{vuln.type}</div>
                                <Badge className={getSeverityColor(vuln.severity)}>
                                  {vuln.severity}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mb-2">
                                {vuln.location} • {vuln.description}
                              </div>
                              <div className="text-sm font-medium">
                                Recommendation: {vuln.recommendation}
                              </div>
                            </AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Gas Optimization Results */}
                  {selectedTool === 'gas' && (
                    <>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Optimization Score</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            {analysisResults.score}/100
                          </div>
                          <div className="text-sm text-muted-foreground">Good</div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="font-semibold text-green-800 mb-1">Potential Savings</div>
                        <div className="text-2xl font-bold text-green-600">
                          {analysisResults.totalSavings}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Optimization Opportunities</h4>
                        {analysisResults.optimizations.map((opt, index) => (
                          <Card key={index} className="border-l-4 border-l-yellow-500">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="font-medium">{opt.type}</div>
                                <Badge className="bg-green-100 text-green-800 border-green-200">
                                  {opt.savings} savings
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mb-2">
                                {opt.location} • {opt.currentCost} → {opt.optimizedCost}
                              </div>
                              <div className="text-sm font-medium">
                                {opt.suggestion}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Compliance Results */}
                  {selectedTool === 'compliance' && (
                    <>
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Compliance Score</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {analysisResults.score}/100
                          </div>
                          <div className="text-sm text-muted-foreground">Good</div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold">Standards Compliance</h4>
                        {analysisResults.standards.map((standard, index) => {
                          const StatusIcon = getStatusIcon(standard.status);
                          return (
                            <Card key={index} className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="font-medium">{standard.name}</div>
                                <div className={`flex items-center gap-1 ${getStatusColor(standard.status)}`}>
                                  <StatusIcon className="h-4 w-4" />
                                  <span className="text-sm capitalize">{standard.status}</span>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground mb-2">
                                {standard.description}
                              </div>
                              {standard.issues && (
                                <div className="text-sm">
                                  <span className="font-medium">Issues: </span>
                                  {standard.issues.join(', ')}
                                </div>
                              )}
                            </Card>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline">
                      Save Analysis
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bot className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
                  <p className="text-muted-foreground">
                    Paste your smart contract code and click "Analyze Code" to get started.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardHeader>
            <CardTitle className="text-center">AI-Powered Analysis Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Advanced Security Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Identify vulnerabilities using machine learning trained on thousands of smart contracts
                </p>
              </div>
              <div>
                <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Intelligent Optimization</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized gas optimization suggestions to reduce transaction costs
                </p>
              </div>
              <div>
                <FileText className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Compliance Automation</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically check compliance with industry standards and best practices
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default AITools;
