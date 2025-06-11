
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield, Users, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export function EnhancedAuthFlow() {
  const { signIn, signUp, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    userType: 'project_owner' as 'auditor' | 'project_owner'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (isSignUp: boolean) => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (isSignUp) {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(false)) return;

    try {
      await signIn(formData.email, formData.password);
      toast.success('Welcome back!');
    } catch (error: any) {
      toast.error('Sign in failed', { description: error.message });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(true)) return;

    try {
      await signUp(formData.email, formData.password, formData.fullName, formData.userType);
      toast.success('Account created successfully!');
    } catch (error: any) {
      toast.error('Sign up failed', { description: error.message });
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                Sign in to access your Web3 security dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.email}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.password}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Join Hawkly</CardTitle>
              <CardDescription>
                Create your account to start securing Web3 projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    value={formData.fullName}
                    onChange={(e) => updateFormData('fullName', e.target.value)}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.fullName}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.email}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    placeholder="Create a password"
                  />
                  {errors.password && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.password}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.confirmPassword}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-3">
                  <Label>Account Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={formData.userType === 'project_owner' ? 'default' : 'outline'}
                      onClick={() => updateFormData('userType', 'project_owner')}
                      className="h-auto p-3 flex flex-col items-center space-y-1"
                    >
                      <Users className="h-4 w-4" />
                      <span className="text-xs">Project Owner</span>
                    </Button>
                    <Button
                      type="button"
                      variant={formData.userType === 'auditor' ? 'default' : 'outline'}
                      onClick={() => updateFormData('userType', 'auditor')}
                      className="h-auto p-3 flex flex-col items-center space-y-1"
                    >
                      <Shield className="h-4 w-4" />
                      <span className="text-xs">Security Auditor</span>
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-1">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span>SOC 2 Compliant</span>
          </div>
          <div className="flex items-center space-x-1">
            <Shield className="h-3 w-3 text-blue-500" />
            <span>Enterprise Security</span>
          </div>
        </div>
      </div>
    </div>
  );
}
