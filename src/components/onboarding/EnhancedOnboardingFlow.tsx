import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Shield, 
  Users, 
  Target,
  TrendingUp,
  Award,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { AppContainer } from '@/components/layout/AppContainer';
import { HawklyCard, SecurityBadge, AuditorAvatar, ProgressIndicator } from '@/components/ui/hawkly-components';
import { FormStepIndicator } from '@/components/ui/form-step-indicator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  isCompleted: boolean;
  isActive: boolean;
}

const projectTypes = [
  {
    id: 'defi',
    title: 'DeFi Protocol',
    description: 'Smart contracts for decentralized finance',
    icon: TrendingUp,
    requirements: ['Smart Contract Audit', 'Flash Loan Protection', 'MEV Analysis'],
    timeline: '2-4 weeks',
    estimatedCost: '$15,000 - $50,000'
  },
  {
    id: 'nft',
    title: 'NFT Platform',
    description: 'Marketplace and minting protocols',
    icon: Award,
    requirements: ['Smart Contract Audit', 'Metadata Security', 'Royalty Mechanisms'],
    timeline: '1-3 weeks',
    estimatedCost: '$8,000 - $25,000'
  },
  {
    id: 'dao',
    title: 'DAO Governance',
    description: 'Decentralized autonomous organization',
    icon: Users,
    requirements: ['Governance Audit', 'Voting Mechanisms', 'Treasury Security'],
    timeline: '2-3 weeks',
    estimatedCost: '$10,000 - $30,000'
  },
  {
    id: 'bridge',
    title: 'Cross-chain Bridge',
    description: 'Multi-chain asset transfer protocol',
    icon: Shield,
    requirements: ['Bridge Security', 'Cross-chain Validation', 'Asset Safety'],
    timeline: '3-6 weeks',
    estimatedCost: '$25,000 - $75,000'
  }
];

const urgencyLevels = [
  { id: 'asap', label: 'ASAP (Rush)', timeframe: '< 1 week', multiplier: 2.0 },
  { id: 'urgent', label: 'Urgent', timeframe: '1-2 weeks', multiplier: 1.5 },
  { id: 'standard', label: 'Standard', timeframe: '2-4 weeks', multiplier: 1.0 },
  { id: 'flexible', label: 'Flexible', timeframe: '4+ weeks', multiplier: 0.8 }
];

const budgetRanges = [
  { id: 'startup', label: 'Startup Budget', range: '$5,000 - $15,000' },
  { id: 'standard', label: 'Standard Project', range: '$15,000 - $50,000' },
  { id: 'enterprise', label: 'Enterprise Scale', range: '$50,000 - $150,000' },
  { id: 'custom', label: 'Custom Quote', range: 'Contact for pricing' }
];

// Welcome Step Component
const WelcomeStep = ({ onNext }: { onNext: () => void }) => (
  <div className="text-center space-y-8">
    <div className="relative">
      <div className="w-32 h-32 bg-gradient-to-br from-[#a879ef] to-[#32d9fa] rounded-full mx-auto flex items-center justify-center mb-6">
        <Sparkles className="w-16 h-16 text-white" />
      </div>
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#2de08e] rounded-full flex items-center justify-center">
        <CheckCircle className="w-5 h-5 text-white" />
      </div>
    </div>
    
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-[#f8f9fb]">Welcome to Hawkly</h2>
      <p className="text-xl text-[#b2bfd4] max-w-2xl mx-auto">
        Let's get your project secured with our expert auditors. This personalized setup will take just 3 minutes.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <HawklyCard variant="glass" className="p-6 text-center">
          <Shield className="w-12 h-12 text-[#a879ef] mx-auto mb-4" />
          <h3 className="font-bold text-[#f8f9fb] mb-2">Expert Matching</h3>
          <p className="text-[#b2bfd4] text-sm">AI-powered auditor recommendations based on your specific needs</p>
        </HawklyCard>
        
        <HawklyCard variant="glass" className="p-6 text-center">
          <Zap className="w-12 h-12 text-[#32d9fa] mx-auto mb-4" />
          <h3 className="font-bold text-[#f8f9fb] mb-2">Fast Turnaround</h3>
          <p className="text-[#b2bfd4] text-sm">Get matched with available auditors in minutes, not days</p>
        </HawklyCard>
        
        <HawklyCard variant="glass" className="p-6 text-center">
          <Award className="w-12 h-12 text-[#2de08e] mx-auto mb-4" />
          <h3 className="font-bold text-[#f8f9fb] mb-2">Quality Guaranteed</h3>
          <p className="text-[#b2bfd4] text-sm">All auditors are vetted experts with proven track records</p>
        </HawklyCard>
      </div>
    </div>
    
    <Button 
      onClick={onNext}
      size="lg"
      className="bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#7d49ca] hover:to-[#24bad7] px-8"
    >
      Get Started
      <ArrowRight className="ml-2 w-5 h-5" />
    </Button>
  </div>
);

// Contextual help component
const ContextualHelp = ({ step }: { step: string }) => (
  <div className="mt-4 text-sm text-[#b2bfd4]">
    Need help with <strong>{step}</strong>? <a href="/docs/onboarding-help" target="_blank" className="underline">See onboarding tips</a> or <a href="/support" target="_blank" className="underline">contact support</a>.
  </div>
);

// Project Type Step Component
const ProjectTypeStep = ({ 
  selectedType, 
  onTypeSelect, 
  onNext 
}: { 
  selectedType: string;
  onTypeSelect: (type: string) => void;
  onNext: () => void;
}) => (
  <div className="space-y-8">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-[#f8f9fb] mb-4">What type of project are you building?</h2>
      <p className="text-[#b2bfd4]">This helps us match you with the right security experts</p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-6">
      {projectTypes.map(type => {
        const Icon = type.icon;
        const isSelected = selectedType === type.id;
        
        return (
          <HawklyCard
            key={type.id}
            variant={isSelected ? "highlighted" : "interactive"}
            glow={isSelected}
            className={`p-6 cursor-pointer transition-all duration-300 ${
              isSelected ? 'border-[#a879ef] bg-[#a879ef]/10' : 'hover:border-[#a879ef]/50'
            }`}
            onClick={() => onTypeSelect(type.id)}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                isSelected 
                  ? 'bg-gradient-to-br from-[#a879ef] to-[#32d9fa]' 
                  : 'bg-[#23283e]'
              }`}>
                <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-[#a879ef]'}`} />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#f8f9fb] mb-2">{type.title}</h3>
                <p className="text-[#b2bfd4] text-sm mb-4">{type.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#8391ad]">Timeline:</span>
                    <span className="text-[#f8f9fb]">{type.timeline}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#8391ad]">Est. Cost:</span>
                    <span className="text-[#a879ef]">{type.estimatedCost}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="text-xs text-[#8391ad] mb-2">Key Requirements:</div>
                  <div className="flex flex-wrap gap-1">
                    {type.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-[#212842] text-[#32d9fa] rounded-full"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </HawklyCard>
        );
      })}
    </div>
    
    <div className="text-center">
      <Button 
        onClick={onNext}
        disabled={!selectedType}
        size="lg"
        className="bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#7d49ca] hover:to-[#24bad7] disabled:opacity-50"
      >
        Continue
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  </div>
);

// Example usage in onboarding step rendering:
// <FormStepIndicator steps={steps} currentStep={currentStep} userType={userType} />
// <ContextualHelp step={steps[currentStep]?.title} />

// Project Details Step Component
const ProjectDetailsStep = ({ 
  projectData, 
  onDataChange, 
  onNext 
}: { 
  projectData: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
}) => (
  <div className="space-y-8">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-[#f8f9fb] mb-4">Tell us about your project</h2>
      <p className="text-[#b2bfd4]">These details help us provide accurate estimates and recommendations</p>
    </div>
    
    <div className="max-w-2xl mx-auto space-y-6">
      <HawklyCard variant="glass" className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#f8f9fb] mb-2">
              Project Name *
            </label>
            <Input
              type="text"
              placeholder="Enter your project name"
              value={projectData.name || ''}
              onChange={(e) => onDataChange({ ...projectData, name: e.target.value })}
              className="bg-[#181e2c] border-[#23283e] text-[#f8f9fb] focus:border-[#a879ef]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#f8f9fb] mb-2">
              Project Description
            </label>
            <textarea
              placeholder="Brief description of your project and its main features"
              value={projectData.description || ''}
              onChange={(e) => onDataChange({ ...projectData, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 bg-[#181e2c] border border-[#23283e] rounded-lg text-[#f8f9fb] placeholder-[#8391ad] focus:border-[#a879ef] focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#f8f9fb] mb-3">
              Urgency Level
            </label>
            <div className="grid md:grid-cols-2 gap-3">
              {urgencyLevels.map(level => (
                <button
                  key={level.id}
                  onClick={() => onDataChange({ ...projectData, urgency: level.id })}
                  className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                    projectData.urgency === level.id
                      ? 'border-[#a879ef] bg-[#a879ef]/10'
                      : 'border-[#23283e] hover:border-[#a879ef]/50'
                  }`}
                >
                  <div className="font-medium text-[#f8f9fb]">{level.label}</div>
                  <div className="text-sm text-[#b2bfd4]">{level.timeframe}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#f8f9fb] mb-3">
              Budget Range
            </label>
            <div className="grid md:grid-cols-2 gap-3">
              {budgetRanges.map(budget => (
                <button
                  key={budget.id}
                  onClick={() => onDataChange({ ...projectData, budget: budget.id })}
                  className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                    projectData.budget === budget.id
                      ? 'border-[#32d9fa] bg-[#32d9fa]/10'
                      : 'border-[#23283e] hover:border-[#32d9fa]/50'
                  }`}
                >
                  <div className="font-medium text-[#f8f9fb]">{budget.label}</div>
                  <div className="text-sm text-[#32d9fa]">{budget.range}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </HawklyCard>
    </div>
    
    <div className="text-center">
      <Button 
        onClick={onNext}
        disabled={!projectData.name}
        size="lg"
        className="bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#7d49ca] hover:to-[#24bad7] disabled:opacity-50"
      >
        Get Recommendations
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  </div>
);

// Recommendations Step Component
const RecommendationsStep = ({ 
  projectData,
  onComplete 
}: { 
  projectData: any;
  onComplete: () => void;
}) => {
  const recommendedAuditors = [
    {
      id: 1,
      name: 'Alex Chen',
      title: 'Senior Smart Contract Auditor',
      rating: 4.9,
      reviews: 127,
      match: 95,
      price: 150,
      availability: 'Available now',
      specialties: ['DeFi', 'Smart Contracts', 'MEV Protection']
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      title: 'DeFi Security Expert',
      rating: 4.8,
      reviews: 93,
      match: 92,
      price: 120,
      availability: 'Available in 2 days',
      specialties: ['DeFi Protocols', 'Flash Loans', 'Governance']
    },
    {
      id: 3,
      name: 'David Kim',
      title: 'Protocol Security Architect',
      rating: 4.9,
      reviews: 156,
      match: 88,
      price: 180,
      availability: 'Available in 1 week',
      specialties: ['Protocol Security', 'Cryptography', 'Layer 1']
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#a879ef] to-[#32d9fa] rounded-full mx-auto flex items-center justify-center mb-4">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#f8f9fb] mb-4">Perfect Matches Found!</h2>
        <p className="text-[#b2bfd4]">Based on your project requirements, here are our top auditor recommendations</p>
      </div>
      
      {/* Project Summary */}
      <HawklyCard variant="highlighted" glow={true} className="p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold text-[#f8f9fb] mb-2">{projectData.name}</h3>
            <p className="text-[#b2bfd4] text-sm">{projectData.description}</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[#8391ad]">Project Type:</span>
              <span className="text-[#a879ef]">
                {projectTypes.find(t => t.id === projectData.type)?.title}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8391ad]">Urgency:</span>
              <span className="text-[#32d9fa]">
                {urgencyLevels.find(u => u.id === projectData.urgency)?.label}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[#8391ad]">Budget:</span>
              <span className="text-[#2de08e]">
                {budgetRanges.find(b => b.id === projectData.budget)?.label}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8391ad]">Est. Timeline:</span>
              <span className="text-[#f8f9fb]">
                {projectTypes.find(t => t.id === projectData.type)?.timeline}
              </span>
            </div>
          </div>
        </div>
      </HawklyCard>
      
      {/* Recommended Auditors */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#f8f9fb]">Recommended Auditors</h3>
        <div className="space-y-4">
          {recommendedAuditors.map((auditor, index) => (
            <HawklyCard 
              key={auditor.id} 
              variant="interactive" 
              className={`p-6 ${index === 0 ? 'border-[#a879ef] bg-[#a879ef]/5' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <AuditorAvatar name={auditor.name} verified={true} size="lg" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-[#f8f9fb]">{auditor.name}</h4>
                      {index === 0 && (
                        <span className="px-2 py-1 text-xs bg-[#a879ef] text-white rounded-full">
                          Best Match
                        </span>
                      )}
                    </div>
                    <p className="text-[#b2bfd4]">{auditor.title}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-[#ffd553] fill-current" />
                        <span className="text-[#f8f9fb]">{auditor.rating}</span>
                        <span className="text-[#8391ad] text-sm">({auditor.reviews})</span>
                      </div>
                      <span className="text-[#2de08e] text-sm">{auditor.availability}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#a879ef]">{auditor.match}%</div>
                  <div className="text-[#8391ad] text-sm">match</div>
                  <div className="text-lg font-medium text-[#f8f9fb] mt-2">${auditor.price}/hr</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {auditor.specialties.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-[#212842] text-[#32d9fa] rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3 mt-4">
                <Button 
                  className="flex-1 bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#7d49ca] hover:to-[#24bad7]"
                >
                  Contact {auditor.name}
                </Button>
                <Button variant="outline" className="border-[#32d9fa] text-[#32d9fa]">
                  View Profile
                </Button>
              </div>
            </HawklyCard>
          ))}
        </div>
      </div>
      
      <div className="text-center space-y-4">
        <Button 
          onClick={onComplete}
          size="lg"
          className="bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#7d49ca] hover:to-[#24bad7] px-8"
        >
          Start Your Security Journey
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <p className="text-[#8391ad] text-sm">
          You can always refine your preferences later
        </p>
      </div>
    </div>
  );
};

export default function EnhancedOnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [projectData, setProjectData] = useState<any>({});
  
  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome',
      description: 'Introduction to Hawkly',
      component: WelcomeStep,
      isCompleted: currentStep > 0,
      isActive: currentStep === 0
    },
    {
      id: 'project-type',
      title: 'Project Type',
      description: 'What are you building?',
      component: ProjectTypeStep,
      isCompleted: currentStep > 1,
      isActive: currentStep === 1
    },
    {
      id: 'project-details',
      title: 'Project Details',
      description: 'Tell us more about your needs',
      component: ProjectDetailsStep,
      isCompleted: currentStep > 2,
      isActive: currentStep === 2
    },
    {
      id: 'recommendations',
      title: 'Recommendations',
      description: 'Your perfect auditor matches',
      component: RecommendationsStep,
      isCompleted: currentStep > 3,
      isActive: currentStep === 3
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Handle onboarding completion
    console.log('Onboarding completed with data:', projectData);
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#131822] via-[#181f2f] to-[#212842]">
      <AppContainer className="py-8">
        {/* Progress Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#f8f9fb]">Get Started with Hawkly</h1>
              <p className="text-[#b2bfd4]">Step {currentStep + 1} of {steps.length}</p>
            </div>
            <SecurityBadge level="enterprise" verified={true} size="sm" />
          </div>
          
          {/* Progress Indicator */}
          <ProgressIndicator
            value={currentStep + 1}
            max={steps.length}
            showLabel={true}
          />
          
          {/* Step Navigator */}
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center gap-4">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div 
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
                      step.isActive 
                        ? 'bg-[#a879ef]/20 border border-[#a879ef]' 
                        : step.isCompleted 
                        ? 'bg-[#2de08e]/20 border border-[#2de08e]'
                        : 'bg-[#181e2c] border border-[#23283e]'
                    }`}
                  >
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        step.isCompleted 
                          ? 'bg-[#2de08e] text-white' 
                          : step.isActive 
                          ? 'bg-[#a879ef] text-white'
                          : 'bg-[#23283e] text-[#8391ad]'
                      }`}
                    >
                      {step.isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="hidden md:block">
                      <div className={`text-sm font-medium ${
                        step.isActive ? 'text-[#a879ef]' : 
                        step.isCompleted ? 'text-[#2de08e]' : 'text-[#8391ad]'
                      }`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-[#8391ad]">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-[#23283e]" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-6xl mx-auto">
          <HawklyCard variant="glass" className="p-8 lg:p-12">
            <CurrentStepComponent
              projectData={projectData}
              selectedType={projectData.type}
              onTypeSelect={(type: string) => setProjectData({ ...projectData, type })}
              onDataChange={setProjectData}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onComplete={handleComplete}
            />
          </HawklyCard>
        </div>

        {/* Navigation Footer */}
        {currentStep > 0 && currentStep < steps.length - 1 && (
          <div className="max-w-6xl mx-auto mt-8">
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="border-[#23283e] text-[#b2bfd4] hover:border-[#a879ef] hover:text-[#a879ef]"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <div className="text-center text-[#8391ad] text-sm">
                Need help? Contact our support team
              </div>
            </div>
          </div>
        )}
      </AppContainer>
    </div>
  );
}
