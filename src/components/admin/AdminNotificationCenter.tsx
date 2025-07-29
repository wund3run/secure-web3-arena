import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNotifications } from '@/contexts/useNotifications';
import { useAuth } from '@/contexts/auth';
import { Badge } from '@/components/ui/badge';
import { Bell, Send, Users, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export const AdminNotificationCenter = () => {
  const { notify } = useNotifications();
  const { user } = useAuth();
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [announcementType, setAnnouncementType] = useState<'info' | 'warning' | 'error' | 'success'>('info');
  const [targetAudience, setTargetAudience] = useState('all');

  const sendSystemAnnouncement = () => {
    if (!announcementTitle || !announcementMessage) {
      toast.error('Please fill in all fields');
      return;
    }

    // In a real app, this would send to all users based on targetAudience
    // For now, we'll just add it to the current user's notifications
    notify({
      title: `[SYSTEM] ${announcementTitle}`,
      message: announcementMessage,
      type: announcementType,
      category: 'system',
    });

    toast.success('System announcement sent successfully');
    setAnnouncementTitle('');
    setAnnouncementMessage('');
    setAnnouncementType('info');
  };

  const quickAnnouncements = [
    {
      title: 'Scheduled Maintenance',
      message: 'The platform will undergo scheduled maintenance tonight from 2-4 AM UTC.',
      type: 'warning' as const,
    },
    {
      title: 'New Feature Release',
      message: 'We\'ve released new notification features! Check them out in your dashboard.',
      type: 'success' as const,
    },
    {
      title: 'Security Update',
      message: 'Please update your passwords and enable 2FA for enhanced security.',
      type: 'info' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Admin Notification Center
          </CardTitle>
          <CardDescription>
            Send system-wide announcements and manage platform notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Announcement Title</label>
              <Input
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
                placeholder="Enter announcement title"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Target Audience</label>
              <Select value={targetAudience} onValueChange={setTargetAudience}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="auditors">Auditors Only</SelectItem>
                  <SelectItem value="clients">Clients Only</SelectItem>
                  <SelectItem value="active">Active Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Message</label>
            <Textarea
              value={announcementMessage}
              onChange={(e) => setAnnouncementMessage(e.target.value)}
              placeholder="Enter your announcement message"
              rows={3}
            />
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="text-sm font-medium">Type</label>
              <Select value={announcementType} onValueChange={(value: 'info' | 'success' | 'warning' | 'error') => setAnnouncementType(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={sendSystemAnnouncement} className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send Announcement
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Announcements</CardTitle>
          <CardDescription>
            Pre-defined announcements for common scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {quickAnnouncements.map((announcement, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{announcement.title}</h4>
                    <Badge variant={announcement.type === 'warning' ? 'destructive' : 'default'}>
                      {announcement.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{announcement.message}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setAnnouncementTitle(announcement.title);
                    setAnnouncementMessage(announcement.message);
                    setAnnouncementType(announcement.type);
                  }}
                >
                  Use Template
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Notification Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-sm text-muted-foreground">Total Sent Today</div>
            </div>
            <div>
              <div className="text-2xl font-bold">89%</div>
              <div className="text-sm text-muted-foreground">Read Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold">23</div>
              <div className="text-sm text-muted-foreground">Active Campaigns</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
