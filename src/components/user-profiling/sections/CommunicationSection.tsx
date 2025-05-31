
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Bell } from 'lucide-react';
import { NotificationSettingsProps } from '../types';

export function CommunicationSection({ preferences, updatePreferences, onNotificationChange }: NotificationSettingsProps) {
  const handlePreferenceChange = (key: string, value: any) => {
    updatePreferences({
      [key]: value,
    });
  };

  return (
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
                onCheckedChange={(checked) => onNotificationChange('auditUpdates', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="new-messages">New Messages</Label>
              <Switch
                id="new-messages"
                checked={preferences.notificationSettings?.newMessages || false}
                onCheckedChange={(checked) => onNotificationChange('newMessages', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="payment-alerts">Payment Alerts</Label>
              <Switch
                id="payment-alerts"
                checked={preferences.notificationSettings?.paymentAlerts || false}
                onCheckedChange={(checked) => onNotificationChange('paymentAlerts', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="security-alerts">Security Alerts</Label>
              <Switch
                id="security-alerts"
                checked={preferences.notificationSettings?.securityAlerts || true}
                onCheckedChange={(checked) => onNotificationChange('securityAlerts', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="marketing-emails">Marketing Emails</Label>
              <Switch
                id="marketing-emails"
                checked={preferences.notificationSettings?.marketingEmails || false}
                onCheckedChange={(checked) => onNotificationChange('marketingEmails', checked)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
