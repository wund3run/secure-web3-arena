
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Bell, Mail, Smartphone, Volume2 } from 'lucide-react';

export const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    soundNotifications: true,
    auditUpdates: true,
    paymentNotifications: true,
    messageNotifications: true,
    systemAlerts: true,
    marketingEmails: false,
  });

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Save to localStorage
    try {
      localStorage.setItem('hawkly_notification_preferences', JSON.stringify({
        ...preferences,
        [key]: value
      }));
    } catch (error) {
      console.warn('Failed to save notification preferences:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-3">Notification Channels</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="email" className="text-sm">Email notifications</Label>
            </div>
            <Switch
              id="email"
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="push" className="text-sm">Push notifications</Label>
            </div>
            <Switch
              id="push"
              checked={preferences.pushNotifications}
              onCheckedChange={(checked) => handlePreferenceChange('pushNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="sound" className="text-sm">Sound notifications</Label>
            </div>
            <Switch
              id="sound"
              checked={preferences.soundNotifications}
              onCheckedChange={(checked) => handlePreferenceChange('soundNotifications', checked)}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium mb-3">Notification Types</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="audit-updates" className="text-sm">Audit updates</Label>
            <Switch
              id="audit-updates"
              checked={preferences.auditUpdates}
              onCheckedChange={(checked) => handlePreferenceChange('auditUpdates', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="payment-notifications" className="text-sm">Payment notifications</Label>
            <Switch
              id="payment-notifications"
              checked={preferences.paymentNotifications}
              onCheckedChange={(checked) => handlePreferenceChange('paymentNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="message-notifications" className="text-sm">Message notifications</Label>
            <Switch
              id="message-notifications"
              checked={preferences.messageNotifications}
              onCheckedChange={(checked) => handlePreferenceChange('messageNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="system-alerts" className="text-sm">System alerts</Label>
            <Switch
              id="system-alerts"
              checked={preferences.systemAlerts}
              onCheckedChange={(checked) => handlePreferenceChange('systemAlerts', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="marketing-emails" className="text-sm">Marketing emails</Label>
            <Switch
              id="marketing-emails"
              checked={preferences.marketingEmails}
              onCheckedChange={(checked) => handlePreferenceChange('marketingEmails', checked)}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="pt-2">
        <Button variant="outline" className="w-full" size="sm">
          <Bell className="h-4 w-4 mr-2" />
          Test Notification
        </Button>
      </div>
    </div>
  );
};
