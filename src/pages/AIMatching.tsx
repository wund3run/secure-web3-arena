
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { RealisticAIMatching } from '@/components/ai-matching/RealisticAIMatching';
import { AdvancedMatchingDashboard } from '@/components/ai-matching/AdvancedMatchingDashboard';
import { IntelligentMatching } from '@/components/matching/intelligent-matching';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Zap, Target } from 'lucide-react';

const AIMatching = () => {
  return (
    <>
      <Helmet>
        <title>AI Matching System | Hawkly</title>
        <meta name="description" content="Advanced AI-powered auditor matching with machine learning algorithms" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">AI Matching System</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Advanced machine learning algorithms to find the perfect security auditors for your Web3 project
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="text-center">
                  <Brain className="h-12 w-12 mx-auto mb-2 text-blue-500" />
                  <CardTitle>Neural Networks</CardTitle>
                  <CardDescription>
                    Deep learning models analyze auditor expertise and project requirements
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <Zap className="h-12 w-12 mx-auto mb-2 text-yellow-500" />
                  <CardTitle>Real-time Analysis</CardTitle>
                  <CardDescription>
                    Instant processing of auditor availability and project compatibility
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <Target className="h-12 w-12 mx-auto mb-2 text-green-500" />
                  <CardTitle>Precision Matching</CardTitle>
                  <CardDescription>
                    95%+ accuracy in finding the optimal auditor for your specific needs
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Tabs defaultValue="realistic" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="realistic">Smart Matching</TabsTrigger>
                <TabsTrigger value="advanced">Advanced AI</TabsTrigger>
                <TabsTrigger value="intelligent">Browse Auditors</TabsTrigger>
              </TabsList>

              <TabsContent value="realistic">
                <Card>
                  <CardHeader>
                    <CardTitle>Smart Auditor Matching</CardTitle>
                    <CardDescription>
                      Find the perfect auditor using our intelligent matching system with real data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RealisticAIMatching />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced">
                <AdvancedMatchingDashboard />
              </TabsContent>

              <TabsContent value="intelligent">
                <Card>
                  <CardHeader>
                    <CardTitle>Browse Top Auditors</CardTitle>
                    <CardDescription>
                      Explore our curated selection of verified security professionals
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <IntelligentMatching />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIMatching;
