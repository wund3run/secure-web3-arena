
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Zap, Shield, Target, Brain, Sparkles } from 'lucide-react';
import { AICodeAnalysisWidget } from '@/components/integrations/AICodeAnalysisWidget';
import { TensorFlowMatchingDashboard } from '@/components/ai-matching/TensorFlowMatchingDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AIToolsPage = () => {
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
                  <Button className="w-full">Launch Tool</Button>
                </CardContent>
              </Card>

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
                  <Button className="w-full">Launch Tool</Button>
                </CardContent>
              </Card>

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
                  <Button className="w-full">Chat with AI</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StandardLayout>
  );
};

export default AIToolsPage;
