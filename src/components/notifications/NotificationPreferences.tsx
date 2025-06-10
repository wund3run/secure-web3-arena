
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

interface NotificationPrefs {
  email: boolean;
  browser: boolean;
  auditUpdates: boolean;
  newMessages: boolean;
  paymentAlerts: boolean;
  securityAlerts: boolean;
  frequency: 'realtime' | 'hourly' | 'daily';
  quietHours: boolean;
  quietStart: string;
  quietEnd: string;
}

export const NotificationPreferences = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<NotificationPrefs>({
    email: true,
    browser: true,
    auditUpdates: true,
    newMessages: true,
    paymentAlerts: true,
    securityAlerts: true,
    frequency: 'realtime',
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '08:00',
  });

  const handlePreferenceChange = (key: keyof NotificationPrefs, value: boolean | string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const savePreferences = () => {
    // In a real app, this would save to Supabase
    console.log('Saving preferences:', preferences);
    toast.success('Notification preferences saved');
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Notification Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Customize how you receive notifications
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-3">Delivery Methods</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={preferences.email}
                onCheckedChange={(checked) => handlePreferenceChange('email', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="browser-notifications">Browser Notifications</Label>
              <Switch
                id="browser-notifications"
                checked={preferences.browser}
                onCheckedChange={(checked) => handlePreferenceChange('browser', checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-3">Notification Types</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="audit-updates">Audit Status Updates</Label>
              <Switch
                id="audit-updates"
                checked={preferences.auditUpdates}
                onCheckedChange={(checked) => handlePreferenceChange('auditUpdates', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="new-messages">New Messages</Label>
              <Switch
                id="new-messages"
                checked={preferences.newMessages}
                onCheckedChange={(checked) => handlePreferenceChange('newMessages', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="payment-alerts">Payment Alerts</Label>
              <Switch
                id="payment-alerts"
                checked={preferences.paymentAlerts}
                onCheckedChange={(checked) => handlePreferenceChange('paymentAlerts', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="security-alerts">Security Alerts</Label>
              <Switch
                id="security-alerts"
                checked={preferences.securityAlerts}
                onCheckedChange={(checked) => handlePreferenceChange('securityAlerts', checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-3">Frequency & Timing</h4>
          <div className="space-y-3">
            <div>
              <Label htmlFor="frequency">Notification Frequency</Label>
              <Select
                value={preferences.frequency}
                onValueChange={(value) => handlePreferenceChange('frequency', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="hourly">Hourly Digest</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="quiet-hours">Quiet Hours</Label>
              <Switch
                id="quiet-hours"
                checked={preferences.quietHours}
                onCheckedChange={(checked) => handlePreferenceChange('quietHours', checked)}
              />
            </div>

            {preferences.quietHours && (
              <div className="grid grid-cols-2 gap-2 ml-6">
                <div>
                  <Label htmlFor="quiet-start" className="text-xs">From</Label>
                  <Select
                    value={preferences.quietStart}
                    onValueChange={(value) => handlePreferenceChange('quietStart', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0');
                        return (
                          <SelectItem key={i} value={`${hour}:00`}>
                            {hour}:00
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quiet-end" className="text-xs">To</Label>
                  <Select
                    value={preferences.quietEnd}
                    onValueChange={(value) => handlePreferenceChange('quietEnd', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0');
                        return (
                          <SelectItem key={i} value={`${hour}:00`}>
                            {hour}:00
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Button onClick={savePreferences} className="w-full">
        Save Preferences
      </Button>
    </div>
  );
};
