
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth';
import { useRealtimeMessages } from '@/hooks/useRealtimeMessages';
import { Send, Paperclip, MoreVertical } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface RealtimeMessagingInterfaceProps {
  conversationId: string;
  receiverId: string;
  receiverName?: string;
  className?: string;
}

export function RealtimeMessagingInterface({ 
  conversationId, 
  receiverId, 
  receiverName,
  className 
}: RealtimeMessagingInterfaceProps) {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { 
    messages, 
    loading, 
    isConnected, 
    typingUsers, 
    sendMessage, 
    markAsRead, 
    sendTypingIndicator 
  } = useRealtimeMessages({ conversationId, receiverId });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Mark unread messages as read
    const unreadMessages = messages
      .filter(msg => msg.receiver_id === user?.id && !msg.read_at)
      .map(msg => msg.id);
    
    if (unreadMessages.length > 0) {
      markAsRead(unreadMessages);
    }
  }, [messages, user?.id, markAsRead]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    await sendMessage(newMessage, 'text');
    setNewMessage('');
    setIsTyping(false);
    sendTypingIndicator(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTyping = (value: string) => {
    setNewMessage(value);
    
    if (value.trim() && !isTyping) {
      setIsTyping(true);
      sendTypingIndicator(true);
    } else if (!value.trim() && isTyping) {
      setIsTyping(false);
      sendTypingIndicator(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <Card className={cn("h-full", className)}>
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Loading conversation...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader className="border-b py-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback className="text-sm">
                {getInitials(receiverName || 'U')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{receiverName || 'Unknown User'}</h3>
              <p className="text-xs text-muted-foreground">
                {isConnected ? 'Online' : 'Connecting...'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-0 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => {
              const isOwnMessage = message.sender_id === user?.id;
              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    isOwnMessage ? "justify-end" : "justify-start"
                  )}
                >
                  {!isOwnMessage && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-sm">
                        {getInitials(receiverName || 'U')}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[70%] rounded-lg px-3 py-2",
                      isOwnMessage
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={cn(
                      "text-xs mt-1",
                      isOwnMessage 
                        ? "text-primary-foreground/70" 
                        : "text-muted-foreground"
                    )}>
                      {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                    </p>
                  </div>
                  
                  {isOwnMessage && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-sm">
                        {getInitials('You')}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })
          )}
          
          {/* Typing Indicator */}
          {typingUsers.length > 0 && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="text-sm">
                  {getInitials(receiverName || 'U')}
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg px-3 py-2">
                <p className="text-sm text-muted-foreground">
                  {receiverName} is typing...
                </p>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => handleTyping(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1"
              disabled={!isConnected}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!newMessage.trim() || !isConnected}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
