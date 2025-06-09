import React from 'react';
import { useUserProfiling } from '@/hooks/useUserProfiling';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Shield } from 'lucide-react';

export function PersonalizedWelcome() {
  const { user, userProfile } = useAuth();
  const { behaviorProfile, journeyProfile, getUserSegment, getRecommendedActions } = useUserProfiling();
  
  const userSegment = getUserSegment();
  const recommendedActions = getRecommendedActions();
  const isFirstVisit = behaviorProfile?.visitCount === 1;
  const journeyStage = journeyProfile?.currentStage;

  // Don't show for power users or if no behavior data
  if (!behaviorProfile || journeyStage === 'power_user') return null;

  const getWelcomeMessage = () => {
    if (user && userProfile?.full_name) {
      return `Welcome back, ${userProfile.full_name}!`;
    }
    
    if (isFirstVisit) {
      return "Welcome to Hawkly!";
    }
    
    return "Welcome back to Hawkly!";
  };

  const getPersonalizedMessage = () => {
    switch (userSegment) {
      case 'new_visitor':
        return "Discover the future of Web3 security. Connect with top auditors or showcase your expertise.";
      case 'returning_visitor':
        return "Ready for your next security audit? Our expert auditors are here to help.";
      case 'engaged_user':
        return "New audit opportunities are waiting. Check out the latest project requests.";
      case 'authenticated_user':
        return "Still exploring? Let us help you find exactly what you're looking for.";
      default:
        return "Your Web3 security journey continues here.";
    }
  };

  const getRecommendedButtons = () => {
    const buttons = [];
    
    if (recommendedActions.includes('explore_services')) {
      buttons.push({
        text: 'Explore Services',
        href: '/marketplace',
        icon: <Star className="h-4 w-4" />,
        variant: 'default' as const
      });
    }
    
    if (recommendedActions.includes('view_auditor_profiles')) {
      buttons.push({
        text: 'Browse Auditors',
        href: '/audits',
        icon: <Shield className="h-4 w-4" />,
        variant: 'outline' as const
      });
    }
    
    if (recommendedActions.includes('start_onboarding')) {
      buttons.push({
        text: 'Get Started',
        href: '/service-provider-onboarding',
        icon: <ArrowRight className="h-4 w-4" />,
        variant: 'default' as const
      });
    }
    
    if (recommendedActions.includes('submit_audit_request')) {
      buttons.push({
        text: 'Request Audit',
        href: '/request-audit',
        icon: <TrendingUp className="h-4 w-4" />,
        variant: 'default' as const
      });
    }

    return buttons.slice(0, 2); // Show max 2 buttons
  };

  const getProgressInfo = () => {
    if (!journeyProfile) return null;
    
    const progress = journeyProfile.progressScore;
    const stage = journeyProfile.currentStage;
    
    const stageLabels = {
      visitor: 'Getting Started',
      explorer: 'Exploring Options',
      evaluator: 'Comparing Services',
      engager: 'Active Engagement',
      converter: 'Successful User',
      advocate: 'Platform Advocate',
      power_user: 'Power User'
    };

    return {
      progress,
      stage: stageLabels[stage] || 'Unknown',
      color: progress < 30 ? 'bg-orange-500' : progress < 70 ? 'bg-blue-500' : 'bg-green-500'
    };
  };

  const progressInfo = getProgressInfo();
  const recommendedButtons = getRecommendedButtons();

  return (
    <Card className="mb-6 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-semibold">{getWelcomeMessage()}</h2>
              {progressInfo && (
                <Badge variant="secondary" className="text-xs">
                  {progressInfo.stage}
                </Badge>
              )}
            </div>
            
            <p className="text-muted-foreground mb-4">
              {getPersonalizedMessage()}
            </p>

            {progressInfo && progressInfo.progress < 100 && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Journey Progress</span>
                  <span className="font-medium">{progressInfo.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${progressInfo.color}`}
                    style={{ width: `${progressInfo.progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {recommendedButtons.map((button, index) => (
                <Button key={index} variant={button.variant} asChild>
                  <Link to={button.href} className="flex items-center gap-2">
                    {button.icon}
                    {button.text}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
