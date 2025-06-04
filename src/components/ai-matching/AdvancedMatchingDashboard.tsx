
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Cpu, Zap } from 'lucide-react';
import { TensorFlowMatchingDashboard } from './TensorFlowMatchingDashboard';
import { EnhancedAIMatchingEngine } from './EnhancedAIMatchingEngine';

export const AdvancedMatchingDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Advanced AI Matching System</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Powered by TensorFlow.js machine learning and Hugging Face semantic analysis for precision matching
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="text-center">
            <Brain className="h-12 w-12 mx-auto mb-2 text-blue-500" />
            <CardTitle>TensorFlow.js Engine</CardTitle>
            <CardDescription>
              Neural network-powered matching with 90%+ precision
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Zap className="h-12 w-12 mx-auto mb-2 text-purple-500" />
            <CardTitle>Semantic Analysis</CardTitle>
            <CardDescription>
              Hugging Face embeddings for contextual understanding
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Cpu className="h-12 w-12 mx-auto mb-2 text-green-500" />
            <CardTitle>Real-time Processing</CardTitle>
            <CardDescription>
              Client-side ML inference for instant results
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="tensorflow" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tensorflow">TensorFlow.js Engine</TabsTrigger>
          <TabsTrigger value="enhanced">Enhanced Matching</TabsTrigger>
        </TabsList>

        <TabsContent value="tensorflow">
          <TensorFlowMatchingDashboard />
        </TabsContent>

        <TabsContent value="enhanced">
          <EnhancedAIMatchingEngine 
            criteria={{}} 
            onMatchesFound={() => {}} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
