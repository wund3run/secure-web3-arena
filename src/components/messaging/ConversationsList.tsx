
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MessageSquare, Plus } from 'lucide-react';
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
    avatar_url?: string;
  };
  last_message?: {
    content: string;
    timestamp: string;
    sender_name: string;
  };
  unread_count?: number;
}

interface ConversationsListProps {
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversationId?: string;
}

export function ConversationsList({ onSelectConversation, selectedConversationId }: ConversationsListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demonstration
    const mockConversations: Conversation[] = [
      {
        id: '1',
        audit_request_id: 'audit-1',
        status: 'active',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 3600000).toISOString(),
        other_participant: {
          id: 'user-1',
          name: 'Sarah Chen',
          avatar_url: ''
        },
        last_message: {
          content: 'I\'ve completed the initial review of your smart contract.',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          sender_name: 'Sarah Chen'
        },
        unread_count: 2
      },
      {
        id: '2',
        audit_request_id: 'audit-2',
        status: 'active',
        created_at: new Date(Date.now() - 172800000).toISOString(),
        updated_at: new Date(Date.now() - 7200000).toISOString(),
        other_participant: {
          id: 'user-2',
          name: 'Alex Rodriguez',
          avatar_url: ''
        },
        last_message: {
          content: 'Thanks for the detailed report. When can we schedule a call?',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          sender_name: 'You'
        },
        unread_count: 0
      },
      {
        id: '3',
        audit_request_id: 'audit-3',
        status: 'active',
        created_at: new Date(Date.now() - 259200000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
        other_participant: {
          id: 'user-3',
          name: 'Maya Patel',
          avatar_url: ''
        },
        last_message: {
          content: 'The vulnerability assessment is ready for your review.',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          sender_name: 'Maya Patel'
        },
        unread_count: 1
      }
    ];

    setConversations(mockConversations);
    setLoading(false);
  }, []);

  const filteredConversations = conversations.filter(conversation =>
    conversation.other_participant?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Conversations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading conversations...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Conversations
          </div>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-2">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No conversations</h3>
              <p className="text-muted-foreground">
                Start a new conversation with a project or auditor
              </p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => onSelectConversation(conversation)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedConversationId === conversation.id ? 'bg-muted border-primary' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.other_participant?.avatar_url} />
                    <AvatarFallback>
                      {getInitials(conversation.other_participant?.name || 'U')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium truncate">
                        {conversation.other_participant?.name}
                      </h4>
                      <div className="flex items-center gap-1">
                        {conversation.unread_count && conversation.unread_count > 0 && (
                          <Badge variant="default" className="text-xs px-1.5">
                            {conversation.unread_count}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(conversation.last_message?.timestamp || conversation.updated_at), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    
                    {conversation.last_message && (
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.last_message.sender_name === 'You' ? 'You: ' : ''}
                        {conversation.last_message.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
