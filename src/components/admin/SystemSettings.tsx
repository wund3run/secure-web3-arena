
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Settings, 
  Shield, 
  Bell, 
  Globe, 
  Mail, 
  Database,
  Save,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

export function SystemSettings() {
  const [settings, setSettings] = useState({
    platformName: 'Hawkly',
    platformDescription: 'Revolutionary Web3 Security Platform',
    maintenanceMode: false,
    userRegistration: true,
    emailVerification: true,
    twoFactorRequired: false,
    maxFileSize: '10',
    sessionTimeout: '24',
    auditApprovalRequired: true,
    emailNotifications: true,
    slackIntegration: false,
    webhookUrl: '',
    smtpServer: 'smtp.hawkly.com',
    smtpPort: '587',
    databaseBackup: true,
    backupFrequency: 'daily',
    logRetention: '90',
    rateLimiting: true,
    maxRequestsPerMinute: '100'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // In real app, this would save to backend
    toast.success("Settings saved successfully");
  };

  const systemHealth = {
    database: { status: 'healthy', latency: '12ms' },
    cache: { status: 'healthy', hitRate: '94%' },
    storage: { status: 'healthy', usage: '67%' },
    api: { status: 'healthy', uptime: '99.9%' }
  };

  const getHealthBadge = (status: string) => {
    const variants = {
      healthy: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      critical: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || variants.healthy}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Settings</h2>
          <p className="text-muted-foreground">
            Configure platform settings and system preferences
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* System Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            System Health
          </CardTitle>
          <CardDescription>Current system status and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {Object.entries(systemHealth).map(([component, health]) => (
              <div key={component} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium capitalize">{component}</span>
                  {getHealthBadge(health.status)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {Object.entries(health).map(([key, value]) => 
                    key !== 'status' && (
                      <div key={key}>
                        {key === 'latency' && `Latency: ${value}`}
                        {key === 'hitRate' && `Hit Rate: ${value}`}
                        {key === 'usage' && `Usage: ${value}`}
                        {key === 'uptime' && `Uptime: ${value}`}
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platformName">Platform Name</Label>
              <Input
                id="platformName"
                value={settings.platformName}
                onChange={(e) => handleSettingChange('platformName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="platformDescription">Platform Description</Label>
              <Textarea
                id="platformDescription"
                value={settings.platformDescription}
                onChange={(e) => handleSettingChange('platformDescription', e.target.value)}
                rows={3}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Temporarily disable access to the platform
                </p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>User Registration</Label>
                <p className="text-sm text-muted-foreground">
                  Allow new users to register
                </p>
              </div>
              <Switch
                checked={settings.userRegistration}
                onCheckedChange={(checked) => handleSettingChange('userRegistration', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Email Verification</Label>
                <p className="text-sm text-muted-foreground">
                  Require email verification for new accounts
                </p>
              </div>
              <Switch
                checked={settings.emailVerification}
                onCheckedChange={(checked) => handleSettingChange('emailVerification', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Require 2FA for all users
                </p>
              </div>
              <Switch
                checked={settings.twoFactorRequired}
                onCheckedChange={(checked) => handleSettingChange('twoFactorRequired', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
              <Input
                id="maxFileSize"
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => handleSettingChange('maxFileSize', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Rate Limiting</Label>
                <p className="text-sm text-muted-foreground">
                  Enable API rate limiting
                </p>
              </div>
              <Switch
                checked={settings.rateLimiting}
                onCheckedChange={(checked) => handleSettingChange('rateLimiting', checked)}
              />
            </div>

            {settings.rateLimiting && (
              <div className="space-y-2">
                <Label htmlFor="maxRequests">Max Requests per Minute</Label>
                <Input
                  id="maxRequests"
                  type="number"
                  value={settings.maxRequestsPerMinute}
                  onChange={(e) => handleSettingChange('maxRequestsPerMinute', e.target.value)}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send system notifications via email
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Slack Integration</Label>
                <p className="text-sm text-muted-foreground">
                  Send alerts to Slack channel
                </p>
              </div>
              <Switch
                checked={settings.slackIntegration}
                onCheckedChange={(checked) => handleSettingChange('slackIntegration', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                placeholder="https://hooks.slack.com/..."
                value={settings.webhookUrl}
                onChange={(e) => handleSettingChange('webhookUrl', e.target.value)}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="smtpServer">SMTP Server</Label>
              <Input
                id="smtpServer"
                value={settings.smtpServer}
                onChange={(e) => handleSettingChange('smtpServer', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input
                id="smtpPort"
                value={settings.smtpPort}
                onChange={(e) => handleSettingChange('smtpPort', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Database & Backup Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database & Backup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Automatic Backups</Label>
                <p className="text-sm text-muted-foreground">
                  Enable automated database backups
                </p>
              </div>
              <Switch
                checked={settings.databaseBackup}
                onCheckedChange={(checked) => handleSettingChange('databaseBackup', checked)}
              />
            </div>

            {settings.databaseBackup && (
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Backup Frequency</Label>
                <Select 
                  value={settings.backupFrequency}
                  onValueChange={(value) => handleSettingChange('backupFrequency', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="logRetention">Log Retention (days)</Label>
              <Input
                id="logRetention"
                type="number"
                value={settings.logRetention}
                onChange={(e) => handleSettingChange('logRetention', e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Audit Approval Required</Label>
                <p className="text-sm text-muted-foreground">
                  Require admin approval for new audits
                </p>
              </div>
              <Switch
                checked={settings.auditApprovalRequired}
                onCheckedChange={(checked) => handleSettingChange('auditApprovalRequired', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            These actions are irreversible and should be used with caution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
              <div>
                <h4 className="font-medium text-red-700">Reset All Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Restore all settings to their default values
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Reset Settings
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
              <div>
                <h4 className="font-medium text-red-700">Clear All Logs</h4>
                <p className="text-sm text-muted-foreground">
                  Permanently delete all system logs
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Clear Logs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
