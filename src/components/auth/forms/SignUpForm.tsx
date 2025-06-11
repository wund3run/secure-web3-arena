
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye, EyeOff, User, Building } from "lucide-react";
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
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            placeholder="Enter your email"
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => onInputChange('password', e.target.value)}
              placeholder="Enter your password"
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
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => onInputChange('confirmPassword', e.target.value)}
            placeholder="Confirm your password"
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="space-y-3">
          <Label className="text-base font-medium">Account Type</Label>
          <RadioGroup
            value={formData.userType}
            onValueChange={(value) => onInputChange('userType', value)}
            className="grid grid-cols-1 gap-3"
          >
            <div className="space-y-3">
              <div className={`relative flex items-center space-x-3 rounded-lg border-2 p-4 transition-all duration-200 hover:bg-accent/50 ${
                formData.userType === 'project_owner' 
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                  : 'border-border hover:border-primary/50'
              }`}>
                <RadioGroupItem value="project_owner" id="project_owner" />
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-md ${
                    formData.userType === 'project_owner' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <Building className="h-5 w-5" />
                  </div>
                  <div>
                    <Label htmlFor="project_owner" className="text-sm font-medium cursor-pointer">
                      Project Owner
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Request audits for your projects
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`relative flex items-center space-x-3 rounded-lg border-2 p-4 transition-all duration-200 hover:bg-accent/50 ${
                formData.userType === 'auditor' 
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                  : 'border-border hover:border-primary/50'
              }`}>
                <RadioGroupItem value="auditor" id="auditor" />
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-md ${
                    formData.userType === 'auditor' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <Label htmlFor="auditor" className="text-sm font-medium cursor-pointer">
                      Auditor
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Provide security audit services
                    </p>
                  </div>
                </div>
              </div>
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
