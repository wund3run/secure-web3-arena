
import React, { useState } from 'react';
import { useStabilizedAuth } from '@/hooks/useStabilizedAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Shield, Users, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Define the shape of the form data
type FormData = {
  email: string;
  password: string;
  fullName: string;
  userType: 'auditor' | 'project_owner';
  confirmPassword: '';
};

// Define props for the child form components to ensure type safety
type CommonFormProps = {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
  errors: Record<string, string>;
  showPassword: boolean;
  onTogglePassword: () => void;
};

// ============================================================================
// Dumb Child Component: SignInForm
// This component only displays the UI and emits changes back to the parent.
// ============================================================================
const SignInForm = ({ formData, onInputChange, errors, showPassword, onTogglePassword }: CommonFormProps) => (
  <>
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => onInputChange('email', e.target.value)}
        className={errors.email ? 'border-red-500' : ''}
      />
      {errors.email && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> {errors.email}
        </p>
      )}
    </div>

    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => onInputChange('password', e.target.value)}
          className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={onTogglePassword}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      {errors.password && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> {errors.password}
        </p>
      )}
    </div>
  </>
);

// ============================================================================
// Dumb Child Component: SignUpForm
// This component also only displays the UI and emits changes back to the parent.
// ============================================================================
const SignUpForm = ({ formData, onInputChange, errors, showPassword, onTogglePassword }: CommonFormProps) => (
  <>
    <div className="space-y-2">
      <Label htmlFor="fullName">Full Name</Label>
      <Input
        id="fullName"
        type="text"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={(e) => onInputChange('fullName', e.target.value)}
        className={errors.fullName ? 'border-red-500' : ''}
      />
      {errors.fullName && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> {errors.fullName}
        </p>
      )}
    </div>

    <div className="space-y-3">
      <Label>Account Type</Label>
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant={formData.userType === 'project_owner' ? 'default' : 'outline'}
          className="h-auto p-4 flex flex-col items-center gap-2"
          onClick={() => onInputChange('userType', 'project_owner')}
        >
          <Shield className="h-5 w-5" />
          <div className="text-center">
            <div className="font-medium">Project Owner</div>
            <div className="text-xs text-muted-foreground">Request audits</div>
          </div>
        </Button>
        <Button
          type="button"
          variant={formData.userType === 'auditor' ? 'default' : 'outline'}
          className="h-auto p-4 flex flex-col items-center gap-2"
          onClick={() => onInputChange('userType', 'auditor')}
        >
          <Users className="h-5 w-5" />
          <div className="text-center">
            <div className="font-medium">Auditor</div>
            <div className="text-xs text-muted-foreground">Provide audits</div>
          </div>
        </Button>
      </div>
    </div>

    <Separator />

    {/* Reuse the sign-in form for common fields */}
    <SignInForm {...{ formData, onInputChange, errors, showPassword, onTogglePassword }} />

    <div className="space-y-2">
      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        id="confirmPassword"
        type={showPassword ? 'text' : 'password'}
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={(e) => onInputChange('confirmPassword', e.target.value)}
        className={errors.confirmPassword ? 'border-red-500' : ''}
      />
      {errors.confirmPassword && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> {errors.confirmPassword}
        </p>
      )}
    </div>
  </>
);


// ============================================================================
// Main Parent Component: EnhancedAuthFlow
// This component manages all state and logic, acting as a "smart" container.
// ============================================================================
export function EnhancedAuthFlow() {
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    fullName: '',
    userType: 'project_owner',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Assumes you have this custom hook for handling auth logic
  const { signIn, signUp, loading } = useStabilizedAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (activeTab === 'signup') {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (activeTab === 'signin') {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.email, formData.password, formData.fullName, formData.userType);
        toast.success('Account created! Please check your email for verification.');
      }
    } catch (error) {
      console.error('Auth error:', error);
      // Here you would set a general form error from the API
      // e.g., setErrors(prev => ({...prev, form: 'Invalid credentials'}));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          {/* Replace with your actual logo path */}
          <img 
            src="/logo.png" 
            alt="Hawkly Logo"
            className="h-8 w-8 object-contain"
          />
          <h1 className="text-2xl font-bold">Hawkly</h1>
        </div>
        <p className="text-muted-foreground">Secure Web3 Audit Platform</p>
      </div>

      <Card>
        <Tabs value={activeTab} onValueChange={(tab) => { setActiveTab(tab); setErrors({}); }}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin" className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Sign Up
            </TabsTrigger>
          </TabsList>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <TabsContent value="signin" className="space-y-4">
                <CardHeader className="p-0 mb-4">
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>Sign in to access your secure Web3 auditing services</CardDescription>
                </CardHeader>
                <SignInForm {...{ formData, onInputChange, errors, showPassword, onTogglePassword: () => setShowPassword(!showPassword) }} />
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                 <CardHeader className="p-0 mb-4">
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>Join to connect with auditors or offer your security services</CardDescription>
                </CardHeader>
                <SignUpForm {...{ formData, onInputChange, errors, showPassword, onTogglePassword: () => setShowPassword(!showPassword) }} />
              </TabsContent>
              
              {/* This shared button is inside the form but outside the tab content */}
              <Button type="submit" className="w-full" disabled={isSubmitting || loading}>
                {isSubmitting || loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {activeTab === 'signin' ? 'Signing in...' : 'Creating account...'}</>
                ) : (
                  <>{activeTab === 'signin' ? <Shield className="mr-2 h-4 w-4" /> : <CheckCircle className="mr-2 h-4 w-4" />} {activeTab === 'signin' ? 'Sign In' : 'Create Account'}</>
                )}
              </Button>
            </form>

            {/* This supplemental content is outside the form */}
            {activeTab === 'signup' && (
              <div className="mt-4 space-y-3">
                <Separator />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">What you get with Hawkly:</p>
                  <div className="grid grid-cols-1 gap-2 text-xs text-left w-fit mx-auto">
                    <div className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="h-3 w-3 text-green-500" /><span>Secure escrow payments</span></div>
                    <div className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="h-3 w-3 text-green-500" /><span>Expert security auditors</span></div>
                    <div className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="h-3 w-3 text-green-500" /><span>Real-time project tracking</span></div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Tabs>
      </Card>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and{' '}
          <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
