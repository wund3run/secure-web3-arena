
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

export const NotificationPreferences = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = React.useState({
    auditUpdates: true,
    newMessages: true,
    paymentUpdates: true,
    systemUpdates: false,
    emailNotifications: false,
    browserNotifications: true,
  });

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    // In a real app, this would save to the database
    localStorage.setItem(`notificationPrefs_${user?.id}`, JSON.stringify({
      ...preferences,
      [key]: value
    }));
    toast.success('Preference updated');
  };

  React.useEffect(() => {
    if (user?.id) {
      const saved = localStorage.getItem(`notificationPrefs_${user.id}`);
      if (saved) {
        setPreferences(JSON.parse(saved));
      }
    }
  }, [user?.id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Choose which notifications you'd like to receive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="audit-updates">Audit Updates</Label>
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
          <Label htmlFor="payment-updates">Payment Updates</Label>
          <Switch
            id="payment-updates"
            checked={preferences.paymentUpdates}
            onCheckedChange={(checked) => handlePreferenceChange('paymentUpdates', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="system-updates">System Updates</Label>
          <Switch
            id="system-updates"
            checked={preferences.systemUpdates}
            onCheckedChange={(checked) => handlePreferenceChange('systemUpdates', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications">Email Notifications</Label>
          <Switch
            id="email-notifications"
            checked={preferences.emailNotifications}
            onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="browser-notifications">Browser Notifications</Label>
          <Switch
            id="browser-notifications"
            checked={preferences.browserNotifications}
            onCheckedChange={(checked) => handlePreferenceChange('browserNotifications', checked)}
          />
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={() => toast.info('Preferences saved locally')}
        >
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
};
