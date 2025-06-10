
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUXEnhancements } from '@/hooks/useUXEnhancements';
import { Eye, Palette, Globe, MessageCircle, Download, RefreshCw, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export function UXEnhancementsDashboard() {
  const {
    accessibility,
    theme,
    i18n,
    chat,
    validateAccessibility,
    generateAccessibilityReport,
    applyTheme,
    toggleDarkMode,
    changeLocale,
    translateText,
    connectChat,
    joinChatRoom,
    sendChatMessage,
    t,
    formatDate,
    formatNumber,
    formatCurrency
  } = useUXEnhancements();

  const [customText, setCustomText] = useState('');
  const [targetLocale, setTargetLocale] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [chatUserId, setChatUserId] = useState('');
  const [chatToken, setChatToken] = useState('');
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');

  const handleTranslate = async () => {
    if (customText && targetLocale) {
      const result = await translateText(customText, targetLocale);
      setTranslatedText(result);
    }
  };

  const handleChatConnect = async () => {
    if (chatUserId && chatToken) {
      await connectChat(chatUserId, chatToken);
    }
  };

  const handleJoinRoom = () => {
    if (roomId) {
      joinChatRoom(roomId);
    }
  };

  const handleSendMessage = () => {
    if (message) {
      sendChatMessage(message);
      setMessage('');
    }
  };

  const downloadReport = () => {
    const report = generateAccessibilityReport();
    const blob = new Blob([report], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'accessibility-report.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">UX Enhancements</h2>
          <p className="text-muted-foreground">
            Advanced user experience features and customization options
          </p>
        </div>
      </div>

      <Tabs defaultValue="accessibility" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="accessibility" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Accessibility
          </TabsTrigger>
          <TabsTrigger value="theme" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Theme
          </TabsTrigger>
          <TabsTrigger value="i18n" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            i18n
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="accessibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Accessibility Validation
              </CardTitle>
              <CardDescription>
                Validate and monitor WCAG compliance across your application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Button 
                  onClick={validateAccessibility}
                  disabled={accessibility.isValidating}
                  className="flex items-center gap-2"
                >
                  {accessibility.isValidating ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  {accessibility.isValidating ? 'Validating...' : 'Run Validation'}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={downloadReport}
                  disabled={accessibility.violations.length === 0}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
              </div>

              {accessibility.lastValidation && (
                <div className="text-sm text-muted-foreground">
                  Last validation: {formatDate(accessibility.lastValidation, i18n.currentLocale)}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium">Errors</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {accessibility.violations.filter(v => v.severity === 'error').length}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">Warnings</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {accessibility.violations.filter(v => v.severity === 'warning').length}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Total Issues</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {accessibility.violations.length}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {accessibility.violations.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Recent Violations:</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {accessibility.violations.slice(0, 5).map((violation, index) => (
                      <Card key={index} className="p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant={violation.severity === 'error' ? 'destructive' : 'secondary'}>
                                {violation.severity}
                              </Badge>
                              <span className="text-sm font-medium">{violation.rule.criterion}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{violation.message}</p>
                            {violation.suggestion && (
                              <p className="text-xs text-blue-600 mt-1">{violation.suggestion}</p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme Customization
              </CardTitle>
              <CardDescription>
                Customize the visual appearance of your application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Theme</label>
                  <Select value={theme.currentTheme} onValueChange={(value) => applyTheme(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {theme.availableThemes.map((themeName) => (
                        <SelectItem key={themeName} value={themeName}>
                          {themeName.replace('-', ' ').toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="dark-mode"
                    checked={theme.isDarkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                  <label htmlFor="dark-mode" className="text-sm font-medium">
                    Dark Mode
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="i18n" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Internationalization
              </CardTitle>
              <CardDescription>
                Manage language settings and translations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Language</label>
                  <Select value={i18n.currentLocale} onValueChange={changeLocale}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {i18n.availableLocales.map((locale) => (
                        <SelectItem key={locale.code} value={locale.code}>
                          {locale.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Text Translation</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Text to Translate</label>
                    <textarea
                      className="w-full p-2 border rounded-md"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="Enter text to translate..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Target Language</label>
                    <Select value={targetLocale} onValueChange={setTargetLocale}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select target language" />
                      </SelectTrigger>
                      <SelectContent>
                        {i18n.availableLocales.map((locale) => (
                          <SelectItem key={locale.code} value={locale.code}>
                            {locale.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleTranslate} disabled={!customText || !targetLocale}>
                  Translate
                </Button>
                {translatedText && (
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm font-medium mb-1">Translation:</p>
                    <p>{translatedText}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-4 border-t">
                <h4 className="font-medium">Formatting Examples</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Date:</span>
                    <p>{formatDate(new Date(), i18n.currentLocale)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Number:</span>
                    <p>{formatNumber(1234.56, i18n.currentLocale)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Currency:</span>
                    <p>{formatCurrency(99.99, i18n.currentLocale, 'USD')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Real-time Chat
              </CardTitle>
              <CardDescription>
                Connect and communicate in real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${chat.isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm font-medium">
                  {chat.isConnected ? 'Connected' : 'Disconnected'}
                </span>
                <Badge variant="outline">{chat.connectionState}</Badge>
              </div>

              {!chat.isConnected && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">User ID</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={chatUserId}
                      onChange={(e) => setChatUserId(e.target.value)}
                      placeholder="Enter user ID..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Auth Token</label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded-md"
                      value={chatToken}
                      onChange={(e) => setChatToken(e.target.value)}
                      placeholder="Enter auth token..."
                    />
                  </div>
                </div>
              )}

              <Button
                onClick={handleChatConnect}
                disabled={chat.isConnected || !chatUserId || !chatToken}
              >
                {chat.isConnected ? 'Connected' : 'Connect to Chat'}
              </Button>

              {chat.isConnected && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Room</label>
                      <p className="text-sm text-muted-foreground">
                        {chat.currentRoom || 'No room joined'}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Typing Users</label>
                      <p className="text-sm text-muted-foreground">
                        {chat.typingUsers.length > 0 ? chat.typingUsers.join(', ') : 'None'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 p-2 border rounded-md"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      placeholder="Room ID to join..."
                    />
                    <Button onClick={handleJoinRoom} disabled={!roomId}>
                      Join Room
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 p-2 border rounded-md"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} disabled={!message || !chat.currentRoom}>
                      Send
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
