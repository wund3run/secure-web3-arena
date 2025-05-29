import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { RealTimeMessagingService } from '@/services/real-time-messaging-service';
import { ConversationInterface } from './ConversationInterface';
import { useAuth } from '@/contexts/auth';

interface ActiveConversation {
  id: string;
  audit_request_id: string;
  otherParty: {
    name: string;
    avatar?: string;
  };
  unreadCount: number;
  lastMessage?: string;
  isMinimized: boolean;
}

export function ChatNotificationCenter() {
  const [activeConversations, setActiveConversations] = useState<ActiveConversation[]>([]);
  const [openConversations, setOpenConversations] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Load active conversations
    const loadConversations = async () => {
      try {
        const { data: conversations } = await supabase
          .from('conversations')
          .select(`
            id,
            audit_request_id,
            client_id,
            auditor_id,
            audit_requests (
              project_name,
              client_id,
              assigned_auditor_id
            )
          `)
          .eq('status', 'active')
          .or(`client_id.eq.${user.id},auditor_id.eq.${user.id}`);

        if (conversations) {
          const formattedConversations: ActiveConversation[] = conversations.map(conv => ({
            id: conv.id,
            audit_request_id: conv.audit_request_id,
            otherParty: {
              name: user.id === conv.client_id ? 'Auditor' : 'Client',
              avatar: undefined
            },
            unreadCount: 0,
            isMinimized: false
          }));

          setActiveConversations(formattedConversations);
        }
      } catch (error) {
        console.error('Failed to load conversations:', error);
      }
    };

    loadConversations();
  }, [user]);

  const toggleConversation = (conversationId: string) => {
    setOpenConversations(prev => 
      prev.includes(conversationId)
        ? prev.filter(id => id !== conversationId)
        : [...prev, conversationId]
    );
  };

  const minimizeConversation = (conversationId: string) => {
    setActiveConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, isMinimized: true }
          : conv
      )
    );
  };

  const maximizeConversation = (conversationId: string) => {
    setActiveConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, isMinimized: false }
          : conv
      )
    );
  };

  if (activeConversations.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating notification center */}
      <div className="fixed bottom-4 left-4 z-50">
        {activeConversations.length > 0 && (
          <Card className="w-80">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Active Conversations
                <Badge variant="secondary">{activeConversations.length}</Badge>
              </h3>
              
              <div className="space-y-2">
                {activeConversations.map(conv => (
                  <div
                    key={conv.id}
                    className="flex items-center justify-between p-2 rounded-lg border hover:bg-muted/50 cursor-pointer"
                    onClick={() => toggleConversation(conv.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={conv.otherParty.avatar} />
                        <AvatarFallback>
                          {conv.otherParty.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{conv.otherParty.name}</div>
                        {conv.lastMessage && (
                          <div className="text-xs text-muted-foreground truncate">
                            {conv.lastMessage}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {conv.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {conv.unreadCount}
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleConversation(conv.id);
                        }}
                      >
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Open conversation windows */}
      {openConversations.map((conversationId, index) => {
        const conversation = activeConversations.find(c => c.id === conversationId);
        if (!conversation) return null;

        return (
          <div
            key={conversationId}
            className="fixed bottom-4 z-50"
            style={{ right: `${20 + (index * 320)}px` }}
          >
            {conversation.isMinimized ? (
              <Card className="w-80 cursor-pointer" onClick={() => maximizeConversation(conversationId)}>
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {conversation.otherParty.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{conversation.otherParty.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize2 className="h-3 w-3" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleConversation(conversationId);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="relative">
                <ConversationInterface conversationId={conversationId} />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => minimizeConversation(conversationId)}
                  >
                    <Minimize2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => toggleConversation(conversationId)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
