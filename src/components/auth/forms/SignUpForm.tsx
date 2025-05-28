
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

interface SignUpFormProps {
  formData: {
    email: string;
    password: string;
    fullName: string;
    confirmPassword: string;
    userType: 'project_owner' | 'auditor';
  };
  showPassword: boolean;
  isLoading: boolean;
  error: string | null;
  onInputChange: (field: string, value: string) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const SignUpForm = ({
  formData,
  showPassword,
  isLoading,
  error,
  onInputChange,
  onTogglePassword,
  onSubmit
}: SignUpFormProps) => {
  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label>Account Type</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant={formData.userType === 'project_owner' ? 'default' : 'outline'}
            onClick={() => onInputChange('userType', 'project_owner')}
            className="text-sm"
          >
            Project Owner
          </Button>
          <Button
            type="button"
            variant={formData.userType === 'auditor' ? 'default' : 'outline'}
            onClick={() => onInputChange('userType', 'auditor')}
            className="text-sm"
          >
            Security Auditor
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {formData.userType === 'auditor' 
            ? 'Offer security audit services to Web3 projects' 
            : 'Request security audits for your Web3 projects'}
        </p>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className="pl-10"
              value={formData.fullName}
              onChange={(e) => onInputChange('fullName', e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="registerEmail">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="registerEmail"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              value={formData.email}
              onChange={(e) => onInputChange('email', e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="registerPassword">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="registerPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              className="pl-10 pr-10"
              value={formData.password}
              onChange={(e) => onInputChange('password', e.target.value)}
              required
            />
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              className="pl-10"
              value={formData.confirmPassword}
              onChange={(e) => onInputChange('confirmPassword', e.target.value)}
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
    </div>
  );
};
