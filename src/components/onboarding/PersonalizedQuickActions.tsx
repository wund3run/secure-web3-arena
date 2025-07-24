import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Star, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Target,
  Award,
  Clock,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Briefcase,
  MessageSquare,
  Shield,
  Code,
  BarChart3,
  Sparkles,
  Brain,
  Rocket,
  Settings
} from 'lucide-react';
import { GamificationService } from "@/services/gamificationService";
import { XPAction } from "@/services/gamificationService";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  xpReward: number;
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'profile' | 'learning' | 'community' | 'audit' | 'gamification';
  action: () => void;
  completed?: boolean;
  priority: number;
  ctaText: string;
}

interface RecommendedFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  value: string;
  category: string;
  route: string;
  experienceLevel: string[];
  motivationType: string[];
}

interface PersonalizedActionPlan {
  id: string;
  title: string;
  description: string;
  steps: string[];
  estimatedDuration: string;
  xpReward: number;
  category: string;
  priority: number;
}

// Move QUICK_ACTIONS inside component to access navigate
// const QUICK_ACTIONS will be defined inside the component

const RECOMMENDED_FEATURES: RecommendedFeature[] = [
  {
    id: 'smart-matching',
    title: 'AI-Powered Project Matching',
    description: 'Get personalized audit recommendations based on your skills',
    icon: Target,
    value: 'Higher success rate',
    category: 'Productivity',
    route: '/auditor/opportunities',
    experienceLevel: ['beginner', 'intermediate'],
    motivationType: ['achievement', 'mastery']
  },
  {
    id: 'learning-paths',
    title: 'Personalized Learning Paths',
    description: 'Structured courses tailored to your experience level',
    icon: BookOpen,
    value: 'Accelerated growth',
    category: 'Learning',
    route: '/learning',
    experienceLevel: ['beginner', 'intermediate'],
    motivationType: ['mastery', 'purpose']
  },
  {
    id: 'peer-collaboration',
    title: 'Peer Collaboration Network',
    description: 'Connect with auditors for joint projects and mentorship',
    icon: Users,
    value: 'Community support',
    category: 'Social',
    route: '/community',
    experienceLevel: ['intermediate', 'expert'],
    motivationType: ['social', 'purpose']
  },
  {
    id: 'advanced-analytics',
    title: 'Performance Analytics',
    description: 'Track your audit success rate and improvement areas',
    icon: BarChart3,
    value: 'Data-driven insights',
    category: 'Analytics',
    route: '/analytics',
    experienceLevel: ['intermediate', 'expert'],
    motivationType: ['achievement', 'mastery']
  },
  {
    id: 'security-tools',
    title: 'Advanced Security Tools',
    description: 'Access cutting-edge analysis and vulnerability detection',
    icon: Shield,
    value: 'Professional edge',
    category: 'Tools',
    route: '/phase4',
    experienceLevel: ['expert'],
    motivationType: ['mastery', 'purpose']
  }
];

const ACTION_PLANS: PersonalizedActionPlan[] = [
  {
    id: 'beginner-path',
    title: 'Get Started as a Web3 Auditor',
    description: 'Complete foundation setup and land your first audit',
    steps: [
      'Complete your auditor profile',
      'Browse and apply to 3 beginner-friendly projects',
      'Join community discussions',
      'Complete first learning module'
    ],
    estimatedDuration: '1-2 weeks',
    xpReward: 500,
    category: 'Getting Started',
    priority: 10
  },
  {
    id: 'intermediate-growth',
    title: 'Accelerate Your Audit Career',
    description: 'Build expertise and increase your project success rate',
    steps: [
      'Complete 3 successful audits',
      'Specialize in 2 preferred industries',
      'Mentor a new auditor',
      'Contribute to security discussions'
    ],
    estimatedDuration: '4-6 weeks',
    xpReward: 1000,
    category: 'Career Growth',
    priority: 8
  },
  {
    id: 'expert-leadership',
    title: 'Become a Security Leader',
    description: 'Establish yourself as a thought leader in Web3 security',
    steps: [
      'Lead complex multi-auditor projects',
      'Publish security research',
      'Speak at industry events',
      'Build your auditor team'
    ],
    estimatedDuration: '8-12 weeks',
    xpReward: 2000,
    category: 'Leadership',
    priority: 6
  }
];

interface PersonalizedQuickActionsProps {
  userProfile?: any;
  onActionComplete?: (actionId: string) => void;
}

export default function PersonalizedQuickActions({ 
  userProfile, 
  onActionComplete 
}: PersonalizedQuickActionsProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Define QUICK_ACTIONS inside component to access navigate
  const QUICK_ACTIONS: QuickAction[] = [
    {
      id: 'complete-profile',
      title: 'Complete Your Profile',
      description: 'Fill out your auditor profile to start getting matched with projects',
      icon: Settings,
      xpReward: 100,
      estimatedTime: '10 min',
      difficulty: 'easy',
      category: 'profile',
      action: () => navigate('/service-provider-onboarding'),
      priority: 1,
      completed: !!userProfile?.years_experience,
      ctaText: 'Complete Profile'
    },
    {
      id: 'browse-opportunities',
      title: 'Browse Audit Opportunities',
      description: 'Discover available audit projects that match your skills',
      icon: Target,
      xpReward: 50,
      estimatedTime: '5 min',
      difficulty: 'easy',
      category: 'audit',
      action: () => navigate('/auditor/opportunities'),
      priority: 2,
      completed: false,
      ctaText: 'Browse Projects'
    },
    {
      id: 'join-community',
      title: 'Join Community Discussions',
      description: 'Connect with fellow auditors and share knowledge',
      icon: Users,
      xpReward: 25,
      estimatedTime: '3 min',
      difficulty: 'easy',
      category: 'community',
      action: () => navigate('/community'),
      priority: 3,
      completed: false,
      ctaText: 'Join Community'
    },
    {
      id: 'explore-ai-tools',
      title: 'Explore AI-Powered Tools',
      description: 'Check out our advanced AI audit assistance features',
      icon: Brain,
      xpReward: 75,
      estimatedTime: '8 min',
      difficulty: 'medium',
      category: 'audit',
      action: () => navigate('/phase4'),
      priority: 4,
      completed: false,
      ctaText: 'Explore AI Tools'
    },
    {
      id: 'setup-gamification',
      title: 'Enable Progress Tracking',
      description: 'Set up your achievement tracking and progress monitoring',
      icon: Award,
      xpReward: 50,
      estimatedTime: '5 min',
      difficulty: 'easy',
      category: 'gamification',
      action: () => navigate('/gamification'),
      priority: 5,
      completed: false,
      ctaText: 'Setup Tracking'
    }
  ];

  // Load completed actions from analytics
  useEffect(() => {
    if (user) {
      loadCompletedActions();
    }
  }, [user]);

  const loadCompletedActions = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('personalization_analytics')
        .select('event_data')
        .eq('user_id', user.id)
        .eq('event_type', 'quick_action_completed');

      if (error) throw error;

      const completed = data?.map(item => item.event_data?.action_id).filter(Boolean) || [];
      setCompletedActions(completed);
    } catch (error) {
      console.error('Error loading completed actions:', error);
    }
  };

  const handleActionComplete = async (action: QuickAction) => {
    if (action.completed) return;
    
    setIsLoading(true);
    try {
      // Execute the action
      action.action();
      
      // Mark as completed and award XP
      if (user) {
        await GamificationService.awardXP(user.id, action.xpReward as XPAction, {
          description: `Completed: ${action.title}`,
          category: action.category
        });
        
        setCompletedActions(prev => [...prev, action.id]);
        onActionComplete?.(action.id);
        
        toast({
          title: "Action Completed!",
          description: `+${action.xpReward} XP awarded for completing "${action.title}"`,
        });
      }
    } catch (error) {
      console.error('Error completing action:', error);
      toast({
        title: "Error",
        description: "Failed to complete action. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Personalize recommendations based on user profile
  const getPersonalizedRecommendations = () => {
    if (!userProfile) return RECOMMENDED_FEATURES.slice(0, 3);
    
    return RECOMMENDED_FEATURES.filter(feature => {
      const matchesExperience = feature.experienceLevel.includes(userProfile.experience_level || 'beginner');
      const matchesMotivation = feature.motivationType.includes(userProfile.motivation_type || 'achievement');
      return matchesExperience || matchesMotivation;
    }).slice(0, 3);
  };

  // Get personalized action plan
  const getPersonalizedActionPlan = () => {
    const experienceLevel = userProfile?.experience_level || 'beginner';
    
    if (experienceLevel === 'expert') return ACTION_PLANS[2];
    if (experienceLevel === 'intermediate') return ACTION_PLANS[1];
    return ACTION_PLANS[0];
  };

  // Filter and sort quick actions
  const getPersonalizedQuickActions = () => {
    return QUICK_ACTIONS
      .map(action => ({
        ...action,
        completed: completedActions.includes(action.id)
      }))
      .sort((a, b) => {
        // Prioritize incomplete actions
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        // Then sort by priority
        return b.priority - a.priority;
      })
      .slice(0, 4);
  };

  const personalizedActions = getPersonalizedQuickActions();
  const personalizedRecommendations = getPersonalizedRecommendations();
  const personalizedPlan = getPersonalizedActionPlan();

  return (
    <div className="space-y-6" role="region" aria-label="Personalized quick actions">
      {/* Quick Wins Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <CardTitle>Quick Wins</CardTitle>
          </div>
          <CardDescription>
            Complete these actions to earn XP and unlock features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {personalizedActions.map((action) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.id}
                  className={`p-4 border rounded-lg transition-all ${
                    action.completed
                      ? 'bg-green-50 border-green-200'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`p-2 rounded-lg ${
                        action.completed ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {action.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Icon className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{action.title}</h4>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="outline" className="text-xs">
                            +{action.xpReward} XP
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {action.estimatedTime}
                          </span>
                          <Badge 
                            variant={action.difficulty === 'easy' ? 'default' : 
                                   action.difficulty === 'medium' ? 'secondary' : 'destructive'}
                            className="text-xs"
                          >
                            {action.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {!action.completed && (
                      <Button
                        size="sm"
                        onClick={() => handleActionComplete(action)}
                        disabled={isLoading}
                        className="ml-4"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Features */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-blue-500" />
            <CardTitle>Recommended for You</CardTitle>
          </div>
          <CardDescription>
            Features tailored to your experience level and goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {personalizedRecommendations.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.id}
                  to={feature.route}
                  className="block p-4 border rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{feature.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {feature.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-xs text-green-600 font-medium">{feature.value}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Action Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-purple-500" />
            <CardTitle>Your Action Plan</CardTitle>
          </div>
          <CardDescription>
            A personalized roadmap for your auditor journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">{personalizedPlan.title}</h4>
              <Badge variant="outline">{personalizedPlan.category}</Badge>
            </div>
            <p className="text-muted-foreground">{personalizedPlan.description}</p>
            
            <div className="space-y-2">
              <h5 className="font-medium">Steps to Complete:</h5>
              <ul className="space-y-2">
                {personalizedPlan.steps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 inline mr-1" />
                  {personalizedPlan.estimatedDuration}
                </span>
                <Badge variant="outline">
                  +{personalizedPlan.xpReward} XP
                </Badge>
              </div>
              <Button size="sm">
                Start Plan
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
