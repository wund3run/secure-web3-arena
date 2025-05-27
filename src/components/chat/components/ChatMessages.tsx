
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { ChatMessage } from '../types';

interface ChatMessagesProps {
  messages: ChatMessage[];
  currentUserId?: string;
  isTyping: string[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function ChatMessages({ messages, currentUserId, isTyping, messagesEndRef }: ChatMessagesProps) {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-3">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender_id === currentUserId ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex items-start gap-2 max-w-[80%]">
              {message.sender_id !== currentUserId && (
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {message.sender_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <div
                  className={`rounded-lg px-3 py-2 text-sm ${
                    message.sender_id === currentUserId
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
  );
}
