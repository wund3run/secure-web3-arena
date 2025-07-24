import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Target, 
  BookOpen, 
  Clock,
  Briefcase,
  MessageSquare,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Users,
  Award,
  Lightbulb
} from 'lucide-react';

interface PersonalizationData {
  motivationType: 'achievement' | 'social' | 'mastery' | 'purpose' | '';
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | '';
  experienceLevel: 'beginner' | 'intermediate' | 'expert' | '';
  workSchedulePreference: 'flexible' | 'structured' | 'deadline-driven' | '';
  communicationStyle: 'detailed' | 'concise' | 'collaborative' | '';
  preferredIndustries: string[];
  userPreferences: {
    theme: 'light' | 'dark' | 'auto';
    notifications: {
      email: boolean;
      push: boolean;
      inApp: boolean;
    };
    dashboard: {
      showTips: boolean;
      compactMode: boolean;
      autoRefresh: boolean;
    };
  };
}

const STEPS = [
  { id: 'motivation', title: 'Motivation Style', icon: Target },
  { id: 'learning', title: 'Learning Preferences', icon: BookOpen },
  { id: 'experience', title: 'Experience Level', icon: TrendingUp },
  { id: 'work-style', title: 'Work Style', icon: Briefcase },
  { id: 'communication', title: 'Communication', icon: MessageSquare },
  { id: 'industries', title: 'Industry Focus', icon: Lightbulb },
  { id: 'preferences', title: 'App Preferences', icon: User }
];

const MOTIVATION_TYPES = [
  {
    type: 'achievement' as const,
    title: 'Achievement Driven',
    description: 'I\'m motivated by completing goals, earning badges, and tracking progress',
    icon: Award,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  {
    type: 'social' as const,
    title: 'Socially Motivated',
    description: 'I thrive on collaboration, community interaction, and peer recognition',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    type: 'mastery' as const,
    title: 'Mastery Focused',
    description: 'I\'m driven by learning new skills and becoming an expert in my field',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    type: 'purpose' as const,
    title: 'Purpose Driven',
    description: 'I\'m motivated by making a meaningful impact and contributing to security',
    icon: Sparkles,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  }
];

const LEARNING_STYLES = [
  { type: 'visual', title: 'Visual Learner', description: 'I learn best with diagrams, charts, and visual aids' },
  { type: 'auditory', title: 'Auditory Learner', description: 'I prefer listening to explanations and discussions' },
  { type: 'kinesthetic', title: 'Hands-on Learner', description: 'I learn by doing and practical exercises' },
  { type: 'reading', title: 'Reading/Writing', description: 'I prefer written materials and documentation' }
];

const EXPERIENCE_LEVELS = [
  { 
    level: 'beginner', 
    title: 'New to Web3 Security', 
    description: 'Less than 1 year of experience',
    focus: 'Fundamentals and guided learning paths'
  },
  { 
    level: 'intermediate', 
    title: 'Developing Expertise', 
    description: '1-3 years of experience',
    focus: 'Advanced techniques and specialization'
  },
  { 
    level: 'expert', 
    title: 'Security Professional', 
    description: '3+ years of experience',
    focus: 'Cutting-edge research and mentoring'
  }
];

const WORK_STYLES = [
  { type: 'flexible', title: 'Flexible Schedule', description: 'I prefer working at my own pace' },
  { type: 'structured', title: 'Structured Approach', description: 'I like clear timelines and milestones' },
  { type: 'deadline-driven', title: 'Deadline Focused', description: 'I work best under time pressure' }
];

const COMMUNICATION_STYLES = [
  { type: 'detailed', title: 'Detailed Communication', description: 'I prefer comprehensive explanations' },
  { type: 'concise', title: 'Concise Updates', description: 'I like brief, to-the-point information' },
  { type: 'collaborative', title: 'Collaborative Discussion', description: 'I enjoy interactive conversations' }
];

const INDUSTRY_OPTIONS = [
  'DeFi Protocols', 'NFT Platforms', 'Smart Contracts', 'Layer 2 Solutions',
  'Cross-chain Bridges', 'Governance Systems', 'Staking Protocols', 'DEX Platforms',
  'Lending Protocols', 'Insurance Protocols', 'Gaming & Metaverse', 'Identity Solutions'
];

export default function PersonalizationSetup() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [data, setData] = useState<PersonalizationData>({
    motivationType: '',
    learningStyle: '',
    experienceLevel: '',
    workSchedulePreference: '',
    communicationStyle: '',
    preferredIndustries: [],
    userPreferences: {
      theme: 'auto',
      notifications: {
        email: true,
        push: true,
        inApp: true
      },
      dashboard: {
        showTips: true,
        compactMode: false,
        autoRefresh: true
      }
    }
  });

  // Load existing personalization data
  useEffect(() => {
    if (user) {
      loadExistingData();
    }
  }, [user]);

  const loadExistingData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Use analytics_events table to load existing personalization data
      const { data: personalizationEvent, error } = await supabase
        .from('analytics_events')
        .select('properties')
        .eq('user_id', user.id)
        .eq('event_name', 'personalization_setup')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading personalization data:', error);
        return;
      }

      if (personalizationEvent?.properties) {
        const props = personalizationEvent.properties as any;
        setData(prev => ({
          ...prev,
          motivationType: props.motivationType || '',
          learningStyle: props.learningStyle || '',
          experienceLevel: props.experienceLevel || '',
          workSchedulePreference: props.workSchedulePreference || '',
          communicationStyle: props.communicationStyle || '',
          preferredIndustries: props.preferredIndustries || [],
          userPreferences: {
            ...prev.userPreferences,
            ...props.userPreferences
          }
        }));
      }
    } catch (error) {
      console.error('Error loading personalization data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePersonalizationData = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      // Save personalization data to analytics_events table
      const { error } = await supabase
        .from('analytics_events')
        .insert({
          user_id: user.id,
          event_name: 'personalization_setup',
          properties: {
            motivationType: data.motivationType,
            learningStyle: data.learningStyle,
            experienceLevel: data.experienceLevel,
            workSchedulePreference: data.workSchedulePreference,
            communicationStyle: data.communicationStyle,
            preferredIndustries: data.preferredIndustries,
            userPreferences: data.userPreferences,
            completedAt: new Date().toISOString()
          },
          timestamp: new Date().toISOString(),
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Personalization Complete! 🎉",
        description: "Your preferences have been saved. Your experience will now be tailored to your needs.",
      });

      // Close the setup after a brief delay
      setTimeout(() => {
        window.location.reload(); // Refresh to apply personalization
      }, 2000);

    } catch (error) {
      console.error('Error saving personalization data:', error);
      toast({
        title: "Error",
        description: "Failed to save your preferences. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      savePersonalizationData();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const currentStepData = STEPS[currentStep];
  const StepIcon = currentStepData.icon;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <StepIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Personalize Your Experience</CardTitle>
          <CardDescription>
            Help us tailor Hawkly to your unique needs and preferences
          </CardDescription>
          
          {/* Progress */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {currentStep + 1} of {STEPS.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Navigation */}
          <div className="flex justify-center mt-4 space-x-2">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs ${
                    index === currentStep
                      ? 'bg-blue-600 text-white'
                      : index < currentStep
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>
              );
            })}
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">{currentStepData.title}</h3>
            </div>

            {/* Step Content */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <p className="text-muted-foreground text-center mb-6">
                  What motivates you most in your professional development?
                </p>
                <div className="grid gap-4">
                  {MOTIVATION_TYPES.map((motivation) => {
                    const Icon = motivation.icon;
                    return (
                      <div
                        key={motivation.type}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          data.motivationType === motivation.type
                            ? `${motivation.borderColor} ${motivation.bgColor}`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setData(prev => ({ ...prev, motivationType: motivation.type }))}
                      >
                        <div className="flex items-start space-x-3">
                          <Icon className={`h-6 w-6 ${motivation.color} flex-shrink-0 mt-1`} />
                          <div>
                            <h4 className="font-medium">{motivation.title}</h4>
                            <p className="text-sm text-muted-foreground">{motivation.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <p className="text-muted-foreground text-center mb-6">
                  How do you prefer to learn new concepts?
                </p>
                <div className="grid gap-3">
                  {LEARNING_STYLES.map((style) => (
                    <div
                      key={style.type}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        data.learningStyle === style.type
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setData(prev => ({ ...prev, learningStyle: style.type as any }))}
                    >
                      <h4 className="font-medium">{style.title}</h4>
                      <p className="text-sm text-muted-foreground">{style.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <p className="text-muted-foreground text-center mb-6">
                  What's your experience level with Web3 security?
                </p>
                <div className="grid gap-4">
                  {EXPERIENCE_LEVELS.map((level) => (
                    <div
                      key={level.level}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        data.experienceLevel === level.level
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setData(prev => ({ ...prev, experienceLevel: level.level as any }))}
                    >
                      <h4 className="font-medium">{level.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{level.description}</p>
                      <Badge variant="outline" className="text-xs">
                        Focus: {level.focus}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <p className="text-muted-foreground text-center mb-6">
                  How do you prefer to structure your work?
                </p>
                <div className="grid gap-3">
                  {WORK_STYLES.map((style) => (
                    <div
                      key={style.type}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        data.workSchedulePreference === style.type
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setData(prev => ({ ...prev, workSchedulePreference: style.type as any }))}
                    >
                      <h4 className="font-medium">{style.title}</h4>
                      <p className="text-sm text-muted-foreground">{style.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <p className="text-muted-foreground text-center mb-6">
                  What's your preferred communication style?
                </p>
                <div className="grid gap-3">
                  {COMMUNICATION_STYLES.map((style) => (
                    <div
                      key={style.type}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        data.communicationStyle === style.type
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setData(prev => ({ ...prev, communicationStyle: style.type as any }))}
                    >
                      <h4 className="font-medium">{style.title}</h4>
                      <p className="text-sm text-muted-foreground">{style.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-4">
                <p className="text-muted-foreground text-center mb-6">
                  Which Web3 areas interest you most? (Select all that apply)
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {INDUSTRY_OPTIONS.map((industry) => (
                    <div
                      key={industry}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                        data.preferredIndustries.includes(industry)
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => {
                        setData(prev => ({
                          ...prev,
                          preferredIndustries: prev.preferredIndustries.includes(industry)
                            ? prev.preferredIndustries.filter(i => i !== industry)
                            : [...prev.preferredIndustries, industry]
                        }));
                      }}
                    >
                      <p className="text-sm font-medium">{industry}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Selected: {data.preferredIndustries.length} areas
                </p>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-6">
                <p className="text-muted-foreground text-center mb-6">
                  Customize your app experience
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Theme Preference</h4>
                    <div className="flex space-x-2">
                      {['light', 'dark', 'auto'].map((theme) => (
                        <Button
                          key={theme}
                          variant={data.userPreferences.theme === theme ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setData(prev => ({
                            ...prev,
                            userPreferences: { ...prev.userPreferences, theme: theme as any }
                          }))}
                        >
                          {theme.charAt(0).toUpperCase() + theme.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-3">Notifications</h4>
                    <div className="space-y-2">
                      {Object.entries(data.userPreferences.notifications).map(([key, value]) => (
                        <label key={key} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => setData(prev => ({
                              ...prev,
                              userPreferences: {
                                ...prev.userPreferences,
                                notifications: {
                                  ...prev.userPreferences.notifications,
                                  [key]: e.target.checked
                                }
                              }
                            }))}
                            className="rounded"
                          />
                          <span className="text-sm">
                            {key === 'inApp' ? 'In-App' : key.charAt(0).toUpperCase() + key.slice(1)} notifications
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-3">Dashboard Settings</h4>
                    <div className="space-y-2">
                      {Object.entries(data.userPreferences.dashboard).map(([key, value]) => (
                        <label key={key} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => setData(prev => ({
                              ...prev,
                              userPreferences: {
                                ...prev.userPreferences,
                                dashboard: {
                                  ...prev.userPreferences.dashboard,
                                  [key]: e.target.checked
                                }
                              }
                            }))}
                            className="rounded"
                          />
                          <span className="text-sm">
                            {key === 'showTips' ? 'Show helpful tips' :
                             key === 'compactMode' ? 'Compact mode' :
                             key === 'autoRefresh' ? 'Auto-refresh data' : key}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <Button
                onClick={nextStep}
                disabled={isSaving}
                className="flex items-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : currentStep === STEPS.length - 1 ? (
                  <>
                    <span>Complete Setup</span>
                    <CheckCircle className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
