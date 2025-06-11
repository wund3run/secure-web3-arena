
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Paperclip, Smile, Phone, Video, MoreVertical, Circle } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'support' | 'auditor';
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'system';
  senderName?: string;
  senderAvatar?: string;
  isRead?: boolean;
}

interface ChatSession {
  id: string;
  title: string;
  status: 'active' | 'waiting' | 'resolved';
  participantType: 'support' | 'auditor';
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  unreadCount: number;
  isOnline: boolean;
}

const mockChatSessions: ChatSession[] = [
  {
    id: '1',
    title: 'Audit Support - DeFi Protocol',
    status: 'active',
    participantType: 'auditor',
    participantName: 'Dr. Alexandra Petrov',
    participantAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b332e234?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'I\'ve completed the initial review. Found 2 potential issues.',
    unreadCount: 1,
    isOnline: true
  },
  {
    id: '2',
    title: 'Technical Support',
    status: 'waiting',
    participantType: 'support',
    participantName: 'Sarah Wilson',
    participantAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Let me check with our technical team.',
    unreadCount: 0,
    isOnline: false
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'auditor',
    senderName: 'Dr. Alexandra Petrov',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b332e234?w=100&h=100&fit=crop&crop=face',
    content: 'Hello! I\'ve started the audit of your DeFi protocol. I\'ll begin with the static analysis phase.',
    timestamp: new Date(Date.now() - 3600000),
    type: 'text',
    isRead: true
  },
  {
    id: '2',
    sender: 'user',
    content: 'Great! Please pay special attention to the yield calculation logic. We\'re particularly concerned about potential rounding errors.',
    timestamp: new Date(Date.now() - 3500000),
    type: 'text',
    isRead: true
  },
  {
    id: '3',
    sender: 'auditor',
    senderName: 'Dr. Alexandra Petrov',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b332e234?w=100&h=100&fit=crop&crop=face',
    content: 'Understood. I\'ve completed the initial review and found 2 potential issues in the reward distribution function. I\'ll send a detailed report shortly.',
    timestamp: new Date(Date.now() - 300000),
    type: 'text',
    isRead: false
  }
];

export function RealtimeChatSupport() {
  const [selectedChat, setSelectedChat] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
      isRead: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const selectedChatData = mockChatSessions.find(chat => chat.id === selectedChat);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* Chat Sessions Sidebar */}
      <Card className="lg:col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Messages</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {mockChatSessions.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-3 cursor-pointer hover:bg-muted/50 border-l-2 transition-colors ${
                  selectedChat === chat.id ? 'border-primary bg-primary/5' : 'border-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={chat.participantAvatar} />
                      <AvatarFallback>{chat.participantName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {chat.isOnline && (
                      <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-green-500 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{chat.participantName}</p>
                      {chat.unreadCount > 0 && (
                        <Badge variant="default" className="h-5 w-5 rounded-full text-xs p-0 flex items-center justify-center">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{chat.title}</p>
                    <p className="text-xs text-muted-foreground truncate mt-1">{chat.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Window */}
      <Card className="lg:col-span-3 flex flex-col">
        {/* Chat Header */}
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedChatData?.participantAvatar} />
                  <AvatarFallback>{selectedChatData?.participantName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                {selectedChatData?.isOnline && (
                  <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-green-500 text-green-500" />
                )}
              </div>
              <div>
                <CardTitle className="text-lg">{selectedChatData?.participantName}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedChatData?.isOnline ? 'Online' : 'Last seen 2h ago'} • {selectedChatData?.participantType}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Video className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  {message.sender !== 'user' && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={message.senderAvatar} />
                      <AvatarFallback>{message.senderName?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`rounded-lg px-3 py-2 ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button size="sm" variant="outline">
              <Smile className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
