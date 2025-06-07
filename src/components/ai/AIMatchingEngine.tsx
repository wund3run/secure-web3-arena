
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Star, Clock, DollarSign, CheckCircle } from 'lucide-react';

interface AuditorMatch {
  id: string;
  name: string;
  avatar: string;
  expertise: string[];
  rating: number;
  completedAudits: number;
  avgDeliveryTime: number;
  hourlyRate: number;
  matchScore: number;
  availability: 'available' | 'busy' | 'unavailable';
  specializations: string[];
  languages: string[];
  certifications: string[];
  recentWork: string[];
}

interface AIMatchingEngineProps {
  projectData: {
    blockchain: string;
    contractType: string;
    complexity: string;
    budget: string;
    deadline: string;
    requirements: string[];
  };
  onAuditorSelect: (auditor: AuditorMatch) => void;
}

export function AIMatchingEngine({ projectData, onAuditorSelect }: AIMatchingEngineProps) {
  const [matches, setMatches] = useState<AuditorMatch[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisSteps, setAnalysisSteps] = useState<string[]>([]);

  useEffect(() => {
    simulateAIAnalysis();
  }, [projectData]);

  const simulateAIAnalysis = async () => {
    const steps = [
      'Analyzing project requirements...',
      'Processing smart contract complexity...',
      'Evaluating blockchain expertise needs...',
      'Matching auditor skills and experience...',
      'Calculating compatibility scores...',
      'Ranking recommendations...'
    ];

    setAnalysisSteps(steps);
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisProgress(((i + 1) / steps.length) * 100);
    }

    // Generate mock auditor matches
    const mockMatches: AuditorMatch[] = [
      {
        id: 'auditor_1',
        name: 'Alex Chen',
        avatar: '/api/placeholder/64/64',
        expertise: ['DeFi', 'Smart Contracts', 'Solidity'],
        rating: 4.9,
        completedAudits: 127,
        avgDeliveryTime: 5,
        hourlyRate: 150,
        matchScore: 98,
        availability: 'available',
        specializations: ['DeFi Protocols', 'Yield Farming', 'Liquidity Pools'],
        languages: ['English', 'Mandarin'],
        certifications: ['CISSP', 'CEH', 'Smart Contract Security'],
        recentWork: ['Uniswap V4 Review', 'Compound Protocol Audit', 'Aave Flash Loan Security']
      },
      {
        id: 'auditor_2',
        name: 'Sarah Williams',
        avatar: '/api/placeholder/64/64',
        expertise: ['Web3 Security', 'Ethereum', 'Governance'],
        rating: 4.8,
        completedAudits: 89,
        avgDeliveryTime: 7,
        hourlyRate: 125,
        matchScore: 94,
        availability: 'available',
        specializations: ['DAO Governance', 'Multi-sig Wallets', 'Bridge Protocols'],
        languages: ['English', 'Spanish'],
        certifications: ['OSCP', 'Smart Contract Auditor'],
        recentWork: ['MakerDAO Analysis', 'Polygon Bridge Review', 'Gnosis Safe Audit']
      },
      {
        id: 'auditor_3',
        name: 'Michael Rodriguez',
        avatar: '/api/placeholder/64/64',
        expertise: ['NFT Security', 'Layer 2', 'Cross-chain'],
        rating: 4.7,
        completedAudits: 156,
        avgDeliveryTime: 6,
        hourlyRate: 140,
        matchScore: 91,
        availability: 'busy',
        specializations: ['NFT Marketplaces', 'L2 Scaling', 'Cross-chain Bridges'],
        languages: ['English', 'Portuguese'],
        certifications: ['CISA', 'Blockchain Security Professional'],
        recentWork: ['OpenSea Contract Review', 'Optimism Bridge Audit', 'Arbitrum Protocol Analysis']
      }
    ];

    setMatches(mockMatches);
    setIsAnalyzing(false);

    // Track AI matching completion
    if ((window as any).trackConversion) {
      (window as any).trackConversion({
        action: 'ai_matching_completed',
        category: 'matching',
        label: 'auditor_recommendations',
        metadata: {
          projectType: projectData.contractType,
          blockchain: projectData.blockchain,
          matchesFound: mockMatches.length
        }
      });
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'busy': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'unavailable': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleSelectAuditor = (auditor: AuditorMatch) => {
    // Track auditor selection
    if ((window as any).trackConversion) {
      (window as any).trackConversion({
        action: 'auditor_selected',
        category: 'matching',
        label: auditor.name,
        value: auditor.matchScore,
        metadata: {
          auditorId: auditor.id,
          matchScore: auditor.matchScore,
          hourlyRate: auditor.hourlyRate
        }
      });
    }

    onAuditorSelect(auditor);
  };

  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            AI Auditor Matching
          </CardTitle>
          <CardDescription>
            Our AI is analyzing your project to find the perfect auditor match
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Analysis Progress</span>
              <span>{Math.round(analysisProgress)}%</span>
            </div>
            <Progress value={analysisProgress} className="h-2" />
          </div>
          
          <div className="space-y-2">
            {analysisSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 text-sm ${
                  index < Math.floor((analysisProgress / 100) * analysisSteps.length)
                    ? 'text-green-600'
                    : 'text-muted-foreground'
                }`}
              >
                {index < Math.floor((analysisProgress / 100) * analysisSteps.length) ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <div className="h-4 w-4 border-2 border-muted-foreground rounded-full" />
                )}
                {step}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            AI-Powered Auditor Recommendations
          </CardTitle>
          <CardDescription>
            Based on your project requirements, here are the top-matched auditors
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {matches.map((auditor, index) => (
          <Card key={auditor.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={auditor.avatar}
                      alt={auditor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{auditor.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{auditor.rating}</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">
                        {auditor.completedAudits} audits
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {auditor.matchScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">Match Score</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Expertise</h4>
                  <div className="flex flex-wrap gap-1">
                    {auditor.expertise.map(skill => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Specializations</h4>
                  <div className="flex flex-wrap gap-1">
                    {auditor.specializations.slice(0, 3).map(spec => (
                      <Badge key={spec} variant="outline">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {auditor.avgDeliveryTime} days avg
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    ${auditor.hourlyRate}/hour
                  </div>
                  <Badge className={getAvailabilityColor(auditor.availability)}>
                    {auditor.availability}
                  </Badge>
                </div>
                
                <Button
                  onClick={() => handleSelectAuditor(auditor)}
                  disabled={auditor.availability === 'unavailable'}
                  className="ml-4"
                >
                  {auditor.availability === 'unavailable' ? 'Unavailable' : 'Select Auditor'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
