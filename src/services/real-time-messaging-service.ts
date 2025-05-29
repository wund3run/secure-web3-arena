
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'file' | 'system';
  read_at?: string;
  created_at: string;
  sender?: {
    full_name: string;
    avatar_url?: string;
  };
}

export interface Conversation {
  id: string;
  audit_request_id: string;
  client_id: string;
  auditor_id: string;
  status: 'active' | 'closed' | 'archived';
  created_at: string;
  updated_at: string;
}

export class RealTimeMessagingService {
  private static channels: Map<string, RealtimeChannel> = new Map();

  static async createConversation(auditRequestId: string, auditorId: string): Promise<Conversation | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('conversations')
        .insert({
          audit_request_id: auditRequestId,
          client_id: user.id,
          auditor_id: auditorId
        })
        .select()
        .single();

      if (error) throw error;

      // Send initial system message
      await this.sendMessage(data.id, 'Conversation started. Feel free to discuss the audit requirements.', 'system');

      return data;
    } catch (error) {
      console.error('Failed to create conversation:', error);
      return null;
    }
  }

  static async getConversation(auditRequestId: string): Promise<Conversation | null> {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('audit_request_id', auditRequestId)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Failed to get conversation:', error);
      return null;
    }
  }

  static async sendMessage(conversationId: string, content: string, messageType: 'text' | 'file' | 'system' = 'text'): Promise<Message | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content,
          message_type: messageType
        })
        .select(`
          *,
          sender:extended_profiles!messages_sender_id_fkey (
            full_name,
            avatar_url
          )
        `)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to send message:', error);
      return null;
    }
  }

  static async getMessages(conversationId: string, limit: number = 50): Promise<Message[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:extended_profiles!messages_sender_id_fkey (
            full_name,
            avatar_url
          )
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to get messages:', error);
      return [];
    }
  }

  static subscribeToMessages(conversationId: string, onMessage: (message: Message) => void): () => void {
    const channelKey = `messages_${conversationId}`;
    
    // Clean up existing channel
    if (this.channels.has(channelKey)) {
      this.channels.get(channelKey)?.unsubscribe();
    }

    const channel = supabase
      .channel(channelKey)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        async (payload) => {
          // Fetch the complete message with sender details
          const { data } = await supabase
            .from('messages')
            .select(`
              *,
              sender:extended_profiles!messages_sender_id_fkey (
                full_name,
                avatar_url
              )
            `)
            .eq('id', payload.new.id)
            .single();

          if (data) {
            onMessage(data);
          }
        }
      )
      .subscribe();

    this.channels.set(channelKey, channel);

    return () => {
      channel.unsubscribe();
      this.channels.delete(channelKey);
    };
  }

  static async markMessagesAsRead(conversationId: string): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('conversation_id', conversationId)
        .neq('sender_id', user.id)
        .is('read_at', null);
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
    }
  }
}
