import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Star,
  Trophy,
  Target,
  BookOpen,
  Users,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  Award,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Brain,
  Rocket,
  Settings,
  UserCheck,
  ChevronRight,
  AlertTriangle,
  Play,
  ExternalLink
} from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { GamificationService } from "@/services/gamificationService";
import { useNavigate } from 'react-router-dom';

interface AuditorProfile {
  id: string;
  user_id: string;
  years_experience: number;
  specializations?: string[] | null;
  blockchain_expertise?: string[] | null;
  audit_types?: string[] | null;
  availability_hours?: number | null;
  preferred_languages?: string[] | null;
  time_zone?: string | null;
  preferred_communication?: string[] | null;
  business_name?: string | null;
  website_url?: string | null;
  linkedin_profile?: string | null;
  github_profile?: string | null;
  portfolio_url?: string | null;
  bio?: string | null;
  hourly_rate?: number | null;
  minimum_project_size?: number | null;
  maximum_concurrent_audits?: number | null;
  certifications?: string[] | null;
  education_background?: string | null;
  notable_clients?: string[] | null;
  audit_methodology?: string | null;
  tools_used?: string[] | null;
  availability_status?: string | null;
  preferred_industries?: string[] | null;
  average_completion_time_days?: number | null;
  success_rate_percentage?: number | null;
  repeat_client_rate?: number | null;
  created_at?: string;
  updated_at?: string;
  // Custom fields for personalization
  motivation_type?: 'achievement' | 'social' | 'mastery' | 'purpose';
  learning_style?: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  experience_level?: 'beginner' | 'intermediate' | 'expert';
  work_schedule_preference?: 'flexible' | 'structured' | 'deadline-driven';
  communication_style?: 'detailed' | 'concise' | 'collaborative';
  user_preferences?: Record<string, any>;
  personality_insights?: Record<string, any>;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  xpReward: number;
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'profile' | 'audit' | 'community' | 'gamification' | 'learning';
  route: string;
  priority: number;
  completed: boolean;
  ctaText: string;
  prerequisite?: string;
  experienceLevel?: ('beginner' | 'intermediate' | 'expert')[];
  motivationType?: ('achievement' | 'social' | 'mastery' | 'purpose')[];
}

interface RecommendedFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  priority: number;
  experienceLevel: ('beginner' | 'intermediate' | 'expert')[];
  motivationType: ('achievement' | 'social' | 'mastery' | 'purpose')[];
  link: string;
  estimatedValue: string;
  ctaText: string;
}

interface ActionPlan {
  title: string;
  description: string;
  estimatedTime: string;
  xpReward: number;
  steps: string[];
}

interface PersonalizedQuickActionsProps {
  userProfile: AuditorProfile | null;
  onActionComplete?: (actionId: string) => void;
}

export default function PersonalizedQuickActionsRefined({ 
  userProfile, 
  onActionComplete 
}: PersonalizedQuickActionsProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Define quick actions with dynamic routes
  const getQuickActions = useCallback((): QuickAction[] => [
    {
      id: 'complete-profile',
      title: 'Complete Your Profile',
      description: 'Fill out your auditor profile to start getting matched with projects',
      icon: Settings,
      xpReward: 100,
      estimatedTime: '10 min',
      difficulty: 'easy',
      category: 'profile',
      route: '/service-provider-onboarding',
      priority: 1,
      completed: !!(userProfile?.years_experience && userProfile.years_experience > 0),
      ctaText: 'Complete Profile',
      experienceLevel: ['beginner', 'intermediate', 'expert'],
      motivationType: ['achievement', 'social', 'mastery', 'purpose']
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
      route: '/auditor/opportunities',
      priority: 2,
      completed: false,
      ctaText: 'Browse Projects',
      experienceLevel: ['beginner', 'intermediate', 'expert'],
      motivationType: ['achievement', 'social', 'mastery', 'purpose']
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
      route: '/community',
      priority: 3,
      completed: false,
      ctaText: 'Join Community',
      experienceLevel: ['beginner', 'intermediate', 'expert'],
      motivationType: ['social']
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
      route: '/phase4',
      priority: 4,
      completed: false,
      ctaText: 'Explore AI Tools',
      experienceLevel: ['intermediate', 'expert'],
      motivationType: ['achievement', 'mastery']
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
      route: '/gamification',
      priority: 5,
      completed: false,
      ctaText: 'Setup Tracking',
      experienceLevel: ['beginner', 'intermediate', 'expert'],
      motivationType: ['achievement']
    },
    {
      id: 'personalization-setup',
      title: 'Personalize Your Experience',
      description: 'Customize your preferences for better recommendations',
      icon: Sparkles,
      xpReward: 75,
      estimatedTime: '7 min',
      difficulty: 'easy',
      category: 'profile',
      route: '/personalization-setup',
      priority: 6,
      completed: !!(userProfile?.motivation_type && userProfile.learning_style),
      ctaText: 'Personalize',
      experienceLevel: ['beginner', 'intermediate', 'expert'],
      motivationType: ['achievement', 'social', 'mastery', 'purpose']
    }
  ], [userProfile]);

  const RECOMMENDED_FEATURES: RecommendedFeature[] = [
    {
      id: 'smart-matching',
      title: 'Smart Project Matching',
      description: 'AI-powered recommendations based on your skills and preferences',
      icon: Brain,
      category: 'AI Features',
      priority: 1,
      experienceLevel: ['intermediate', 'expert'],
      motivationType: ['achievement', 'mastery'],
      link: '/auditor/opportunities',
      estimatedValue: '40% better matches',
      ctaText: 'Try Smart Matching'
    },
    {
      id: 'collaboration-hub',
      title: 'Collaboration Hub',
      description: 'Connect with other auditors for team projects and knowledge sharing',
      icon: Users,
      category: 'Community',
      priority: 2,
      experienceLevel: ['beginner', 'intermediate', 'expert'],
      motivationType: ['social'],
      link: '/community',
      estimatedValue: 'Build network',
      ctaText: 'Join Community'
    },
    {
      id: 'advanced-analytics',
      title: 'Performance Analytics',
      description: 'Track your audit performance and identify improvement areas',
      icon: TrendingUp,
      category: 'Analytics',
      priority: 3,
      experienceLevel: ['intermediate', 'expert'],
      motivationType: ['achievement', 'mastery'],
      link: '/analytics',
      estimatedValue: '25% efficiency gain',
      ctaText: 'View Analytics'
    },
    {
      id: 'learning-paths',
      title: 'Personalized Learning Paths',
      description: 'Curated educational content based on your experience level',
      icon: BookOpen,
      category: 'Learning',
      priority: 4,
      experienceLevel: ['beginner'],
      motivationType: ['mastery', 'purpose'],
      link: '/learning',
      estimatedValue: 'Accelerated growth',
      ctaText: 'Start Learning'
    }
  ];

  const ACTION_PLANS: ActionPlan[] = [
    {
      title: 'Beginner Onboarding Plan',
      description: 'Get started with the fundamentals of Web3 security auditing',
      estimatedTime: '2-3 hours',
      xpReward: 300,
      steps: [
        'Complete your auditor profile',
        'Take the security fundamentals quiz',
        'Browse beginner-friendly projects',
        'Join community discussions',
        'Apply for your first audit'
      ]
    },
    {
      title: 'Intermediate Growth Plan',
      description: 'Enhance your skills and build your reputation',
      estimatedTime: '1-2 hours',
      xpReward: 250,
      steps: [
        'Optimize your profile for better matching',
        'Explore AI-powered audit tools',
        'Complete 3-5 successful audits',
        'Build your professional network',
        'Start mentoring beginners'
      ]
    },
    {
      title: 'Expert Leadership Plan',
      description: 'Lead the community and showcase expertise',
      estimatedTime: '30-60 minutes',
      xpReward: 200,
      steps: [
        'Refine your specialization focus',
        'Lead complex multi-auditor projects',
        'Contribute to platform development',
        'Mentor other auditors',
        'Participate in governance'
      ]
    }
  ];

  // Load completed actions from analytics
  useEffect(() => {
    if (user) {
      loadCompletedActions();
    }
  }, [user]);

  const loadCompletedActions = useCallback(async () => {
    if (!user) return;
    
    try {
      setError(null);
      const { data, error: loadError } = await supabase
        .from('personalization_analytics')
        .select('event_data')
        .eq('user_id', user.id)
        .eq('event_type', 'quick_action_completed');

      if (loadError) throw loadError;

      const completed = data?.map(item => item.event_data?.action_id).filter(Boolean) || [];
      setCompletedActions(completed);
    } catch (error) {
      console.error('Error loading completed actions:', error);
      setError('Failed to load action history');
      
      if (retryCount < 2) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          loadCompletedActions();
        }, 2000);
      }
    }
  }, [user, retryCount]);

  const handleActionComplete = async (action: QuickAction) => {
    if (action.completed || isLoading) return;
    
    setIsLoading(true);
    try {
      // Execute the action navigation
      navigate(action.route);
      
      // Mark as completed and award XP
      if (user) {
        await GamificationService.awardXP(user.id, 'quick_action_completed', {
          description: `Completed: ${action.title}`,
          category: action.category
        });
        
        // Log the completion
        await supabase
          .from('personalization_analytics')
          .insert({
            user_id: user.id,
            event_type: 'quick_action_completed',
            event_data: {
              action_id: action.id,
              action_title: action.title,
              category: action.category,
              xp_awarded: action.xpReward
            }
          });
        
        setCompletedActions(prev => [...prev, action.id]);
        onActionComplete?.(action.id);
        
        toast({
          title: "Action Started!",
          description: `+${action.xpReward} XP will be awarded when you complete "${action.title}"`,
        });
      }
    } catch (error) {
      console.error('Error completing action:', error);
      toast({
        title: "Error",
        description: "Failed to start action. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Personalize recommendations based on user profile
  const getPersonalizedRecommendations = useCallback(() => {
    if (!userProfile) return RECOMMENDED_FEATURES.slice(0, 3);
    
    const experienceLevel = userProfile.experience_level || 
      (userProfile.years_experience >= 3 ? 'expert' : 
       userProfile.years_experience >= 1 ? 'intermediate' : 'beginner');
    
    const motivationType = userProfile.motivation_type || 'achievement';
    
    return RECOMMENDED_FEATURES.filter(feature => {
      const matchesExperience = feature.experienceLevel.includes(experienceLevel);
      const matchesMotivation = feature.motivationType.includes(motivationType);
      return matchesExperience || matchesMotivation;
    }).slice(0, 3);
  }, [userProfile]);

  // Get personalized action plan
  const getPersonalizedActionPlan = useCallback(() => {
    if (!userProfile) return ACTION_PLANS[0];
    
    const experienceLevel = userProfile.experience_level || 
      (userProfile.years_experience >= 3 ? 'expert' : 
       userProfile.years_experience >= 1 ? 'intermediate' : 'beginner');
    
    if (experienceLevel === 'expert') return ACTION_PLANS[2];
    if (experienceLevel === 'intermediate') return ACTION_PLANS[1];
    return ACTION_PLANS[0];
  }, [userProfile]);

  // Filter and sort quick actions
  const getPersonalizedQuickActions = useCallback(() => {
    const actions = getQuickActions();
    
    if (!userProfile) {
      return actions.slice(0, 4).map(action => ({
        ...action,
        completed: completedActions.includes(action.id)
      }));
    }

    const experienceLevel = userProfile.experience_level || 
      (userProfile.years_experience >= 3 ? 'expert' : 
       userProfile.years_experience >= 1 ? 'intermediate' : 'beginner');
    
    const motivationType = userProfile.motivation_type || 'achievement';

    return actions
      .filter(action => {
        const matchesExperience = action.experienceLevel?.includes(experienceLevel) ?? true;
        const matchesMotivation = action.motivationType?.includes(motivationType) ?? true;
        return matchesExperience || matchesMotivation;
      })
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
        return a.priority - b.priority;
      })
      .slice(0, 4);
  }, [userProfile, completedActions, getQuickActions]);

  const personalizedActions = getPersonalizedQuickActions();
  const personalizedRecommendations = getPersonalizedRecommendations();
  const personalizedPlan = getPersonalizedActionPlan();

  const completedCount = personalizedActions.filter(action => action.completed).length;
  const totalCount = personalizedActions.length;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="space-y-6" role="region" aria-label="Personalized quick actions">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setRetryCount(0);
                loadCompletedActions();
              }}
            >
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Wins Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Quick Actions
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {completedCount}/{totalCount} completed
              </span>
              <Progress value={completionPercentage} className="w-20 h-2" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list" aria-label="Quick actions">
            {personalizedActions.map((action) => (
              <div
                key={action.id}
                className={`relative p-4 border rounded-lg transition-all cursor-pointer ${
                  action.completed 
                    ? 'bg-green-50 border-green-200 opacity-75' 
                    : 'hover:shadow-md hover:border-blue-300'
                }`}
                onClick={() => !action.completed && handleActionComplete(action)}
                role="listitem"
              >
                {action.completed && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <div className={`rounded-lg p-2 ${
                    action.completed ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    <action.icon className={`h-5 w-5 ${
                      action.completed ? 'text-green-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {action.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {action.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {action.estimatedTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        +{action.xpReward} XP
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {action.difficulty}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant={action.completed ? "outline" : "default"}
                      disabled={action.completed || isLoading}
                      className="w-full"
                    >
                      {action.completed ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          {action.ctaText}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-purple-500" />
            Recommended Features for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {personalizedRecommendations.map((feature) => (
              <div
                key={feature.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(feature.link)}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-lg p-2">
                    <feature.icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {feature.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {feature.estimatedValue}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        {feature.ctaText}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Action Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-500" />
            Your Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">
              {personalizedPlan.title}
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              {personalizedPlan.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {personalizedPlan.estimatedTime}
              </span>
              <span className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                +{personalizedPlan.xpReward} XP total
              </span>
            </div>
            <div className="space-y-2">
              {personalizedPlan.steps.map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-xs font-medium text-green-600">
                    {index + 1}
                  </div>
                  <span className="text-sm text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 