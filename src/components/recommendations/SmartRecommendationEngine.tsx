
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Star, 
  TrendingUp, 
  Users, 
  BookOpen,
  Zap,
  Award,
  Clock,
  DollarSign,
  Target,
  ThumbsUp,
  ArrowRight
} from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'auditor' | 'project' | 'skill' | 'course' | 'tool';
  title: string;
  description: string;
  confidence: number;
  relevanceScore: number;
  category: string;
  metadata: any;
  actionText: string;
  priority: 'high' | 'medium' | 'low';
}

interface PersonalizedInsight {
  id: string;
  title: string;
  insight: string;
  impact: string;
  actionable: boolean;
  category: 'performance' | 'opportunity' | 'learning' | 'optimization';
}

export function SmartRecommendationEngine() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: '1',
      type: 'auditor',
      title: 'Top Ethereum Auditor Available',
      description: 'Sarah Chen specializes in DeFi protocols and has 98% success rate',
      confidence: 0.94,
      relevanceScore: 0.89,
      category: 'Perfect Match',
      metadata: {
        name: 'Sarah Chen',
        rating: 4.9,
        experience: '5+ years',
        price: '$150/hour'
      },
      actionText: 'Request Audit',
      priority: 'high'
    },
    {
      id: '2',
      type: 'skill',
      title: 'Improve Solidity Security Skills',
      description: 'Based on recent projects, advanced Solidity security patterns could boost your audit quality',
      confidence: 0.87,
      relevanceScore: 0.92,
      category: 'Skill Development',
      metadata: {
        currentLevel: 'Intermediate',
        targetLevel: 'Advanced',
        estimatedTime: '2 weeks'
      },
      actionText: 'Start Learning',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'project',
      title: 'High-Value NFT Project',
      description: 'OpenSea competitor launching with $50K audit budget - matches your expertise',
      confidence: 0.91,
      relevanceScore: 0.85,
      category: 'Opportunity',
      metadata: {
        budget: '$50,000',
        deadline: '3 weeks',
        complexity: 'High'
      },
      actionText: 'Apply Now',
      priority: 'high'
    },
    {
      id: '4',
      type: 'tool',
      title: 'Mythril Integration',
      description: 'Enhance your audit workflow with automated vulnerability detection',
      confidence: 0.83,
      relevanceScore: 0.78,
      category: 'Tool Recommendation',
      metadata: {
        timesSaved: '40%',
        setupTime: '30 minutes',
        cost: 'Free'
      },
      actionText: 'Install Tool',
      priority: 'low'
    }
  ]);

  const [insights, setInsights] = useState<PersonalizedInsight[]>([
    {
      id: '1',
      title: 'Peak Performance Hours',
      insight: 'Your audit quality scores are 23% higher when working between 9 AM - 12 PM',
      impact: 'Schedule complex audits during these hours to maximize effectiveness',
      actionable: true,
      category: 'performance'
    },
    {
      id: '2',
      title: 'Market Opportunity',
      insight: 'Polkadot ecosystem audits have increased 156% with limited competition',
      impact: 'Expanding to Polkadot could increase your monthly revenue by 40%',
      actionable: true,
      category: 'opportunity'
    },
    {
      id: '3',
      title: 'Learning Recommendation',
      insight: 'Auditors with zkSNARK knowledge earn 78% more on average',
      impact: 'Investing 3 weeks in zkSNARK education could significantly boost earning potential',
      actionable: true,
      category: 'learning'
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'auditor': return <Users className="h-4 w-4" />;
      case 'project': return <Target className="h-4 w-4" />;
      case 'skill': return <BookOpen className="h-4 w-4" />;
      case 'course': return <Award className="h-4 w-4" />;
      case 'tool': return <Zap className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return <TrendingUp className="h-4 w-4" />;
      case 'opportunity': return <Target className="h-4 w-4" />;
      case 'learning': return <BookOpen className="h-4 w-4" />;
      case 'optimization': return <Zap className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return 'bg-blue-100 text-blue-800';
      case 'opportunity': return 'bg-green-100 text-green-800';
      case 'learning': return 'bg-purple-100 text-purple-800';
      case 'optimization': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Smart Recommendation Engine</h2>
          <p className="text-muted-foreground">
            AI-powered personalized recommendations to optimize your experience
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="bg-purple-100 text-purple-800">
            <Brain className="h-3 w-3 mr-1" />
            {recommendations.filter(r => r.confidence > 0.8).length} High-Confidence
          </Badge>
          <Button variant="outline">
            <Brain className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="recommendations">Smart Recommendations</TabsTrigger>
          <TabsTrigger value="insights">Personalized Insights</TabsTrigger>
          <TabsTrigger value="analytics">Recommendation Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations">
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 rounded-lg bg-gray-100">
                        {getTypeIcon(rec.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{rec.title}</h3>
                          <Badge className={getPriorityColor(rec.priority)}>
                            {rec.priority} priority
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {rec.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{(rec.confidence * 100).toFixed(0)}% confidence</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            <span>{(rec.relevanceScore * 100).toFixed(0)}% relevance</span>
                          </div>
                          <Badge variant="outline">{rec.category}</Badge>
                        </div>
                        
                        {/* Type-specific metadata */}
                        {rec.type === 'auditor' && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Rating:</span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{rec.metadata.rating}</span>
                                </div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Experience:</span>
                                <div className="font-medium">{rec.metadata.experience}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Rate:</span>
                                <div className="font-medium">{rec.metadata.price}</div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {rec.type === 'project' && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Budget:</span>
                                <div className="font-medium">{rec.metadata.budget}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Deadline:</span>
                                <div className="font-medium">{rec.metadata.deadline}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Complexity:</span>
                                <div className="font-medium">{rec.metadata.complexity}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button className="ml-4">
                      {rec.actionText}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <div className="space-y-4">
            {insights.map((insight) => (
              <Card key={insight.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-gray-100">
                      {getCategoryIcon(insight.category)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{insight.title}</h3>
                        <Badge className={getCategoryColor(insight.category)}>
                          {insight.category}
                        </Badge>
                        {insight.actionable && (
                          <Badge variant="outline">Actionable</Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {insight.insight}
                      </p>
                      
                      <p className="text-sm font-medium text-blue-900 bg-blue-50 p-2 rounded">
                        💡 {insight.impact}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Recommendations</p>
                    <p className="text-2xl font-bold">247</p>
                  </div>
                  <Brain className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Acceptance Rate</p>
                    <p className="text-2xl font-bold">78%</p>
                  </div>
                  <ThumbsUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Confidence</p>
                    <p className="text-2xl font-bold">89%</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Value Generated</p>
                    <p className="text-2xl font-bold">$23K</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recommendation Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">By Category</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Auditor Matching</span>
                        <span className="text-sm font-medium">89% accuracy</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Project Opportunities</span>
                        <span className="text-sm font-medium">76% accuracy</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Skill Development</span>
                        <span className="text-sm font-medium">84% accuracy</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">User Satisfaction</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Very Helpful</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Somewhat Helpful</span>
                        <span className="text-sm font-medium">33%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Not Helpful</span>
                        <span className="text-sm font-medium">22%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
