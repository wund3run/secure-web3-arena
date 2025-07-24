import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Tables } from '@/integrations/supabase/types';

type AuditMessage = Tables<'audit_messages'>;

interface RealtimeMessagingState {
  messages: AuditMessage[];
  isConnected: boolean;
  typingUsers: Array<{ user_id: string; timestamp: string }>;
  unreadCount: number;
  loading: boolean;
}

export const useRealtimeMessaging = (userId?: string, auditRequestId?: string) => {
  const [state, setState] = useState<RealtimeMessagingState>({
    messages: [],
    isConnected: false,
    typingUsers: [],
    unreadCount: 0,
    loading: false,
  });

  const fetchMessages = useCallback(async () => {
    if (!auditRequestId) return;

    setState(prev => ({ ...prev, loading: true }));

    try {
      const { data, error } = await supabase
        .from('audit_messages')
        .select('*')
        .eq('audit_request_id', auditRequestId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        toast.error('Failed to load messages');
        return;
      }

      const unreadCount = data?.filter(msg => 
        msg.sender_id !== userId && !msg.is_read
      ).length || 0;

      setState(prev => ({
        ...prev,
        messages: data || [],
        unreadCount,
        loading: false,
      }));
    } catch (error) {
      console.error('Error in fetchMessages:', error);
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [auditRequestId, userId]);

  const sendMessage = useCallback(async (
    content: string, 
    messageType: string = 'text',
    fileAttachments?: any
  ) => {
    if (!userId || !auditRequestId) return;

    try {
      const { data, error } = await supabase
        .from('audit_messages')
        .insert({
          sender_id: userId,
          audit_request_id: auditRequestId,
          content,
          message_type: messageType,
          file_attachments: fileAttachments,
          is_read: false,
        })
        .select()
        .single();

      if (error) {
        console.error('Error sending message:', error);
        toast.error('Failed to send message');
        return;
      }

      // The real-time subscription will handle adding the message to state
      toast.success('Message sent');
      return data;
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    }
  }, [userId, auditRequestId]);

  const markAsRead = useCallback(async (messageIds: string[]) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('audit_messages')
        .update({ is_read: true })
        .in('id', messageIds)
        .neq('sender_id', userId); // Don't mark own messages as read

      if (error) {
        console.error('Error marking messages as read:', error);
        return;
      }

      // Update local state
    setState(prev => ({
      ...prev,
      messages: prev.messages.map(msg => 
          messageIds.includes(msg.id) && msg.sender_id !== userId
            ? { ...msg, is_read: true }
          : msg
      ),
      unreadCount: Math.max(0, prev.unreadCount - messageIds.length),
    }));
    } catch (error) {
      console.error('Error in markAsRead:', error);
    }
  }, [userId]);

  const sendTypingIndicator = useCallback(async (isTyping: boolean) => {
    if (!userId || !auditRequestId) return;

    const channel = supabase.channel(`audit_${auditRequestId}_typing`);
    
    if (isTyping) {
      await channel.send({
        type: 'broadcast',
        event: 'typing',
        payload: {
          user_id: userId,
          timestamp: new Date().toISOString(),
        },
      });
    } else {
      await channel.send({
        type: 'broadcast',
        event: 'stop_typing',
        payload: {
          user_id: userId,
        },
      });
    }
  }, [userId, auditRequestId]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!userId || !auditRequestId) return;

    // Initial fetch
    fetchMessages();

    // Subscribe to new messages
    const messagesChannel = supabase
      .channel(`audit_${auditRequestId}_messages`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_messages',
          filter: `audit_request_id=eq.${auditRequestId}`,
        },
        (payload) => {
          const newMessage = payload.new as AuditMessage;
          setState(prev => {
            // Avoid duplicates
            if (prev.messages.find(msg => msg.id === newMessage.id)) {
              return prev;
            }

            const isUnread = newMessage.sender_id !== userId && !newMessage.is_read;
            return {
              ...prev,
              messages: [...prev.messages, newMessage],
              unreadCount: isUnread ? prev.unreadCount + 1 : prev.unreadCount,
            };
          });

          // Show notification for messages from others
          if (newMessage.sender_id !== userId) {
            toast.info('New message received');
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'audit_messages',
          filter: `audit_request_id=eq.${auditRequestId}`,
        },
        (payload) => {
          const updatedMessage = payload.new as AuditMessage;
          setState(prev => ({
            ...prev,
            messages: prev.messages.map(msg =>
              msg.id === updatedMessage.id ? updatedMessage : msg
            ),
          }));
        }
      )
      .subscribe((status) => {
        setState(prev => ({ ...prev, isConnected: status === 'SUBSCRIBED' }));
      });

    // Subscribe to typing indicators
    const typingChannel = supabase
      .channel(`audit_${auditRequestId}_typing`)
      .on('broadcast', { event: 'typing' }, (payload) => {
        if (payload.payload.user_id !== userId) {
          setState(prev => ({
            ...prev,
            typingUsers: [
              ...prev.typingUsers.filter(u => u.user_id !== payload.payload.user_id),
              { user_id: payload.payload.user_id, timestamp: payload.payload.timestamp },
            ],
          }));
        }
      })
      .on('broadcast', { event: 'stop_typing' }, (payload) => {
        setState(prev => ({
          ...prev,
          typingUsers: prev.typingUsers.filter(u => u.user_id !== payload.payload.user_id),
        }));
      })
      .subscribe();

    // Clean up typing indicators older than 3 seconds
    const typingCleanup = setInterval(() => {
    setState(prev => ({ 
      ...prev, 
        typingUsers: prev.typingUsers.filter(
          u => Date.now() - new Date(u.timestamp).getTime() < 3000
        ),
    }));
    }, 1000);

    return () => {
      clearInterval(typingCleanup);
      supabase.removeChannel(messagesChannel);
      supabase.removeChannel(typingChannel);
      setState(prev => ({ ...prev, isConnected: false }));
    };
  }, [userId, auditRequestId, fetchMessages]);

  return {
    ...state,
    sendMessage,
    markAsRead,
    sendTypingIndicator,
    refreshMessages: fetchMessages,
  };
};
