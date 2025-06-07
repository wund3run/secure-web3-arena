
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, Clock, Star } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  provider: string;
  description: string;
  price: string;
  rating: number;
  completionTime: string;
  category: string;
  tags: string[];
}

interface AIRecommendationsProps {
  services: Service[];
  projectSize?: string;
  blockchains?: string[];
  onRecommendationSelect: (serviceId: string) => void;
}

export function AIRecommendations({ 
  services, 
  projectSize = 'medium', 
  blockchains = [], 
  onRecommendationSelect 
}: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [insightReason, setInsightReason] = useState<string>('');

  useEffect(() => {
    generateRecommendations();
  }, [services, projectSize, blockchains]);

  const generateRecommendations = async () => {
    setLoading(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // AI-powered recommendation logic
    let filteredServices = [...services];
    let reasonParts: string[] = [];

    // Filter by project size relevance
    if (projectSize === 'small') {
      filteredServices = filteredServices.filter(service => 
        service.price.includes('Basic') || 
        service.completionTime.includes('1-2') ||
        service.name.toLowerCase().includes('quick')
      );
      reasonParts.push('optimized for small projects');
    } else if (projectSize === 'large') {
      filteredServices = filteredServices.filter(service => 
        service.price.includes('Enterprise') || 
        service.name.toLowerCase().includes('comprehensive') ||
        service.description.toLowerCase().includes('complex')
      );
      reasonParts.push('suitable for large-scale projects');
    }

    // Filter by blockchain compatibility
    if (blockchains.length > 0) {
      filteredServices = filteredServices.filter(service =>
        blockchains.some(blockchain =>
          service.description.toLowerCase().includes(blockchain.toLowerCase()) ||
          service.tags.some(tag => tag.toLowerCase().includes(blockchain.toLowerCase()))
        )
      );
      reasonParts.push(`compatible with ${blockchains.join(', ')}`);
    }

    // Sort by AI scoring algorithm
    const scoredServices = filteredServices.map(service => ({
      ...service,
      aiScore: calculateAIScore(service, projectSize, blockchains)
    })).sort((a, b) => b.aiScore - a.aiScore);

    // Take top 3 recommendations
    const topRecommendations = scoredServices.slice(0, 3);
    
    setRecommendations(topRecommendations);
    setInsightReason(reasonParts.join(' and '));
    setLoading(false);

    // Track AI recommendations generation
    if ((window as any).trackConversion) {
      (window as any).trackConversion({
        action: 'ai_recommendations_generated',
        category: 'marketplace',
        label: 'service_recommendations',
        metadata: {
          projectSize,
          blockchains,
          recommendationCount: topRecommendations.length
        }
      });
    }
  };

  const calculateAIScore = (service: Service, projectSize: string, blockchains: string[]): number => {
    let score = service.rating * 20; // Base score from rating (0-100)

    // Project size relevance bonus
    if (projectSize === 'small' && service.price.includes('Basic')) score += 15;
    if (projectSize === 'medium' && service.price.includes('Standard')) score += 15;
    if (projectSize === 'large' && service.price.includes('Enterprise')) score += 15;

    // Blockchain compatibility bonus
    const blockchainMatches = blockchains.filter(blockchain =>
      service.description.toLowerCase().includes(blockchain.toLowerCase()) ||
      service.tags.some(tag => tag.toLowerCase().includes(blockchain.toLowerCase()))
    ).length;
    score += blockchainMatches * 10;

    // Completion time bonus (faster is better for certain project sizes)
    if (projectSize === 'small' && service.completionTime.includes('1-2')) score += 10;
    
    // Popular categories bonus
    if (['Smart Contract Audit', 'Security Assessment'].includes(service.category)) {
      score += 5;
    }

    return Math.min(score, 100); // Cap at 100
  };

  const handleRecommendationClick = (service: Service) => {
    // Track recommendation click
    if ((window as any).trackConversion) {
      (window as any).trackConversion({
        action: 'ai_recommendation_clicked',
        category: 'marketplace',
        label: service.name,
        metadata: {
          serviceId: service.id,
          aiScore: (service as any).aiScore,
          position: recommendations.findIndex(r => r.id === service.id) + 1
        }
      });
    }

    onRecommendationSelect(service.id);
  };

  if (loading) {
    return (
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-blue-500 animate-pulse" />
            <div className="space-y-1">
              <h3 className="font-semibold">AI is analyzing your needs...</h3>
              <p className="text-sm text-muted-foreground">
                Finding the perfect services for your project
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return null; // Don't show if no recommendations
  }

  return (
    <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          AI-Powered Recommendations
        </CardTitle>
        <CardDescription>
          Based on your project requirements, here are our top recommendations
          {insightReason && ` - ${insightReason}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          {recommendations.map((service, index) => (
            <Card 
              key={service.id} 
              className="relative hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-blue-300"
              onClick={() => handleRecommendationClick(service)}
            >
              {index === 0 && (
                <div className="absolute -top-2 left-4">
                  <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Top Pick
                  </Badge>
                </div>
              )}
              
              <CardContent className="p-4 space-y-3">
                <div>
                  <h4 className="font-semibold text-sm">{service.name}</h4>
                  <p className="text-xs text-muted-foreground">by {service.provider}</p>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span>{service.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{service.completionTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {service.price}
                  </Badge>
                  <Button size="sm" variant="outline" className="text-xs h-7">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground">
            AI confidence: {Math.round(recommendations[0] ? (recommendations[0] as any).aiScore : 0)}% match
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
