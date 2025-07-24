import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Users, FileText, Bell, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  sender_name: string;
  created_at: string;
  message_type: 'text' | 'file' | 'milestone';
}

interface Participant {
  id: string;
  name: string;
  avatar_url?: string;
  role: 'client' | 'auditor' | 'admin';
  status: 'online' | 'offline' | 'away';
}

interface RealtimeCollaborationProps {
  projectId: string;
  currentUserId: string;
}

export const RealtimeCollaboration: React.FC<RealtimeCollaborationProps> = ({
  projectId,
  currentUserId
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Set up real-time subscription for messages
    const messageChannel = supabase
      .channel(`project-${projectId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `conversation_id=eq.${projectId}`
      }, (payload) => {
        const newMessage = payload.new as {
          id: string;
          content: string;
          sender_id: string;
          created_at: string;
          message_type?: string;
        };
        setMessages(prev => [...prev, {
          id: newMessage.id,
          content: newMessage.content,
          sender_id: newMessage.sender_id,
          sender_name: 'User', // Fallback since sender_name doesn't exist in schema
          created_at: newMessage.created_at,
          message_type: (newMessage.message_type === 'file' || newMessage.message_type === 'milestone') 
            ? newMessage.message_type as 'file' | 'milestone'
            : 'text'
        }]);
      })
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    // Set up presence tracking
    const presenceChannel = supabase
      .channel(`presence-${projectId}`)
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState();
        // Transform presence state to participants
        const activeParticipants: Participant[] = Object.values(state)
          .flat()
          .map((presence: unknown) => ({
            id: presence.id || currentUserId,
            name: presence.name || 'Current User',
            role: presence.role || 'client',
            status: presence.status || 'online',
            avatar_url: presence.avatar_url
          }));
        setParticipants(activeParticipants);
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('User joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('User left:', leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await presenceChannel.track({
            id: currentUserId,
            name: 'Current User',
            role: 'client',
            status: 'online',
            timestamp: new Date().toISOString()
          });
        }
      });

    // Load initial messages
    loadMessages();

    return () => {
      supabase.removeChannel(messageChannel);
      supabase.removeChannel(presenceChannel);
    };
  }, [projectId, currentUserId]);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', projectId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setMessages(data?.map(msg => ({
        id: msg.id,
        content: msg.content,
        sender_id: msg.sender_id,
        sender_name: 'User', // Fallback since sender_name doesn't exist in schema
        created_at: msg.created_at,
        message_type: (msg.message_type === 'file' || msg.message_type === 'milestone') 
          ? msg.message_type as 'file' | 'milestone'
          : 'text'
      })) || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: projectId,
          sender_id: currentUserId,
          receiver_id: projectId,
          content: newMessage,
          message_type: 'text'
        });

      if (error) throw error;

      setNewMessage('');
      toast.success('Message sent');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chat Messages */}
      <div className="lg:col-span-2">
        <Card className="h-96">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Project Chat
              </CardTitle>
              <Badge variant={isConnected ? "default" : "secondary"}>
                {isConnected ? "Connected" : "Disconnected"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col h-80">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender_id === currentUserId ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender_id === currentUserId
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    {message.sender_id !== currentUserId && (
                      <div className="text-xs font-medium mb-1">{message.sender_name}</div>
                    )}
                    <div className="text-sm">{message.content}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {new Date(message.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Participants & Features */}
      <div className="space-y-4">
        {/* Active Participants */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Active Participants ({participants.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={participant.avatar_url} />
                    <AvatarFallback>
                      {participant.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(participant.status)}`} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{participant.name}</div>
                  <Badge variant="outline" className="text-xs">
                    {participant.role}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Share Files
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Set Milestone
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Invite Collaborator
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
