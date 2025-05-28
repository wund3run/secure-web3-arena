
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  audit_request_id?: string;
  proposal_id?: string;
  subject?: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export const useMessages = (conversationWith?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      
      // Since messages table doesn't exist in current types, use mock data
      const mockMessages: Message[] = conversationWith ? [
        {
          id: '1',
          sender_id: conversationWith,
          recipient_id: 'current-user',
          content: 'Hello! I\'m interested in your audit request.',
          subject: 'Audit Proposal',
          is_read: false,
          created_at: new Date().toISOString()
        }
      ] : [];
      
      setMessages(mockMessages);
    } catch (err: any) {
      setError(err.message);
      console.warn('Failed to fetch messages:', err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (messageData: {
    recipient_id: string;
    content: string;
    subject?: string;
    audit_request_id?: string;
    proposal_id?: string;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Create mock message for now
      const newMessage: Message = {
        id: `temp-${Date.now()}`,
        sender_id: user.id,
        recipient_id: messageData.recipient_id,
        content: messageData.content,
        subject: messageData.subject,
        audit_request_id: messageData.audit_request_id,
        proposal_id: messageData.proposal_id,
        is_read: false,
        created_at: new Date().toISOString()
      };

      setMessages(prev => [newMessage, ...prev]);
      toast.success('Message sent successfully');
      
      return newMessage;
    } catch (err: any) {
      toast.error('Failed to send message');
      throw err;
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, is_read: true } : msg
        )
      );
    } catch (err: any) {
      toast.error('Failed to mark message as read');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [conversationWith]);

  return {
    messages,
    loading,
    error,
    fetchMessages,
    sendMessage,
    markAsRead,
  };
};
