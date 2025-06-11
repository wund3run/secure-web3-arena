
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Shield, BarChart, Target } from 'lucide-react';

interface PlatformSectionProps {
  preferences: any;
  updatePreferences: (updates: any) => void;
}

export function PlatformSection({ preferences, updatePreferences }: PlatformSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Platform Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Analytics & Privacy
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="analytics">Analytics Collection</Label>
              <Switch
                id="analytics"
                checked={preferences?.privacy?.analytics ?? true}
                onCheckedChange={(checked) => 
                  updatePreferences({ 
                    privacy: { ...preferences?.privacy, analytics: checked } 
                  })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="personalization">Personalization</Label>
              <Switch
                id="personalization"
                checked={preferences?.privacy?.personalization ?? true}
                onCheckedChange={(checked) => 
                  updatePreferences({ 
                    privacy: { ...preferences?.privacy, personalization: checked } 
                  })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="marketing">Marketing Communications</Label>
              <Switch
                id="marketing"
                checked={preferences?.privacy?.marketing ?? false}
                onCheckedChange={(checked) => 
                  updatePreferences({ 
                    privacy: { ...preferences?.privacy, marketing: checked } 
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Target className="h-4 w-4" />
            Smart Features
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="ai-recommendations">AI Recommendations</Label>
              <Switch
                id="ai-recommendations"
                checked={preferences?.smartFeatures?.aiRecommendations ?? true}
                onCheckedChange={(checked) => 
                  updatePreferences({ 
                    smartFeatures: { ...preferences?.smartFeatures, aiRecommendations: checked } 
                  })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-matching">Auto Auditor Matching</Label>
              <Switch
                id="auto-matching"
                checked={preferences?.smartFeatures?.autoMatching ?? true}
                onCheckedChange={(checked) => 
                  updatePreferences({ 
                    smartFeatures: { ...preferences?.smartFeatures, autoMatching: checked } 
                  })
                }
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
