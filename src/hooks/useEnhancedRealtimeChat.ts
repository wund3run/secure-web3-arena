import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useRealtimeMessaging } from './useRealtimeMessaging';

export interface ChatParticipant {
  id: string;
  name: string;
  avatar?: string;
  role: 'client' | 'auditor' | 'arbitrator';
  lastSeen: Date;
  isOnline: boolean;
  isTyping: boolean;
}

export interface EnhancedMessage {
  id: string;
  senderId: string;
  content: string;
  type: 'text' | 'file' | 'milestone_update' | 'payment_notification' | 'system';
  timestamp: Date;
  readBy: string[];
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
  metadata?: {
    milestoneId?: string;
    paymentAmount?: number;
    contractId?: string;
  };
}

export const useEnhancedRealtimeChat = (conversationId: string, userId: string) => {
  const [participants, setParticipants] = useState<ChatParticipant[]>([]);
  const [messages, setMessages] = useState<EnhancedMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  const baseMessaging = useRealtimeMessaging(userId, conversationId);

  if (!crypto.randomUUID) {
    (crypto as any).randomUUID = function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c: string) =>
        (Math.random() * 16 | 0).toString(16)
      );
    };
  }

  useEffect(() => {
    if (!conversationId || !userId) return;

    const channel = supabase.channel(`chat_${conversationId}`, {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    // Handle presence events
    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const onlineParticipants = Object.keys(state).map(key => ({
          id: key,
          ...state[key][0],
          isOnline: true,
        }));
        
        setParticipants(prev => 
          prev.map(p => ({
            ...p,
            isOnline: onlineParticipants.some(op => op.id === p.id),
          }))
        );
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key, leftPresences);
        setParticipants(prev => 
          prev.map(p => p.id === key ? { ...p, isOnline: false } : p)
        );
      })
      // Handle real-time messages
      .on('broadcast', { event: 'message' }, ({ payload }) => {
        const newMessage: EnhancedMessage = {
          id: payload.id,
          senderId: payload.sender_id,
          content: payload.content,
          type: payload.type,
          timestamp: new Date(payload.timestamp),
          readBy: payload.read_by || [],
          attachments: payload.attachments,
          metadata: payload.metadata,
        };
        
        setMessages(prev => [...prev, newMessage]);
      })
      // Handle typing indicators
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        if (payload.user_id !== userId) {
          setTypingUsers(prev => 
            payload.is_typing 
              ? [...prev.filter(id => id !== payload.user_id), payload.user_id]
              : prev.filter(id => id !== payload.user_id)
          );
          
          if (payload.is_typing) {
            setTimeout(() => {
              setTypingUsers(prev => prev.filter(id => id !== payload.user_id));
            }, 3000);
          }
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          
          // Track user presence
          await channel.track({
            user_id: userId,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      setIsConnected(false);
      supabase.removeChannel(channel);
    };
  }, [conversationId, userId]);

  const sendEnhancedMessage = useCallback(async (
    content: string,
    type: EnhancedMessage['type'] = 'text',
    attachments?: EnhancedMessage['attachments'],
    metadata?: EnhancedMessage['metadata']
  ) => {
    if (!conversationId || !userId) return;

    const messageId = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    const message = {
      id: messageId,
      sender_id: userId,
      content,
      type,
      timestamp,
      read_by: [userId],
      attachments,
      metadata,
    };

    // Broadcast to real-time channel
    const channel = supabase.channel(`chat_${conversationId}`);
    await channel.send({
      type: 'broadcast',
      event: 'message',
      payload: message,
    });

    // Store message in audit_log for now (since chat_messages table doesn't exist)
    const { error } = await supabase
      .from('audit_log')
      .insert({
        audit_request_id: conversationId,
        action: `MESSAGE: ${content}`,
      });

    if (error) {
      console.error('Failed to store message:', error);
      toast.error('Failed to send message');
    }
  }, [conversationId, userId]);

  const sendTypingIndicator = useCallback(async (isTyping: boolean) => {
    if (!conversationId || !userId) return;

    const channel = supabase.channel(`chat_${conversationId}`);
    await channel.send({
      type: 'broadcast',
      event: 'typing',
      payload: {
        user_id: userId,
        is_typing: isTyping,
      },
    });
  }, [conversationId, userId]);

  const markMessagesAsRead = useCallback(async (messageIds: string[]) => {
    if (!messageIds.length) return;

    // Since we don't have a chat_messages table, we'll just update local state
    setMessages(prev => 
      prev.map(msg => 
        messageIds.includes(msg.id)
          ? { ...msg, readBy: [...msg.readBy, userId] }
          : msg
      )
    );
  }, [userId]);

  const uploadFile = useCallback(async (file: File) => {
    // Since we don't have storage buckets configured, we'll simulate file upload
    console.log('File upload simulated:', file.name);
    
    return {
      id: crypto.randomUUID(),
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
      size: file.size,
    };
  }, [conversationId]);

  return {
    participants,
    messages,
    isConnected,
    typingUsers,
    sendEnhancedMessage,
    sendTypingIndicator,
    markMessagesAsRead,
    uploadFile,
    // Expose base messaging functions for backward compatibility
    sendMessage: baseMessaging.sendMessage,
    markAsRead: baseMessaging.markAsRead,
    // setTyping removed: not provided by useRealtimeMessaging
    unreadCount: baseMessaging.unreadCount
  };
};
