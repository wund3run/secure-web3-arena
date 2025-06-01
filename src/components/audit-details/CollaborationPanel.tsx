
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, MessageCircle, Send, Video, Share } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
  type: 'text' | 'file' | 'system';
}

interface CollaborationPanelProps {
  auditId: string;
  participants: Array<{
    id: string;
    name: string;
    role: string;
    avatar?: string;
    status: 'online' | 'away' | 'offline';
  }>;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export const CollaborationPanel: React.FC<CollaborationPanelProps> = ({
  auditId,
  participants,
  messages,
  onSendMessage
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [activeUsers, setActiveUsers] = useState(participants.filter(p => p.status === 'online'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Participants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Active Participants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>{participant.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    participant.status === 'online' ? 'bg-green-500' :
                    participant.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{participant.name}</div>
                  <div className="text-xs text-muted-foreground">{participant.role}</div>
                </div>
                <Badge variant={participant.status === 'online' ? 'default' : 'outline'} className="text-xs">
                  {participant.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Collaboration Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Video className="h-4 w-4 mr-2" />
            Start Video Call
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Share className="h-4 w-4 mr-2" />
            Share Screen
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <MessageCircle className="h-4 w-4 mr-2" />
            Create Discussion Thread
          </Button>
        </CardContent>
      </Card>

      {/* Real-time Chat */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Team Chat
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Messages Container */}
          <div className="space-y-4 max-h-96 overflow-y-auto mb-4 p-2 border rounded">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={message.sender.avatar} />
                      <AvatarFallback className="text-xs">{message.sender.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{message.sender.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="ml-8 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSubmit} className="space-y-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              rows={3}
              className="resize-none"
            />
            <div className="flex justify-end">
              <Button type="submit" size="sm" disabled={!newMessage.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
