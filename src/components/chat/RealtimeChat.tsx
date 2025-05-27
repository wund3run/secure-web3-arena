
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth/AuthContext';
import { RealtimeChatProps, ChatMessage } from './types';
import { ChatHeader } from './components/ChatHeader';
import { MinimizedChat } from './components/MinimizedChat';
import { ChatMessages } from './components/ChatMessages';
import { MessageInput } from './components/MessageInput';
import { useChatMessages } from './hooks/useChatMessages';

export function RealtimeChat({ 
  chatId, 
  participants, 
  onClose, 
  minimized = false, 
  onToggleMinimize 
}: RealtimeChatProps) {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, isConnected, isTyping, addMessage, simulateResponse } = useChatMessages(chatId, user?.id);

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

    addMessage(message);
    setNewMessage('');
    simulateResponse();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (minimized) {
    return (
      <MinimizedChat 
        participants={participants}
        messages={messages}
        isConnected={isConnected}
        onToggleMinimize={onToggleMinimize}
      />
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[500px] z-50 flex flex-col">
      <CardHeader className="pb-3 border-b">
        <ChatHeader 
          participants={participants}
          isConnected={isConnected}
          onToggleMinimize={onToggleMinimize}
        />
      </CardHeader>

      <CardContent className="flex-1 p-0 flex flex-col">
        <ChatMessages 
          messages={messages}
          currentUserId={user?.id}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
        />

        <MessageInput 
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSendMessage={sendMessage}
          onKeyPress={handleKeyPress}
          isConnected={isConnected}
          inputRef={inputRef}
        />
      </CardContent>
    </Card>
  );
}
