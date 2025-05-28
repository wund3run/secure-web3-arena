
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  User, Brain, Target, Sparkles, TrendingUp, 
  Clock, Star, Shield, Zap, Settings 
} from "lucide-react";

interface UserPreferences {
  auditTypes: string[];
  blockchains: string[];
  budgetRange: [number, number];
  timeframe: string;
  experienceLevel: string;
  notifications: boolean;
  recommendations: boolean;
  contentPersonalization: boolean;
}

interface PersonalizedRecommendation {
  id: string;
  type: 'service' | 'content' | 'action' | 'trend';
  title: string;
  description: string;
  relevanceScore: number;
  reasoning: string;
  cta: string;
  urgent: boolean;
}

interface UserInsight {
  category: string;
  insight: string;
  confidence: number;
  actionable: boolean;
}

export function PersonalizationEngine() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    auditTypes: [],
    blockchains: [],
    budgetRange: [1000, 5000],
    timeframe: 'flexible',
    experienceLevel: 'intermediate',
    notifications: true,
    recommendations: true,
    contentPersonalization: true
  });

  const [recommendations, setRecommendations] = useState<PersonalizedRecommendation[]>([]);
  const [insights, setInsights] = useState<UserInsight[]>([]);
  const [personalizationScore, setPersonalizationScore] = useState(0);
  const [isLearning, setIsLearning] = useState(false);

  useEffect(() => {
    // Load user preferences
    const saved = localStorage.getItem('user-preferences');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
    
    // Initialize personalization engine
    generatePersonalizedContent();
  }, []);

  useEffect(() => {
    // Save preferences and update recommendations
    localStorage.setItem('user-preferences', JSON.stringify(preferences));
    generatePersonalizedContent();
  }, [preferences]);

  const generatePersonalizedContent = () => {
    setIsLearning(true);
    
    // Simulate AI learning process
    setTimeout(() => {
      // Generate personalized recommendations
      const newRecommendations: PersonalizedRecommendation[] = [
        {
          id: '1',
          type: 'service',
          title: 'Smart Contract Audit for DeFi Protocol',
          description: 'Based on your interest in DeFi and Ethereum, this audit service matches your preferences perfectly.',
          relevanceScore: 0.94,
          reasoning: 'Matches your preferred blockchain (Ethereum) and audit type (DeFi)',
          cta: 'View Service',
          urgent: false
        },
        {
          id: '2',
          type: 'trend',
          title: 'Cross-Chain Security Trending Up',
          description: 'Cross-chain bridge audits are seeing 40% more demand. Consider expanding to this area.',
          relevanceScore: 0.87,
          reasoning: 'Emerging opportunity in your expertise area',
          cta: 'Learn More',
          urgent: true
        },
        {
          id: '3',
          type: 'content',
          title: 'Advanced Solidity Security Patterns',
          description: 'New educational content that builds on your intermediate experience level.',
          relevanceScore: 0.82,
          reasoning: 'Matches your current skill level and learning goals',
          cta: 'Start Learning',
          urgent: false
        },
        {
          id: '4',
          type: 'action',
          title: 'Complete Your Profile',
          description: 'Adding certifications could increase your match score by 23%.',
          relevanceScore: 0.91,
          reasoning: 'Profile completion directly impacts visibility',
          cta: 'Update Profile',
          urgent: false
        }
      ];

      // Generate user insights
      const newInsights: UserInsight[] = [
        {
          category: 'Behavior Pattern',
          insight: 'You typically search for audits on weekday mornings, suggesting active project planning.',
          confidence: 0.89,
          actionable: true
        },
        {
          category: 'Preference Analysis',
          insight: 'Your budget range aligns with 73% of available premium audit services.',
          confidence: 0.95,
          actionable: false
        },
        {
          category: 'Market Opportunity',
          insight: 'Your skill set matches 85% of high-demand audit categories this quarter.',
          confidence: 0.78,
          actionable: true
        },
        {
          category: 'Growth Potential',
          insight: 'Adding Layer 2 expertise could open 40% more opportunities.',
          confidence: 0.82,
          actionable: true
        }
      ];

      setRecommendations(newRecommendations);
      setInsights(newInsights);
      
      // Calculate personalization score
      const score = Math.min(95, 20 + 
        (preferences.auditTypes.length * 10) + 
        (preferences.blockchains.length * 8) + 
        (preferences.recommendations ? 15 : 0) + 
        (preferences.contentPersonalization ? 15 : 0) + 
        (preferences.notifications ? 10 : 0)
      );
      setPersonalizationScore(score);
      
      setIsLearning(false);
    }, 1500);
  };

  const updatePreference = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'service': return <Shield className="h-4 w-4 text-blue-500" />;
      case 'trend': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'content': return <Star className="h-4 w-4 text-purple-500" />;
      case 'action': return <Zap className="h-4 w-4 text-orange-500" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const auditTypes = [
    'Smart Contract Audit',
    'DeFi Security Review',
    'NFT Security Audit',
    'Cross-Chain Bridge Audit',
    'Governance Review',
    'Token Economics Audit'
  ];

  const blockchains = [
    'Ethereum',
    'Polygon',
    'BSC',
    'Arbitrum',
    'Optimism',
    'Avalanche',
    'Solana'
  ];

  return (
    <div className="space-y-6">
      {/* Personalization Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              <CardTitle>AI Personalization Engine</CardTitle>
              {isLearning && (
                <Badge variant="secondary" className="animate-pulse">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Learning...
                </Badge>
              )}
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {personalizationScore}% Optimized
            </Badge>
          </div>
          <CardDescription>
            Intelligent recommendations and insights based on your behavior and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Personalization Level</span>
              <span>{personalizationScore}%</span>
            </div>
            <Progress value={personalizationScore} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {personalizationScore < 50 ? "Add more preferences to improve recommendations" :
               personalizationScore < 80 ? "Good personalization - keep engaging for better results" :
               "Excellent personalization - receiving highly relevant content"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{recommendations.length}</div>
              <div className="text-sm text-muted-foreground">Active Recommendations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{insights.length}</div>
              <div className="text-sm text-muted-foreground">Behavioral Insights</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">94%</div>
              <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Personalized Recommendations
          </CardTitle>
          <CardDescription>
            AI-curated suggestions based on your activity and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec) => (
            <Card key={rec.id} className={`border-l-4 ${rec.urgent ? 'border-l-orange-500' : 'border-l-primary'}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getRecommendationIcon(rec.type)}
                      <h4 className="font-medium">{rec.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {Math.round(rec.relevanceScore * 100)}% match
                      </Badge>
                      {rec.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                    <p className="text-xs text-muted-foreground italic">
                      Why this matters: {rec.reasoning}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    {rec.cta}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* User Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Behavioral Insights
          </CardTitle>
          <CardDescription>
            AI analysis of your patterns and opportunities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{insight.category}</span>
                  <Badge variant="outline" className="text-xs">
                    {Math.round(insight.confidence * 100)}% confidence
                  </Badge>
                  {insight.actionable && (
                    <Badge className="text-xs bg-green-100 text-green-700">
                      Actionable
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{insight.insight}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Preference Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Personalization Settings
          </CardTitle>
          <CardDescription>
            Configure your preferences to receive better recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Audit Types */}
          <div className="space-y-3">
            <h4 className="font-medium">Preferred Audit Types</h4>
            <div className="flex flex-wrap gap-2">
              {auditTypes.map((type) => (
                <Button
                  key={type}
                  size="sm"
                  variant={preferences.auditTypes.includes(type) ? "default" : "outline"}
                  onClick={() => {
                    const newTypes = preferences.auditTypes.includes(type)
                      ? preferences.auditTypes.filter(t => t !== type)
                      : [...preferences.auditTypes, type];
                    updatePreference('auditTypes', newTypes);
                  }}
                  className="text-xs"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Blockchain Preferences */}
          <div className="space-y-3">
            <h4 className="font-medium">Preferred Blockchains</h4>
            <div className="flex flex-wrap gap-2">
              {blockchains.map((blockchain) => (
                <Button
                  key={blockchain}
                  size="sm"
                  variant={preferences.blockchains.includes(blockchain) ? "default" : "outline"}
                  onClick={() => {
                    const newChains = preferences.blockchains.includes(blockchain)
                      ? preferences.blockchains.filter(b => b !== blockchain)
                      : [...preferences.blockchains, blockchain];
                    updatePreference('blockchains', newChains);
                  }}
                  className="text-xs"
                >
                  {blockchain}
                </Button>
              ))}
            </div>
          </div>

          {/* Personalization Controls */}
          <div className="space-y-4">
            <h4 className="font-medium">AI Features</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Smart Recommendations</label>
                  <p className="text-xs text-muted-foreground">Get AI-powered service and content suggestions</p>
                </div>
                <Switch
                  checked={preferences.recommendations}
                  onCheckedChange={(checked) => updatePreference('recommendations', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Content Personalization</label>
                  <p className="text-xs text-muted-foreground">Customize content based on your interests</p>
                </div>
                <Switch
                  checked={preferences.contentPersonalization}
                  onCheckedChange={(checked) => updatePreference('contentPersonalization', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Smart Notifications</label>
                  <p className="text-xs text-muted-foreground">Receive relevant alerts and updates</p>
                </div>
                <Switch
                  checked={preferences.notifications}
                  onCheckedChange={(checked) => updatePreference('notifications', checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
