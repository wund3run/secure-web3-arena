import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, Target, TrendingUp, Star } from 'lucide-react';
import { ServiceCardProps } from '@/types/marketplace-unified';

interface MatchingCriteria {
  projectType: string;
  blockchain: string;
  budget: number;
  timeline: string;
  complexity: string;
  requirements: string[];
}

interface MatchScore {
  serviceId: string;
  overallScore: number;
  expertiseMatch: number;
  budgetCompatibility: number;
  availabilityMatch: number;
  reputationScore: number;
  reasoning: string[];
}

interface SmartMatchingEngineProps {
  services: ServiceCardProps[];
  criteria: MatchingCriteria;
  onMatchesFound: (matches: { service: ServiceCardProps; score: MatchScore }[]) => void;
}

export const SmartMatchingEngine: React.FC<SmartMatchingEngineProps> = ({
  services,
  criteria,
  onMatchesFound
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matches, setMatches] = useState<{ service: ServiceCardProps; score: MatchScore }[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const calculateMatchScore = (service: ServiceCardProps): MatchScore => {
    // Calculate individual scores
    const expertiseMatch = calculateExpertiseMatch(service);
    const budgetCompatibility = calculateBudgetCompatibility(service);
    const availabilityMatch = calculateAvailabilityMatch(service);
    const reputationScore = calculateReputationScore(service);
    
    // Overall weighted score
    const overallScore = (
      expertiseMatch * 0.35 +
      budgetCompatibility * 0.25 +
      availabilityMatch * 0.20 +
      reputationScore * 0.20
    );

    // Create complete score object for reasoning generation
    const scoreObject: MatchScore = {
      serviceId: service.id,
      overallScore: Math.round(overallScore),
      expertiseMatch: Math.round(expertiseMatch),
      budgetCompatibility: Math.round(budgetCompatibility),
      availabilityMatch: Math.round(availabilityMatch),
      reputationScore: Math.round(reputationScore),
      reasoning: [] // Will be filled by generateReasoning
    };

    const reasoning = generateReasoning(service, scoreObject);

    return {
      serviceId: service.id,
      overallScore: Math.round(overallScore),
      expertiseMatch: Math.round(expertiseMatch),
      budgetCompatibility: Math.round(budgetCompatibility),
      availabilityMatch: Math.round(availabilityMatch),
      reputationScore: Math.round(reputationScore),
      reasoning
    };
  };

  const calculateExpertiseMatch = (service: ServiceCardProps): number => {
    let score = 0;
    
    // Check if service category matches project type
    if (service.category.toLowerCase().includes(criteria.projectType.toLowerCase())) {
      score += 40;
    }
    
    // Check blockchain expertise
    const hasBlockchainExpertise = service.tags.some(tag => 
      tag.toLowerCase().includes(criteria.blockchain.toLowerCase())
    );
    if (hasBlockchainExpertise) score += 30;
    
    // Check specific requirements
    const requirementMatches = criteria.requirements.filter(req =>
      service.tags.some(tag => tag.toLowerCase().includes(req.toLowerCase()))
    );
    score += (requirementMatches.length / criteria.requirements.length) * 30;
    
    return Math.min(score, 100);
  };

  const calculateBudgetCompatibility = (service: ServiceCardProps): number => {
    const serviceCost = service.pricing.amount;
    const budgetRatio = criteria.budget / serviceCost;
    
    if (budgetRatio >= 1.5) return 100; // Well within budget
    if (budgetRatio >= 1.2) return 90;  // Comfortably within budget
    if (budgetRatio >= 1.0) return 80;  // Exactly within budget
    if (budgetRatio >= 0.8) return 60;  // Slightly over budget
    if (budgetRatio >= 0.6) return 40;  // Significantly over budget
    return 20; // Way over budget
  };

  const calculateAvailabilityMatch = (service: ServiceCardProps): number => {
    // Mock availability calculation based on response time and provider level
    const responseTimeHours = parseInt(service.responseTime?.replace(/\D/g, '') || '24');
    let score = 100 - (responseTimeHours * 2);
    
    // Adjust based on provider level
    if (service.provider.level === 'expert') score += 20;
    else if (service.provider.level === 'verified') score += 10;
    
    return Math.max(20, Math.min(score, 100));
  };

  const calculateReputationScore = (service: ServiceCardProps): number => {
    const ratingScore = (service.rating / 5) * 60;
    const experienceScore = Math.min((service.completedJobs / 100) * 40, 40);
    return ratingScore + experienceScore;
  };

  const generateReasoning = (service: ServiceCardProps, scores: MatchScore): string[] => {
    const reasoning = [];
    
    if (scores.expertiseMatch > 80) {
      reasoning.push("Excellent expertise match for your project requirements");
    } else if (scores.expertiseMatch > 60) {
      reasoning.push("Good expertise alignment with some relevant experience");
    }
    
    if (scores.budgetCompatibility > 80) {
      reasoning.push("Well within your budget range");
    } else if (scores.budgetCompatibility < 60) {
      reasoning.push("May require budget adjustment");
    }
    
    if (scores.reputationScore > 80) {
      reasoning.push("Highly rated with proven track record");
    }
    
    if (scores.availabilityMatch > 80) {
      reasoning.push("Quick response time and availability");
    }
    
    return reasoning;
  };

  const runMatching = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate AI processing
    for (let i = 0; i <= 100; i += 10) {
      setAnalysisProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Calculate matches
    const scoredServices = services.map(service => ({
      service,
      score: calculateMatchScore(service)
    }));
    
    // Sort by overall score
    const sortedMatches = scoredServices.sort((a, b) => b.score.overallScore - a.score.overallScore);
    
    setMatches(sortedMatches.slice(0, 5)); // Top 5 matches
    onMatchesFound(sortedMatches.slice(0, 5));
    setIsAnalyzing(false);
  };

  useEffect(() => {
    if (services.length > 0 && criteria.projectType) {
      runMatching();
    }
  }, [services, criteria]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Smart Matching
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAnalyzing ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 animate-pulse" />
              <span>Analyzing {services.length} services...</span>
            </div>
            <Progress value={analysisProgress} className="w-full" />
          </div>
        ) : matches.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="h-4 w-4" />
              Found {matches.length} recommended matches
            </div>
            
            {matches.map(({ service, score }, index) => (
              <Card key={service.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{service.title}</h4>
                    <p className="text-sm text-muted-foreground">{service.provider.name}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      {score.overallScore}% Match
                    </Badge>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{service.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Expertise</div>
                    <Progress value={score.expertiseMatch} className="h-2" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Budget Fit</div>
                    <Progress value={score.budgetCompatibility} className="h-2" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  {score.reasoning.map((reason, idx) => (
                    <div key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {reason}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Configure your project criteria to get AI-powered recommendations</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
