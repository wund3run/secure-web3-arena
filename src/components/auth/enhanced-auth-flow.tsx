'use client';

import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useStabilizedAuth } from '@/hooks/useStabilizedAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Shield, Users, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// ============================================================================
// 1. ZOD SCHEMAS: The single source of truth for validation
// ============================================================================
const SignInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const SignUpSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
  userType: z.enum(['auditor', 'project_owner']),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignInFormData = z.infer<typeof SignInSchema>;
type SignUpFormData = z.infer<typeof SignUpSchema>;

// ============================================================================
// 2. CHILD COMPONENTS: Using React Hook Form's Controller
// ============================================================================
type CommonFormProps = {
  control: any;
  showPassword: boolean;
  onTogglePassword: () => void;
};

const SignInFormFields = ({ control, showPassword, onTogglePassword }: CommonFormProps) => (
  <>
    <Controller
      name="email"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" {...field} className={error ? 'border-red-500' : ''} />
          {error && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{error.message}</p>}
        </div>
      )}
    />
    <Controller
      name="password"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" {...field} className={error ? 'border-red-500 pr-10' : 'pr-10'} />
            <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={onTogglePassword}>
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {error && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{error.message}</p>}
        </div>
      )}
    />
  </>
);

const SignUpFormFields = ({ control, showPassword, onTogglePassword }: CommonFormProps) => (
  <>
    <Controller
      name="fullName"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" type="text" placeholder="Enter your full name" {...field} className={error ? 'border-red-500' : ''} />
          {error && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{error.message}</p>}
        </div>
      )}
    />
    <Controller
      name="userType"
      control={control}
      render={({ field }) => (
        <div className="space-y-3">
          <Label>Account Type</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant={field.value === 'project_owner' ? 'default' : 'outline'} className="h-auto p-4 flex flex-col items-center gap-2" onClick={() => field.onChange('project_owner')}>
              <Shield className="h-5 w-5" /><div>Project Owner</div>
            </Button>
            <Button type="button" variant={field.value === 'auditor' ? 'default' : 'outline'} className="h-auto p-4 flex flex-col items-center gap-2" onClick={() => field.onChange('auditor')}>
              <Users className="h-5 w-5" /><div>Auditor</div>
            </Button>
          </div>
        </div>
      )}
    />
    <Separator />
    <SignInFormFields {...{ control, showPassword, onTogglePassword }} />
    <Controller
      name="confirmPassword"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder="Confirm your password" {...field} className={error ? 'border-red-500' : ''} />
          {error && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{error.message}</p>}
        </div>
      )}
    />
  </>
);

// ============================================================================
// 3. MAIN PARENT COMPONENT
// ============================================================================
export function EnhancedAuthFlow() {
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp, loading: authLoading } = useStabilizedAuth();

  const signInForm = useForm<SignInFormData>({ resolver: zodResolver(SignInSchema), defaultValues: { email: '', password: '' } });
  const signUpForm = useForm<SignUpFormData>({ resolver: zodResolver(SignUpSchema), defaultValues: { fullName: '', email: '', password: '', confirmPassword: '', userType: 'project_owner' } });

  const onSignInSubmit: SubmitHandler<SignInFormData> = (data) => signIn(data.email, data.password);
  const onSignUpSubmit: SubmitHandler<SignUpFormData> = (data) => {
    signUp(data.email, data.password, data.fullName, data.userType);
    toast.success('Account created! Please check your email for verification.');
  };
  
  const isSubmitting = signInForm.formState.isSubmitting || signUpForm.formState.isSubmitting;
  
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <img src="/logo.png" alt="Hawkly Logo" className="h-8 w-8 object-contain mx-auto" />
        <h1 className="text-2xl font-bold">Hawkly</h1>
        <p className="text-muted-foreground">Secure Web3 Audit Platform</p>
      </div>

      <Card>
        <Tabs value={activeTab} onValueChange={(tab) => { setActiveTab(tab); signInForm.clearErrors(); signUpForm.clearErrors(); }}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin" className="flex items-center gap-2"><Shield className="h-4 w-4" /> Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="flex items-center gap-2"><Users className="h-4 w-4" /> Sign Up</TabsTrigger>
          </TabsList>

          <CardContent className="pt-6">
            <TabsContent value="signin" className="m-0">
              <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-4">
                <CardHeader className="p-0 mb-4"><CardTitle>Welcome Back</CardTitle><CardDescription>Sign in to access your dashboard</CardDescription></CardHeader>
                <SignInFormFields control={signInForm.control} showPassword={showPassword} onTogglePassword={() => setShowPassword(!showPassword)} />
                <Button type="submit" className="w-full" disabled={isSubmitting || authLoading}>
                  {isSubmitting || authLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Shield className="mr-2 h-4 w-4" />}
                  {isSubmitting || authLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="m-0">
              <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
                <CardHeader className="p-0 mb-4"><CardTitle>Create Account</CardTitle><CardDescription>Join to connect with auditors or offer services</CardDescription></CardHeader>
                <SignUpFormFields control={signUpForm.control} showPassword={showPassword} onTogglePassword={() => setShowPassword(!showPassword)} />
                <Button type="submit" className="w-full" disabled={isSubmitting || authLoading}>
                  {isSubmitting || authLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                  {isSubmitting || authLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
