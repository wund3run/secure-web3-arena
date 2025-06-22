
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SignInForm } from './forms/SignInForm';
import { SignUpForm } from './forms/SignUpForm';
import { LogIn, UserPlus, Shield } from 'lucide-react';

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
