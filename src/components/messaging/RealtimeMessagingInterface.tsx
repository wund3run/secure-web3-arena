
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Send, 
  Paperclip, 
  MoreHorizontal, 
  Reply,
  Download,
  File,
  Image as ImageIcon
} from 'lucide-react';
import { useRealtimeMessages, ChatMessage } from '@/hooks/useRealtimeMessages';
import { useAuth } from '@/contexts/auth';
import { formatDistanceToNow } from 'date-fns';

interface RealtimeMessagingInterfaceProps {
  conversationId: string;
  receiverId: string;
  receiverName?: string;
  className?: string;
}

export const RealtimeMessagingInterface: React.FC<RealtimeMessagingInterfaceProps> = ({
  conversationId,
  receiverId,
  receiverName = 'User',
  className = '',
}) => {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [replyToMessage, setReplyToMessage] = useState<ChatMessage | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    messages,
    loading,
    isConnected,
    typingUsers,
    sendMessage,
    markAsRead,
    sendTypingIndicator,
  } = useRealtimeMessages({ conversationId, receiverId });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mark unread messages as read when component mounts or messages change
  useEffect(() => {
    if (user && messages.length > 0) {
      const unreadMessages = messages
        .filter(msg => msg.receiver_id === user.id && !msg.read_at)
        .map(msg => msg.id);
      
      if (unreadMessages.length > 0) {
        markAsRead(unreadMessages);
      }
    }
  }, [messages, user, markAsRead]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await sendMessage(
        newMessage,
        'text',
        [],
        replyToMessage?.id
      );
      setNewMessage('');
      setReplyToMessage(null);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTyping = (value: string) => {
    setNewMessage(value);
    
    if (!isTyping && value.length > 0) {
      setIsTyping(true);
      sendTypingIndicator(true);
    } else if (isTyping && value.length === 0) {
      setIsTyping(false);
      sendTypingIndicator(false);
    }
  };

  // Stop typing indicator after 2 seconds of inactivity
  useEffect(() => {
    if (isTyping) {
      const timeout = setTimeout(() => {
        setIsTyping(false);
        sendTypingIndicator(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [newMessage, isTyping, sendTypingIndicator]);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const renderMessage = (message: ChatMessage) => {
    const isOwnMessage = message.sender_id === user?.id;
    const senderName = isOwnMessage ? 'You' : receiverName;

    return (
      <div
        key={message.id}
        className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <Avatar className="h-8 w-8">
          <AvatarFallback>{senderName[0]}</AvatarFallback>
        </Avatar>
        
        <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} max-w-[70%]`}>
          {message.reply_to_id && (
            <div className="text-xs text-muted-foreground mb-1 px-2 py-1 bg-muted/50 rounded">
              Replying to message
            </div>
          )}
          
          <div
            className={`px-4 py-2 rounded-lg ${
              isOwnMessage
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'
            }`}
          >
            <p className="text-sm">{message.content}</p>
            
            {message.file_attachments.length > 0 && (
              <div className="mt-2 space-y-1">
                {message.file_attachments.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-background/10 rounded">
                    {file.type.startsWith('image/') ? (
                      <ImageIcon className="h-4 w-4" />
                    ) : (
                      <File className="h-4 w-4" />
                    )}
                    <span className="text-xs truncate">{file.name}</span>
                    <Button variant="ghost" size="sm">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
            </span>
            {!isOwnMessage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyToMessage(message)}
                className="h-6 w-6 p-0"
              >
                <Reply className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className={`flex flex-col h-[600px] ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>{receiverName}</span>
            <Badge variant={isConnected ? 'default' : 'destructive'} className="text-xs">
              {isConnected ? 'Online' : 'Offline'}
            </Badge>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4 py-2">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map(renderMessage)}
              
              {typingUsers.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse [animation-delay:0.4s]"></div>
                  </div>
                  <span>{receiverName} is typing...</span>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>

        <Separator />

        <div className="p-4">
          {replyToMessage && (
            <div className="mb-2 p-2 bg-muted/50 rounded-lg flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">Replying to: </span>
                <span className="truncate">{replyToMessage.content}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyToMessage(null)}
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Input
              value={newMessage}
              onChange={(e) => handleTyping(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
            />
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                // Handle file upload logic here
                console.log('Files selected:', e.target.files);
              }}
            />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFileUpload}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            
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
};
