
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  conversation_id: string;
  created_at: string;
  read_at?: string;
  message_type: 'text' | 'file' | 'image';
  file_attachments?: any[];
}

interface UseRealtimeMessagesProps {
  conversationId: string;
  receiverId: string;
}

export function useRealtimeMessages({ conversationId, receiverId }: UseRealtimeMessagesProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  // Fetch initial messages
  const fetchMessages = useCallback(async () => {
    if (!conversationId) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      // Convert the data to match our Message interface
      const convertedMessages: Message[] = (data || []).map(msg => ({
        id: msg.id,
        content: msg.content,
        sender_id: msg.sender_id,
        receiver_id: msg.receiver_id,
        conversation_id: msg.conversation_id,
        created_at: msg.created_at,
        read_at: msg.read_at || undefined,
        message_type: (msg.message_type as 'text' | 'file' | 'image') || 'text',
        file_attachments: msg.file_attachments ? JSON.parse(JSON.stringify(msg.file_attachments)) : undefined,
      }));
      
      setMessages(convertedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  // Send message
  const sendMessage = useCallback(async (content: string, type: 'text' | 'file' = 'text') => {
    if (!user || !conversationId) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          content,
          sender_id: user.id,
          receiver_id: receiverId,
          conversation_id: conversationId,
          message_type: type,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  }, [user, conversationId, receiverId]);

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
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  }, [user]);

  // Send typing indicator
  const sendTypingIndicator = useCallback(async (isTyping: boolean) => {
    if (!user || !conversationId) return;

    const channel = supabase.channel(`typing-${conversationId}`);
    
    if (isTyping) {
      await channel.track({
        user_id: user.id,
        typing: true,
        timestamp: Date.now()
      });
    } else {
      await channel.untrack();
    }
  }, [user, conversationId]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!conversationId || !user) return;

    fetchMessages();

    // Subscribe to new messages
    const messageChannel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMessage = payload.new as any;
          const convertedMessage: Message = {
            id: newMessage.id,
            content: newMessage.content,
            sender_id: newMessage.sender_id,
            receiver_id: newMessage.receiver_id,
            conversation_id: newMessage.conversation_id,
            created_at: newMessage.created_at,
            read_at: newMessage.read_at || undefined,
            message_type: newMessage.message_type || 'text',
            file_attachments: newMessage.file_attachments || undefined,
          };
          setMessages(prev => [...prev, convertedMessage]);
          setIsConnected(true);
        }
      )
      .subscribe();

    // Subscribe to typing indicators
    const typingChannel = supabase
      .channel(`typing-${conversationId}`)
      .on('presence', { event: 'sync' }, () => {
        const state = typingChannel.presenceState();
        const typingUserIds = Object.keys(state)
          .filter(key => key !== user.id)
          .filter(key => state[key]?.[0]?.typing);
        setTypingUsers(typingUserIds);
      })
      .subscribe();

    setIsConnected(true);

    return () => {
      supabase.removeChannel(messageChannel);
      supabase.removeChannel(typingChannel);
    };
  }, [conversationId, user, fetchMessages]);

  return {
    messages,
    loading,
    isConnected,
    typingUsers,
    sendMessage,
    markAsRead,
    sendTypingIndicator,
  };
}
