
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface AuthFormsProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const AuthForms = ({ onSignIn, onSignUp, isLoading, error }: AuthFormsProps) => {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState<'auditor' | 'project_owner'>('project_owner');

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSignIn(signInEmail, signInPassword);
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSignUp(signUpEmail, signUpPassword, fullName, userType);
  };

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="signin" className="space-y-4">
          <form onSubmit={handleSignInSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input
                id="signin-email"
                type="email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password">Password</Label>
              <Input
                id="signin-password"
                type="password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="signup" className="space-y-4">
          <form onSubmit={handleSignUpSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="usertype">Account Type</Label>
              <Select value={userType} onValueChange={(value: 'auditor' | 'project_owner') => setUserType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project_owner">Project Owner</SelectItem>
                  <SelectItem value="auditor">Security Auditor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};
