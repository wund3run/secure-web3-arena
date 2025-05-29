
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SimplifiedNavbar } from '@/components/layout/simplified-navbar';
import { EnhancedFooter } from '@/components/home/enhanced-footer';
import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { AccountSettings } from '@/components/settings/AccountSettings';
import { User, Bell, Shield, CreditCard } from 'lucide-react';
import { PrivateRoute } from '@/components/auth/PrivateRoute';

const Settings = () => {
  return (
    <PrivateRoute>
      <div className="min-h-screen bg-background">
        <SimplifiedNavbar />
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground mt-2">
                Manage your account settings and preferences
              </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="account" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="billing" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Billing
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <ProfileSettings />
              </TabsContent>

              <TabsContent value="notifications">
                <NotificationSettings />
              </TabsContent>

              <TabsContent value="account">
                <AccountSettings />
              </TabsContent>

              <TabsContent value="billing">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">Billing Management</h3>
                  <p className="text-muted-foreground">
                    Billing settings will be available once payment integration is complete.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <EnhancedFooter />
      </div>
    </PrivateRoute>
  );
};

export default Settings;
