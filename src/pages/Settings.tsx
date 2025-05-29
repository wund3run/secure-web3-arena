
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SimplifiedNavbar } from '@/components/layout/simplified-navbar';
import { EnhancedFooter } from '@/components/home/enhanced-footer';

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <SimplifiedNavbar />
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Settings page coming soon...</p>
          </CardContent>
        </Card>
      </div>
      <EnhancedFooter />
    </div>
  );
};

export default Settings;
