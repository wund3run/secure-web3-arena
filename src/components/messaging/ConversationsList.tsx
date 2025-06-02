
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface Conversation {
  id: string;
  audit_request_id?: string;
  client_id?: string;
  auditor_id?: string;
  status: string;
  created_at: string;
  updated_at: string;
  other_participant?: {
    id: string;
    name: string;
  };
  latest_message?: {
    content: string;
    created_at: string;
    sender_id: string;
  };
  unread_count?: number;
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
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetchConversations();
  }, [user]);

  const fetchConversations = async () => {
    if (!user) return;

    try {
      // Get conversations where user is either client or auditor
      const { data: conversationsData, error } = await supabase
        .from('conversations')
        .select(`
          *,
          audit_requests!inner(project_name)
        `)
        .or(`client_id.eq.${user.id},auditor_id.eq.${user.id}`)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Fetch latest messages for each conversation
      const conversationsWithMessages = await Promise.all(
        (conversationsData || []).map(async (conv) => {
          // Get latest message
          const { data: messageData } = await supabase
            .from('chat_messages')
            .select('content, created_at, sender_id')
            .eq('audit_request_id', conv.audit_request_id)
            .order('created_at', { ascending: false })
            .limit(1);

          // Get unread count
          const { count: unreadCount } = await supabase
            .from('chat_messages')
            .select('*', { count: 'exact', head: true })
            .eq('audit_request_id', conv.audit_request_id)
            .eq('receiver_id', user.id)
            .is('read_at', null);

          // Determine other participant
          const otherParticipantId = conv.client_id === user.id ? conv.auditor_id : conv.client_id;
          
          // Get other participant's profile
          const { data: profileData } = await supabase
            .from('extended_profiles')
            .select('full_name, display_name')
            .eq('id', otherParticipantId)
            .single();

          return {
            ...conv,
            latest_message: messageData?.[0] || null,
            unread_count: unreadCount || 0,
            other_participant: {
              id: otherParticipantId!,
              name: profileData?.display_name || profileData?.full_name || 'Unknown User'
            }
          };
        })
      );

      setConversations(conversationsWithMessages);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.other_participant?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.latest_message?.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderConversation = (conversation: Conversation) => {
    const isSelected = conversation.id === selectedConversationId;
    const isFromCurrentUser = conversation.latest_message?.sender_id === user?.id;

    return (
      <div
        key={conversation.id}
        className={`p-4 cursor-pointer border-b transition-colors ${
          isSelected ? 'bg-muted' : 'hover:bg-muted/50'
        }`}
        onClick={() => onSelectConversation(conversation)}
      >
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              {conversation.other_participant?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium truncate">
                {conversation.other_participant?.name || 'Unknown User'}
              </h3>
              <div className="flex items-center gap-2">
                {conversation.unread_count! > 0 && (
                  <Badge variant="default" className="h-5 w-5 rounded-full p-0 text-xs">
                    {conversation.unread_count}
                  </Badge>
                )}
                {conversation.latest_message && (
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(conversation.latest_message.created_at), { addSuffix: true })}
                  </span>
                )}
              </div>
            </div>

            {conversation.latest_message && (
              <p className="text-sm text-muted-foreground truncate">
                {isFromCurrentUser && 'You: '}
                {conversation.latest_message.content}
              </p>
            )}

            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                Audit Project
              </Badge>
              <Badge 
                variant={conversation.status === 'active' ? 'default' : 'secondary'} 
                className="text-xs"
              >
                {conversation.status}
              </Badge>
            </div>
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
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredConversations.length > 0 ? (
          <div className="max-h-[500px] overflow-y-auto">
            {filteredConversations.map(renderConversation)}
          </div>
        ) : (
          <div className="text-center p-8">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No conversations yet</h3>
            <p className="text-muted-foreground">
              Start a conversation by requesting an audit or responding to a project.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
