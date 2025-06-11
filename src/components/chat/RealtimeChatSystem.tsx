
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video,
  MoreVertical,
  Clock,
  CheckCheck
} from 'lucide-react';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'system';
  status: 'sending' | 'sent' | 'delivered' | 'read';
  attachments?: Array<{
    name: string;
    size: string;
    type: string;
    url: string;
  }>;
}

interface ChatParticipant {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  status: 'online' | 'away' | 'offline';
  lastSeen?: string;
}

export const RealtimeChatSystem = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock data
  const currentUser = { id: 'user1', name: 'You' };
  const participants: ChatParticipant[] = [
    {
      id: 'auditor1',
      name: 'Alex Chen',
      avatar: '/api/placeholder/32/32',
      role: 'Senior Security Auditor',
      status: 'online'
    },
    {
      id: 'manager1',
      name: 'Sarah Johnson',
      avatar: '/api/placeholder/32/32',
      role: 'Audit Manager',
      status: 'away',
      lastSeen: '5 minutes ago'
    }
  ];

  const mockMessages: ChatMessage[] = [
    {
      id: '1',
      senderId: 'auditor1',
      senderName: 'Alex Chen',
      senderAvatar: '/api/placeholder/32/32',
      content: 'Hi! I\'ve started the initial review of your smart contract. I have a few questions about the access control implementation.',
      timestamp: '2025-01-15T10:30:00Z',
      type: 'text',
      status: 'read'
    },
    {
      id: '2',
      senderId: 'user1',
      senderName: 'You',
      content: 'Great! I\'m available to discuss any questions you have. What specific areas would you like to focus on?',
      timestamp: '2025-01-15T10:32:00Z',
      type: 'text',
      status: 'read'
    },
    {
      id: '3',
      senderId: 'auditor1',
      senderName: 'Alex Chen',
      senderAvatar: '/api/placeholder/32/32',
      content: 'I\'ve found a potential reentrancy vulnerability in the withdraw function. Let me share the specific code section.',
      timestamp: '2025-01-15T10:35:00Z',
      type: 'text',
      status: 'read',
      attachments: [
        {
          name: 'vulnerable_code.sol',
          size: '2.3 KB',
          type: 'solidity',
          url: '#'
        }
      ]
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      type: 'text',
      status: 'sending'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCheck className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500 fill-current" />;
      default:
        return <Clock className="h-3 w-3 text-gray-400" />;
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="h-[600px] flex flex-col">
      {/* Chat Header */}
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-lg">Project Discussion</CardTitle>
              <p className="text-sm text-muted-foreground">
                {participants.length} participants • DeFi Lending Protocol Audit
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Participants */}
        <div className="flex items-center gap-2 pt-2">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center gap-2">
              <div className="relative">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={participant.avatar} />
                  <AvatarFallback className="text-xs">{participant.name[0]}</AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-white ${
                  participant.status === 'online' ? 'bg-green-500' :
                  participant.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                }`} />
              </div>
              <span className="text-xs text-muted-foreground">{participant.name}</span>
            </div>
          ))}
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex gap-3 ${
                  message.senderId === currentUser.id ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.senderId !== currentUser.id && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.senderAvatar} />
                    <AvatarFallback className="text-xs">{message.senderName[0]}</AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-[70%] ${
                  message.senderId === currentUser.id ? 'text-right' : 'text-left'
                }`}>
                  {message.senderId !== currentUser.id && (
                    <p className="text-xs text-muted-foreground mb-1">{message.senderName}</p>
                  )}
                  
                  <div className={`rounded-lg p-3 ${
                    message.senderId === currentUser.id
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    
                    {message.attachments && (
                      <div className="mt-2 space-y-1">
                        {message.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-black/10 rounded">
                            <Paperclip className="h-3 w-3" />
                            <span className="text-xs">{attachment.name}</span>
                            <Badge variant="secondary" className="text-xs">{attachment.size}</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className={`flex items-center gap-1 mt-1 ${
                    message.senderId === currentUser.id ? 'justify-end' : 'justify-start'
                  }`}>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.senderId === currentUser.id && getStatusIcon(message.status)}
                  </div>
                </div>
              </div>
            ))}
            
            {typingUsers.length > 0 && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
                <span className="text-xs">
                  {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                </span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>

      {/* Message Input */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Smile className="h-4 w-4" />
          </Button>
          <Input
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
