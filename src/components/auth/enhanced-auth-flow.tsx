
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Shield, Users, CheckCircle, Loader2, LogIn, UserPlus } from 'lucide-react';
import { useStabilizedAuth } from '@/hooks/useStabilizedAuth';
import { toast } from 'sonner';
import type { Control, FieldValues } from 'react-hook-form';
import { SignInForm } from '@/components/auth/forms/SignInForm';
import { SignUpForm } from '@/components/auth/forms/SignUpForm';

// ============================================================================
// 1. VALIDATION SCHEMAS: Zod schemas for type-safe form validation
// ============================================================================
const SignInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
});

const SignUpSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  userType: z.enum(['project_owner', 'auditor'], {
    required_error: 'Please select an account type'
  }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type SignInFormData = z.infer<typeof SignInSchema>;
type SignUpFormData = z.infer<typeof SignUpSchema>;

// ============================================================================
// 2. FORM FIELD COMPONENTS: Reusable form components with proper typing
// ============================================================================

// ============================================================================
// 3. MAIN COMPONENT: Enhanced with better state management
// ============================================================================
export function EnhancedAuthFlow() {
  const [activeTab, setActiveTab] = useState('signin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
    userType: 'project_owner' as 'project_owner' | 'auditor'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission handled in SignInForm component
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission handled in SignUpForm component
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Hawkly</h1>
        </div>
        <p className="text-muted-foreground">Secure Web3 Audit Platform</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin" className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            Sign In
          </TabsTrigger>
          <TabsTrigger value="signup" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Sign Up
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signin" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your Hawkly account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignInForm
                formData={formData}
                showPassword={showPassword}
                isLoading={isLoading}
                error={error}
                onInputChange={handleInputChange}
                onTogglePassword={togglePassword}
                onSubmit={handleSignIn}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signup" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                Join Hawkly to access Web3 security services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignUpForm
                formData={formData}
                showPassword={showPassword}
                isLoading={isLoading}
                error={error}
                onInputChange={handleInputChange}
                onTogglePassword={togglePassword}
                onSubmit={handleSignUp}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>
          By continuing, you agree to our{' '}
          <a href="/terms" className="underline hover:text-foreground">Terms of Service</a>{' '}
          and{' '}
          <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
