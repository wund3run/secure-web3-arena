import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth/AuthContext';
import { analyticsTracker } from '@/utils/analytics-tracker';
import { PersonalizedRecommendations } from '@/components/recommendations/PersonalizedRecommendations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, TrendingUp, Shield, Zap } from 'lucide-react';

interface UserBehavior {
  pageViews: string[];
  timeSpent: Record<string, number>;
  interactions: string[];
  lastVisit: string;
  userType?: string;
}

interface PersonalizedContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
    priority: number;
  }>;
  recommendations: Array<{
    type: string;
    content: string;
    action: string;
  }>;
}

export function PersonalizationEngine() {
  const { user } = useAuth();
  const [userBehavior, setUserBehavior] = useState<UserBehavior | null>(null);
  const [personalizedContent, setPersonalizedContent] = useState<PersonalizedContent | null>(null);
  const [userSegment, setUserSegment] = useState<'new' | 'returning' | 'power' | 'enterprise'>('new');

  useEffect(() => {
    // Load user behavior from analytics
    const behavior = loadUserBehavior();
    setUserBehavior(behavior);
    
    // Determine user segment
    const segment = determineUserSegment(behavior);
    setUserSegment(segment);
    
    // Generate personalized content
    const content = generatePersonalizedContent(segment, behavior);
    setPersonalizedContent(content);
    
    // Track personalization event
    analyticsTracker.track('personalization', 'system', 'content_generated', segment);
  }, [user]);

  const loadUserBehavior = (): UserBehavior => {
    try {
      const stored = localStorage.getItem('hawkly_user_behavior');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load user behavior:', error);
    }
    
    return {
      pageViews: [],
      timeSpent: {},
      interactions: [],
      lastVisit: new Date().toISOString()
    };
  };

  const determineUserSegment = (behavior: UserBehavior): 'new' | 'returning' | 'power' | 'enterprise' => {
    if (!behavior.pageViews.length) return 'new';
    
    const totalPageViews = behavior.pageViews.length;
    const totalTimeSpent = Object.values(behavior.timeSpent).reduce((sum, time) => sum + time, 0);
    const hasInteractions = behavior.interactions.length > 0;
    
    if (totalPageViews > 50 && totalTimeSpent > 3600000) return 'enterprise'; // 1+ hour
    if (totalPageViews > 20 && hasInteractions) return 'power';
    if (totalPageViews > 5) return 'returning';
    
    return 'new';
  };

  const generatePersonalizedContent = (segment: string, behavior: UserBehavior): PersonalizedContent => {
    const contentMap = {
      new: {
        hero: {
          title: "Welcome to the Future of Web3 Security",
          subtitle: "Get started with our guided onboarding and find the perfect auditor for your project",
          cta: "Start Your Security Journey"
        },
        features: [
          {
            title: "Guided Onboarding",
            description: "Step-by-step process to get you started",
            icon: <User className="h-5 w-5" />,
            priority: 1
          },
          {
            title: "AI-Powered Matching",
            description: "Find the perfect auditor for your needs",
            icon: <Zap className="h-5 w-5" />,
            priority: 2
          }
        ],
        recommendations: [
          {
            type: "onboarding",
            content: "Complete your profile setup to get personalized audit recommendations",
            action: "Start Setup"
          },
          {
            type: "tutorial",
            content: "Take our 5-minute security assessment to understand your needs",
            action: "Take Assessment"
          }
        ]
      },
      returning: {
        hero: {
          title: "Welcome Back! Continue Your Security Journey",
          subtitle: "Pick up where you left off or explore new audit opportunities",
          cta: "Continue Your Journey"
        },
        features: [
          {
            title: "Your Dashboard",
            description: "Track your ongoing audits and projects",
            icon: <TrendingUp className="h-5 w-5" />,
            priority: 1
          },
          {
            title: "New Opportunities",
            description: "Fresh audit requests matching your expertise",
            icon: <Shield className="h-5 w-5" />,
            priority: 2
          }
        ],
        recommendations: [
          {
            type: "continue",
            content: "Resume your pending audit request from last week",
            action: "Continue Audit"
          },
          {
            type: "explore",
            content: "Check out new auditors that match your previous selections",
            action: "Browse Auditors"
          }
        ]
      },
      power: {
        hero: {
          title: "Advanced Security Solutions for Power Users",
          subtitle: "Access premium features and advanced audit tools",
          cta: "Explore Advanced Features"
        },
        features: [
          {
            title: "Advanced Analytics",
            description: "Deep insights into your security posture",
            icon: <TrendingUp className="h-5 w-5" />,
            priority: 1
          },
          {
            title: "Premium Support",
            description: "Priority access to our security experts",
            icon: <Shield className="h-5 w-5" />,
            priority: 2
          }
        ],
        recommendations: [
          {
            type: "premium",
            content: "Upgrade to Premium for bulk audit discounts and priority support",
            action: "Upgrade Now"
          },
          {
            type: "analytics",
            content: "View detailed analytics for your completed audits",
            action: "View Analytics"
          }
        ]
      },
      enterprise: {
        hero: {
          title: "Enterprise-Grade Security Solutions",
          subtitle: "Scale your security operations with our enterprise platform",
          cta: "Contact Enterprise Sales"
        },
        features: [
          {
            title: "Custom Integrations",
            description: "Integrate with your existing security stack",
            icon: <Zap className="h-5 w-5" />,
            priority: 1
          },
          {
            title: "Dedicated Support",
            description: "24/7 support from our security team",
            icon: <Shield className="h-5 w-5" />,
            priority: 2
          }
        ],
        recommendations: [
          {
            type: "enterprise",
            content: "Schedule a call with our enterprise team for custom solutions",
            action: "Schedule Call"
          },
          {
            type: "integration",
            content: "Explore API integrations for your development workflow",
            action: "View API Docs"
          }
        ]
      }
    };

    return contentMap[segment as keyof typeof contentMap] || contentMap.new;
  };

  if (!personalizedContent) return null;

  return (
    <div className="space-y-6">
      {/* Personalized Hero Section */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="secondary">
              Personalized for {userSegment} users
            </Badge>
            <Badge variant="outline">
              {userBehavior?.pageViews.length || 0} visits
            </Badge>
          </div>
          <CardTitle className="text-2xl">{personalizedContent.hero.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{personalizedContent.hero.subtitle}</p>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
            {personalizedContent.hero.cta}
          </button>
        </CardContent>
      </Card>

      {/* Personalized Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {personalizedContent.features.map((feature, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                {feature.icon}
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Personalized Recommendations */}
      <PersonalizedRecommendations 
        userType={userBehavior?.userType as any || 'general'} 
      />
    </div>
  );
}
