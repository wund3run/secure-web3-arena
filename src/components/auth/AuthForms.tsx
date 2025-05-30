
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "./forms/SignInForm";
import { SignUpForm } from "./forms/SignUpForm";

interface AuthFormsProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const AuthForms = ({ onSignIn, onSignUp, isLoading, error }: AuthFormsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
    userType: 'project_owner' as 'project_owner' | 'auditor'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSignIn(formData.email, formData.password);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSignUp(formData.email, formData.password, formData.fullName, formData.userType);
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-center">Get Started</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <SignInForm
              formData={formData}
              showPassword={showPassword}
              isLoading={isLoading}
              error={error}
              onInputChange={handleInputChange}
              onTogglePassword={togglePassword}
              onSubmit={handleSignIn}
            />
          </TabsContent>
          
          <TabsContent value="register">
            <SignUpForm
              formData={formData}
              showPassword={showPassword}
              isLoading={isLoading}
              error={error}
              onInputChange={handleInputChange}
              onTogglePassword={togglePassword}
              onSubmit={handleSignUp}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
