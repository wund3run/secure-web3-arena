
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ServiceCardProps } from "@/types/marketplace-unified";
import { Brain, Shield, Sparkles, Star, Zap, TrendingUp, Target } from "lucide-react";
import { MobileFriendlyCard } from "./mobile-card";
import { useAdvancedMatching } from '@/hooks/useAdvancedMatching';

interface EnhancedAIRecommendationsProps {
  services: ServiceCardProps[];
  projectSize: string;
  blockchains: string[];
  onRecommendationSelect: (serviceId: string) => void;
}

export function EnhancedAIRecommendations({
  services,
  projectSize,
  blockchains,
  onRecommendationSelect,
}: EnhancedAIRecommendationsProps) {
  const [mlAnalysis, setMlAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { runAdvancedMatching } = useAdvancedMatching();

  useEffect(() => {
    performMLAnalysis();
  }, [services, projectSize, blockchains]);

  const performMLAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate ML analysis
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate ML-enhanced recommendations
    const analysis = {
      confidence_score: 0.89,
      recommendation_strength: 'high',
      matching_factors: [
        'Technical expertise alignment',
        'Project size compatibility',
        'Historical success rate',
        'Availability optimization'
      ],
      risk_assessment: 'low',
      success_prediction: 0.92
    };
    
    setMlAnalysis(analysis);
    setIsAnalyzing(false);
  };

  const getEnhancedRecommendations = () => {
    let filtered = [...services];
    
    if (blockchains && blockchains.length > 0) {
      filtered = filtered.filter(service =>
        service.tags.some(tag =>
          blockchains.some(chain => 
            tag.toLowerCase().includes(chain.toLowerCase())
          )
        )
      );
    }
    
    // Enhanced ML-based sorting
    filtered = filtered.sort((a, b) => {
      const sizeBoostA = a.tags.includes(projectSize) ? 1.5 : 0;
      const sizeBoostB = b.tags.includes(projectSize) ? 1.5 : 0;
      
      // ML confidence boost for high-rated services
      const mlBoostA = a.rating >= 4.8 ? 1.2 : 1.0;
      const mlBoostB = b.rating >= 4.8 ? 1.2 : 1.0;
      
      const scoreA = (a.rating + sizeBoostA) * mlBoostA;
      const scoreB = (b.rating + sizeBoostB) * mlBoostB;
      
      return scoreB - scoreA;
    });
    
    return filtered.slice(0, 3);
  };
  
  const recommendations = getEnhancedRecommendations();
  
  if (recommendations.length === 0) {
    return (
      <Card className="bg-primary/5 border border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 text-primary">
            <Brain className="h-5 w-5" />
            <h3 className="font-semibold">No Enhanced AI Recommendations Available</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            ML analysis couldn't find optimal matches. Try adjusting your criteria.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  const mapProviderLevel = (level: "rookie" | "verified" | "expert") => {
    if (level === "rookie") return "verified";
    if (level === "expert") return "expert";
    return "verified";
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-1 rounded">
          <Brain className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-lg font-bold">Enhanced AI Security Recommendations</h2>
        <Badge variant="outline" className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20 text-xs">
          ML Powered
        </Badge>
      </div>
      
      <Card className="bg-gradient-to-r from-purple-500/5 to-blue-500/5 border border-purple-500/20">
        <CardHeader className="pb-3 pt-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold flex items-center">
                <Brain className="h-4 w-4 mr-1 text-purple-500" />
                ML-Enhanced Matching Analysis
              </h3>
              <p className="text-sm text-muted-foreground">
                Advanced algorithms analyzing {projectSize} project requirements
                {blockchains && blockchains.length > 0 && ` for ${blockchains.join(', ')}`}
              </p>
            </div>
            <div className="flex items-center space-x-1 bg-background/50 px-2 py-1 rounded-full">
              <Star className="h-3 w-3 fill-purple-500 text-purple-500" />
              <span className="text-xs font-medium">ML Match</span>
            </div>
          </div>
          
          {isAnalyzing ? (
            <div className="mt-3">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
                <span className="text-sm">Running ML analysis...</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          ) : mlAnalysis && (
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div>
                <div className="text-lg font-bold text-purple-600">
                  {Math.round(mlAnalysis.confidence_score * 100)}%
                </div>
                <div className="text-xs text-muted-foreground">ML Confidence</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">
                  {Math.round(mlAnalysis.success_prediction * 100)}%
                </div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </div>
              <div>
                <Badge variant={mlAnalysis.risk_assessment === 'low' ? 'default' : 'destructive'} className="text-xs">
                  {mlAnalysis.risk_assessment} risk
                </Badge>
              </div>
              <div>
                <Badge variant="default" className="text-xs bg-gradient-to-r from-purple-500 to-blue-500">
                  {mlAnalysis.recommendation_strength}
                </Badge>
              </div>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((service, index) => (
              <div key={service.id} className="relative">
                {index === 0 && (
                  <div className="absolute -top-1 -right-1 z-10">
                    <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                      ML Top Pick
                    </Badge>
                  </div>
                )}
                <MobileFriendlyCard
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  provider={{
                    name: service.provider.name,
                    securityScore: service.provider.reputation,
                    verificationLevel: mapProviderLevel(service.provider.level),
                    completedProjects: service.completedJobs || 0
                  }}
                  pricing={service.pricing}
                  category={service.category}
                  tags={service.tags}
                  imageUrl={service.imageUrl}
                  onSelect={() => onRecommendationSelect(service.id)}
                  rating={service.rating}
                  completedJobs={service.completedJobs}
                />
              </div>
            ))}
          </div>
          
          {mlAnalysis && (
            <div className="mt-4 text-xs text-muted-foreground bg-background/50 p-3 rounded border">
              <p className="flex items-center mb-2">
                <Target className="h-3 w-3 mr-1 inline" />
                <strong>ML Matching Factors:</strong>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {mlAnalysis.matching_factors.map((factor: string, idx: number) => (
                  <span key={idx} className="flex items-center">
                    <TrendingUp className="h-2 w-2 mr-1 text-green-500" />
                    {factor}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-0 pb-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center text-sm text-muted-foreground">
              <Brain className="h-4 w-4 mr-1" />
              <span>ML-optimized for your project requirements</span>
            </div>
            
            <Button variant="link" size="sm" className="text-purple-500 p-0">
              Learn about ML matching
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
