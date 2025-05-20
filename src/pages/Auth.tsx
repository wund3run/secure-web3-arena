
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SimplifiedNavbar } from '@/components/layout/simplified-navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { SkipToContent } from '@/components/layout/SkipToContent';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const defaultMode = searchParams.get('mode') || 'login';
  
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode === 'signup' ? 'signup' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'auditor' | 'project_owner'>('project_owner');
  const { signIn, signUp, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    try {
      if (mode === 'login') {
        await signIn(email, password);
        toast.success('Welcome back!');
        navigate('/dashboard');
      } else {
        await signUp(email, password, userType);
        toast.success('Account created successfully');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error('Authentication failed, please try again');
    }
  };
  
  return (
    <>
      <Helmet>
        <title>{mode === 'login' ? 'Sign In' : 'Sign Up'} | Hawkly</title>
        <meta 
          name="description" 
          content={mode === 'login' 
            ? 'Sign in to access your Hawkly account' 
            : 'Create a new Hawkly account'
          } 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <SkipToContent targetId="auth-content" />
        <SimplifiedNavbar />
        
        <main id="auth-content" tabIndex={-1} className="flex-grow flex items-center justify-center py-12">
          <div className="w-full max-w-md px-4">
            <Card className="border shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                  {mode === 'login' ? 'Welcome back' : 'Create an account'}
                </CardTitle>
                <CardDescription className="text-center">
                  {mode === 'login' 
                    ? 'Enter your credentials to access your account' 
                    : 'Enter your information to create your account'
                  }
                </CardDescription>
              </CardHeader>
              
              <Tabs 
                defaultValue={mode} 
                value={mode} 
                onValueChange={(value) => setMode(value as 'login' | 'signup')}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 w-full mb-4">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    
                    {mode === 'signup' && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Account Type</label>
                        <div className="grid grid-cols-2 gap-4">
                          <div
                            className={`border rounded-md p-3 cursor-pointer transition-colors ${
                              userType === 'project_owner' ? 'bg-primary/10 border-primary' : ''
                            }`}
                            onClick={() => setUserType('project_owner')}
                          >
                            <div className="font-medium">Project Owner</div>
                            <div className="text-sm text-muted-foreground">
                              I want to secure my project
                            </div>
                          </div>
                          <div
                            className={`border rounded-md p-3 cursor-pointer transition-colors ${
                              userType === 'auditor' ? 'bg-primary/10 border-primary' : ''
                            }`}
                            onClick={() => setUserType('auditor')}
                          >
                            <div className="font-medium">Security Auditor</div>
                            <div className="text-sm text-muted-foreground">
                              I provide security services
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
                      ) : mode === 'login' ? 'Sign In' : 'Create Account'}
                    </Button>
                  </form>
                </CardContent>
              </Tabs>
              
              <CardFooter className="flex flex-col">
                <div className="mt-2 text-center text-sm">
                  {mode === 'login' ? (
                    <p>
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setMode('signup')}
                        className="text-primary hover:underline font-medium"
                      >
                        Sign Up
                      </button>
                    </p>
                  ) : (
                    <p>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setMode('login')}
                        className="text-primary hover:underline font-medium"
                      >
                        Sign In
                      </button>
                    </p>
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
