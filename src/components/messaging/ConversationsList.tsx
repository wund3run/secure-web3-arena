
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { formatDistanceToNow } from 'date-fns';

interface Conversation {
  id: string;
  audit_request_id?: string;
  client_id?: string;
  auditor_id?: string;
  status: string;
  created_at: string;
  updated_at: string;
  last_message?: {
    content: string;
    created_at: string;
    sender_id: string;
  };
  unread_count?: number;
  other_participant?: {
    id: string;
    name: string;
  };
}

interface ConversationsListProps {
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversationId?: string;
}

export const ConversationsList: React.FC<ConversationsListProps> = ({
  onSelectConversation,
  selectedConversationId,
}) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user) return;

    const fetchConversations = async () => {
      try {
        setLoading(true);
        
        // Fetch conversations where user is either client or auditor
        const { data, error } = await supabase
          .from('conversations')
          .select(`
            *,
            chat_messages:chat_messages(
              content,
              created_at,
              sender_id
            )
          `)
          .or(`client_id.eq.${user.id},auditor_id.eq.${user.id}`)
          .order('updated_at', { ascending: false });

        if (error) throw error;

        // Process conversations to get latest message and unread counts
        const processedConversations = await Promise.all(
          (data || []).map(async (conv) => {
            // Get the latest message
            const { data: latestMessage } = await supabase
              .from('chat_messages')
              .select('content, created_at, sender_id')
              .eq('conversation_id', conv.id)
              .order('created_at', { ascending: false })
              .limit(1)
              .single();

            // Get unread count
            const { count: unreadCount } = await supabase
              .from('chat_messages')
              .select('*', { count: 'exact', head: true })
              .eq('conversation_id', conv.id)
              .eq('receiver_id', user.id)
              .is('read_at', null);

            // Determine other participant
            const otherParticipantId = conv.client_id === user.id ? conv.auditor_id : conv.client_id;
            
            // For now, we'll use a placeholder name since we don't have user profiles joined
            const otherParticipant = {
              id: otherParticipantId || '',
              name: conv.client_id === user.id ? 'Auditor' : 'Client',
            };

            return {
              ...conv,
              last_message: latestMessage,
              unread_count: unreadCount || 0,
              other_participant: otherParticipant,
            };
          })
        );

        setConversations(processedConversations);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();

    // Set up real-time subscription for conversation updates
    const channel = supabase
      .channel('conversations_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
        },
        () => {
          fetchConversations(); // Refetch on any conversation change
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
        },
        () => {
          fetchConversations(); // Refetch when new messages arrive
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const filteredConversations = conversations.filter(conv =>
    searchQuery === '' || 
    conv.other_participant?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.last_message?.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderConversation = (conversation: Conversation) => {
    const isSelected = conversation.id === selectedConversationId;
    
    return (
      <div
        key={conversation.id}
        onClick={() => onSelectConversation(conversation)}
        className={`p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors ${
          isSelected ? 'bg-muted border-l-4 border-l-primary' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              {conversation.other_participant?.name?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-sm truncate">
                {conversation.other_participant?.name || 'Unknown User'}
              </h4>
              <div className="flex items-center gap-2">
                {conversation.unread_count && conversation.unread_count > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {conversation.unread_count}
                  </Badge>
                )}
                {conversation.last_message && (
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(conversation.last_message.created_at), { 
                      addSuffix: true 
                    })}
                  </span>
                )}
              </div>
            </div>
            
            {conversation.last_message && (
              <p className="text-sm text-muted-foreground truncate">
                {conversation.last_message.sender_id === user?.id ? 'You: ' : ''}
                {conversation.last_message.content}
              </p>
            )}
            
            {!conversation.last_message && (
              <p className="text-sm text-muted-foreground italic">
                No messages yet
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Conversations
        </CardTitle>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No conversations found</p>
          </div>
        ) : (
          <ScrollArea className="h-[500px]">
            {filteredConversations.map(renderConversation)}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
