
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUXEnhancements } from '@/hooks/useUXEnhancements';
import { 
  Accessibility, 
  Palette, 
  Globe, 
  MessageCircle, 
  Eye, 
  Smartphone,
  Monitor,
  Moon,
  Sun,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Users
} from 'lucide-react';

export function UXEnhancementsDashboard() {
  const {
    // Accessibility
    accessibility,
    validateAccessibility,
    generateAccessibilityReport,
    
    // Theme
    theme,
    applyTheme,
    toggleDarkMode,
    
    // i18n
    i18n,
    changeLocale,
    translateText,
    t,
    formatDate,
    formatNumber,
    formatCurrency,
    
    // Chat
    chat,
    connectChat,
    joinChatRoom,
    sendChatMessage
  } = useUXEnhancements();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">UX Enhancements</h1>
          <p className="text-muted-foreground">
            Advanced user experience features and customization options
          </p>
        </div>
        <Badge variant="secondary" className="bg-hawkly-primary/10 text-hawkly-primary">
          Enhanced UX Suite
        </Badge>
      </div>

      <Tabs defaultValue="accessibility" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="accessibility" className="flex items-center gap-2">
            <Accessibility className="h-4 w-4" />
            Accessibility
          </TabsTrigger>
          <TabsTrigger value="theming" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Theming
          </TabsTrigger>
          <TabsTrigger value="i18n" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Internationalization
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
                <Eye className="h-5 w-5" />
                Accessibility Validation
              </CardTitle>
              <CardDescription>
                WCAG 2.1 compliance checking and accessibility improvements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Current Status</Label>
                  <div className="flex items-center gap-2">
                    {accessibility.violations.length === 0 ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                    )}
                    <span className="text-sm">
                      {accessibility.violations.length} violations found
                    </span>
                  </div>
                </div>
                <Button
                  onClick={validateAccessibility}
                  disabled={accessibility.isValidating}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${accessibility.isValidating ? 'animate-spin' : ''}`} />
                  {accessibility.isValidating ? 'Validating...' : 'Run Validation'}
                </Button>
              </div>

              {accessibility.violations.length > 0 && (
                <div className="space-y-2">
                  <Label>Violations Found</Label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {accessibility.violations.map((violation, index) => (
                      <div key={index} className="p-3 border rounded-lg bg-orange-50 dark:bg-orange-900/20">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-sm">{violation.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Impact: {violation.impact} | Element: {violation.target}
                            </p>
                          </div>
                          <Badge variant={violation.impact === 'critical' ? 'destructive' : 'secondary'}>
                            {violation.impact}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {accessibility.lastValidation && (
                <div className="text-xs text-muted-foreground">
                  Last validation: {accessibility.lastValidation.toLocaleString()}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theming" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme Management
              </CardTitle>
              <CardDescription>
                Customize the visual appearance and color scheme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Current Theme</Label>
                  <Select value={theme.currentTheme} onValueChange={(value) => applyTheme(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {theme.availableThemes.map((themeName) => (
                        <SelectItem key={themeName} value={themeName}>
                          {themeName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Dark Mode</Label>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <Switch
                      checked={theme.isDarkMode}
                      onCheckedChange={toggleDarkMode}
                    />
                    <Moon className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="p-3 rounded border bg-hawkly-primary text-white text-center text-xs">
                  Primary
                </div>
                <div className="p-3 rounded border bg-hawkly-secondary text-white text-center text-xs">
                  Secondary
                </div>
                <div className="p-3 rounded border bg-hawkly-accent text-white text-center text-xs">
                  Accent
                </div>
                <div className="p-3 rounded border bg-hawkly-orange text-white text-center text-xs">
                  Orange
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="i18n" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Internationalization
              </CardTitle>
              <CardDescription>
                Multi-language support and localization features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Language</Label>
                <Select value={i18n.currentLocale} onValueChange={changeLocale}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {i18n.availableLocales.map((locale) => (
                      <SelectItem key={locale.code} value={locale.code}>
                        {locale.name} ({locale.nativeName})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Formatting Examples</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/30">
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-medium">{formatDate(new Date())}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Number</p>
                    <p className="font-medium">{formatNumber(1234567.89)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Currency</p>
                    <p className="font-medium">{formatCurrency(1234.56)}</p>
                  </div>
                </div>
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
                Live communication and collaboration features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${chat.isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div>
                    <p className="font-medium">Connection Status</p>
                    <p className="text-sm text-muted-foreground">
                      {chat.isConnected ? 'Connected' : 'Disconnected'}
                    </p>
                  </div>
                </div>
                <Badge variant={chat.isConnected ? 'default' : 'secondary'}>
                  {chat.connectionState}
                </Badge>
              </div>

              {chat.currentRoom && (
                <div className="space-y-2">
                  <Label>Current Room</Label>
                  <div className="p-3 border rounded-lg bg-muted/30">
                    <p className="font-medium">{chat.currentRoom}</p>
                    {chat.typingUsers.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        <Users className="h-3 w-3 inline mr-1" />
                        {chat.typingUsers.join(', ')} {chat.typingUsers.length === 1 ? 'is' : 'are'} typing...
                      </p>
                    )}
                  </div>
                </div>
              )}

              <Button
                onClick={() => connectChat('demo-user', 'demo-token')}
                disabled={chat.isConnected}
                className="w-full"
              >
                {chat.isConnected ? 'Connected' : 'Connect to Chat'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
