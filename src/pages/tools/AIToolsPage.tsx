
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Zap, Shield, Target, Brain, Sparkles, ExternalLink, MessageCircle } from 'lucide-react';
import { AICodeAnalysisWidget } from '@/components/integrations/AICodeAnalysisWidget';
import { TensorFlowMatchingDashboard } from '@/components/ai-matching/TensorFlowMatchingDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const AIToolsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  // Handler for Vulnerability Predictor
  const handleVulnerabilityPredictor = async () => {
    setIsLoading('vulnerability');
    try {
      // Simulate loading and then navigate or open tool
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Option 1: Navigate to a dedicated page
      navigate('/ai-tools/vulnerability-predictor');
      
      // Option 2: Open in new tab (uncomment if preferred)
      // window.open('/vulnerability-predictor', '_blank');
      
      toast({
        title: "Vulnerability Predictor",
        description: "Launching AI vulnerability prediction tool...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to launch vulnerability predictor. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  // Handler for Threat Intelligence
  const handleThreatIntelligence = async () => {
    setIsLoading('threat');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to threat intelligence dashboard
      navigate('/ai-tools/threat-intelligence');
      
      toast({
        title: "Threat Intelligence",
        description: "Loading real-time threat intelligence dashboard...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load threat intelligence. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  // Handler for Security Assistant Chat
  const handleSecurityAssistant = async () => {
    setIsLoading('assistant');
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Navigate to AI chat interface
      navigate('/ai-tools/security-assistant');
      
      toast({
        title: "Security Assistant",
        description: "Starting AI security consultation...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start security assistant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  // Alternative handlers for different interaction patterns
  const handleQuickDemo = (toolName: string) => {
    toast({
      title: `${toolName} Demo`,
      description: "This is a demo version. Full functionality available in production.",
    });
  };

  const handleExternalTool = (url: string, toolName: string) => {
    window.open(url, '_blank');
    toast({
      title: toolName,
      description: "Opening tool in new tab...",
    });
  };

  return (
    <StandardLayout
      title="AI Tools | Hawkly"
      description="AI-powered security analysis and automation tools"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="px-4 py-2 mb-4">
            <Bot className="h-4 w-4 mr-2" />
            AI-Powered Security
          </Badge>
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            AI Security Tools
          </h1>
          <p className="text-xl text-muted-foreground">
            Leverage artificial intelligence for advanced security analysis and expert matching
          </p>
        </div>

        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Code Analysis
            </TabsTrigger>
            <TabsTrigger value="matching" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Matching
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Quick Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  AI Code Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AICodeAnalysisWidget />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matching" className="space-y-6">
            <TensorFlowMatchingDashboard />
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Vulnerability Predictor Card */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    Vulnerability Predictor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Predict potential security vulnerabilities before they become exploitable.
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      onClick={handleVulnerabilityPredictor}
                      disabled={isLoading === 'vulnerability'}
                    >
                      {isLoading === 'vulnerability' ? (
                        <>Loading...</>
                      ) : (
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Launch Tool
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleQuickDemo('Vulnerability Predictor')}
                    >
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Threat Intelligence Card */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-red-500" />
                    Threat Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Real-time threat intelligence and attack pattern recognition for Web3 projects.
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      onClick={handleThreatIntelligence}
                      disabled={isLoading === 'threat'}
                    >
                      {isLoading === 'threat' ? (
                        <>Loading...</>
                      ) : (
                        <>
                          <Target className="h-4 w-4 mr-2" />
                          Launch Tool
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleExternalTool('https://threat-intel-demo.hawkly.com', 'Threat Intelligence')}
                    >
                      Live Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Security Assistant Card */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-500" />
                    Security Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    AI-powered security recommendations and best practices guidance.
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      onClick={handleSecurityAssistant}
                      disabled={isLoading === 'assistant'}
                    >
                      {isLoading === 'assistant' ? (
                        <>Starting...</>
                      ) : (
                        <>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Chat with AI
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        // Open quick chat modal or sidebar
                        toast({
                          title: "Quick Chat",
                          description: "Hi! I'm your AI security assistant. How can I help you today?",
                        });
                      }}
                    >
                      Quick Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Tools Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  More AI Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => navigate('/ai-tools/smart-contract-auditor')}
                  >
                    <Shield className="h-6 w-6" />
                    <span className="text-sm">Smart Contract Auditor</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => navigate('/ai-tools/gas-optimizer')}
                  >
                    <Zap className="h-6 w-6" />
                    <span className="text-sm">Gas Optimizer</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => navigate('/ai-tools/risk-analyzer')}
                  >
                    <Target className="h-6 w-6" />
                    <span className="text-sm">Risk Analyzer</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => navigate('/ai-tools/compliance-checker')}
                  >
                    <Bot className="h-6 w-6" />
                    <span className="text-sm">Compliance Checker</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StandardLayout>
  );
};

export default AIToolsPage;
