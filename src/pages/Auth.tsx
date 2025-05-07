
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignInForm, SignUpForm } from '@/components/auth/AuthForms';
import { SocialLoginOptions } from '@/components/auth/SocialLoginOptions';

const Auth = () => {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("signin");
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // Redirect to home if user is already authenticated
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signIn(email, password);
      // Redirect will happen automatically due to the useEffect
    } catch (error) {
      // Error is already handled in the auth context
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signUp(email, password, { full_name: fullName });
      setActiveTab("signin");
    } catch (error) {
      // Error is already handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="border border-border/40 shadow-sm backdrop-blur-sm bg-white/80">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome to Hawkly</CardTitle>
          <CardDescription className="text-center">
            The premier Web3 security marketplace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <SignInForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                onSubmit={handleSignIn}
                isLoading={isLoading}
                error={error}
              />
            </TabsContent>
            
            <TabsContent value="signup">
              <SignUpForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                fullName={fullName}
                setFullName={setFullName}
                onSubmit={handleSignUp}
                isLoading={isLoading}
                error={error}
              />
            </TabsContent>
          </Tabs>
          
          <SocialLoginOptions />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          {/* Footer content is moved to SocialLoginOptions */}
        </CardFooter>
      </Card>
    </AuthLayout>
  );
};

export default Auth;
