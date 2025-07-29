import React, { useState, useEffect } from 'react';
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
  UserCheck
} from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { GamificationService } from "@/services/gamificationService";
import { XPAction } from "@/services/gamificationService";
import PersonalizedQuickActions from './PersonalizedQuickActions';
import { Link } from 'react-router-dom';

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
  motivation_type?: 'achievement' | 'social' | 'mastery' | 'purpose';
  learning_style?: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  experience_level?: 'beginner' | 'intermediate' | 'expert';
  work_schedule_preference?: 'flexible' | 'structured' | 'deadline-driven';
  communication_style?: 'detailed' | 'concise' | 'collaborative';
  preferred_industries?: string[];
  user_preferences?: any;
  personality_insights?: any;
}

interface PersonalizedContent {
  welcomeMessage: string;
  motivationalQuote: string;
  onboardingProgress: number;
  needsPersonalization: boolean;
}

export function PersonalizedWelcomeEnhanced() {
  const [profile, setProfile] = useState<AuditorProfile | null>(null);
  const [personalizedContent, setPersonalizedContent] = useState<PersonalizedContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showPersonalizationSetup, setShowPersonalizationSetup] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();
  const gamificationService = new GamificationService();

  useEffect(() => {
    if (user) {
      fetchAuditorProfile();
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
      } else {
        // No profile exists, show basic welcome
        generateDefaultContent();
      }
    } catch (error) {
      console.error('Error fetching auditor profile:', error);
      generateDefaultContent();
      toast({
        title: "Welcome to Hawkly!",
        description: "Let's get you set up with a personalized experience",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generatePersonalizedContent = (profile: AuditorProfile): void => {
    const experienceLevel = profile.experience_level || determineExperienceLevel(profile.years_experience);
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

    const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'Auditor';
    
    // Check if personalization is complete
    const hasPersonalization = profile.motivation_type && profile.learning_style && profile.experience_level;
    
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

    // Calculate onboarding progress
    let progress = 0;
    if (profile.years_experience && profile.years_experience > 0) progress += 20;
    if (profile.specialization_tags?.length > 0) progress += 20;
    if (hasPersonalization) progress += 30;
    if (profile.availability_status !== null) progress += 15;
    if (profile.preferred_project_types?.length > 0) progress += 15;

    setPersonalizedContent({
      welcomeMessage: welcomeMessages[experienceLevel] || welcomeMessages.beginner,
      motivationalQuote: motivationalQuotes[motivationType] || motivationalQuotes.achievement,
      onboardingProgress: Math.min(progress, 100),
      needsPersonalization: !hasPersonalization
    });
  };

  const generateDefaultContent = (): void => {
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

    const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'there';

    setPersonalizedContent({
      welcomeMessage: `${timeGreeting}, ${firstName}! ${emoji} Welcome to Hawkly - your professional Web3 security audit platform.`,
      motivationalQuote: "Every expert was once a beginner. Your journey to becoming a trusted Web3 security auditor starts here. 🚀",
      onboardingProgress: 0,
      needsPersonalization: true
    });
  };

  const determineExperienceLevel = (years: number): 'beginner' | 'intermediate' | 'expert' => {
    if (years >= 3) return 'expert';
    if (years >= 1) return 'intermediate';
    return 'beginner';
  };

  const handleActionComplete = (actionId: string) => {
    // Refresh profile data to reflect changes
    if (user) {
      fetchAuditorProfile();
    }
    
    // Award XP for completion
    GamificationService.awardXP(user?.id || '', XPAction.PROFILE_UPDATED, {
      description: 'Completed personalized welcome setup',
      category: 'profile'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your personalized experience...</p>
        </div>
      </div>
    );
  }

  if (!personalizedContent) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Personalized Welcome Header */}
      <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 border-blue-200 shadow-lg">
        <CardContent className="pt-8 pb-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {personalizedContent.welcomeMessage}
              </h1>
              <p className="text-lg text-gray-700 italic font-medium">
                {personalizedContent.motivationalQuote}
              </p>
              
              {/* Profile Status */}
              <div className="flex items-center gap-3 mt-4">
                {profile?.experience_level && (
                  <Badge variant="secondary" className="px-3 py-1">
                    {profile.experience_level} level
                  </Badge>
                )}
                {personalizedContent.onboardingProgress < 100 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Profile:</span>
                    <Progress 
                      value={personalizedContent.onboardingProgress} 
                      className="w-24 h-2"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {Math.round(personalizedContent.onboardingProgress)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Personalization Call-to-Action */}
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
              <div className="bg-white rounded-full p-3 shadow-md">
                <Award className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Current Level</div>
                <div className="text-lg font-bold text-gray-900">
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
        onActionComplete={handleActionComplete}
      />

      {/* Additional Features for Experienced Users */}
      {profile && personalizedContent.onboardingProgress >= 50 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-purple-500" />
              Advanced Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                to="/phase4" 
                className="p-4 border rounded-lg hover:shadow-md transition-all hover:border-purple-300"
              >
                <div className="flex items-center gap-3">
                  <Brain className="h-6 w-6 text-purple-600" />
                  <div>
                    <h3 className="font-semibold">AI Tools</h3>
                    <p className="text-sm text-muted-foreground">Advanced analysis</p>
                  </div>
                </div>
              </Link>
              
              <Link 
                to="/analytics" 
                className="p-4 border rounded-lg hover:shadow-md transition-all hover:border-blue-300"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Analytics</h3>
                    <p className="text-sm text-muted-foreground">Performance insights</p>
                  </div>
                </div>
              </Link>
              
              <Link 
                to="/community" 
                className="p-4 border rounded-lg hover:shadow-md transition-all hover:border-green-300"
              >
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold">Community</h3>
                    <p className="text-sm text-muted-foreground">Connect & learn</p>
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
