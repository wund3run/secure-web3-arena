import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  UserCircle, 
  Mail, 
  Lock, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Loader2,
  Eye,
  EyeOff 
} from 'lucide-react';
import { toast } from 'sonner';

interface OnboardingStep {
  title: string;
  description: string;
  fields: string[];
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  company: string;
  yearsExperience: string;
  projectName: string;
  projectType: string;
  specializations: string[];
  blockchains: string[];
  certifications: string;
  portfolio: string;
  linkedin: string;
  github: string;
  securityNeeds: string[];
  timeline: string;
  budget: string;
  [key: string]: unknown;
}

const auditorOnboardingSteps: OnboardingStep[] = [
  {
    title: 'Account Setup',
    description: 'Create your security expert account',
    fields: ['email', 'password', 'confirmPassword']
  },
  {
    title: 'Professional Information',
    description: 'Tell us about your expertise',
    fields: ['fullName', 'company', 'yearsExperience']
  },
  {
    title: 'Specializations',
    description: 'Select your areas of expertise',
    fields: ['specializations', 'blockchains', 'certifications']
  },
  {
    title: 'Verification',
    description: 'Complete your profile verification',
    fields: ['portfolio', 'linkedin', 'github']
  }
];

const projectOwnerOnboardingSteps: OnboardingStep[] = [
  {
    title: 'Account Setup',
    description: 'Create your project owner account',
    fields: ['email', 'password', 'confirmPassword']
  },
  {
    title: 'Project Information',
    description: 'Tell us about your project',
    fields: ['fullName', 'projectName', 'projectType']
  },
  {
    title: 'Security Needs',
    description: 'What security services do you need?',
    fields: ['securityNeeds', 'timeline', 'budget']
  }
];

interface EnhancedAuthFlowProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function EnhancedAuthFlow({ onSignIn, onSignUp, isLoading, error }: EnhancedAuthFlowProps) {
  const [activeTab, setActiveTab] = useState('signin');
  const [userType, setUserType] = useState<'auditor' | 'project_owner'>('project_owner');
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    company: '',
    yearsExperience: '',
    projectName: '',
    projectType: '',
    specializations: [] as string[],
    blockchains: [] as string[],
    certifications: '',
    portfolio: '',
    linkedin: '',
    github: '',
    securityNeeds: [] as string[],
    timeline: '',
    budget: ''
  });

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const validateField = (field: string, value: unknown): string | null => {
    switch (field) {
      case 'email':
        if (!value || typeof value !== 'string') return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return null;
      case 'password':
        if (!value || typeof value !== 'string') return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Password must contain uppercase, lowercase, and number';
        }
        return null;
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return null;
      case 'fullName':
        if (!value || typeof value !== 'string') return 'Full name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return null;
      case 'yearsExperience':
        {
          if (!value || typeof value !== 'string') return 'Experience is required';
          const years = parseInt(value);
          if (isNaN(years) || years < 0 || years > 50) return 'Invalid years of experience';
          return null;
        }
      default:
        return null;
    }
  };

  const handleFieldChange = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFieldBlur = (field: string) => {
    const error = validateField(field, formData[field]);
    if (error) {
      setFieldErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const validateCurrentStep = (): boolean => {
    const steps = userType === 'auditor' ? auditorOnboardingSteps : projectOwnerOnboardingSteps;
    const currentStepFields = steps[currentStep]?.fields || [];
    
    const errors: { [key: string]: string } = {};
    let isValid = true;

    currentStepFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });

    setFieldErrors(errors);
    return isValid;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);
    
    if (emailError || passwordError) {
      setFieldErrors({ email: emailError || '', password: passwordError || '' });
      return;
    }

    try {
      await onSignIn(formData.email, formData.password);
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  const handleSignUpStep = () => {
    if (validateCurrentStep()) {
      const maxSteps = userType === 'auditor' ? auditorOnboardingSteps.length : projectOwnerOnboardingSteps.length;
      
      if (currentStep < maxSteps - 1) {
        setCurrentStep(prev => prev + 1);
        toast.success('Step completed successfully');
      } else {
        handleSignUpSubmit();
      }
    } else {
      toast.error('Please fix the errors before proceeding');
    }
  };

  const handleSignUpSubmit = async () => {
    const maxRetries = 3;
    let retryCount = 0;

    const attemptSignUp = async () => {
      try {
        await onSignUp(formData.email, formData.password, formData.fullName, userType);
        toast.success('Account created successfully!');
      } catch (error) {
        console.error('Sign up failed:', error);
        if (retryCount < maxRetries) {
          retryCount++;
          toast.error(`Sign up failed, retrying (attempt ${retryCount}/${maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          return attemptSignUp();
        }
        toast.error('Sign up failed after multiple attempts. Please try again later.');
        throw error;
      }
    };

    await attemptSignUp();
  };

  const renderSignInForm = () => (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div>
        <Label htmlFor="signin-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="signin-email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            onBlur={() => handleFieldBlur('email')}
            className={`pl-10 ${fieldErrors.email ? 'border-red-500' : ''}`}
          />
        </div>
        {fieldErrors.email && (
          <p className="text-sm text-red-500 mt-1">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="signin-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="signin-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleFieldChange('password', e.target.value)}
            onBlur={() => handleFieldBlur('password')}
            className={`pl-10 pr-10 ${fieldErrors.password ? 'border-red-500' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-muted-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {fieldErrors.password && (
          <p className="text-sm text-red-500 mt-1">{fieldErrors.password}</p>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </Button>
    </form>
  );

  const renderUserTypeSelection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-center">Choose your account type</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`cursor-pointer transition-all ${
            userType === 'project_owner' ? 'ring-2 ring-primary' : 'hover:shadow-md'
          }`}
          onClick={() => setUserType('project_owner')}
        >
          <CardContent className="pt-6">
            <div className="text-center">
              <UserCircle className="h-12 w-12 mx-auto mb-3 text-primary" />
              <h4 className="font-medium mb-2">Project Owner</h4>
              <p className="text-sm text-muted-foreground">
                I need security audits for my blockchain project
              </p>
              {userType === 'project_owner' && (
                <Badge className="mt-2">Selected</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${
            userType === 'auditor' ? 'ring-2 ring-primary' : 'hover:shadow-md'
          }`}
          onClick={() => setUserType('auditor')}
        >
          <CardContent className="pt-6">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-3 text-primary" />
              <h4 className="font-medium mb-2">Security Expert</h4>
              <p className="text-sm text-muted-foreground">
                I provide security auditing services
              </p>
              {userType === 'auditor' && (
                <Badge className="mt-2">Selected</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Button 
        onClick={() => setCurrentStep(1)} 
        className="w-full"
        disabled={!userType}
      >
        Continue as {userType === 'auditor' ? 'Security Expert' : 'Project Owner'}
      </Button>
    </div>
  );

  const renderOnboardingStep = () => {
    const steps = userType === 'auditor' ? auditorOnboardingSteps : projectOwnerOnboardingSteps;
    const step = steps[currentStep - 1];
    const progress = ((currentStep) / steps.length) * 100;

    if (!step) return null;

    return (
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">{step.title}</h3>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
          <Progress value={progress} />
        </div>

        <div className="space-y-4">
          {step.fields.includes('email') && (
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                onBlur={() => handleFieldBlur('email')}
                className={fieldErrors.email ? 'border-red-500' : ''}
              />
              {fieldErrors.email && (
                <p className="text-sm text-red-500 mt-1">{fieldErrors.email}</p>
              )}
            </div>
          )}

          {step.fields.includes('password') && (
            <div>
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleFieldChange('password', e.target.value)}
                  onBlur={() => handleFieldBlur('password')}
                  className={`pr-10 ${fieldErrors.password ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-sm text-red-500 mt-1">{fieldErrors.password}</p>
              )}
            </div>
          )}

          {step.fields.includes('confirmPassword') && (
            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                  onBlur={() => handleFieldBlur('confirmPassword')}
                  className={`pr-10 ${fieldErrors.confirmPassword ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-muted-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">{fieldErrors.confirmPassword}</p>
              )}
            </div>
          )}

          {step.fields.includes('fullName') && (
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleFieldChange('fullName', e.target.value)}
                onBlur={() => handleFieldBlur('fullName')}
                className={fieldErrors.fullName ? 'border-red-500' : ''}
              />
              {fieldErrors.fullName && (
                <p className="text-sm text-red-500 mt-1">{fieldErrors.fullName}</p>
              )}
            </div>
          )}

          {/* Add more fields as needed */}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => {
              if (currentStep === 1) {
                setCurrentStep(0);
              } else {
                setCurrentStep(prev => prev - 1);
              }
            }}
          >
            Back
          </Button>

          <Button onClick={handleSignUpStep} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {currentStep === steps.length ? 'Creating Account...' : 'Processing...'}
              </>
            ) : (
              currentStep === steps.length ? 'Create Account' : 'Continue'
            )}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {activeTab === 'signin' ? 'Welcome Back' : 'Join Hawkly'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activeTab === 'signin' ? (
          <>
            {renderSignInForm()}
            <div className="text-center mt-4">
              <button
                onClick={() => setActiveTab('signup')}
                className="text-sm text-primary hover:underline"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </>
        ) : (
          <>
            {currentStep === 0 ? renderUserTypeSelection() : renderOnboardingStep()}
            <div className="text-center mt-4">
              <button
                onClick={() => {
                  setActiveTab('signin');
                  setCurrentStep(0);
                }}
                className="text-sm text-primary hover:underline"
              >
                Already have an account? Sign in
              </button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
