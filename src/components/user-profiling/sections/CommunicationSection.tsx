
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Mail, MessageSquare } from 'lucide-react';

interface CommunicationSectionProps {
  preferences: any;
  updatePreferences: (updates: any) => void;
  onNotificationChange: (key: string, value: boolean) => void;
}

export function CommunicationSection({ 
  preferences, 
  updatePreferences, 
  onNotificationChange 
}: CommunicationSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Communication Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notification Settings */}
        <div className="space-y-4">
          <h4 className="font-medium">Notification Types</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="audit-updates" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Audit Updates
              </Label>
              <Switch
                id="audit-updates"
                checked={preferences?.notificationSettings?.auditUpdates ?? true}
                onCheckedChange={(checked) => onNotificationChange('auditUpdates', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="new-messages" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                New Messages
              </Label>
              <Switch
                id="new-messages"
                checked={preferences?.notificationSettings?.newMessages ?? true}
                onCheckedChange={(checked) => onNotificationChange('newMessages', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="payment-alerts">Payment Alerts</Label>
              <Switch
                id="payment-alerts"
                checked={preferences?.notificationSettings?.paymentAlerts ?? true}
                onCheckedChange={(checked) => onNotificationChange('paymentAlerts', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="security-alerts">Security Alerts</Label>
              <Switch
                id="security-alerts"
                checked={preferences?.notificationSettings?.securityAlerts ?? true}
                onCheckedChange={(checked) => onNotificationChange('securityAlerts', checked)}
              />
            </div>
          </div>
        </div>

        {/* Communication Preferences */}
        <div className="space-y-4">
          <h4 className="font-medium">Preferred Communication</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="communication">Primary Method</Label>
              <Select
                value={preferences?.preferredCommunication || 'email'}
                onValueChange={(value) => updatePreferences({ preferredCommunication: value })}
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
              <Label htmlFor="urgency">Urgency Preference</Label>
              <Select
                value={preferences?.urgencyPreference || 'standard'}
                onValueChange={(value) => updatePreferences({ urgencyPreference: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flexible">Flexible Timing</SelectItem>
                  <SelectItem value="standard">Standard Response</SelectItem>
                  <SelectItem value="urgent">Urgent Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
