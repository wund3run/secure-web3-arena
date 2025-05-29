
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Paperclip } from 'lucide-react';
import { RealTimeMessagingService, Message } from '@/services/real-time-messaging-service';
import { useAuth } from '@/contexts/auth';
import { formatDistanceToNow } from 'date-fns';

interface ConversationInterfaceProps {
  conversationId: string;
}

export function ConversationInterface({ conversationId }: ConversationInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    // Load initial messages
    const loadMessages = async () => {
      const initialMessages = await RealTimeMessagingService.getMessages(conversationId);
      setMessages(initialMessages);
    };

    loadMessages();

    // Subscribe to new messages
    const unsubscribe = RealTimeMessagingService.subscribeToMessages(
      conversationId,
      (message) => {
        setMessages(prev => [...prev, message]);
      }
    );

    // Mark messages as read
    RealTimeMessagingService.markMessagesAsRead(conversationId);

    return unsubscribe;
  }, [conversationId]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    const messageText = newMessage.trim();
    setNewMessage('');

    try {
      await RealTimeMessagingService.sendMessage(conversationId, messageText);
    } catch (error) {
      console.error('Failed to send message:', error);
      setNewMessage(messageText); // Restore message on error
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle>Audit Discussion</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => {
            const isOwn = message.sender_id === user?.id;
            const isSystem = message.message_type === 'system';
            
            if (isSystem) {
              return (
                <div key={message.id} className="text-center">
                  <div className="text-xs text-muted-foreground bg-muted rounded-full px-3 py-1 inline-block">
                    {message.content}
                  </div>
                </div>
              );
            }

            return (
              <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[70%] ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.sender?.avatar_url} />
                    <AvatarFallback>
                      {message.sender?.full_name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`rounded-lg p-3 ${
                    isOwn 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-muted'
                  }`}>
                    <div className="text-sm">{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      isOwn ? 'text-blue-100' : 'text-muted-foreground'
                    }`}>
                      {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Button type="button" variant="outline" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={isSending}
              className="flex-1"
            />
            <Button type="submit" disabled={!newMessage.trim() || isSending}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
