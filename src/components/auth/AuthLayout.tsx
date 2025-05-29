
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/hawkly-logo.svg"
            alt="Hawkly"
            className="h-12 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold">Welcome to Hawkly</h1>
          <p className="text-muted-foreground">Your Web3 Security Marketplace</p>
        </div>
        <Card>
          <CardContent className="p-6">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
