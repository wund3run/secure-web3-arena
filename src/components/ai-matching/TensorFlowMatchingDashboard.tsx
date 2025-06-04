
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEnhancedAIMatchingV2 } from '@/hooks/useEnhancedAIMatchingV2';
import { ModelStatusCards } from './components/ModelStatusCards';
import { MatchingResultsList } from './components/MatchingResultsList';
import { PerformanceMetrics } from './components/PerformanceMetrics';
import { FeatureImportanceAnalysis } from './components/FeatureImportanceAnalysis';

export const TensorFlowMatchingDashboard: React.FC = () => {
  const { 
    isInitializing, 
    isAnalyzing, 
    modelMetrics, 
    findEnhancedMatches
  } = useEnhancedAIMatchingV2();

  const [demoResults, setDemoResults] = useState<any[]>([]);

  const runDemoMatching = async () => {
    const mockCriteria = {
      blockchain: 'ethereum',
      project_type: 'defi',
      project_description: 'A decentralized lending protocol with complex smart contract interactions requiring thorough security analysis.',
      budget_range: [10000, 25000] as [number, number],
      timeline: '4 weeks',
      complexity: 'high' as const,
      specific_requirements: ['smart contracts', 'defi', 'security audit'],
      quality_threshold: 4.5,
      experience_preference: 'senior' as const,
      audit_type: ['security', 'formal verification']
    };

    const mockAuditors = [
      {
        id: '1',
        name: 'Dr. Sarah Chen',
        description: 'Expert in DeFi security with 8+ years of blockchain experience',
        expertise: ['Solidity', 'DeFi', 'Formal Verification'],
        experience_years: 8,
        rating: 4.9,
        hourly_rate: 200,
        availability: 'available' as const,
        specializations: ['DeFi Protocols', 'Smart Contract Security'],
        past_audits: 67,
        success_rate: 0.98,
        response_time_avg: 2.5,
        blockchain_expertise: ['ethereum', 'polygon']
      },
      {
        id: '2',
        name: 'Marcus Rodriguez',
        description: 'Blockchain security specialist focusing on DeFi and NFT protocols',
        expertise: ['Security Analysis', 'Smart Contracts', 'DeFi'],
        experience_years: 6,
        rating: 4.7,
        hourly_rate: 180,
        availability: 'available' as const,
        specializations: ['DeFi Security', 'Protocol Analysis'],
        past_audits: 43,
        success_rate: 0.95,
        response_time_avg: 4.2,
        blockchain_expertise: ['ethereum', 'arbitrum']
      }
    ];

    try {
      const results = await findEnhancedMatches(mockCriteria, mockAuditors);
      setDemoResults(results);
    } catch (error) {
      console.error('Demo matching failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">TensorFlow.js AI Matching Engine</h2>
          <p className="text-muted-foreground">
            Advanced machine learning for auditor-project matching
          </p>
        </div>
        {!isInitializing && (
          <Button onClick={runDemoMatching} disabled={isAnalyzing}>
            {isAnalyzing ? 'Analyzing...' : 'Run Demo Matching'}
          </Button>
        )}
      </div>

      <ModelStatusCards 
        isInitializing={isInitializing} 
        modelMetrics={modelMetrics} 
      />

      <Tabs defaultValue="results" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="results">Matching Results</TabsTrigger>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="features">Feature Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-4">
          <MatchingResultsList demoResults={demoResults} />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <PerformanceMetrics 
            modelMetrics={modelMetrics} 
            isInitializing={isInitializing} 
          />
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <FeatureImportanceAnalysis demoResults={demoResults} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
