import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
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
  AlertTriangle
} from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { GamificationService } from "@/services/gamificationService";
import PersonalizedQuickActionsRefined from './PersonalizedQuickActionsRefined';
import { Link, useNavigate } from 'react-router-dom';

// Use the actual database type for auditor_profiles
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

interface PersonalizedContent {
  welcomeMessage: string;
  motivationalQuote: string;
  onboardingProgress: number;
  needsPersonalization: boolean;
  completionLevel: 'new' | 'basic' | 'intermediate' | 'complete';
  nextActions: PersonalizedAction[];
  achievements: Achievement[];
}

interface PersonalizedAction {
  id: string;
  title: string;
  description: string;
  priority: number;
  xpReward: number;
  estimatedTime: string;
  icon: React.ComponentType<any>;
  route: string;
  completed: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  unlockedAt: Date;
}

export function PersonalizedWelcomeRefined() {
  const [profile, setProfile] = useState<AuditorProfile | null>(null);
  const [personalizedContent, setPersonalizedContent] = useState<PersonalizedContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showPersonalizationSetup, setShowPersonalizationSetup] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchAuditorProfile();
    }
    
    // Update time every minute for dynamic greetings
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, [user]);

  const fetchAuditorProfile = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      const { data: profileData, error: profileError } = await supabase
        .from('auditor_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      setProfile(profileData as AuditorProfile | null);
      
      if (profileData) {
        generatePersonalizedContent(profileData as AuditorProfile);
      } else {
        generateDefaultContent();
      }
    } catch (error) {
      console.error('Error fetching auditor profile:', error);
      setError(error instanceof Error ? error.message : 'Failed to load profile');
      generateDefaultContent();
      
      if (retryCount < 2) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchAuditorProfile();
        }, 2000);
      }
    } finally {
      setIsLoading(false);
    }
  }, [user, retryCount]);

  const generatePersonalizedContent = useCallback((profile: AuditorProfile): void => {
    const experienceLevel = profile.experience_level || determineExperienceLevel(profile.years_experience || 0);
    const motivationType = profile.motivation_type || 'achievement';

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

    const firstName = user?.user_metadata?.first_name || 
                     user?.user_metadata?.full_name?.split(' ')[0] || 
                     user?.email?.split('@')[0] || 
                     'Auditor';
    
    // Check if personalization is complete
    const hasPersonalization = Boolean(
      profile.motivation_type && 
      profile.learning_style && 
      profile.experience_level
    );
    
    const welcomeMessages = {
      beginner: `${timeGreeting}, ${firstName}! ${emoji} Welcome to your Web3 security journey. We're here to guide you from your first audit to becoming a trusted security expert.`,
      intermediate: `${timeGreeting}, ${firstName}! ${emoji} Ready to accelerate your auditing career? We've prepared personalized tools and challenges to help you reach the next level.`,
      expert: `${timeGreeting}, ${firstName}! ${emoji} Welcome to the community of security leaders. Your expertise is valuable - let's explore advanced collaboration and mentorship opportunities.`
    };

    const motivationalQuotes = {
      achievement: experienceLevel === 'beginner' 
        ? "Every expert was once a beginner. Every vulnerability you catch is a step toward mastery. 🎯"
        : "Excellence is not a destination, but a journey. Each audit sharpens your edge further. ⚔️",
      social: experienceLevel === 'expert'
        ? "Great auditors don't just find bugs - they build communities. Your mentorship shapes the future. 🌐"
        : "We're stronger together. Connect, learn, and grow with fellow security professionals. 🤝",
      mastery: "Deep knowledge comes from curiosity and practice. Every protocol you understand makes you more valuable. 🧠",
      purpose: "Security isn't just a job - it's a mission. Every vulnerability you prevent protects real users and assets. 🛡️"
    };

    // Calculate comprehensive onboarding progress
    let progress = 0;
    const progressFactors = [
      { condition: (profile.years_experience || 0) > 0, weight: 15 },
      { condition: (profile.specializations?.length || 0) > 0, weight: 15 },
      { condition: hasPersonalization, weight: 25 },
      { condition: (profile.availability_hours || 0) > 0, weight: 10 },
      { condition: (profile.preferred_industries?.length || 0) > 0, weight: 10 },
      { condition: profile.work_schedule_preference !== undefined, weight: 10 },
      { condition: profile.communication_style !== undefined, weight: 10 },
      { condition: profile.user_preferences && Object.keys(profile.user_preferences).length > 0, weight: 5 }
    ];

    progress = progressFactors.reduce((acc, factor) => {
      return acc + (factor.condition ? factor.weight : 0);
    }, 0);

    // Determine completion level
    let completionLevel: 'new' | 'basic' | 'intermediate' | 'complete';
    if (progress < 25) completionLevel = 'new';
    else if (progress < 50) completionLevel = 'basic';
    else if (progress < 85) completionLevel = 'intermediate';
    else completionLevel = 'complete';

    // Generate personalized next actions
    const nextActions: PersonalizedAction[] = [];

    if (!hasPersonalization) {
      nextActions.push({
        id: 'personalization-setup',
        title: 'Complete Personalization Setup',
        description: 'Tell us about your preferences to unlock tailored features',
        priority: 1,
        xpReward: 100,
        estimatedTime: '5 min',
        icon: Settings,
        route: '/personalization-setup',
        completed: false
      });
    }

    if ((profile.specializations?.length || 0) === 0) {
      nextActions.push({
        id: 'add-specializations',
        title: 'Add Your Specializations',
        description: 'Help us match you with the right audit opportunities',
        priority: 2,
        xpReward: 75,
        estimatedTime: '3 min',
        icon: Target,
        route: '/service-provider-onboarding',
        completed: false
      });
    }

    if (experienceLevel === 'beginner') {
      nextActions.push({
        id: 'browse-opportunities',
        title: 'Browse Beginner-Friendly Projects',
        description: 'Start with projects that match your current skill level',
        priority: 3,
        xpReward: 50,
        estimatedTime: '10 min',
        icon: BookOpen,
        route: '/auditor/opportunities',
        completed: false
      });
    } else {
      nextActions.push({
        id: 'explore-ai-tools',
        title: 'Explore AI-Powered Tools',
        description: 'Leverage advanced AI features for more efficient audits',
        priority: 3,
        xpReward: 100,
        estimatedTime: '15 min',
        icon: Brain,
        route: '/phase4',
        completed: false
      });
    }

    if (motivationType === 'social') {
      nextActions.push({
        id: 'join-community',
        title: 'Join Community Discussions',
        description: 'Connect with fellow auditors and share knowledge',
        priority: 4,
        xpReward: 25,
        estimatedTime: '5 min',
        icon: Users,
        route: '/community',
        completed: false
      });
    }

    // Generate achievements (mock data for now)
    const achievements: Achievement[] = [];
    if (profile.created_at) {
      achievements.push({
        id: 'welcome',
        title: 'Welcome to Hawkly',
        description: 'Successfully created your auditor profile',
        icon: UserCheck,
        unlockedAt: new Date(profile.created_at)
      });
    }

    setPersonalizedContent({
      welcomeMessage: welcomeMessages[experienceLevel] || welcomeMessages.beginner,
      motivationalQuote: motivationalQuotes[motivationType] || motivationalQuotes.achievement,
      onboardingProgress: Math.min(progress, 100),
      needsPersonalization: !hasPersonalization,
      completionLevel,
      nextActions: nextActions.sort((a, b) => a.priority - b.priority).slice(0, 4),
      achievements
    });
  }, [currentTime, user]);

  const generateDefaultContent = useCallback((): void => {
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

    const firstName = user?.user_metadata?.first_name || 
                     user?.user_metadata?.full_name?.split(' ')[0] || 
                     'there';

    setPersonalizedContent({
      welcomeMessage: `${timeGreeting}, ${firstName}! ${emoji} Welcome to Hawkly - your professional Web3 security audit platform.`,
      motivationalQuote: "Every expert was once a beginner. Your journey to becoming a trusted Web3 security auditor starts here. 🚀",
      onboardingProgress: 0,
      needsPersonalization: true,
      completionLevel: 'new',
      nextActions: [
        {
          id: 'create-profile',
          title: 'Create Your Auditor Profile',
          description: 'Get started by setting up your professional profile',
          priority: 1,
          xpReward: 150,
          estimatedTime: '10 min',
          icon: UserCheck,
          route: '/service-provider-onboarding',
          completed: false
        },
        {
          id: 'browse-opportunities',
          title: 'Explore Audit Opportunities',
          description: 'See what types of projects are available on the platform',
          priority: 2,
          xpReward: 25,
          estimatedTime: '5 min',
          icon: Target,
          route: '/auditor/opportunities',
          completed: false
        }
      ],
      achievements: []
    });
  }, [currentTime, user]);

  const determineExperienceLevel = (years: number): 'beginner' | 'intermediate' | 'expert' => {
    if (years >= 3) return 'expert';
    if (years >= 1) return 'intermediate';
    return 'beginner';
  };

  const handleActionComplete = async (actionId: string) => {
    try {
      if (user) {
        await GamificationService.awardXP(user.id, 'PROFILE_UPDATED' as any, {
          description: `Completed action: ${actionId}`,
          category: 'onboarding'
        });
        
        toast({
          title: "Action Completed!",
          description: "+25 XP awarded for completing an action",
        });
      }
      
      // Refresh profile data to reflect changes
      fetchAuditorProfile();
    } catch (error) {
      console.error('Error handling action completion:', error);
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress < 25) return 'bg-red-500';
    if (progress < 50) return 'bg-orange-500';
    if (progress < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getCompletionMessage = (level: string) => {
    switch (level) {
      case 'new': return 'Just getting started! 🌱';
      case 'basic': return 'Making good progress! 📈';
      case 'intermediate': return 'Almost there! 🎯';
      case 'complete': return 'Profile complete! ✨';
      default: return '';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <Card>
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error && !personalizedContent) {
    return (
      <Alert variant="error">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>Failed to load personalized content. Using default experience.</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setRetryCount(0);
              fetchAuditorProfile();
            }}
          >
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!personalizedContent) return null;

  return (
    <div className="space-y-6" role="region" aria-label="Personalized welcome dashboard">
      {/* Main Welcome Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {personalizedContent.welcomeMessage}
              </h2>
              <p className="text-gray-600 mb-4 text-lg">
                {personalizedContent.motivationalQuote}
              </p>

              {/* Progress Section */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Profile Progress:</span>
                  <Progress 
                    value={personalizedContent.onboardingProgress} 
                    className="w-32 h-3"
                  />
                  <span className="text-sm font-bold text-gray-900">
                    {Math.round(personalizedContent.onboardingProgress)}%
                  </span>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`${getProgressColor(personalizedContent.onboardingProgress)} text-white`}
                >
                  {getCompletionMessage(personalizedContent.completionLevel)}
                </Badge>
              </div>

              {/* Personalization Setup Alert */}
              {personalizedContent.needsPersonalization && (
                <Alert className="mt-4 border-blue-200 bg-blue-50">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="flex items-center justify-between">
                    <span className="text-blue-800">
                      Complete your personalization setup to unlock tailored recommendations and features!
                    </span>
                    <Button asChild size="sm" className="ml-4">
                      <Link to="/personalization-setup">
                        <Settings className="h-4 w-4 mr-2" />
                        Personalize Now
                      </Link>
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
            </div>
            
            {/* Level Display */}
            <div className="flex items-center space-x-3 ml-6">
              <div className="bg-white rounded-full p-3 shadow-md" aria-hidden="true">
                <Award className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Current Level</div>
                <div className="text-lg font-bold text-gray-900" 
                     aria-label={`Auditor level ${Math.floor((profile?.years_experience || 0) / 2) + 1}`}>
                  {Math.floor((profile?.years_experience || 0) / 2) + 1}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Actions Section */}
      {personalizedContent.nextActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-blue-500" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalizedContent.nextActions.map((action) => (
                <div
                  key={action.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(action.route)}
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 rounded-lg p-2">
                      <action.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {action.estimatedTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          +{action.xpReward} XP
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Personalized Quick Actions */}
      <PersonalizedQuickActionsRefined 
        userProfile={profile}
        onActionComplete={handleActionComplete}
      />

      {/* Achievements Section */}
      {personalizedContent.achievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {personalizedContent.achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="bg-yellow-100 rounded-full p-2">
                    <achievement.icon className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {achievement.unlockedAt.toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 