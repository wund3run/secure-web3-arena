
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUXEnhancements } from '@/hooks/useUXEnhancements';
import { 
  Shield, 
  Palette, 
  Globe, 
  MessageCircle, 
  CheckCircle, 
  AlertTriangle, 
  Download,
  Upload,
  Moon,
  Sun,
  Zap
} from 'lucide-react';

export function UXEnhancementsDashboard() {
  const {
    accessibility,
    theme,
    i18n,
    chat,
    validateAccessibility,
    generateAccessibilityReport,
    applyTheme,
    createCustomTheme,
    toggleDarkMode,
    changeLocale,
    connectChat,
    t
  } = useUXEnhancements();

  const [customThemeName, setCustomThemeName] = useState('');
  const [customThemeColor, setCustomThemeColor] = useState('#5E35B1');

  const handleCreateCustomTheme = () => {
    if (customThemeName.trim()) {
      createCustomTheme(customThemeName, customThemeColor);
      setCustomThemeName('');
    }
  };

  const handleExportReport = () => {
    const report = generateAccessibilityReport();
    const blob = new Blob([report], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accessibility-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">UX Enhancements Dashboard</h1>
        <p className="text-muted-foreground">
          Manage accessibility, theming, internationalization, and real-time features
        </p>
      </div>

      <Tabs defaultValue="accessibility" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="accessibility" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Accessibility
          </TabsTrigger>
          <TabsTrigger value="theming" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Theming
          </TabsTrigger>
          <TabsTrigger value="i18n" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            i18n
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Real-time Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="accessibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                WCAG Compliance
              </CardTitle>
              <CardDescription>
                Automated accessibility validation and compliance reporting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Accessibility Validation</p>
                  <p className="text-sm text-muted-foreground">
                    Last validated: {accessibility.lastValidation?.toLocaleString() || 'Never'}
                  </p>
                </div>
                <Button 
                  onClick={validateAccessibility}
                  disabled={accessibility.isValidating}
                >
                  {accessibility.isValidating ? 'Validating...' : 'Run Validation'}
                </Button>
              </div>

              {accessibility.violations.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Violations Found</h3>
                    <Button variant="outline" size="sm" onClick={handleExportReport}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    {accessibility.violations.slice(0, 5).map((violation, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={violation.severity === 'error' ? 'destructive' : 'secondary'}>
                                {violation.severity}
                              </Badge>
                              <span className="text-sm font-medium">{violation.rule.id}</span>
                            </div>
                            <p className="text-sm mb-2">{violation.message}</p>
                            <p className="text-xs text-muted-foreground">{violation.suggestion}</p>
                          </div>
                          {violation.severity === 'error' ? (
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-warning" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {accessibility.violations.length > 5 && (
                    <p className="text-sm text-muted-foreground text-center">
                      And {accessibility.violations.length - 5} more violations...
                    </p>
                  )}
                </div>
              )}

              {accessibility.violations.length === 0 && accessibility.lastValidation && (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <p className="font-medium text-green-600">No accessibility violations found!</p>
                  <p className="text-sm text-muted-foreground">Your page meets WCAG compliance standards</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theming" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Theme Selection
                </CardTitle>
                <CardDescription>
                  Choose from available themes or create custom ones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Theme</Label>
                  <Select value={theme.currentTheme} onValueChange={(value) => applyTheme(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {theme.availableThemes.map((themeName) => (
                        <SelectItem key={themeName} value={themeName}>
                          {themeName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {theme.isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    <Label>Dark Mode</Label>
                  </div>
                  <Switch checked={theme.isDarkMode} onCheckedChange={toggleDarkMode} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create Custom Theme</CardTitle>
                <CardDescription>
                  Generate a custom theme from a base color
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme Name</Label>
                  <Input
                    value={customThemeName}
                    onChange={(e) => setCustomThemeName(e.target.value)}
                    placeholder="Enter theme name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Base Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={customThemeColor}
                      onChange={(e) => setCustomThemeColor(e.target.value)}
                      className="w-20 h-10"
                    />
                    <Input
                      value={customThemeColor}
                      onChange={(e) => setCustomThemeColor(e.target.value)}
                      placeholder="#5E35B1"
                      className="flex-1"
                    />
                  </div>
                </div>

                <Button onClick={handleCreateCustomTheme} className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Generate Theme
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="i18n" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Internationalization
              </CardTitle>
              <CardDescription>
                Language and localization settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Current Language</Label>
                  <Select value={i18n.currentLocale} onValueChange={changeLocale}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {i18n.availableLocales.map((locale) => (
                        <SelectItem key={locale.code} value={locale.code}>
                          {locale.nativeName} ({locale.name})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Sample Translation</Label>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm">{t('common.loading')}</p>
                    <p className="text-xs text-muted-foreground">{t('nav.dashboard')}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {i18n.availableLocales.slice(0, 6).map((locale) => (
                  <Card key={locale.code} className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => changeLocale(locale.code)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{locale.nativeName}</p>
                          <p className="text-xs text-muted-foreground">{locale.name}</p>
                        </div>
                        {locale.code === i18n.currentLocale && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Real-time Chat System
              </CardTitle>
              <CardDescription>
                WebSocket-based real-time communication features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Connection Status</span>
                    <Badge variant={chat.isConnected ? 'default' : 'secondary'}>
                      {chat.connectionState}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Current Room</span>
                    <span className="text-sm text-muted-foreground">
                      {chat.currentRoom || 'Not in a room'}
                    </span>
                  </div>

                  {chat.typingUsers.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Typing Users</span>
                      <span className="text-sm text-muted-foreground">
                        {chat.typingUsers.length} user(s) typing
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={() => connectChat('user123', 'auth-token')}
                    disabled={chat.isConnected}
                    className="w-full"
                  >
                    {chat.isConnected ? 'Connected' : 'Connect to Chat'}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Chat features include real-time messaging, typing indicators, 
                      file sharing, and presence detection
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
