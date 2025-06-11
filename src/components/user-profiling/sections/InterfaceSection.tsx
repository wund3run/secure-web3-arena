
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Monitor, Layout, Palette } from 'lucide-react';

interface InterfaceSectionProps {
  preferences: any;
  updatePreferences: (updates: any) => void;
}

export function InterfaceSection({ preferences, updatePreferences }: InterfaceSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Monitor className="h-5 w-5" />
          Interface Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="theme" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Theme
            </Label>
            <Select
              value={preferences?.theme || 'auto'}
              onValueChange={(value) => updatePreferences({ theme: value })}
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
            <Label htmlFor="layout" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Dashboard Layout
            </Label>
            <Select
              value={preferences?.dashboardLayout || 'detailed'}
              onValueChange={(value) => updatePreferences({ dashboardLayout: value })}
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
            <Label htmlFor="experience">Experience Level</Label>
            <Select
              value={preferences?.experienceLevel || 'intermediate'}
              onValueChange={(value) => updatePreferences({ experienceLevel: value })}
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
          
          <div>
            <Label htmlFor="language">Language</Label>
            <Select
              value={preferences?.language || 'en'}
              onValueChange={(value) => updatePreferences({ language: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-save">Auto-save Preferences</Label>
          <Switch
            id="auto-save"
            checked={preferences?.autoSave ?? true}
            onCheckedChange={(checked) => updatePreferences({ autoSave: checked })}
          />
        </div>
      </CardContent>
    </Card>
  );
}
