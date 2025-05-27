
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Phone, Video, MoreHorizontal, Minimize2, Maximize2 } from 'lucide-react';
import { useAuth } from '@/contexts/auth/AuthContext';
import { formatDistanceToNow } from 'date-fns';

interface ChatMessage {
  id: string;
  content: string;
  sender_id: string;
  sender_name: string;
  timestamp: Date;
  type: 'text' | 'file' | 'system';
  metadata?: Record<string, any>;
}

interface ChatParticipant {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'busy';
  role: 'client' | 'auditor' | 'support';
}

interface RealtimeChatProps {
  chatId: string;
  participants: ChatParticipant[];
  onClose?: () => void;
  minimized?: boolean;
  onToggleMinimize?: () => void;
}

export function RealtimeChat({ 
  chatId, 
  participants, 
  onClose, 
  minimized = false, 
  onToggleMinimize 
}: RealtimeChatProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock messages for demonstration
  useEffect(() => {
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        content: 'Hello! I\'ve reviewed your smart contract and have some initial observations.',
        sender_id: 'auditor-1',
        sender_name: 'Sarah Chen',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        type: 'text'
      },
      {
        id: '2',
        content: 'Great! I\'m eager to hear your feedback. What are the main areas of concern?',
        sender_id: user?.id || 'client-1',
        sender_name: 'You',
        timestamp: new Date(Date.now() - 240000), // 4 minutes ago
        type: 'text'
      },
      {
        id: '3',
        content: 'The main concerns are around the access control patterns and potential reentrancy vulnerabilities in the withdrawal function.',
        sender_id: 'auditor-1',
        sender_name: 'Sarah Chen',
        timestamp: new Date(Date.now() - 180000), // 3 minutes ago
        type: 'text'
      }
    ];
    
    setMessages(mockMessages);
    setIsConnected(true);
  }, [chatId, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      sender_id: user.id,
      sender_name: 'You',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate real-time response (in production, this would be handled by WebSocket)
    setTimeout(() => {
      const responses = [
        "Thanks for that clarification!",
        "I'll look into that right away.",
        "Let me check the documentation and get back to you.",
        "That's a great point. I'll update the report accordingly."
      ];
      
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender_id: 'auditor-1',
        sender_name: 'Sarah Chen',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, response]);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getParticipantByRole = (role: 'client' | 'auditor') => {
    return participants.find(p => p.role === role);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  if (minimized) {
    return (
      <Card className="fixed bottom-4 right-4 w-80 z-50">
        <CardHeader className="pb-2 cursor-pointer" onClick={onToggleMinimize}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              Chat with {getParticipantByRole('auditor')?.name || 'Auditor'}
            </CardTitle>
            <div className="flex items-center gap-1">
              <Badge variant="secondary" className="text-xs">
                {messages.length} messages
              </Badge>
              <Maximize2 className="h-3 w-3" />
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[500px] z-50 flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            Chat with {getParticipantByRole('auditor')?.name || 'Auditor'}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Phone className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Video className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onToggleMinimize}>
              <Minimize2 className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {/* Participants Status */}
        <div className="flex items-center gap-2 mt-2">
          {participants.map(participant => (
            <div key={participant.id} className="flex items-center gap-1">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {participant.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(participant.status)}`} />
              <span className="text-xs text-muted-foreground">{participant.name}</span>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 flex flex-col">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start gap-2 max-w-[80%]">
                  {message.sender_id !== user?.id && (
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {message.sender_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div
                      className={`rounded-lg px-3 py-2 text-sm ${
                        message.sender_id === user?.id
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-muted'
                      }`}
                    >
                      {message.content}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
                <span>{isTyping.join(', ')} typing...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t p-3">
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1"
              disabled={!isConnected}
            />
            <Button 
              size="sm" 
              onClick={sendMessage}
              disabled={!newMessage.trim() || !isConnected}
            >
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
