
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ChatMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  conversation_id?: string;
  content: string;
  message_type: string;
  file_attachments: any[];
  read_at: string | null;
  reply_to_id?: string;
  created_at: string;
  updated_at: string;
}

interface UseRealtimeMessagesProps {
  conversationId: string;
  receiverId: string;
}

export const useRealtimeMessages = ({ conversationId, receiverId }: UseRealtimeMessagesProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  const fetchMessages = useCallback(async () => {
    if (!user || !receiverId) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedMessages: ChatMessage[] = (data || []).map(msg => ({
        id: msg.id,
        sender_id: msg.sender_id,
        receiver_id: msg.receiver_id,
        conversation_id: msg.conversation_id,
        content: msg.content,
        message_type: msg.message_type,
        file_attachments: Array.isArray(msg.file_attachments) ? msg.file_attachments : [],
        read_at: msg.read_at,
        reply_to_id: msg.reply_to_id,
        created_at: msg.created_at,
        updated_at: msg.updated_at,
      }));
      
      setMessages(transformedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [user, receiverId]);

  const sendMessage = useCallback(async (
    content: string,
    messageType: string = 'text',
    attachments: any[] = [],
    replyToId?: string
  ) => {
    if (!user || !receiverId || !content.trim()) return;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          sender_id: user.id,
          receiver_id: receiverId,
          content: content.trim(),
          message_type: messageType,
          file_attachments: attachments,
          reply_to_id: replyToId,
          conversation_id: conversationId
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  }, [user, receiverId, conversationId]);

  const markAsRead = useCallback(async (messageIds: string[]) => {
    if (!user || messageIds.length === 0) return;

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

  const sendTypingIndicator = useCallback((isTyping: boolean) => {
    if (!user || !receiverId) return;

    const channel = supabase.channel(`typing_${conversationId}`);
    
    if (isTyping) {
      channel.track({
        user_id: user.id,
        typing: true,
        timestamp: Date.now()
      });
    } else {
      channel.untrack();
    }
  }, [user, receiverId, conversationId]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user || !receiverId) return;

    fetchMessages();

    // Subscribe to new messages
    const messagesChannel = supabase
      .channel('messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `or(and(sender_id.eq.${user.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${user.id}))`
      }, (payload) => {
        const newMessage: ChatMessage = {
          id: payload.new.id,
          sender_id: payload.new.sender_id,
          receiver_id: payload.new.receiver_id,
          conversation_id: payload.new.conversation_id,
          content: payload.new.content,
          message_type: payload.new.message_type,
          file_attachments: Array.isArray(payload.new.file_attachments) ? payload.new.file_attachments : [],
          read_at: payload.new.read_at,
          reply_to_id: payload.new.reply_to_id,
          created_at: payload.new.created_at,
          updated_at: payload.new.updated_at,
        };
        setMessages(prev => [...prev, newMessage]);
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'chat_messages',
        filter: `or(and(sender_id.eq.${user.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${user.id}))`
      }, (payload) => {
        const updatedMessage: ChatMessage = {
          id: payload.new.id,
          sender_id: payload.new.sender_id,
          receiver_id: payload.new.receiver_id,
          conversation_id: payload.new.conversation_id,
          content: payload.new.content,
          message_type: payload.new.message_type,
          file_attachments: Array.isArray(payload.new.file_attachments) ? payload.new.file_attachments : [],
          read_at: payload.new.read_at,
          reply_to_id: payload.new.reply_to_id,
          created_at: payload.new.created_at,
          updated_at: payload.new.updated_at,
        };
        setMessages(prev => prev.map(msg => 
          msg.id === updatedMessage.id ? updatedMessage : msg
        ));
      })
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    // Subscribe to typing indicators
    const typingChannel = supabase
      .channel(`typing_${conversationId}`)
      .on('presence', { event: 'sync' }, () => {
        const state = typingChannel.presenceState();
        const typingUserIds = Object.keys(state).filter(id => id !== user.id);
        setTypingUsers(typingUserIds);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(messagesChannel);
      supabase.removeChannel(typingChannel);
    };
  }, [user, receiverId, fetchMessages, conversationId]);

  return {
    messages,
    loading,
    isConnected,
    typingUsers,
    sendMessage,
    markAsRead,
    sendTypingIndicator,
  };
};
