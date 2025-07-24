import React from 'react';
import { AppContainer } from '@/components/layout/AppContainer';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <AppContainer maxWidth="max-w-md" padding="px-6 py-8" glass elevation>
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
            alt="Hawkly Logo"
            className="h-16 w-16 mx-auto mb-4 object-contain bg-transparent"
            style={{ backgroundColor: 'transparent' }}
          />
          <h1 className="text-2xl font-bold text-foreground">Welcome to Hawkly</h1>
          <p className="text-muted-foreground">Secure Web3 Audit Platform</p>
        </div>
        {children}
      </AppContainer>
    </div>
  );
};
