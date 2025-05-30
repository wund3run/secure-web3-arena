
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send, Paperclip, Download, Eye, EyeOff } from 'lucide-react';

interface AuditMessagesTabProps {
  auditData: any;
  onSendMessage: (message: string) => void;
}

export const AuditMessagesTab = ({ auditData, onSendMessage }: AuditMessagesTabProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [showAllMessages, setShowAllMessages] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const displayedMessages = showAllMessages ? auditData.messages : auditData.messages.slice(-5);

  const getMessageStyle = (role: string) => {
    switch (role) {
      case 'system': return 'bg-blue-50 border-blue-200';
      case 'auditor': return 'bg-green-50 border-green-200';
      case 'client': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Messages List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Conversation ({auditData.messages.length})
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowAllMessages(!showAllMessages)}
              className="flex items-center gap-2"
            >
              {showAllMessages ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showAllMessages ? 'Show Recent' : 'Show All'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {displayedMessages.map((message: any) => (
              <div key={message.id} className={`p-4 rounded-lg border ${getMessageStyle(message.sender.role)}`}>
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.sender.avatar} />
                    <AvatarFallback>
                      {message.sender.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{message.sender.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {message.sender.role}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.attachments.map((attachment: any, index: number) => (
                          <div key={index} className="flex items-center gap-2 text-xs bg-white p-2 rounded border">
                            <Paperclip className="h-3 w-3" />
                            <span>{attachment.name}</span>
                            <span className="text-muted-foreground">({attachment.size})</span>
                            <Button variant="ghost" size="sm" className="ml-auto p-1 h-auto">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {message.status === 'read' && (
                    <div className="text-xs text-muted-foreground">✓</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Message Input */}
      <Card>
        <CardHeader>
          <CardTitle>Send Message</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  handleSendMessage();
                }
              }}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach File
                </Button>
                <span className="text-xs text-muted-foreground">
                  Press Ctrl+Enter to send
                </span>
              </div>
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation Participants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditData.participants.map((participant: any) => (
              <div key={participant.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>
                      {participant.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{participant.name}</div>
                    <div className="text-sm text-muted-foreground">{participant.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    participant.status === 'online' ? 'bg-green-500' : 
                    participant.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`} />
                  <span className="text-xs text-muted-foreground capitalize">
                    {participant.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
