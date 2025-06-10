
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn } from 'lucide-react';

const AuthPage = () => {
  return (
    <StandardLayout
      title="Authentication | Hawkly"
      description="Sign in or create your Hawkly account"
    >
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogIn className="h-5 w-5" />
              Authentication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Authentication system coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default AuthPage;
