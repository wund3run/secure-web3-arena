
import React from 'react';
import { useUserProfiling } from '@/hooks/useUserProfiling';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Settings, Bell, Layout, Globe, Zap } from 'lucide-react';

export function PreferenceSettings() {
  const { preferences, updatePreferences, getUserSegment } = useUserProfiling();
  
  const userSegment = getUserSegment();

  const handleNotificationChange = (key: string, value: boolean) => {
    updatePreferences({
      notificationSettings: {
        ...preferences?.notificationSettings,
        [key]: value,
      } as any,
    });
  };

  const handlePreferenceChange = (key: string, value: any) => {
    updatePreferences({
      [key]: value,
    });
  };

  if (!preferences) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Loading preferences...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          <h2 className="text-xl font-semibold">User Preferences</h2>
        </div>
        <Badge variant="secondary">{userSegment.replace('_', ' ')}</Badge>
      </div>

      {/* Communication Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Communication & Notifications
          </CardTitle>
          <CardDescription>
            Choose how you want to receive updates and notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="communication">Preferred Communication</Label>
              <Select
                value={preferences.preferredCommunication}
                onValueChange={(value) => handlePreferenceChange('preferredCommunication', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="discord">Discord</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                  <SelectItem value="in-app">In-App Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={preferences.timezone}
                onValueChange={(value) => handlePreferenceChange('timezone', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  <SelectItem value="Europe/London">London</SelectItem>
                  <SelectItem value="Europe/Berlin">Berlin</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                  <SelectItem value="Asia/Singapore">Singapore</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Notification Types</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="audit-updates">Audit Updates</Label>
                <Switch
                  id="audit-updates"
                  checked={preferences.notificationSettings?.auditUpdates || false}
                  onCheckedChange={(checked) => handleNotificationChange('auditUpdates', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="new-messages">New Messages</Label>
                <Switch
                  id="new-messages"
                  checked={preferences.notificationSettings?.newMessages || false}
                  onCheckedChange={(checked) => handleNotificationChange('newMessages', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="payment-alerts">Payment Alerts</Label>
                <Switch
                  id="payment-alerts"
                  checked={preferences.notificationSettings?.paymentAlerts || false}
                  onCheckedChange={(checked) => handleNotificationChange('paymentAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="security-alerts">Security Alerts</Label>
                <Switch
                  id="security-alerts"
                  checked={preferences.notificationSettings?.securityAlerts || true}
                  onCheckedChange={(checked) => handleNotificationChange('securityAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <Switch
                  id="marketing-emails"
                  checked={preferences.notificationSettings?.marketingEmails || false}
                  onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interface Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            Interface & Experience
          </CardTitle>
          <CardDescription>
            Customize your dashboard and browsing experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="dashboard-layout">Dashboard Layout</Label>
              <Select
                value={preferences.dashboardLayout}
                onValueChange={(value) => handlePreferenceChange('dashboardLayout', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                  <SelectItem value="cards">Card View</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={preferences.theme}
                onValueChange={(value) => handlePreferenceChange('theme', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="experience-level">Experience Level</Label>
              <Select
                value={preferences.experienceLevel}
                onValueChange={(value) => handlePreferenceChange('experienceLevel', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Platform Preferences
          </CardTitle>
          <CardDescription>
            Set your preferences for audits and project matching
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="urgency">Default Urgency Preference</Label>
              <Select
                value={preferences.urgencyPreference}
                onValueChange={(value) => handlePreferenceChange('urgencyPreference', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flexible">Flexible Timeline</SelectItem>
                  <SelectItem value="standard">Standard Timeline</SelectItem>
                  <SelectItem value="urgent">Urgent Projects</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="language">Language</Label>
              <Select
                value={preferences.language}
                onValueChange={(value) => handlePreferenceChange('language', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="outline">
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
}
