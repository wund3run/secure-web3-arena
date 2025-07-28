
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, FileText, Bell } from 'lucide-react';
import { RealtimeMessagingInterface } from '@/components/messaging/RealtimeMessagingInterface';
import { FileSharing } from './FileSharing';
import { NotificationCenter } from './NotificationCenter';

interface IntegratedCommunicationPlatformProps {
  auditId: string;
  participants: Array<{
    id: string;
    name: string;
    role: 'client' | 'auditor';
    avatar?: string;
  }>;
  onUnreadCountChange: (count: number) => void;
}

export function IntegratedCommunicationPlatform({ 
  auditId, 
  participants, 
  onUnreadCountChange 
}: IntegratedCommunicationPlatformProps) {
  const [activeChannel, setActiveChannel] = useState('chat');
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  // Get the other participant (assumes 1:1 conversation for now)
  const otherParticipant = participants.find(p => p.role !== 'client') || participants[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Communication Area */}
      <div className="lg:col-span-2">
        <Tabs value={activeChannel} onValueChange={setActiveChannel}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Files
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
              {unreadNotifications > 0 && (
                <Badge variant="error" className="ml-1 h-4 w-4 p-0 text-xs">
                  {unreadNotifications}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-4">
            <RealtimeMessagingInterface
              conversationId={auditId}
              receiverId={otherParticipant?.id || ''}
              receiverName={otherParticipant?.name}
              className="h-[600px]"
            />
          </TabsContent>

          <TabsContent value="files" className="mt-4">
            <FileSharing auditId={auditId} participants={participants} />
          </TabsContent>

          <TabsContent value="notifications" className="mt-4">
            <NotificationCenter 
              auditId={auditId}
              onUnreadCountChange={setUnreadNotifications}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Sidebar with Quick Info */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Project Participants</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {participant.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">{participant.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {participant.role}
                  </p>
                </div>
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Share files securely</p>
              <p>• Get real-time notifications</p>
              <p>• Access message history</p>
              <p>• Track communication context</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
