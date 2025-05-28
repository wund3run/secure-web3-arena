
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
      let query = supabase.from('messages').select('*');
      
      if (conversationWith) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        
        query = query.or(
          `and(sender_id.eq.${user.id},recipient_id.eq.${conversationWith}),and(sender_id.eq.${conversationWith},recipient_id.eq.${user.id})`
        );
      }
      
      const { data, error } = await query.order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to fetch messages');
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

      const { data, error } = await supabase
        .from('messages')
        .insert({
          ...messageData,
          sender_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Message sent successfully');
      await fetchMessages();
      return data;
    } catch (err: any) {
      toast.error('Failed to send message');
      throw err;
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', messageId);

      if (error) throw error;
      await fetchMessages();
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
