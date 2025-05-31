
import React from 'react';
import { useUserProfiling } from '@/hooks/useUserProfiling';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PreferenceHeader } from './sections/PreferenceHeader';
import { CommunicationSection } from './sections/CommunicationSection';
import { InterfaceSection } from './sections/InterfaceSection';
import { PlatformSection } from './sections/PlatformSection';

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
      <PreferenceHeader userSegment={userSegment} />

      <CommunicationSection 
        preferences={preferences}
        updatePreferences={updatePreferences}
        onNotificationChange={handleNotificationChange}
      />

      <InterfaceSection 
        preferences={preferences}
        updatePreferences={updatePreferences}
      />

      <PlatformSection 
        preferences={preferences}
        updatePreferences={updatePreferences}
      />

      <div className="flex justify-end">
        <Button variant="outline">
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
}
