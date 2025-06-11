
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye, EyeOff } from "lucide-react";
import { SocialAuthButtons } from "../SocialAuthButtons";

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
  onSubmit,
}: SignUpFormProps) => {
  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => onInputChange('fullName', e.target.value)}
            placeholder="Enter your full name"
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            placeholder="Enter your email"
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <div className="relative">
            <Input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => onInputChange('password', e.target.value)}
              placeholder="Create a password"
              disabled={isLoading}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={onTogglePassword}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => onInputChange('confirmPassword', e.target.value)}
            placeholder="Confirm your password"
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="space-y-3">
          <Label>I want to:</Label>
          <RadioGroup
            value={formData.userType}
            onValueChange={(value) => onInputChange('userType', value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="project_owner" id="project_owner" />
              <Label htmlFor="project_owner">
                Get my project audited (Project Owner)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="auditor" id="auditor" />
              <Label htmlFor="auditor">
                Provide security services (Auditor)
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>
      
      <SocialAuthButtons mode="signup" />
    </div>
  );
};
