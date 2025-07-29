import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { HawklyCard, SecurityBadge, ProgressIndicator } from '@/components/ui/hawkly-components';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Rocket,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Target,
  Sparkles,
  Zap
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/auth';
import { InteractiveTutorial } from '@/components/onboarding/InteractiveTutorial';
import EnhancedOnboardingFlow from '@/components/onboarding/EnhancedOnboardingFlow';
import { PersonalizedWelcomeEnhanced } from '@/components/onboarding/PersonalizedWelcomeEnhanced';

// Import existing OnboardingFlow component and rename it to avoid conflict
import { OnboardingFlow as OnboardingFlowComponent } from '@/components/onboarding/OnboardingFlow';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  completed: boolean;
  action?: {
    label: string;
    href: string;
  };
}

const OnboardingFlow = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [selectedFlow, setSelectedFlow] = useState<string>('interactive');
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Hawkly',
      description: 'Your trusted Web3 security marketplace. Our platform connects you with top security experts who can help secure your blockchain projects.',
      icon: Sparkles,
      completed: true,
      action: {
        label: 'Get Started',
        href: '#'
      }
    },
    {
      id: 'profile',
      title: 'Complete Your Profile',
      description: 'Set up your personal or organization profile to help us customize your experience and match you with the right security services.',
      icon: Users,
      completed: false,
      action: {
        label: 'Edit Profile',
        href: '/settings/profile'
      }
    },
    {
      id: 'discover',
      title: 'Explore Security Services',
      description: 'Browse our marketplace to discover expert auditors, automated security tools, and comprehensive security solutions.',
      icon: Target,
      completed: false,
      action: {
        label: 'Visit Marketplace',
        href: '/marketplace'
      }
    },
    {
      id: 'audit',
      title: 'Request Your First Audit',
      description: 'Ready to secure your project? Submit an audit request and get matched with the perfect auditors for your needs.',
      icon: Shield,
      completed: false,
      action: {
        label: 'Request Audit',
        href: '/request-audit'
      }
    },
    {
      id: 'dashboard',
      title: 'Track Your Security Journey',
      description: "Use your personalized dashboard to monitor ongoing audits, view reports, and track your project's security status.",
      icon: Zap,
      completed: false,
      action: {
        label: 'Go to Dashboard',
        href: '/dashboard'
      }
    }
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelectFlow = (flow: string) => {
    setSelectedFlow(flow);
  };

  const handleComplete = () => {
    navigate('/dashboard');
  };

  const handleStepAction = (href: string) => {
    navigate(href);
  };

  const renderOnboardingContent = () => {
    switch (selectedFlow) {
      case 'classic':
        return <OnboardingFlowComponent />;
      case 'enhanced':
        return <EnhancedOnboardingFlow onComplete={handleComplete} />;
      case 'interactive':
        return <InteractiveTutorial userType={userProfile?.type || 'project_owner'} onComplete={handleComplete} />;
      default:
        return (
          <div className="flex flex-col space-y-8 mt-6">
            {/* Current step card */}
            <HawklyCard variant="glass" elevation="subtle" glow={currentStep === 0} className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-blue-900/40 flex items-center justify-center">
                  {React.createElement(onboardingSteps[currentStep].icon, { className: "h-6 w-6 text-blue-400" })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    {onboardingSteps[currentStep].title}
                  </h2>
                  <p className="text-sm text-slate-300">Step {currentStep + 1} of {onboardingSteps.length}</p>
                </div>
              </div>
              
              <Separator className="my-4 bg-slate-700/50" />
              
              <div className="mb-6">
                <p className="text-slate-300">{onboardingSteps[currentStep].description}</p>
              </div>
              
              {onboardingSteps[currentStep].action && (
                <Button 
                  className="w-full mb-4" 
                  onClick={() => handleStepAction(onboardingSteps[currentStep].action!.href)}
                >
                  {onboardingSteps[currentStep].action.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              
              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                
                <Button
                  onClick={handleNext}
                >
                  {currentStep === onboardingSteps.length - 1 ? 'Finish' : 'Next'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </HawklyCard>
            
            {/* Progress tracker */}
            <div className="w-full">
              <ProgressIndicator 
                value={currentStep + 1}
                max={onboardingSteps.length}
                currentStep={currentStep} 
                onStepClick={setCurrentStep} 
              />
            </div>
          </div>
        );
    }
  };

  return (
    <ProductionLayout
      title="Welcome to Hawkly | Onboarding"
      description="Set up your account and get started with Hawkly's Web3 security services"
    >
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-3">
                <SecurityBadge level="enterprise" verified={true} animated={true} size="lg" />
                <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
                  Welcome to Hawkly
                </h1>
              </div>
              <p className="text-gray-300 max-w-2xl">
                Let's set up your account and get you started with our Web3 security services.
              </p>
            </div>

            {/* Personalized welcome message */}
            <PersonalizedWelcomeEnhanced />
            
            {/* Onboarding flow selector */}
            <HawklyCard variant="glass" elevation="subtle" className="p-6">
              <h3 className="text-lg font-medium text-slate-100 mb-4">Select Your Onboarding Experience</h3>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant={selectedFlow === 'interactive' ? "default" : "outline"} 
                  onClick={() => handleSelectFlow('interactive')}
                  className="flex-1"
                >
                  <Target className="mr-2 h-4 w-4" />
                  Interactive Tour
                </Button>
                <Button 
                  variant={selectedFlow === 'enhanced' ? "default" : "outline"} 
                  onClick={() => handleSelectFlow('enhanced')}
                  className="flex-1"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Enhanced Flow
                </Button>
                <Button 
                  variant={selectedFlow === 'classic' ? "default" : "outline"} 
                  onClick={() => handleSelectFlow('classic')}
                  className="flex-1"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Quick Start
                </Button>
              </div>
            </HawklyCard>
            
            {/* Render selected onboarding content */}
            {renderOnboardingContent()}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Why Hawkly card */}
              <HawklyCard variant="glass" elevation="subtle" glow={true} className="p-6">
                <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Why Choose Hawkly
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-900/40 flex items-center justify-center mt-1">
                      <Shield className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200">Elite Security Experts</h4>
                      <p className="text-sm text-slate-400">Access our network of verified auditors with proven track records.</p>
                    </div>
                  </div>
                  
                  <Separator className="bg-slate-700/50" />
                  
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-900/40 flex items-center justify-center mt-1">
                      <Rocket className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200">AI-Powered Matching</h4>
                      <p className="text-sm text-slate-400">Our proprietary AI pairs you with the perfect security experts for your specific needs.</p>
                    </div>
                  </div>
                  
                  <Separator className="bg-slate-700/50" />
                  
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-900/40 flex items-center justify-center mt-1">
                      <Users className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200">Collaborative Workspace</h4>
                      <p className="text-sm text-slate-400">Real-time communication and tools for efficient audit collaboration.</p>
                    </div>
                  </div>
                </div>
              </HawklyCard>
              
              {/* Platform stats card */}
              <HawklyCard variant="glass" elevation="subtle" className="p-6">
                <h3 className="text-lg font-bold mb-4 text-slate-100">Hawkly Platform Stats</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/70 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400">$2.1B+</div>
                    <div className="text-xs text-slate-400">Funds Protected</div>
                  </div>
                  <div className="bg-slate-800/70 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-emerald-400">1,200+</div>
                    <div className="text-xs text-slate-400">Projects Audited</div>
                  </div>
                  <div className="bg-slate-800/70 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-amber-400">15,300+</div>
                    <div className="text-xs text-slate-400">Vulnerabilities Found</div>
                  </div>
                  <div className="bg-slate-800/70 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-400">430+</div>
                    <div className="text-xs text-slate-400">Verified Auditors</div>
                  </div>
                </div>
              </HawklyCard>
              
              {/* Quick links */}
              <HawklyCard variant="glass" elevation="subtle" className="p-6">
                <h3 className="text-lg font-bold mb-4 text-slate-100">Quick Actions</h3>
                <ScrollArea className="h-auto max-h-64 pr-4">
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-between text-left" asChild>
                      <a href="/marketplace">
                        <span>Browse Security Services</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-between text-left" asChild>
                      <a href="/request-audit">
                        <span>Request an Audit</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-between text-left" asChild>
                      <a href="/settings/profile">
                        <span>Complete Your Profile</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-between text-left" asChild>
                      <a href="/learning-center">
                        <span>Security Resources</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </ScrollArea>
              </HawklyCard>
            </div>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
};

export default OnboardingFlow;
