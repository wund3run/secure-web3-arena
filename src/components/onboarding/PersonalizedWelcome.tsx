import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
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
  Settings
} from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { GamificationService } from "@/services/gamificationService";
import { XPAction } from "@/services/gamificationService";
import PersonalizedQuickActions from './PersonalizedQuickActions';

interface AuditorProfile {
  id: string;
  user_id: string;
  years_experience?: number;
  blockchain_expertise?: string[];
  specialization_tags?: string[];
  availability_status?: string;
  average_completion_time_days?: number;
  audit_types?: string[];
  business_name?: string;
  certifications?: any;
  created_at?: string;
  current_audit_count?: number;
  github_username?: string;
  hourly_rate_max?: number;
  hourly_rate_min?: number;
  languages_spoken?: string[];
  linkedin_url?: string;
  max_concurrent_audits?: number;
  max_project_size?: number;
  min_project_size?: number;
  portfolio_url?: string;
  preferred_project_types?: string[];
  repeat_client_rate?: number;
  response_time_hours?: number;
  success_rate?: number;
  timezone?: string;
  total_audits_completed?: number;
  updated_at?: string;
  user_preferences?: {
    goals?: string[];
    experience_level?: 'beginner' | 'intermediate' | 'expert';
    industry_focus?: string[];
    learning_style?: 'visual' | 'hands-on' | 'theoretical';
    motivation_type?: 'achievement' | 'social' | 'mastery' | 'purpose';
  };
  personality_insights?: {
    communication_style?: string;
    work_pattern?: string;
    collaboration_preference?: string;
  };
}

interface PersonalizedContent {
  welcomeMessage: string;
  motivationalQuote: string;
  recommendedFeatures: RecommendedFeature[];
  nextSteps: PersonalizedStep[];
  quickWins: QuickWin[];
  onboardingProgress: number;
}

interface RecommendedFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  priority: number;
  experienceMatch: boolean;
  ctaText: string;
  estimatedValue: string;
}

interface PersonalizedStep {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  xpReward: number;
  link: string;
  icon: React.ReactNode;
  completed: boolean;
  priority: number;
}

interface QuickWin {
  title: string;
  description: string;
  action: string;
  xpReward: number;
  timeToComplete: string;
  icon: React.ReactNode;
  ctaText: string;
}

export function PersonalizedWelcome() {
  const [profile, setProfile] = useState<AuditorProfile | null>(null);
  const [personalizedContent, setPersonalizedContent] = useState<PersonalizedContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  const { user } = useAuth();
  const { toast } = useToast();
  const gamificationService = new GamificationService();

  useEffect(() => {
    if (user) {
      fetchAuditorProfile();
      fetchCompletedActions();
    }
    
    // Update time every minute for dynamic greetings
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, [user]);

  const fetchAuditorProfile = async () => {
    if (!user) return;

    try {
      const { data: profileData, error } = await supabase
        .from('auditor_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setProfile(profileData);
      
      if (profileData) {
        generatePersonalizedContent(profileData);
      }
    } catch (error) {
      console.error('Error fetching auditor profile:', error);
      toast({
        title: "Error loading profile",
        description: "We'll use default recommendations for now",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCompletedActions = async () => {
    if (!user || !profile?.id) return;

    try {
      // Define a type for the data to avoid deep type instantiation
      interface ActionProgressData {
        action_data: {
          action: string;
          [key: string]: any;
        };
        [key: string]: any;
      }
      
      // Use any to break the deep type instantiation, then manually type the result
      const progressResult = await (supabase as any)
        .from('audit_progress')
        .select('action_data')
        .eq('auditor_id', profile.id)
        .eq('action_type', 'quick_action');
        
      if (progressResult.error) throw progressResult.error;
      
      const data = progressResult.data as ActionProgressData[] | null;
      const actions = data?.map(item => item.action_data?.action).filter(Boolean) || [];
      setCompletedActions(actions);
    } catch (error) {
      console.error('Error fetching completed actions:', error);
    }
  };

  const generatePersonalizedContent = (profile: AuditorProfile): void => {
    const preferences = profile.user_preferences || {};
    const experienceLevel = preferences.experience_level || determineExperienceLevel(profile.years_experience);
    const goals = preferences.goals || [];
    const industryFocus = preferences.industry_focus || [];
    const motivationType = preferences.motivation_type || 'achievement';

    // Generate time-based greeting
    const hour = currentTime.getHours();
    let timeGreeting = 'Good morning';
    let emoji = '🌅';
    if (hour >= 12 && hour < 17) {
      timeGreeting = 'Good afternoon';
      emoji = '☀️';
    } else if (hour >= 17) {
      timeGreeting = 'Good evening';
      emoji = '🌆';
    }

    // Personalized welcome message based on experience and goals
    const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'Auditor';
    
    const welcomeMessages = {
      beginner: `${timeGreeting}, ${firstName}! ${emoji} Welcome to your Web3 security journey. We're here to guide you from your first audit to becoming a trusted security expert.`,
      intermediate: `${timeGreeting}, ${firstName}! ${emoji} Ready to accelerate your auditing career? We've prepared personalized tools and challenges to help you reach the next level.`,
      expert: `${timeGreeting}, ${firstName}! ${emoji} Welcome to the community of security leaders. Your expertise is valuable - let's explore advanced collaboration and mentorship opportunities.`
    };

    // Motivational quotes tailored to motivation type and experience
    const motivationalQuotes = {
      achievement: experienceLevel === 'beginner' 
        ? "Every expert was once a beginner. Every vulnerability you catch is a step toward mastery. 🎯"
        : "Excellence is not a destination, but a journey. Each audit sharpens your edge further. ⚔️",
      social: experienceLevel === 'expert'
        ? "Great auditors don't just find bugs - they build communities. Your mentorship shapes the future. 🌐"
        : "We're stronger together. Connect, learn, and grow with fellow security professionals. 🤝",
      mastery: "Deep knowledge comes from curiosity and practice. Every protocol you understand makes you more valuable. 🧠",
      purpose: "Your work protects millions of users and billions in assets. Security is not just code - it's trust. 🛡️"
    };

    // Calculate onboarding progress
    const profileFields = [
      profile.specialization_tags?.length > 0,
      profile.availability_status !== null,
      profile.years_experience > 0,
      preferences.goals?.length > 0,
      preferences.industry_focus?.length > 0
    ];
    const onboardingProgress = (profileFields.filter(Boolean).length / profileFields.length) * 100;

    // Experience-based feature recommendations
    const allFeatures: RecommendedFeature[] = [
      {
        title: "AI-Powered Vulnerability Scanner",
        description: "Let AI assist your audits with advanced pattern recognition and smart suggestions",
        icon: <Brain className="h-5 w-5 text-purple-500" />,
        link: "/phase4",
        priority: experienceLevel === 'expert' ? 1 : 3,
        experienceMatch: experienceLevel !== 'beginner',
        ctaText: "Try AI Assistant",
        estimatedValue: "50% faster audits"
      },
      {
        title: "Portfolio Showcase Builder",
        description: "Create a professional portfolio that attracts high-value audit opportunities",
        icon: <Trophy className="h-5 w-5 text-yellow-500" />,
        link: "/portfolio/create",
        priority: 1,
        experienceMatch: true,
        ctaText: "Build Portfolio",
        estimatedValue: "3x more project invites"
      },
      {
        title: "Expert Peer Network",
        description: "Connect with top auditors for collaboration, mentorship, and knowledge sharing",
        icon: <Users className="h-5 w-5 text-green-500" />,
        link: "/community",
        priority: 2,
        experienceMatch: true,
        ctaText: "Join Network",
        estimatedValue: "Expand expertise areas"
      },
      {
        title: "Advanced Analytics Dashboard",
        description: "Track performance metrics and optimize your audit workflow with data insights",
        icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
        link: "/analytics",
        priority: experienceLevel === 'expert' ? 2 : 4,
        experienceMatch: experienceLevel !== 'beginner',
        ctaText: "View Analytics",
        estimatedValue: "20% efficiency gain"
      }
    ];

    // Generate personalized next steps based on profile completion and experience
    const nextSteps: PersonalizedStep[] = [
      {
        id: 'complete-profile',
        title: 'Complete Your Auditor Profile',
        description: 'Add specializations, set availability, and preferences for better project matching',
        estimatedTime: '5 minutes',
        xpReward: 100,
        link: '/service-provider-onboarding',
        icon: <Users className="h-5 w-5" />,
        completed: onboardingProgress > 80,
        priority: onboardingProgress < 80 ? 1 : 5
      },
      {
        id: 'first-portfolio-project',
        title: 'Add Your First Portfolio Project',
        description: 'Showcase your best audit work to attract premium opportunities',
        estimatedTime: '15 minutes',
        xpReward: 200,
        link: '/portfolio/create',
        icon: <Trophy className="h-5 w-5" />,
        completed: false,
        priority: 2
      },
      {
        id: 'browse-opportunities',
        title: 'Explore Audit Opportunities',
        description: 'Find projects that match your expertise and availability',
        estimatedTime: '10 minutes',
        xpReward: 50,
        link: '/auditor/opportunities',
        icon: <Target className="h-5 w-5" />,
        completed: false,
        priority: 3
      },
      {
        id: 'join-community',
        title: 'Connect with the Community',
        description: 'Join discussions, ask questions, and share knowledge with peers',
        estimatedTime: '10 minutes',
        xpReward: 75,
        link: '/community',
        icon: <Users className="h-5 w-5" />,
        completed: false,
        priority: motivationType === 'social' ? 1 : 4
      }
    ];

    // Quick wins based on motivation type and experience level
    const quickWins: QuickWin[] = [];
    
    if (motivationType === 'social') {
      quickWins.push({
        title: "Join Community Discussions",
        description: "Introduce yourself and connect with fellow auditors",
        action: "join_community",
        xpReward: 25,
        timeToComplete: "2 minutes",
        icon: <Users className="h-4 w-4" />,
        ctaText: "Say Hello"
      });
    }

    if (experienceLevel === 'beginner') {
      quickWins.push({
        title: "Complete Security Fundamentals Quiz",
        description: "Test your knowledge and earn your first achievement badge",
        action: "fundamentals_quiz",
        xpReward: 100,
        timeToComplete: "5 minutes",
        icon: <BookOpen className="h-4 w-4" />,
        ctaText: "Take Quiz"
      });
    } else {
      quickWins.push({
        title: "Share Your Expertise",
        description: "Answer a community question and earn recognition",
        action: "answer_question",
        xpReward: 150,
        timeToComplete: "5 minutes",
        icon: <Star className="h-4 w-4" />,
        ctaText: "Help Others"
      });
    }

    if (onboardingProgress < 100) {
      quickWins.push({
        title: "Complete Your Profile",
        description: "Unlock personalized recommendations and project matches",
        action: "complete_profile",
        xpReward: 100,
        timeToComplete: "3 minutes",
        icon: <CheckCircle className="h-4 w-4" />,
        ctaText: "Finish Setup"
      });
    }

    setPersonalizedContent({
      welcomeMessage: welcomeMessages[experienceLevel],
      motivationalQuote: motivationalQuotes[motivationType],
      recommendedFeatures: allFeatures
        .filter(f => f.experienceMatch)
        .sort((a, b) => a.priority - b.priority)
        .slice(0, 4),
      nextSteps: nextSteps
        .sort((a, b) => a.priority - b.priority)
        .slice(0, 4),
      quickWins: quickWins.slice(0, 3),
      onboardingProgress
    });
  };

  const determineExperienceLevel = (years: number): 'beginner' | 'intermediate' | 'expert' => {
    if (years < 2) return 'beginner';
    if (years < 5) return 'intermediate';
    return 'expert';
  };

  const handleQuickAction = async (action: string) => {
    if (completedActions.includes(action)) {
      toast({
        title: "Already completed!",
        description: "You've already earned XP for this action",
      });
      return;
    }

    try {
      // Award XP for the action
      if (profile?.id) {
        await GamificationService.awardXP(profile.id, XPAction.PROFILE_UPDATED, {
          action: action,
          timestamp: new Date().toISOString()
        });
      }

      // Track completion
      setCompletedActions(prev => [...prev, action]);

      toast({
        title: "Action completed! 🎉",
        description: "XP earned and progress tracked",
      });
    } catch (error) {
      console.error('Error tracking action:', error);
      toast({
        title: "Action completed!",
        description: "Keep up the great work!",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-40 bg-gray-200 rounded-xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-24 bg-gray-200 rounded-lg"></div>
          <div className="h-24 bg-gray-200 rounded-lg"></div>
          <div className="h-24 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!personalizedContent) {
    return (
      <Alert className="border-blue-200 bg-blue-50">
        <Sparkles className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-700">
          Setting up your personalized experience...
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6" role="main" aria-label="Personalized auditor dashboard">
      {/* Personalized Welcome Header */}
      <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 border-blue-200 shadow-lg">
        <CardContent className="pt-8 pb-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {personalizedContent.welcomeMessage}
              </h1>
              <p className="text-lg text-gray-700 italic font-medium" role="banner" aria-label="Daily motivation">
                {personalizedContent.motivationalQuote}
              </p>
              <div className="flex items-center gap-3 mt-4">
                {profile?.user_preferences?.experience_level && (
                  <Badge variant="secondary" className="px-3 py-1" aria-label={`Experience level: ${profile.user_preferences.experience_level}`}>
                    {profile.user_preferences.experience_level} level
                  </Badge>
                )}
                {personalizedContent.onboardingProgress < 100 && (
                  <div className="flex items-center gap-2" role="progressbar" aria-valuenow={personalizedContent.onboardingProgress} aria-valuemin={0} aria-valuemax={100} aria-label="Profile completion progress">
                    <span className="text-sm text-gray-600">Profile:</span>
                    <Progress 
                      value={personalizedContent.onboardingProgress} 
                      className="w-24 h-2"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {Math.round(personalizedContent.onboardingProgress)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3 ml-6">
              <div className="bg-white rounded-full p-3 shadow-md" aria-hidden="true">
                <Award className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Current Level</div>
                <div className="text-lg font-bold text-gray-900" aria-label={`Auditor level ${Math.floor((profile?.years_experience || 0) / 2) + 1}`}>
                  {Math.floor((profile?.years_experience || 0) / 2) + 1}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Personalized Quick Actions */}
      <PersonalizedQuickActions 
        userProfile={profile}
        onActionComplete={(actionId) => {
          setCompletedActions(prev => [...prev, actionId]);
          // Refresh personalized content after action completion
          if (profile) {
            generatePersonalizedContent(profile);
          }
        }}
      />

      {/* Recommended Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-blue-500" aria-hidden="true" />
            Recommended Features for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list" aria-label="Recommended features">
            {personalizedContent.recommendedFeatures.map((feature, index) => (
              <div key={index} className="p-5 border border-gray-200 rounded-lg hover:shadow-lg transition-all hover:border-blue-300" role="listitem">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 rounded-full p-3" aria-hidden="true">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <Badge variant="outline" className="text-xs" aria-label={`Estimated value: ${feature.estimatedValue}`}>
                        {feature.estimatedValue}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                    <Button asChild size="sm" className="w-full">
                      <Link 
                        to={feature.link} 
                        className="flex items-center justify-center gap-2"
                        aria-label={`${feature.ctaText} - ${feature.title}`}
                      >
                        {feature.ctaText}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-500" aria-hidden="true" />
            Your Personalized Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4" role="list" aria-label="Action plan steps">
            {personalizedContent.nextSteps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" role="listitem">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full" aria-hidden="true">
                  {step.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-semibold ${step.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {step.estimatedTime}
                        </span>
                        <Badge variant="outline" className="text-xs" aria-label={`XP reward: ${step.xpReward} points`}>
                          +{step.xpReward} XP
                        </Badge>
                        {step.priority === 1 && (
                          <Badge variant="default" className="text-xs bg-orange-100 text-orange-800" aria-label="High priority task">
                            High Priority
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button 
                      asChild 
                      size="sm" 
                      variant={step.completed ? "outline" : "default"}
                      disabled={step.completed}
                      className="ml-4"
                      aria-label={step.completed ? `${step.title} - Completed` : `Start ${step.title}`}
                    >
                      <Link to={step.link}>
                        {step.completed ? 'Completed' : 'Start'}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
