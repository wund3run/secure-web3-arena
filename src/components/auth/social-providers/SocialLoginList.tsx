
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter } from "lucide-react";

// Define social provider type for better type safety
export type SocialProviderType = 'GitHub' | 'Google' | 'Twitter' | 'Email';

interface SocialLoginListProps {
  onSocialConnect: (provider: SocialProviderType) => void;
  onEmailConnect: (email: string) => void;
  isConnecting: boolean;
}

export function SocialLoginList({ 
  onSocialConnect, 
  onEmailConnect, 
  isConnecting 
}: SocialLoginListProps) {
  const [emailInput, setEmailInput] = useState("");

  const handleEmailSubmit = () => {
    if (emailInput.trim() && emailInput.includes('@')) {
      onEmailConnect(emailInput);
    }
  };

  return (
    <div className="space-y-3">
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center py-5 hover:bg-background/50" 
        onClick={() => onSocialConnect("GitHub")}
        disabled={isConnecting}
      >
        <Github className="mr-2 h-5 w-5" />
        Continue with GitHub
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center py-5 hover:bg-background/50" 
        onClick={() => onSocialConnect("Google")}
        disabled={isConnecting}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" className="mr-2 h-5 w-5">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          <path d="M1 1h22v22H1z" fill="none"/>
        </svg>
        Continue with Google
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center py-5 hover:bg-background/50" 
        onClick={() => onSocialConnect("Twitter")}
        disabled={isConnecting}
      >
        <Twitter className="mr-2 h-5 w-5" />
        Continue with Twitter
      </Button>

      <div className="relative my-4">
        <Separator />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
          OR
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex space-x-2">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            disabled={isConnecting}
          />
        </div>
        
        <Button 
          variant="secondary" 
          className="w-full bg-purple-500 hover:bg-purple-600 text-white" 
          onClick={handleEmailSubmit}
          disabled={isConnecting || !emailInput.trim() || !emailInput.includes('@')}
        >
          Join with Email
        </Button>
      </div>
    </div>
  );
}
