
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  message_type: 'text' | 'file' | 'system';
  created_at: string;
  read_at?: string;
  audit_request_id?: string;
}

interface RealtimeMessagingState {
  messages: Message[];
  isConnected: boolean;
  typingUsers: string[];
  unreadCount: number;
}

export const useRealtimeMessaging = (userId?: string, conversationId?: string) => {
  const [state, setState] = useState<RealtimeMessagingState>({
    messages: [],
    isConnected: false,
    typingUsers: [],
    unreadCount: 0,
  });

  const sendMessage = useCallback(async (content: string, receiverId: string, type: 'text' | 'file' = 'text') => {
    if (!userId) return;

    try {
      const message = {
        sender_id: userId,
        receiver_id: receiverId,
        content,
        message_type: type,
        audit_request_id: conversationId,
      };

      // In a real implementation, this would insert into a messages table
      const mockMessage: Message = {
        id: crypto.randomUUID(),
        ...message,
        created_at: new Date().toISOString(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, mockMessage],
      }));

      toast.success('Message sent');
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    }
  }, [userId, conversationId]);

  const markAsRead = useCallback(async (messageIds: string[]) => {
    setState(prev => ({
      ...prev,
      messages: prev.messages.map(msg => 
        messageIds.includes(msg.id) 
          ? { ...msg, read_at: new Date().toISOString() }
          : msg
      ),
      unreadCount: Math.max(0, prev.unreadCount - messageIds.length),
    }));
  }, []);

  const setTyping = useCallback((isTyping: boolean, userIdTyping: string) => {
    setState(prev => ({
      ...prev,
      typingUsers: isTyping 
        ? [...prev.typingUsers.filter(id => id !== userIdTyping), userIdTyping]
        : prev.typingUsers.filter(id => id !== userIdTyping),
    }));
  }, []);

  useEffect(() => {
    if (!userId) return;

    // Simulate real-time connection
    setState(prev => ({ ...prev, isConnected: true }));

    // Mock initial messages
    const mockMessages: Message[] = [
      {
        id: '1',
        sender_id: 'other-user',
        receiver_id: userId,
        content: 'Hello! I\'ve started working on your audit request.',
        message_type: 'text',
        created_at: new Date(Date.now() - 300000).toISOString(),
      },
      {
        id: '2',
        sender_id: userId,
        receiver_id: 'other-user',
        content: 'Great! Please let me know if you need any additional information.',
        message_type: 'text',
        created_at: new Date(Date.now() - 240000).toISOString(),
        read_at: new Date(Date.now() - 240000).toISOString(),
      },
    ];

    setState(prev => ({ 
      ...prev, 
      messages: mockMessages,
      unreadCount: mockMessages.filter(m => m.receiver_id === userId && !m.read_at).length,
    }));

    return () => {
      setState(prev => ({ ...prev, isConnected: false }));
    };
  }, [userId]);

  return {
    ...state,
    sendMessage,
    markAsRead,
    setTyping,
  };
};
