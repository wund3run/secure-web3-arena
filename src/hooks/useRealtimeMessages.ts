
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  message_type: 'text' | 'file' | 'milestone_update' | 'system';
  file_attachments: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
  read_at?: string;
  reply_to_id?: string;
  created_at: string;
  updated_at: string;
}

export interface MessageNotification {
  id: string;
  user_id: string;
  message_id: string;
  notification_type: 'message' | 'file_shared' | 'milestone_update' | 'audit_update';
  is_read: boolean;
  sent_at: string;
  read_at?: string;
  delivery_status: 'pending' | 'sent' | 'delivered' | 'failed';
  created_at: string;
}

interface UseRealtimeMessagesProps {
  conversationId: string;
  receiverId?: string;
}

export const useRealtimeMessages = ({ conversationId, receiverId }: UseRealtimeMessagesProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  // Fetch initial messages
  const fetchMessages = useCallback(async () => {
    if (!user || !conversationId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [user, conversationId]);

  // Send a new message
  const sendMessage = useCallback(async (
    content: string, 
    messageType: ChatMessage['message_type'] = 'text',
    fileAttachments: ChatMessage['file_attachments'] = [],
    replyToId?: string
  ) => {
    if (!user || !receiverId || !conversationId) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          receiver_id: receiverId,
          content,
          message_type: messageType,
          file_attachments: fileAttachments,
          reply_to_id: replyToId,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err: any) {
      toast.error('Failed to send message');
      throw err;
    }
  }, [user, receiverId, conversationId]);

  // Mark messages as read
  const markAsRead = useCallback(async (messageIds: string[]) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .update({ read_at: new Date().toISOString() })
        .in('id', messageIds)
        .eq('receiver_id', user.id);

      if (error) throw error;
    } catch (err: any) {
      console.error('Failed to mark messages as read:', err);
    }
  }, [user]);

  // Send typing indicator
  const sendTypingIndicator = useCallback(async (isTyping: boolean) => {
    if (!user || !conversationId) return;

    const channel = supabase.channel(`conversation_${conversationId}`);
    await channel.send({
      type: 'broadcast',
      event: 'typing',
      payload: {
        user_id: user.id,
        is_typing: isTyping,
        timestamp: new Date().toISOString(),
      },
    });
  }, [user, conversationId]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user || !conversationId) return;

    const channel = supabase.channel(`conversation_${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          setMessages(prev => [...prev, newMessage]);
          
          // Auto-mark own messages as read
          if (newMessage.sender_id === user.id) {
            markAsRead([newMessage.id]);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const updatedMessage = payload.new as ChatMessage;
          setMessages(prev =>
            prev.map(msg => msg.id === updatedMessage.id ? updatedMessage : msg)
          );
        }
      )
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        if (payload.user_id !== user.id) {
          setTypingUsers(prev => 
            payload.is_typing 
              ? [...prev.filter(id => id !== payload.user_id), payload.user_id]
              : prev.filter(id => id !== payload.user_id)
          );
          
          // Clear typing indicator after 3 seconds
          if (payload.is_typing) {
            setTimeout(() => {
              setTypingUsers(prev => prev.filter(id => id !== payload.user_id));
            }, 3000);
          }
        }
      })
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    // Fetch initial messages
    fetchMessages();

    return () => {
      supabase.removeChannel(channel);
      setIsConnected(false);
    };
  }, [user, conversationId, fetchMessages, markAsRead]);

  return {
    messages,
    loading,
    error,
    isConnected,
    typingUsers,
    sendMessage,
    markAsRead,
    sendTypingIndicator,
    refetch: fetchMessages,
  };
};
